import React, { FC, forwardRef, RefObject } from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './Drawer.module.scss';

export type DrawerPlacementType = 'left' | 'right' | 'top' | 'bottom';

export const DRAWER_PLACEMENT: DrawerPlacementType[] = ['right', 'left', 'top', 'bottom'];

export interface DrawerProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * A drawer needs to be properly labeled to provide context for users with
   * assistive technology such as screen readers. If a drawer is announced to
   * the user without a label, it can be confusing and difficult to navigate.
   */
  ariaLabel?: string;
  /**
   * The id of the element that should be used as the drawer's label by assistive technologies like screen readers.
   */
  ariaLabelledBy?: string;
  /**
   * Contents of the dialog.
   */
  children?: React.ReactNode;
  /**
   * Additional class names to add to the drawer content.
   */
  className?: string;
  /**
   * If true, the drawer will close when the overlay is clicked
   */
  closeOnOverlayClick?: boolean;
  /**
   * The ref of the container where the drawer will be inserted into the DOM.
   * By default, drawers are inserted in the document.body, but if need be they can
   * be scoped as necessary.
   */
  containerRef?: React.RefObject<Node>;
  /**
   * By default, focus is trapped within the drawer.
   * If true, focus will not be trapped within the contents of the drawer.
   */
  dangerouslyBypassFocusLock?: boolean;
  /**
   * By default, the drawer locks scrolling on the body, but in some cases you may want to allow for scrolling.
   * If true, this will allow the body to scroll while the drawer is open.
   */
  dangerouslyBypassScrollLock?: boolean;
  /**
   * If true, the overlay will not be rendered, scrolling for the entire page will remain enabled,
   * and focus will not be locked to the contents of the drawer
   */
  hideOverlay?: boolean;
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
  placement?: DrawerPlacementType;
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
      closeOnOverlayClick = true,
      containerRef = undefined,
      dangerouslyBypassFocusLock = false,
      dangerouslyBypassScrollLock = false,
      hideOverlay = false,
      initialFocusRef,
      isOpen,
      onDismiss,
      placement = 'right',
    },
    ref,
  ) => {
    const overlayClassnames = classNames(styles.overlay, styles.drawer, {
      [styles['hide-overlay']]: hideOverlay,
      [styles['hide-overlay-left']]: hideOverlay && placement === 'left',
      [styles['hide-overlay-right']]: hideOverlay && placement === 'right',
      [styles['hide-overlay-bottom']]: hideOverlay && placement === 'bottom',
      [styles['hide-overlay-top']]: hideOverlay && placement === 'top',
    });

    const contentClassnames = classNames(styles['drawer-content'], {
      [styles.bottom]: placement === 'bottom',
      [styles.left]: placement === 'left',
      [styles.right]: placement === 'right',
      [styles.top]: placement === 'top',
      [styles['hide-overlay']]: hideOverlay,
      className,
    });

    return (
      <DialogOverlay
        className={overlayClassnames}
        containerRef={containerRef}
        allowPinchZoom={allowPinchZoom}
        isOpen={isOpen}
        onDismiss={closeOnOverlayClick ? onDismiss : undefined}
        initialFocusRef={initialFocusRef}
        ref={ref}
        dangerouslyBypassFocusLock={hideOverlay || dangerouslyBypassFocusLock}
        dangerouslyBypassScrollLock={hideOverlay || dangerouslyBypassScrollLock}
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
