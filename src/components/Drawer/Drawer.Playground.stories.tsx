import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Drawer, DrawerProps, DRAWER_PLACEMENT } from './Drawer';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';

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
    width: {
      control: 'text',
    },
    children: {
      table: {
        disable: true,
      },
    },
    isOpen: {
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
  const [show, setShow] = React.useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button variant="light" onClick={open}>
        Show Drawer
      </Button>
      <Drawer {...args} isOpen={show} onDismiss={close}>
        <Button variant="light" onClick={close}>
          Close
        </Button>
        <Box>drawer content</Box>
      </Drawer>
    </>
  );
};

export const Playground = Template.bind({});
