import React from 'react';
import classNames from 'classnames';
import { Toast, ToastPosition } from './Toast.types';
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
    iconName = 'check'
    iconColor = 'success';
  }
  
  if (type === 'error') {
    iconName = 'remove';
    iconColor = 'danger';
  }

  return type !== 'loading'
    ? <Icon name={iconName} color={iconColor} />
    : <Spinner variant="dark" size="sm" />;
};

export const ToastNotification: React.FC<ToastNotificationProps> = React.memo(
  ({ toast, position = 'top-center', style, children }) => {
    console.log('class', getAnimationClass(toast.position || position, toast.visible));
    const message = (
      <Box
        direction="row"
        justifyContent="center"
        margin="2xs sm"
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
        alignItems="center"
        background="white"
        color="dark"
        shadow="md"
        maxWidth="300px"
        padding="md"
        radius="sm"
        direction="row"
        className={classNames(toast.className, getAnimationClass(toast.position || position, toast.visible))}
        style={{
          ...style,
          ...toast.style,
          ...!toast.height && { opacity: 0 },
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
