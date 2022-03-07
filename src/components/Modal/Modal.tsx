import React, {
  ReactNode,
  RefObject,
  forwardRef,
} from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { CssOverflowValue } from '../../types';
import { getDimensionCss } from '../../lib/getDimensionCss';
import { Box, BoxProps } from '../Box/Box';
import { ModalFooter, ModalHeader, ModalBody } from './components';
import styles from './Modal.module.scss';

export interface ModalProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * Each modal needs to be properly labeled to provide context for users with
   * assistive technology such as screen readers. If a modal is announced to
   * the user without a label, it can be confusing and difficult to navigate.
   */
  ariaLabel?: string;
  /**
   * The id of the element that should be used as the Modal's label by assistive
   * technologies like screen readers. Usually the id is set on the `Modal.Header`
   */
  ariaLabelledBy?: string;
  /**
   * Contents of the dialog.
   */
  children?: ReactNode;
  /**
   * Additional ClassNames to add to dialog.
   */
  className?: string;
  /**
   * The ref of the container where the dialog will be inserted into the DOM.
   * By default, Modals are inserted in the document.body, but if need be they can
   * be scoped as necessary.
   */
  containerRef?: React.RefObject<Node>;
  /**
   * At mobile viewport widths, the modal will take up the fullscreen
   */
  fullScreenMobile?: boolean;
  /**
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://reach.tech/dialog#dialog-initialfocusref
   */
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * Whether the modal is visible or not
   */
  isOpen: boolean;
  /**
   * Max width for modal content. Uses the same maxWidth prop as the `Box` component,
   * and as such can be responsive as well.
   */
  maxWidth?: BoxProps['maxWidth'];
  /**
   * Function that is called whenever the user hits "Esacape" key or clicks outside the modal.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
  /**
   * The css overflow behavior of the Modal
   */
  overflow?: CssOverflowValue;
  /**
   * Allows spread props
   */
  [x: string]: any; // eslint-disable-line
}

const ModalBaseComponent: React.FC<ModalProps> = forwardRef<HTMLDivElement, ModalProps>((
  {
    ariaLabel,
    ariaLabelledBy,
    allowPinchZoom = false,
    children,
    className,
    containerRef = undefined,
    fullScreenMobile = false,
    initialFocusRef,
    isOpen,
    maxWidth = undefined,
    onDismiss,
    overflow = 'hidden',
    ...restProps
  },
  ref,
) => {
  const maxWidthCss = getDimensionCss('mw', maxWidth);

  const overlayClassnames = classNames(styles.overlay, {
    fullscreen: fullScreenMobile,
  });
  const contentClassnames = classNames(
    styles['modal-content'],
    className,
    maxWidthCss.classes,
    {
      [`overflow-${overflow}`]: overflow,
    },
  );

  return (
    <DialogOverlay
      className={overlayClassnames}
      containerRef={containerRef}
      allowPinchZoom={allowPinchZoom}
      isOpen={isOpen}
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      ref={ref}
      {...restProps}
    >
      <Box className={styles.container}>
        <DialogContent
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={contentClassnames}
          style={{ ...maxWidthCss.styles }}
        >
          {children}
        </DialogContent>
      </Box>
    </DialogOverlay>
  );
});

export interface ModalStatic {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
}

export type ModalWithStaticComponents =
  typeof ModalBaseComponent
  & ModalStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Modal = (() => {
  const Modal = ModalBaseComponent as ModalWithStaticComponents; // eslint-disable-line no-shadow
  Modal.Body = ModalBody;
  Modal.Footer = ModalFooter;
  Modal.Header = ModalHeader;
  return Modal;
})();
