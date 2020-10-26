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
import styles from './Popover.module.scss';

interface PopoverProps {
  /**
   * Content of the tooltip. Can be any JSX node, but should be a single node, so it can be assigned a ref.
   */
  content?: ReactNode;
  /**
   * The Popover is a controlled input, and will be shown when `isOpen === true`.
   */
  isOpen: boolean;
  /**
   * Whether the element should be rendered outside its DOM structure
   * for reasons of placement. Use this when the element is being cut-off or
   * re-positioned due to lack of space in the parent container.
   * NOTE: use `portalTarget` to render the element onto a custom container,
   * otherwise it will be rendered to the `body` element by default.
   */
  isPortal?: boolean;
  /**
   * The placement of the Popover relative to its trigger.
   */
  placement?: Placement;
  /**
   * The target element where the Popover will be portaled to, when `isPortal === true`.
   */
  portalTarget?: HTMLElement;
}

const Popover: FC<PopoverProps> = ({
  children,
  content,
  isOpen,
  isPortal = false,
  placement,
  portalTarget = document.body,
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
          options: { element: arrowElement, padding: 10 },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 20],
          },
        },
      ],
    },
  );

  const childrenWithRef = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    const props = { ref: triggerRef };
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

  const popperContent = (
    <div ref={popperRef} className={styles['popover-container']} style={popperStyles.popper} {...attributes}>
      <div ref={setArrowElement} style={popperStyles.arrow} className={styles['popover-arrow']} data-popper-arrow />
      {content}
    </div>
  );

  return (
    <>
      {childrenWithRef}
      {isOpen && (
        isPortal ? createPortal(popperContent, portalTarget) : popperContent
      )}
    </>
  );
};

export default Popover;
