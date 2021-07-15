import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { ToastContainer, toast } from '.';

export default {
  title: 'Components/Toast/Visual Regression Tests',
  component: ToastContainer,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [320, 700, 1012, 1300] },
  },
  decorators: [storyFn => (
    <div>
      <ToastContainer />
      {storyFn()}
    </div>
  )],
} as Meta;

export const Default = (): React.ReactNode => {
  setTimeout(() => {
    toast('default toast');
  }, 1);
  return <></>;
};

export const Dismissable = (): React.ReactNode => {
  setTimeout(() => {
    toast('dismissable toast', { canDismiss: true });
  }, 1);
  return <></>;
};

export const Success = (): React.ReactNode => {
  setTimeout(() => {
    toast.success('success toast');
  }, 1);
  return <></>;
};

export const Error = (): React.ReactNode => {
  setTimeout(() => {
    toast.error('error toast');
  }, 1);
  return <></>;
};

export const Loading = (): React.ReactNode => {
  setTimeout(() => {
    toast.loading('error toast');
  }, 1);
  return <></>;
};

export const Compact = (): React.ReactNode => {
  setTimeout(() => {
    toast('compact toast', { isCompact: true });
  }, 1);
  return <></>;
};

export const CannotDismiss = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { canDismiss: false });
  }, 1);
  return <></>;
};

export const TopLeft = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'top-left' });
  }, 1);
  return <></>;
};

export const TopCenter = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'top-center' });
  }, 1);
  return <></>;
};

export const TopRight = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'top-right' });
  }, 1);
  return <></>;
};

export const BottomLeft = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'bottom-left' });
  }, 1);
  return <></>;
};

export const BottomCenter = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'bottom-center' });
  }, 1);
  return <></>;
};

export const BottomRight = (): React.ReactNode => {
  setTimeout(() => {
    toast('cannot dismiss toast', { position: 'bottom-right' });
  }, 1);
  return <></>;
};



