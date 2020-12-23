import React, { ReactElement } from 'react';
import Button from './Button';
import Box from '../Box/Box';

export default {
  title: 'Components/Button/For Chromatic',
  description: 'stories for visual regression testing',
  component: Button,
};

const buttonVariants = ['primary', 'success', 'danger', 'light', 'dark'] as const;
const buttonSizes = ['xs', 'sm', 'md', 'lg'] as const;

export const Sizes: React.FC = (): ReactElement => (
  <Box childGap="xl">
    {buttonSizes.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {buttonVariants.map(variant => (
            <Button size={size} variant={variant} key={`${size}-${variant}`}>
              {`${size} ${variant}`}
            </Button>
          ))}
        </Box>
        <Box childGap="sm" direction="row" key={size}>
          {buttonVariants.map(variant => (
            <Button size={size} variant={variant} isOutlined key={`${size}-${variant}-outline`}>
              {`${size} ${variant}`}
            </Button>
          ))}
        </Box>
      </Box>
    ))}
    <Box childGap="sm">
      <Button>Full Width</Button>
      <Button fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

export const Loading: React.FC = (): ReactElement => (
  <Box childGap="xl">
    {buttonSizes.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {buttonVariants.map(variant => (
            <Button isLoading size={size} variant={variant} key={`${size}-${variant}`}>
              {`${size} ${variant}`}
            </Button>
          ))}
        </Box>
        <Box childGap="sm" direction="row" key={size}>
          {buttonVariants.map(variant => (
            <Button
              isLoading
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
      <Button isLoading>Full Width</Button>
      <Button isLoading fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

export const Disabled: React.FC = (): ReactElement => (
  <Box childGap="xl">
    {buttonSizes.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {buttonVariants.map(variant => (
            <Button isDisabled size={size} variant={variant} key={`${size}-${variant}`}>
              {`${size} ${variant}`}
            </Button>
          ))}
        </Box>
        <Box childGap="sm" direction="row" key={size}>
          {buttonVariants.map(variant => (
            <Button
              isDisabled
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
      <Button isDisabled>Full Width</Button>
      <Button isDisabled fullWidth isOutlined>
        Full Width Outline
      </Button>
    </Box>
  </Box>
);

export const WithIcons: React.FC = (): ReactElement => (
  <Box childGap="md" display="block">
    <Box direction="row" childGap="md">
      <Button variant="primary" iconPrefix="mail">
        Email
      </Button>
      <Button variant="primary" isOutlined iconSuffix="chat">
        Chat Now
      </Button>
    </Box>
    <Box direction="row" childGap="md">
      <Button variant="light" iconPrefix="caret-left">
        back
      </Button>
      <Button variant="light" iconSuffix="caret-right">
        next
      </Button>
    </Box>
    <Box direction="row" childGap="md">
      <Button size="sm" variant="light" iconPrefix="caret-left">
        back
      </Button>
      <Button size="sm" variant="light" iconSuffix="caret-right">
        next
      </Button>
    </Box>
    <Box direction="row" childGap="md">
      <Button size="xs" variant="light" iconPrefix="caret-left">
        back
      </Button>
      <Button size="xs" variant="light" iconSuffix="caret-right">
        next
      </Button>
    </Box>
    <Box>
      <Button fullWidth variant="primary" iconPrefix="check">
        check
      </Button>
    </Box>
    <Box>
      <Button fullWidth variant="primary" isOutlined iconSuffix="check">
        check
      </Button>
    </Box>
  </Box>
);
