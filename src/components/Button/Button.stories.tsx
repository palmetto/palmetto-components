import React, { ReactElement } from 'react';
import Button from './Button';
import Box from '../Box/Box';

export default {
  title: 'Components/Button/For Chromatic',
  description: 'stories for visual regression testing',
  component: Button,
};

export const Sizes: React.FC = (): ReactElement => (
  <Box childGap="md">
    <Box childGap="sm" direction="row">
      <Button size="xs" variant="primary">
        xs Primary
      </Button>
      <Button size="xs" variant="success">
        xs Success
      </Button>
      <Button size="xs" variant="danger">
        xs Danger
      </Button>
      <Button size="xs" variant="light">
        xs Light
      </Button>
      <Button size="xs" variant="dark">
        xs Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="xs" variant="primary" isOutlined>
        xs Primary
      </Button>
      <Button size="xs" variant="success" isOutlined>
        xs Success
      </Button>
      <Button size="xs" variant="danger" isOutlined>
        xs Danger
      </Button>
      <Button size="xs" variant="light" isOutlined>
        xs Light
      </Button>
      <Button size="xs" variant="dark" isOutlined>
        xs Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="sm" variant="primary">
        sm Primary
      </Button>
      <Button size="sm" variant="success">
        sm Success
      </Button>
      <Button size="sm" variant="danger">
        sm Danger
      </Button>
      <Button size="sm" variant="light">
        sm Light
      </Button>
      <Button size="sm" variant="dark">
        sm Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="sm" variant="primary" isOutlined>
        sm Primary
      </Button>
      <Button size="sm" variant="success" isOutlined>
        sm Success
      </Button>
      <Button size="sm" variant="danger" isOutlined>
        sm Danger
      </Button>
      <Button size="sm" variant="light" isOutlined>
        sm Light
      </Button>
      <Button size="sm" variant="dark" isOutlined>
        sm Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="md" variant="primary">
        md Primary
      </Button>
      <Button size="md" variant="success">
        md Success
      </Button>
      <Button size="md" variant="danger">
        md Danger
      </Button>
      <Button size="md" variant="light">
        md Light
      </Button>
      <Button size="md" variant="dark">
        md Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="md" variant="primary" isOutlined>
        md Primary
      </Button>
      <Button size="md" variant="success" isOutlined>
        md Success
      </Button>
      <Button size="md" variant="danger" isOutlined>
        md Danger
      </Button>
      <Button size="md" variant="light" isOutlined>
        md Light
      </Button>
      <Button size="md" variant="dark" isOutlined>
        md Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="lg" variant="primary">
        lg Primary
      </Button>
      <Button size="lg" variant="success">
        lg Success
      </Button>
      <Button size="lg" variant="danger">
        lg Danger
      </Button>
      <Button size="lg" variant="light">
        lg Light
      </Button>
      <Button size="lg" variant="dark">
        lg Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="lg" variant="primary" isOutlined>
        lg Primary
      </Button>
      <Button size="lg" variant="success" isOutlined>
        lg Success
      </Button>
      <Button size="lg" variant="danger" isOutlined>
        lg Danger
      </Button>
      <Button size="lg" variant="light" isOutlined>
        lg Light
      </Button>
      <Button size="lg" variant="dark" isOutlined>
        lg Dark
      </Button>
    </Box>
  </Box>
);

export const Loading: React.FC = (): ReactElement => (
  <Box childGap="md">
    <Box childGap="sm" direction="row">
      <Button size="sm" isLoading isOutlined>
        Sign In
      </Button>
      <Button size="sm" isLoading variant="success">
        Sign In
      </Button>
      <Button size="sm" isLoading variant="danger">
        Sign In
      </Button>
      <Button size="sm" isLoading variant="light">
        Sign In
      </Button>
      <Button size="sm" isLoading variant="dark">
        Sign In
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button isLoading isOutlined>
        Sign In
      </Button>
      <Button isLoading variant="success">
        Sign In
      </Button>
      <Button isLoading variant="danger">
        Sign In
      </Button>
      <Button isLoading variant="light">
        Sign In
      </Button>
      <Button isLoading variant="dark">
        Sign In
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button size="lg" isLoading isOutlined>
        Sign In
      </Button>
      <Button size="lg" isLoading variant="success">
        Sign In
      </Button>
      <Button size="lg" isLoading variant="danger">
        Sign In
      </Button>
      <Button size="lg" isLoading variant="light">
        Sign In
      </Button>
      <Button size="lg" isLoading variant="dark">
        Sign In
      </Button>
    </Box>
    <Button isLoading>
      Button with a really long name. Width will not decrease when loading indicator is rendered.
    </Button>
    <Button fullWidth isLoading>
      Full Width Loading Button
    </Button>
  </Box>
);

export const Disabled: React.FC = (): ReactElement => (
  <Box childGap="md">
    <Box childGap="sm" direction="row">
      <Button isDisabled variant="primary">
        Primary
      </Button>
      <Button isDisabled variant="success">
        Success
      </Button>
      <Button isDisabled variant="danger">
        Danger
      </Button>
      <Button isDisabled variant="light">
        Light
      </Button>
      <Button isDisabled variant="dark">
        Dark
      </Button>
    </Box>
    <Box childGap="sm" direction="row">
      <Button isDisabled variant="primary" isOutlined>
        Primary
      </Button>
      <Button isDisabled variant="success" isOutlined>
        Success
      </Button>
      <Button isDisabled variant="danger" isOutlined>
        Danger
      </Button>
      <Button isDisabled variant="light" isOutlined>
        Light
      </Button>
      <Button isDisabled variant="dark" isOutlined>
        Dark
      </Button>
    </Box>
    <div style={{ marginBottom: '1rem' }}>
      <Button fullWidth isDisabled>
        Disabled Full Width Button
      </Button>
    </div>
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
