import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import classNames from 'classnames';
import { BrandColor } from '../../types';
import styles from './Popover.module.scss';
import Box, { BoxProps } from '../Box/Box';

interface PopoverProps {
  /**
   * Color of the arrow background.
   */
  arrowColor: BrandColor;
  /**
   * Content of the tooltip. Can be any JSX node, but should be a single node, so it can be assigned a ref.
   */
  content?: ReactNode;
  /**
   * The Popover is a controlled input, and will be shown when `isOpen === true`.
   */
  isOpen: boolean;
  /**
   * Padding for the tooltip content. This has a default value
   * in order to avoid content overlap with the popover arrow.
   */
  contentContainerProps?: BoxProps;
  /**
   * The placement of the Popover relative to its trigger.
   */
  placement?: Placement;
  /**
   * The target element where the Popover will be portaled to, when `withPortal === true`.
   */
  portalTarget?: HTMLElement;
  /**
   * Whether the element should be rendered outside its DOM structure
   * for reasons of placement. Use this when the element is being cut-off or
   * re-positioned due to lack of space in the parent container.
   * NOTE: use `portalTarget` to render the element onto a custom container,
   * otherwise it will be rendered to the `body` element by default.
   */
  withPortal?: boolean;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const contentContainerDefaults: BoxProps = {
  background: 'white',
  padding: 'sm',
};

const Popover: FC<PopoverProps> = ({
  arrowColor = undefined,
  children,
  content,
  contentContainerProps = { ...contentContainerDefaults },
  isOpen,
  placement,
  portalTarget = document.body,
  withPortal = false,
  ...restProps
}) => {
  const triggerRef = useRef(null);
  const popperRef = useRef(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
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
            offset: [0, 8],
          },
        },
      ],
    },
  );

  const childrenWithRef = React.Children.map(children, child => {
    const props = { ref: triggerRef };
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

  const containerBoxProps = {
    ...contentContainerDefaults,
    ...contentContainerProps,
  };

  const computedArrowColor = arrowColor || containerBoxProps.background;

  const arrowClasses = classNames(
    styles['popover-arrow'],
    `background-color-${computedArrowColor}`,
  );

  const popperContent = (
    <Box
      ref={popperRef}
      className={styles.popover}
      style={popperStyles.popper}
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

  return (
    <>
      {childrenWithRef}
      {isOpen && (
        withPortal ? createPortal(popperContent, portalTarget) : popperContent
      )}
    </>
  );
};

export default Popover;
