import React from 'react';
import classNames from 'classnames';
import { Toast, ToastPosition, ToastType } from './Toast.types';
import { resolveValue } from '../../lib/resolveValue';
import { prefersReducedMotion } from '../../lib/prefersReducedMotion';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { IconName, FontColor } from '../../types';
import styles from './ToastNotification.module.scss';

interface ToastNotificationProps {
  toast: Toast;
  position?: ToastPosition;
  style?: React.CSSProperties;
  children?: (components: {
    // icon: IconName;
    message: React.ReactNode;
  }) => React.ReactNode;
  onDismiss?: () => void;
}

const getAnimationClass = (
  position: ToastPosition,
  visible: boolean,
): React.CSSProperties => {
  const verticalPosition = position.includes('top') ? 'top' : 'bottom';
  const horizontalPosition = position.includes('left') ? 'left' : 'right';
  const isCentered = position.includes('center');

  const [enter, exit] = prefersReducedMotion()
    ? [styles['toast-notification-fade-in'], styles['toast-notification-fade-out']]
    : [
        styles[`toast-notification-enter-${verticalPosition}`],
        styles[`toast-notification-exit-${isCentered ? verticalPosition : horizontalPosition}`]
    ];

  return visible ? enter : exit;
};

const renderToastIcon = (toast: Toast) => {
  const { type } = toast;

  if (type === 'blank') return;

  let iconName: IconName = 'exclamation-mark';
  let iconColor: FontColor = 'dark';

  if (type === 'success') {
    iconName = 'c-check';
    iconColor = 'success-light';
  }

  if (type === 'error') {
    iconName = 'c-warning';
    iconColor = 'danger-light';
  }

  // eslint-disable-next-line consistent-return
  const icon = type !== 'loading'
    ? <Icon name={iconName} color={iconColor} />
    : <Spinner variant="secondary" />;

  return (
    <Box
      height="100"
    >
      {icon}
    </Box>
  )
};

const toastTypesWithIcon: ToastType[] = ['error', 'success', 'loading'];

const renderDismissIcon = (toast: Toast, onDismiss: ToastNotificationProps['onDismiss']) => {
  if (!toast.isDismissable) return;

  // eslint-disable-next-line consistent-return
  return (
    <Box
      as="button"
      borderWidth="0 0 0 xs"
      borderColor="grey"
      margin="0 0 0 sm"
      padding="0 0 0 sm"
      cursor="pointer"
      background="transparent"
      color="white"
      height="100"
      onClick={onDismiss}
    >
      <Icon name="remove-light" />
    </Box>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const ToastNotification: React.FC<ToastNotificationProps> = React.memo(
  ({
    toast,
    position = 'top-center',
    style,
    children,
    onDismiss,
  }) => {
    const message = (
      <Box
        direction="row"
        justifyContent="center"
        margin={toast.icon || toastTypesWithIcon.includes(toast.type) ? '0 0 0 sm' : undefined}
        style={{
          flex: '1 1 auto',
        }}
        {...toast.ariaProps}
      >
        {resolveValue(toast.message, toast)}
      </Box>
    );

    const animationClass = toast?.height ? getAnimationClass(toast.position || position, toast.visible) : undefined;

    return (
      <Box
        alignItems="center"
        background="dark"
        color="white"
        shadow="md"
        maxWidth="300px"
        padding="md lg"
        radius="md"
        direction="row"
        className={classNames(toast.className, animationClass)}
        style={{
          ...style,
          ...toast.style,
          ...!toast.height && { opacity: 0 },
          willChange: 'transform',
        }}
      >
        {typeof children === 'function' ? (
          children({
            message,
          })
        ) : (
          <>
            {renderToastIcon(toast)}
            {message}
            {renderDismissIcon(toast, onDismiss)}
          </>
        )}
      </Box>
    );
  },
);
