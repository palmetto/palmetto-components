import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Vimeo } from 'mdx-embed';
import { MediaModal, MediaModalProps } from './MediaModal';
import { Box } from '../Box/Box';

export default {
  title: 'Components/MediaModal/Visual Regression Tests',
  component: MediaModal,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [350, 700, 1012, 1300] },
  },
};

const Template: Story<MediaModalProps> = ({ ...args }) => (
  <MediaModal {...args} /> // eslint-disable-line @typescript-eslint/no-empty-function
);

export const LandscapeImage = Template.bind({});
LandscapeImage.args = {
  ariaLabel: 'test MediaModal',
  isOpen: true,
  children: <img src="/images/landscape-mediamodal.jpg" alt="landscape test" />,
};

export const TitleDescriptionPortraitImage = Template.bind({});
TitleDescriptionPortraitImage.args = {
  isOpen: true,
  children: (
    <img
      src="images/portrait-mediamodal.jpg"
      alt="portrait"
      style={{
        objectFit: 'contain',
        height: 'calc(100vh - var(--size-height-2xl))',
        width: 'auto',
      }}
    />
  ),
  title: 'portrait-mediamodal.jpg',
  description: 'Site Survey - Roof',
};

export const PortraitImageFooter = Template.bind({});
PortraitImageFooter.args = {
  ariaLabel: 'test MediaModal',
  isOpen: true,
  children: <img src="/images/landscape-mediamodal.jpg" alt="landscape test" />,
  footerContent: 'footer content',
};

export const PortraitImageTitleDescriptionFooter = Template.bind({});
PortraitImageTitleDescriptionFooter.args = {
  isOpen: true,
  children: <img src="/images/landscape-mediamodal.jpg" alt="landscape test" />,
  footerContent: 'footer content',
  title: 'title content',
  description: 'description content',
};

export const VimeoVideo = Template.bind({});
VimeoVideo.args = {
  ariaLabel: 'test MediaModal',
  isOpen: true,
  children: (
    <Box display="block" width="90vw" maxWidth="5xl">
      <Vimeo vimeoId="595469877" />
    </Box>
  ),
};
