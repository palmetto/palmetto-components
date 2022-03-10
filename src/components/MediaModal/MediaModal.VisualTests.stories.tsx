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
  <MediaModal isOpen onDismiss={() => null}>
    <img src="images/wes-hicks-6rNitHsIU3c-unsplash.jpg" alt="" />
  </MediaModal>
);

export const FooterLandscapeImage = (): ReactNode => (
  <MediaModal isOpen onDismiss={() => null} footerContent="footer contents">
    <img src="images/wes-hicks-6rNitHsIU3c-unsplash.jpg" alt="" />
  </MediaModal>
);

export const TitleDescriptionPortraitImage = (): ReactNode => (
  <MediaModal
    title="clement-duguerre-HP0En6B1Db8-unsplash.jpg"
    description="Site Survey - Roof"
    isOpen
    onDismiss={() => null}
  >
    <img
      src="images/clement-duguerre-HP0En6B1Db8-unsplash.jpg"
      alt=""
      style={{
        objectFit: 'contain',
        height: 'calc(100vh - var(--size-height-2xl))',
        width: 'auto',
      }}
    />
  </MediaModal>
);

export const VimeoVideo = (): ReactNode => (
  <MediaModal isOpen onDismiss={() => null}>
    <Box display="block" width="90vw" maxWidth="5xl">
      <Vimeo vimeoId="595469877" />
    </Box>
  </MediaModal>
);
