import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import FocusTrap from 'focus-trap-react';
import mergeRefs from 'react-merge-refs';
import classNames from 'classnames';
import { BrandColor } from '../../types';
import styles from './Popover.module.scss';
import { Box, BoxProps } from '../Box/Box';

export type PopoverProps = {
  /**
   * Custom class to apply to the alert.
   */
  className?: string;
  /**
   * The trigger element
   */
  children: ReactNode;
  /**
   * Content of the tooltip. Can be any JSX node.
   */
  content: ReactNode;
  /**
   * The Popover is a controlled input, and will be shown when `isOpen === true`.
   */
  isOpen: boolean;
  /**
   * Color of the arrow background. NOTE: That the arrowColor will default to the
   * `background` color applied in the `contentContainerProps`, but can be overwritten
   * by passing a specific value here.
   */
  arrowColor?: BrandColor;
  /**
   * An object matching the interface of the `Box` component props.
   * This is useful for styling the tooltip container using all the options available in
   * a `Box`.
   */
  contentContainerProps?: BoxProps;
  /**
   * Whether the arrow is shown.
   */
  hasArrow?: boolean;
  /**
   * How far (in pixels) the Popover element will be from the target.
   * Note that this is from the edge of the target to the edge of the popover content,
   * and it DOES NOT include the arrow element.
   */
  offsetFromTarget?: number;
  /**
   * Callback function to handle when a user clicks outside the Popover
   */
  onClickOutside?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * The placement (position) of the Popover relative to its trigger.
   */
  placement?: Placement;
  /**
   * Whether you want to trap focus in the Popover element when it is open.
   * Read more about focus traps:
   * [Here](https://allyjs.io/tutorials/accessible-dialog.html#trapping-focus-inside-the-dialog)
   */
  trapFocus?: boolean;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
} & ({
  /**
   * Whether the element should be rendered outside its DOM structure
   * for reasons of placement. Use this when the element is being cut-off or
   * re-positioned due to lack of space in the parent container.
   * NOTE: `portalTarget` is required if this is true.
   */
  withPortal: true;
   /**
   * The target element where the Popover will be portaled to, when `withPortal === true`.
   * `document.body` will work for many cases, but you can also use a custom container for this.
   * Only required if withPortal is true.
   */
  portalTarget: HTMLElement;
} | {
  withPortal?: false;
  portalTarget?: never;
})

const contentContainerDefaults: BoxProps = {
  background: 'white',
  padding: 'sm',
  radius: 'sm',
  shadow: 'md',
};

export const Popover: FC<PopoverProps> = ({
  className,
  isOpen,
  children,
  content,
  arrowColor = undefined,
  contentContainerProps = { ...contentContainerDefaults },
  hasArrow = true,
  offsetFromTarget = 12,
  onClickOutside = undefined,
  placement = 'right',
  withPortal = false,
  portalTarget,
  trapFocus = false,
  ...restProps
}) => {
  const triggerRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popover = popperRef.current;
      const trigger = triggerRef.current;

      if (!popover || !trigger) {
        return;
      }

      if (event.target === trigger || trigger?.contains(event.target as Node)) {
        return;
      }

      if (event.target !== popover && !popover?.contains(event.target as Node)) {
        if (onClickOutside) onClickOutside(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onClickOutside) onClickOutside(event);
      }
    };

    if (onClickOutside) {
      document.body.addEventListener('click', handleClickOutside, false);
      document.body.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      if (onClickOutside) {
        document.body.removeEventListener('click', handleClickOutside, false);
        document.body.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [onClickOutside]);

  const { styles: popperStyles, attributes } = usePopper(
    triggerRef.current,
    popperRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement },
        },
        {
          name: 'offset',
          options: {
            offset: [0, offsetFromTarget],
          },
        },
      ],
    },
  );

  const containerBoxProps = {
    ...contentContainerDefaults,
    ...contentContainerProps,
  };

  const computedArrowColor = arrowColor || containerBoxProps.background;

  const arrowClasses = classNames(
    styles['popover-arrow'],
    `background-color-${computedArrowColor}`,
    {
      'display-none': !hasArrow,
    },
  );

  const renderPopperContent = () => {
    const renderPopperBox = () => (
      <Box
        ref={popperRef}
        className={classNames(styles.popover, className)}
        style={popperStyles.popper}
        role="dialog"
        aria-hidden={!isOpen}
        {...containerBoxProps}
        {...attributes.popper}
        {...restProps}
      >
        <div
          ref={setArrowElement}
          style={popperStyles.arrow}
          className={arrowClasses}
          data-popper-arrow
        />
        {content}
      </Box>
    );

    return trapFocus ? (
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        {renderPopperBox()}
      </FocusTrap>
    ) : (
      renderPopperBox()
    );
  };

  const childrenWithRef = React.Children.map(children, child => {
    const childProps = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: triggerRef as RefObject<HTMLElement> | ((instance: any) => void),
      role: 'button',
      'aria-expanded': isOpen,
      'aria-haspopup': true,
    };

    // Merge local ref with any ref passed originally to child component.
    // We have to cast with `as` so TS compiler doesn't complain since ReactNode/ReactChild types don't
    // explicitly declare ref as a property in the object.
    if ((child as ReactNode & { ref: any; })?.ref) { // eslint-disable-line @typescript-eslint/no-explicit-any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childProps.ref = mergeRefs([(child as ReactNode & { ref: any; })?.ref, childProps.ref]);
    }

    if (isValidElement(child)) {
      return cloneElement(child, childProps);
    }

    return child;
  });

  return (
    <>
      {childrenWithRef}
      {isOpen && (
        // portalTarget should always be defined if withPortal is true, but better safe than sorry here!
        withPortal && portalTarget ? createPortal(renderPopperContent(), portalTarget) : renderPopperContent()
      )}
    </>
  );
};
