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
    // icon: Renderable;
    message: React.ReactNode;
  }) => React.ReactNode;
}

const getAnimationClass = (
  position: ToastPosition,
  visible: boolean
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalPosition = top ? 'top' : 'bottom';
  console.log('vertical position', verticalPosition);

  const [enter, exit] = prefersReducedMotion()
    ? [styles['toast-notification-fade-in'], styles['toast-notification-fade-out']]
    : [styles[`toast-notification-enter-${verticalPosition}`], styles[`toast-notification-exit-${verticalPosition}`]];

  return visible ? enter : exit;
};

const renderToastIcon = (toast: Toast) => {
  const { type } = toast;
  
  if (type === 'blank') return;

  let iconName: IconName = 'exclamation-mark';
  let iconColor: FontColor = 'dark';

  if (type === 'success') {
    iconName = 'c-check'
    iconColor = 'success-light';
  }
  
  if (type === 'error') {
    iconName = 'c-warning';
    iconColor = 'danger-light';
  }

  return type !== 'loading'
    ? <Icon name={iconName} color={iconColor} />
    : <Spinner variant="secondary" />;
};

const toastTypesWithIcon: ToastType[] = ['error', 'success', 'loading'];

export const ToastNotification: React.FC<ToastNotificationProps> = React.memo(
  ({ toast, position = 'top-center', style, children }) => {
    const message = (
      <Box
        direction="row"
        justifyContent="center"
        margin={toast.icon || toastTypesWithIcon.includes(toast.type) ? "0 0 0 xs" : undefined}
        style={{
          flex: '1 1 auto', 
        }}
        {...toast.ariaProps}
      >
        {resolveValue(toast.message, toast)}
      </Box>
    );

    return (
      <Box
        alignItems="flex-start"
        background="dark"
        color="white"
        shadow="md"
        maxWidth="300px"
        padding="md lg"
        radius="md"
        direction="row"
        className={classNames(toast.className, getAnimationClass(toast.position || position, toast.visible))}
        style={{
          ...style,
          ...toast.style,
          ...!toast.visible && { opacity: 0 },
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
          </>
        )}
      </Box>
    );
  }
);
