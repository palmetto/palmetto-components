import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './Button';
import Box from '../Box/Box';

export default {
  title: 'Components/Button/For Chromatic',
  component: Button,
} as Meta;

const buttonVariants = ['primary', 'success', 'danger', 'light', 'dark'] as const;
const buttonSizes = ['xs', 'sm', 'md', 'lg'] as const;

const Template: Story<ButtonProps> = args => (
  <Box childGap="xl">
    {buttonSizes.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {buttonVariants.map(variant => (
            <Button {...args} size={size} variant={variant} key={`${size}-${variant}`}>
              {`${size} ${variant}`}
            </Button>
          ))}
        </Box>
        <Box childGap="sm" direction="row" key={size}>
          {buttonVariants.map(variant => (
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
        </Box>
      </Box>
    ))}
    <Box childGap="sm">
      <Button {...args}>Full Width</Button>
      <Button {...args} fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

export const Sizes = Template.bind({});

export const Loading = Template.bind({});
Loading.args = { isLoading: true };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true };

export const WithIcons = Template.bind({});
WithIcons.args = { iconPrefix: 'mail', iconSuffix: 'chat' };
