import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Drawer, DrawerProps } from './Drawer';
import { Box } from '../Box/Box';

export default {
  title: 'Components/Drawer/Visual Regression Tests',
  component: Drawer,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [350, 700, 1012, 1300] },
  },
};

const Template: Story<DrawerProps> = ({ ...args }) => (
  <Drawer {...args}>
    <Box background="info-50" minHeight="3xl" height="100">
      drawer contents
    </Box>
  </Drawer> // eslint-disable-line @typescript-eslint/no-empty-function
);

export const RightDrawer = Template.bind({});
RightDrawer.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
};

export const RightDrawerHideOverlay = Template.bind({});
RightDrawerHideOverlay.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
  hideOverlay: true,
};

export const RightDrawerCustomWidth = Template.bind({});
RightDrawerCustomWidth.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
  width: '333px',
};

export const RightDrawerTokenWidth = Template.bind({});
RightDrawerTokenWidth.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
  width: '2xl',
};

export const RightDrawerHideOverlayCustomWidth = Template.bind({});
RightDrawerHideOverlayCustomWidth.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
  hideOverlay: true,
  width: '333px',
};

export const RightDrawerHideOverlayTokenWidth = Template.bind({});
RightDrawerHideOverlayTokenWidth.args = {
  ariaLabel: 'Right Drawer',
  isOpen: true,
  hideOverlay: true,
  width: '2xl',
};

export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  placement: 'left',
};

export const LeftDrawerHideOverlay = Template.bind({});
LeftDrawerHideOverlay.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  hideOverlay: true,
  placement: 'left',
};

export const LeftDrawerCustomWidth = Template.bind({});
LeftDrawerCustomWidth.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  width: '333px',
  placement: 'left',
};

export const LeftDrawerTokenWidth = Template.bind({});
LeftDrawerTokenWidth.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  width: '2xl',
  placement: 'left',
};

export const LeftDrawerHideOverlayCustomWidth = Template.bind({});
LeftDrawerHideOverlayCustomWidth.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  hideOverlay: true,
  width: '333px',
  placement: 'left',
};

export const LeftDrawerHideOverlayTokenWidth = Template.bind({});
LeftDrawerHideOverlayTokenWidth.args = {
  ariaLabel: 'Left Drawer',
  isOpen: true,
  hideOverlay: true,
  width: '2xl',
  placement: 'left',
};

export const TopDrawer = Template.bind({});
TopDrawer.args = {
  ariaLabel: 'Top Drawer',
  isOpen: true,
  placement: 'top',
};

export const TopDrawerHideOverlay = Template.bind({});
TopDrawerHideOverlay.args = {
  ariaLabel: 'Top Drawer',
  isOpen: true,
  hideOverlay: true,
  placement: 'top',
};

export const BottomDrawer = Template.bind({});
BottomDrawer.args = {
  ariaLabel: 'Bottom Drawer',
  isOpen: true,
  placement: 'bottom',
};

export const BottomDrawerHideOverlay = Template.bind({});
BottomDrawerHideOverlay.args = {
  ariaLabel: 'Bottom Drawer',
  isOpen: true,
  hideOverlay: true,
  placement: 'bottom',
};
