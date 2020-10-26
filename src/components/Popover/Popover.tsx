import React, { FC, useRef, ReactNode } from 'react';
import { usePopper } from 'react-popper';

interface PopoverProps {
  render?: () => ReactNode;
  isOpen: boolean;
}

const Popover: FC<PopoverProps> = ({
  children,
  render,
  isOpen,
}) => {
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
  );

  return (
    <>
      <span ref={buttonRef}>
        {children}
      </span>
      {isOpen && (
        <div ref={popperRef} style={styles.popper} {...attributes} data-popper-placement="bottom">
          {render && render()}
        </div>
      )}
    </>
  );
};

export default Popover;
