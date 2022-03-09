import React, { ReactNode } from 'react';
import { Vimeo } from 'mdx-embed';
import { MediaModal } from './MediaModal';
import { Box } from '../Box/Box';

export default {
  title: 'Components/MediaModal/Visual Regression Tests',
  component: MediaModal,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [350, 700, 1012, 1300] },
  },
};

export const LandscapeImage = (): ReactNode => (
  <MediaModal ariaLabelledBy="title" isOpen onDismiss={() => null}>
    <img src="images/wes-hicks-6rNitHsIU3c-unsplash.jpg" alt="" />
  </MediaModal>
);

export const PortraitImage = (): ReactNode => (
  <MediaModal ariaLabelledBy="title" isOpen onDismiss={() => null}>
    <img
      src="images/clement-duguerre-HP0En6B1Db8-unsplash.jpg"
      alt=""
      className="h-100"
      style={{ objectFit: 'contain' }}
    />
  </MediaModal>
);

export const VimeoVideo = (): ReactNode => (
  <MediaModal ariaLabelledBy="title" isOpen onDismiss={() => null}>
    <Box display="block" maxWidth="5xl" width="100">
      <Vimeo vimeoId="595469877" />
    </Box>
  </MediaModal>
);
