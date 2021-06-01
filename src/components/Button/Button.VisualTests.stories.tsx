import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants';
import { Box } from '../Box/Box';

export default {
  title: 'Components/Button/Visual Regression Tests',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args, showIconButton) => (
  <Box childGap="xl">
    {BUTTON_SIZES.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
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
        <Box childGap="sm" direction="row" key={size}>
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
    <Box childGap="sm">
      <Button {...args}>Full Width</Button>
      <Button {...args} fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

export const Sizes = Template.bind({});
Sizes.args = { showIconButton: true };

export const Loading = Template.bind({});
Loading.args = { isLoading: true, showIconButton: true };

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, showIconButton: true };

export const WithIcons = Template.bind({});
WithIcons.args = { iconPrefix: 'mail', iconSuffix: 'chat' };
