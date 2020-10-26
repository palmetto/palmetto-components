import React, {
  cloneElement,
  FC,
  useRef,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
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
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    { modifiers: [{ name: 'arrow', options: { element: arrowRef } }] },
  );

  const childrenWithRef = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    const props = { ref: buttonRef };
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
      console.log('did I clone?');
    }
    return child;
  });

  return (
    <>
      {childrenWithRef}
      {isOpen && (
        <div ref={popperRef} style={styles.popper} {...attributes}>
          {render && render()}
          <div ref={setArrowRef} style={styles.arrow} />
        </div>
      )}
    </>
  );
};

export default Popover;
