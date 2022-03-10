import React, { ReactNode, RefObject, forwardRef } from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import styles from './MediaModal.module.scss';

export interface MediaModalProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * Each modal needs to be properly labeled to provide context for users with
   * assistive technology such as screen readers. If a modal is announced to
   * the user without a label, it can be confusing and difficult to
   * navigate. If `title` is defined, that will be used instead
   */
  ariaLabel?: string;
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
   * If defined, will be displayed at the top of the viewport
   */
  title?: string;
  /**
   * If defined, will be displayed at the top of the viewport
   */
  description?: string;
  /**
   * Contents of the footer area.
   */
  footerContent?: ReactNode;
  /**
   * Function that is called whenever the user hits "Escape" key or clicks outside the modal.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
  /**
   * Allows spread props
   */
  [x: string]: any; // eslint-disable-line
}

export const MediaModal: React.FC<MediaModalProps> = forwardRef<HTMLDivElement, MediaModalProps>(
  (
    {
      ariaLabel,
      allowPinchZoom = false,
      title,
      description,
      children,
      className,
      containerRef = undefined,
      footerContent = undefined,
      initialFocusRef,
      isOpen,
      onDismiss,
      ...restProps
    },
    ref,
  ) => {
    const overlayClassnames = classNames(styles.overlay, styles['media-modal']);
    const contentClassnames = classNames(styles['media-modal'], className);

    const showHeader = title || description;

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
          <DialogContent aria-label={ariaLabel || title} className={contentClassnames}>
            {showHeader && (
              <Box
                height="lg"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding="md lg"
                className={styles.header}
              >
                <div>
                  <Box className={styles.title}>{title}</Box>
                  <Box fontSize="xs">{description}</Box>
                </div>
                <div className="font-size-lg">
                  <Button
                    iconPrefix="remove-light"
                    size="lg"
                    onClick={onDismiss}
                    isNaked
                    aria-label="close"
                  />
                </div>
              </Box>
            )}
            {children}
            {footerContent && <div className={styles.footer}>{footerContent}</div>}
          </DialogContent>
        </Box>
      </DialogOverlay>
    );
  },
);
