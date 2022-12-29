import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Drawer, DrawerProps, DrawerPlacementType } from './Drawer';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { useDisclosure } from '../../hooks/useDisclosure/useDisclosure';

const DRAWER_PLACEMENT: DrawerPlacementType[] = [
  'right',
  'left',
  'top',
  'bottom',
];

export default {
  title: 'Components/Drawer/Playground',
  component: Drawer,
  argTypes: {
    allowPinchZoom: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
    ariaLabelledBy: {
      control: 'text',
    },
    closeButton: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
    hideOverlay: {
      control: 'boolean',
    },
    dangerouslyBypassFocusLock: {
      control: 'boolean',
    },
    dangerouslyBypassScrollLock: {
      control: 'boolean',
    },
    placement: {
      control: {
        type: 'select',
        options: DRAWER_PLACEMENT,
      },
    },
    title: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    children: {
      table: {
        disable: true,
      },
    },
    containerRef: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
    initialFocusRef: {
      table: {
        disable: true,
      },
    },
    onDismiss: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<DrawerProps> = ({ ...args }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  return (
    <>
      <Button variant="light" onClick={onDrawerOpen}>
        Show Drawer
      </Button>
      <Drawer {...args} isOpen={isDrawerOpen} onDismiss={onDrawerClose}>
        <Box padding="lg">drawer content</Box>
      </Drawer>
    </>
  );
};

export const Playground = Template.bind({});
Playground.args = {
  title: 'Drawer Title',
  ariaLabel: 'drawer component example',
};
