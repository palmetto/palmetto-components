import React, { ReactNode, RefObject, forwardRef } from 'react';
import { DialogOverlay, DialogContent } from '@palmetto/dialog';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
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
   * Whether the modal has a visible close button.
   * If a title description, or headerContent is defined, then a close button will be rendered
   */
  closeButton?: boolean;
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
   * Title to be displayed at the top of the viewport.
   * A close button will be rendered automatically if this prop is defined.
   * If headerContent is defined, this will be ignored.
   */
  title?: string;
  /**
   * Text to be displayed at the top of the viewport beneath the title.
   * A close button will be rendered automatically if this prop is defined.
   * If headerContent is defined, this will be ignored.
   */
  description?: string;
  /**
   * Contents of the footer area.
   */
  footerContent?: ReactNode;
  /**
   * Contents of the header area. If defined, the title and description will not be rendered.
   * A close button will be rendered automatically if this prop is defined.
   */
  headerContent?: ReactNode;
  /**
   * Function that is called whenever the user hits "Escape" key or clicks outside the modal.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
  /**
   * Allows spread props
   */
  [x: string]: any; // eslint-disable-line
}

export const MediaModal: React.FC<MediaModalProps> = forwardRef<
  HTMLDivElement,
  MediaModalProps
>(
  (
    {
      ariaLabel,
      allowPinchZoom = false,
      title,
      description,
      children,
      className,
      closeButton = false,
      containerRef = undefined,
      footerContent = undefined,
      headerContent = undefined,
      initialFocusRef,
      isOpen,
      onDismiss,
      ...restProps
    },
    ref,
  ) => {
    const overlayClassnames = classNames(styles.overlay, styles['media-modal']);
    const contentClassnames = classNames(styles['media-modal'], className);

    const showHeaderBar = headerContent || title || description;

    const closeBtn = (
      <Box
        as="button"
        type="button"
        aria-label="close"
        className={styles['media-modal-close']}
        onClick={onDismiss}
        cursor="pointer"
        color="grey-100"
        background="transparent"
        borderWidth="0"
        padding="xs"
        hover={{
          color: 'white',
        }}
      >
        <Icon name="remove-light" size="lg" />
      </Box>
    );

    const renderHeader = () => {
      if (closeButton && !showHeaderBar) {
        return (
          <Box
            alignItems="flex-end"
            fontSize="lg"
            padding="lg"
            className={styles.header}
          >
            {closeBtn}
          </Box>
        );
      }
      if (showHeaderBar) {
        return (
          <Box
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="md lg"
            className={classNames(styles.header, styles['header-bar'])}
          >
            {headerContent || (
              <Box gap="2xs">
                <Box className={styles.title}>{title}</Box>
                <Box fontSize="xs">{description}</Box>
              </Box>
            )}
            {closeBtn}
          </Box>
        );
      }
      return null;
    };

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
            aria-label={ariaLabel || title}
            className={contentClassnames}
          >
            {renderHeader()}
            {children}
            {footerContent && (
              <div className={styles.footer}>{footerContent}</div>
            )}
          </DialogContent>
        </Box>
      </DialogOverlay>
    );
  },
);
