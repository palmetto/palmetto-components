import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@testing-library/react';
import { Button, ButtonProps } from './Button';
import { BUTTON_SIZES, BUTTON_TONE, BUTTON_VARIANTS } from './Button.constants';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/Button/Visual Regression Tests',
  component: Button,
} as Meta;

const Template: Story<ButtonProps & { showIconButton: boolean; }> = (
  args,
  showIconButton,
) => (
  <Box gap="xl">
    {BUTTON_TONE.map(tone => BUTTON_VARIANTS.map(variant => (
      <Box gap="sm" key={variant}>
        <Box gap="sm" direction="row" alignItems="flex-start">
          {BUTTON_SIZES.map(size => (
            <Button
              {...args}
              size={size}
              tone={tone}
              variant={variant}
              key={`${size}-${variant}-${tone}`}
            >
              {`${size} ${variant} ${tone}`}
            </Button>
          ))}
          {showIconButton && (
          <Button
            {...args}
            iconPrefix="add"
            iconSuffix="property-agreement"
            variant={variant}
            tone={tone}
            key={`${variant}-icon`}
          >
            {`${variant} ${tone} icon`}
          </Button>
          )}
        </Box>
      </Box>
    )))}
    <Box gap="sm">
      <Button {...args} size="sm" tone="neutral">
        sm full width
      </Button>
      <Button {...args} size="md" tone="neutral">
        md full width
      </Button>
      <Button {...args} size="lg" tone="neutral">
        lg full width
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
WithIcons.args = {
  iconPrefix: 'add',
  iconSuffix: 'property-agreement',
  showIconButton: false,
};

export const SecondaryFocus = SingleButtonTemplate.bind({});
SecondaryFocus.args = { variant: 'secondary' };
SecondaryFocus.play = async ({ canvasElement }) => {
  // Starts querying the component from its root
  const canvas = within(canvasElement);

  // Looks up the button and interacts with it.
  canvas.getByRole('button').focus();
};

export const PrimaryFocus = SingleButtonTemplate.bind({});
PrimaryFocus.args = { variant: 'primary' };

PrimaryFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const DangerFocus = SingleButtonTemplate.bind({});
DangerFocus.args = { tone: 'danger' };

DangerFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};

export const TertiaryFocus = SingleButtonTemplate.bind({});
TertiaryFocus.args = { variant: 'tertiary' };

TertiaryFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('button').focus();
};
