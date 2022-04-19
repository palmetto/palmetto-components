import React, { CSSProperties, forwardRef, RefObject } from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { DimensionSize, CssDimensionValue } from '../../types';
import { WIDTH_OPTIONS } from '../../lib/tokens';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import styles from './Drawer.module.scss';

export type DrawerPlacementType = 'left' | 'right' | 'top' | 'bottom';

export const DRAWER_PLACEMENT: DrawerPlacementType[] = ['right', 'left', 'top', 'bottom'];

export interface DrawerProps {
  /**
   * If the drawer is open
   */
  isOpen: boolean;
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
   * Whether the drawer has a visible close button.
   * If a title is defined, then a close button will be rendered
   */
  closeButton?: boolean;
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
   * Which edge of the viewport should the drawer appear from
   */
  placement?: DrawerPlacementType;
  /**
   * Function that is called whenever the user either hits
   *  the "Escape" key, clicks the close button icon, or clicks the overlay.
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;
  /**
   * Title to be displayed at the top of the Drawer.
   * A close button will be rendered automatically if this prop is defined.
   */
  title?: string;
  /**
   * The width of the Drawer when opened. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/story/design-tokens-design-tokens--page#width)
   */
  width?: DimensionSize | CssDimensionValue;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      ariaLabel = undefined,
      ariaLabelledBy = undefined,
      allowPinchZoom = false,
      children = undefined,
      className = undefined,
      closeButton = false,
      closeOnOverlayClick = true,
      containerRef = undefined,
      dangerouslyBypassFocusLock = false,
      dangerouslyBypassScrollLock = false,
      hideOverlay = false,
      initialFocusRef = undefined,
      isOpen,
      onDismiss = undefined,
      placement = 'right',
      title = undefined,
      width = undefined,
    },
    ref,
  ) => {
    const dynamicWidth = (WIDTH_OPTIONS as Array<string | undefined>).includes(width)
      ? `var(--size-width-${width})`
      : width;

    const dynamicStyle: CSSProperties = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['--w' as any]: dynamicWidth,
    };

    const overlayClassnames = classNames(styles.overlay, styles.drawer, {
      [styles['hide-overlay']]: hideOverlay,
      [styles['hide-overlay-left']]: hideOverlay && placement === 'left',
      [styles['hide-overlay-right']]: hideOverlay && placement === 'right',
      [styles['hide-overlay-bottom']]: hideOverlay && placement === 'bottom',
      [styles['hide-overlay-top']]: hideOverlay && placement === 'top',
      'position-fixed': containerRef === undefined,
      'position-absolute': containerRef !== undefined,
    });

    const contentClassnames = classNames(styles['drawer-content'], {
      [styles.bottom]: placement === 'bottom',
      [styles.left]: placement === 'left',
      [styles.right]: placement === 'right',
      [styles.top]: placement === 'top',
      [styles['hide-overlay']]: hideOverlay,
      'overflow-auto': !closeButton && !title,
      className,
    });

    const renderHeader = () => {
      if (closeButton && onDismiss && !title) {
        return (
          <Box
            alignItems="flex-end"
            justifyContent="center"
            padding="md lg"
            borderWidth="0 0 xs 0"
            className={styles['drawer-header']}
          >
            <button
              aria-label="close"
              type="button"
              className={styles['drawer-close-button']}
              onClick={onDismiss}
            >
              <Icon name="remove" />
            </button>
          </Box>
        );
      }
      if (title) {
        return (
          <Box
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding={onDismiss ? 'md lg' : 'lg'}
            borderWidth="0 0 xs 0"
            className={styles['drawer-header']}
          >
            <Box className={styles.title} fontWeight="bold">
              {title}
            </Box>
            {onDismiss && (
              <button
                aria-label="close"
                type="button"
                className={styles['drawer-close-button']}
                onClick={onDismiss}
              >
                <Icon name="remove" />
              </button>
            )}
          </Box>
        );
      }
      return null;
    };

    const content = title || closeButton ? (
      <Box flex="auto" overflow="auto">
        {children}
      </Box>
    ) : (
      children
    );

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
        style={{ ...dynamicStyle }}
      >
        <DialogContent
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={contentClassnames}
          style={{ ...dynamicStyle }}
        >
          {renderHeader()}
          {content}
        </DialogContent>
      </DialogOverlay>
    );
  },
);
