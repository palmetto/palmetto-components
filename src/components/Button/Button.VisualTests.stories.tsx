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

const Template: Story<ButtonProps & { showIconButton: boolean }> = (
  args,
  showIconButton,
) => (
  <Box childGap="xl">
    {BUTTON_SIZES.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row" alignItems="flex-start">
          {BUTTON_VARIANTS.map(variant => (
            <Button
              {...args}
              size={size}
              variant={variant}
              key={`${size}-${variant}`}
            >
              {`${size} ${variant}`}
            </Button>
          ))}
          {showIconButton && (
            <Button
              {...args}
              iconPrefix="add"
              iconSuffix="property-agreement"
              size={size}
              variant="primary"
              key={`${size}-icon`}
            >
              {`${size} icon`}
            </Button>
          )}
        </Box>
      </Box>
    ))}
    <Box childGap="sm">
      <Button {...args}>Full Width</Button>
    </Box>
  </Box>
);

// const SingleButtonTemplate: Story<ButtonProps> = args => (
//   // the div is to add padding so that chromatic captures the box-shadow focus state
//   <div className="p-md">
//     <Button {...args}>label</Button>
//   </div>
// );

export const Sizes = Template.bind({});
Sizes.args = { showIconButton: true };
Sizes.parameters = RESPONSIVE_STORY;

export const Loading = Template.bind({});
Loading.args = { isLoading: true, showIconButton: true };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, showIconButton: true };

export const WithIcons = Template.bind({});
WithIcons.args = { iconPrefix: 'mail', iconSuffix: 'chat' };

// export const PrimaryFocus = SingleButtonTemplate.bind({});

// PrimaryFocus.play = async ({ canvasElement }) => {
//   // Starts querying the component from its root
//   const canvas = within(canvasElement);

//   // Looks up the button and interacts with it.
//   canvas.getByRole('button').focus();
// };

// export const SuccessFocus = SingleButtonTemplate.bind({});
// SuccessFocus.args = { variant: 'success' };

// SuccessFocus.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   canvas.getByRole('button').focus();
// };

// export const DangerFocus = SingleButtonTemplate.bind({});
// DangerFocus.args = { variant: 'danger' };

// DangerFocus.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   canvas.getByRole('button').focus();
// };

// export const LightFocus = SingleButtonTemplate.bind({});
// LightFocus.args = { variant: 'light' };

// LightFocus.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   canvas.getByRole('button').focus();
// };

// export const DarkFocus = SingleButtonTemplate.bind({});
// DarkFocus.args = { variant: 'dark' };

// DarkFocus.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   canvas.getByRole('button').focus();
// };

// export const WhiteFocus = SingleButtonTemplate.bind({});
// WhiteFocus.args = { variant: 'white' };

// WhiteFocus.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   canvas.getByRole('button').focus();
// };
