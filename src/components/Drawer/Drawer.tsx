import React, { FC, forwardRef } from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './Drawer.module.scss';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
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
  children?: React.ReactNode;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * The ref of the container where the dialog will be inserted into the DOM.
   * By default, Modals are inserted in the document.body, but if need be they can
   * be scoped as necessary.
   */
  containerRef?: React.RefObject<Node>;
  /**
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://reach.tech/dialog#dialog-initialfocusref
   */
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * If the drawer is open
   */
  isOpen: boolean;
  /**
   * Which edge of the viewport should the drawer appear from
   */
  placement: DrawerPlacement;
  /**
   * Function that is called whenever the user either hits
   *  the "Escape" key, clicks the close button icon, or clicks the overlay.
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;
}

export const Drawer: FC<DrawerProps> = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      ariaLabel,
      ariaLabelledBy,
      allowPinchZoom = false,
      children,
      className,
      containerRef = undefined,
      initialFocusRef,
      isOpen,
      onDismiss,
      placement = 'right',
    },
    ref,
  ) => {
    const overlayClassnames = classNames(styles.overlay, styles.drawer);

    const contentClassnames = classNames(styles['modal-content'], {
      [styles.bottom]: placement === 'bottom',
      [styles.left]: placement === 'left',
      [styles.right]: placement === 'right',
      [styles.top]: placement === 'top',
      className,
    });

    return (
      <DialogOverlay
        className={overlayClassnames}
        containerRef={containerRef}
        allowPinchZoom={allowPinchZoom}
        isOpen={isOpen}
        onDismiss={onDismiss}
        initialFocusRef={initialFocusRef}
        ref={ref}
      >
        <Box className={styles.container}>
          <DialogContent
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={contentClassnames}
          >
            {children}
          </DialogContent>
        </Box>
      </DialogOverlay>
    );
  },
);
