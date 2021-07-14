import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ToastContainer, toast } from './';

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
  )]
} as Meta;

export const Default = () => {
  setTimeout(() => {
    toast('default toast');
  }, 1);
  return <></>;
};

export const Dismissable = () => {
  setTimeout(() => {
    toast('dismissable toast', { isDismissable: true });
  }, 1);
  return <></>;
};

export const Success = () => {
  setTimeout(() => {
    toast.success('success toast');
  }, 1);
  return <></>;
};

export const Error = () => {
  setTimeout(() => {
    toast.error('error toast');
  }, 1);
  return <></>;
};

export const Loading = () => {
  setTimeout(() => {
    toast.loading('error toast');
  }, 1);
  return <></>;
};
