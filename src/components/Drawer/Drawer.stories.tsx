import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Drawer } from './Drawer';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
  },
} as Meta;

export const WithCustomPortalTarget: Story = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <Box display="block" height="500px" id="myContainer" ref={ref}>
      <Button variant="light" onClick={() => setShowDrawer(true)}>
        Show Drawer
      </Button>
      <Drawer isOpen={showDrawer} onDismiss={() => setShowDrawer(false)} containerRef={ref}>
        This drawer is rendered inside it&apos;s containing div, rather than the document.body
      </Drawer>
    </Box>
  );
};
