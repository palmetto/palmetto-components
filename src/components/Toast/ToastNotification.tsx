import React from 'react';
import { Toast, ToastPosition } from './Toast.types';
import { resolveValue } from './ToastContainer';
// import { prefersReducedMotion } from '../core/utils';
import { Box } from '../Box/Box';

interface ToastNotificationProps {
  toast: Toast;
  position?: ToastPosition;
  style?: React.CSSProperties;
  children?: (components: {
    // icon: Renderable;
    message: React.ReactNode;
  }) => React.ReactNode;
}

// const getAnimationStyle = (
//   position: ToastPosition,
//   visible: boolean
// ): React.CSSProperties => {
//   const top = position.includes('top');
//   const factor = top ? 1 : -1;

//   const [enter, exit] = prefersReducedMotion()
//     ? [fadeInAnimation, fadeOutAnimation]
//     : [enterAnimation(factor), exitAnimation(factor)];

//   return {
//     animation: visible
//       ? `${keyframes(enter)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
//       : `${keyframes(exit)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
//   };
// };

export const ToastNotification: React.FC<ToastNotificationProps> = React.memo(
  ({ toast, position, style, children }) => {
    // const animationStyle: React.CSSProperties = toast?.height
    //   ? getAnimationStyle(
    //       toast.position || position || 'top-center',
    //       toast.visible
    //     )
    //   : { opacity: 0 };

    // const icon = <ToastIcon toast={toast} />;
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
        className={toast.className}
        style={{
          // ...animationStyle,
          ...style,
          ...toast.style,
        }}
      >
        {typeof children === 'function' ? (
          children({
            // icon,
            message,
          })
        ) : (
          <>
            {/* {icon} */}
            {message}
          </>
        )}
      </Box>
    );
  }
);
