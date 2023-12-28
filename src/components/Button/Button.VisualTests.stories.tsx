import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@storybook/testing-library';
import { Button, ButtonProps } from './Button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/Button/Visual Regression Tests',
  component: Button,
} as Meta;

const Template: Story<ButtonProps & { showIconButton: boolean; }> = (args, showIconButton) => (
  <Box gap="xl">
    {BUTTON_SIZES.map(size => (
      <Box gap="sm" key={size}>
        <Box gap="sm" direction="row" alignItems="flex-start">
          {BUTTON_VARIANTS.map(variant => (
            <Button {...args} size={size} variant={variant} key={`${size}-${variant}`}>
              {`${size} ${variant}`}
            </Button>
          ))}
          {showIconButton && (
            <Button
              {...args}
              iconPrefix="circle"
              iconSuffix="property-agreement"
              size={size}
              variant="primary"
              key={`${size}-icon`}
            >
              {`${size} icon`}
            </Button>
          )}
        </Box>
        <Box gap="sm" direction="row" alignItems="flex-start" key={size}>
          {BUTTON_VARIANTS.map(variant => (
            <Button
              {...args}
              size={size}
              variant={variant}
              isOutlined
              key={`${size}-${variant}-outline`}
            >
              {`${size} ${variant}`}
            </Button>
          ))}
          {showIconButton && (
            <Button
              {...args}
              iconPrefix="circle"
              iconSuffix="property-agreement"
              size={size}
              isOutlined
              variant="primary"
              key={`${size}-icon`}
            >
              {`${size} icon`}
            </Button>
          )}
        </Box>
      </Box>
    ))}
    <Box gap="sm">
      <Button {...args}>Full Width</Button>
      <Button {...args} fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

const SingleButtonTemplate: Story<ButtonProps> = args => (
  // the div is to add padding so that chromatic captures the box-shadow focus state
  <div className="p-md">
    <Button {...args}>label</Button>
  </div>
);

export const Sizes = Template.bind({});
Sizes.args = { showIconButton: true };
Sizes.parameters = RESPONSIVE_STORY;

export const Loading = Template.bind({});
Loading.args = { isLoading: true, showIconButton: true };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, showIconButton: true };

export const WithIcons = Template.bind({});
WithIcons.args = { iconPrefix: 'mail', iconSuffix: 'chat' };

export const PrimaryFocus = SingleButtonTemplate.bind({});

PrimaryFocus.play = async ({ canvasElement }) => {
  // Starts querying the component from its root
  const canvas = within(canvasElement);

  // Looks up the button and interacts with it.
  canvas.getByRole('button').focus();
};

export const SuccessFocus = SingleButtonTemplate.bind({});
SuccessFocus.args = { variant: 'success' };

SuccessFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const DangerFocus = SingleButtonTemplate.bind({});
DangerFocus.args = { variant: 'danger' };

DangerFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const LightFocus = SingleButtonTemplate.bind({});
LightFocus.args = { variant: 'light' };

LightFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const DarkFocus = SingleButtonTemplate.bind({});
DarkFocus.args = { variant: 'dark' };

DarkFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const WhiteFocus = SingleButtonTemplate.bind({});
WhiteFocus.args = { variant: 'white' };

WhiteFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const PrimaryOutlinedFocus = SingleButtonTemplate.bind({});
PrimaryOutlinedFocus.args = { isOutlined: true };

PrimaryOutlinedFocus.play = async ({ canvasElement }) => {
  // Starts querying the component from its root
  const canvas = within(canvasElement);

  // Looks up the button and interacts with it.
  canvas.getByRole('button').focus();
};

export const SuccessOutlinedFocus = SingleButtonTemplate.bind({});
SuccessOutlinedFocus.args = { variant: 'success', isOutlined: true };

SuccessOutlinedFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const DangerOutlinedFocus = SingleButtonTemplate.bind({});
DangerOutlinedFocus.args = { variant: 'danger', isOutlined: true };

DangerOutlinedFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const LightOutlinedFocus = SingleButtonTemplate.bind({});
LightOutlinedFocus.args = { variant: 'light', isOutlined: true };

LightOutlinedFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const DarkOutlinedFocus = SingleButtonTemplate.bind({});
DarkOutlinedFocus.args = { variant: 'dark', isOutlined: true };

DarkOutlinedFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const WhiteOutlinedFocus = SingleButtonTemplate.bind({});
WhiteOutlinedFocus.args = { variant: 'white', isOutlined: true };

WhiteOutlinedFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};
