import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { Button } from '../Button/Button';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  isDisabled = false,
  padding = 'md',
  style,
  ...restProps
}) => {
  const styles = {
    ...style,
    cursor: !isDisabled ? 'pointer' : 'not-allowed',
  };

  return (
    <Box as="li" padding={padding} style={{ ...styles }} role="presentation" {...restProps}>
      <Button isNaked isDisabled={isDisabled} style={{ whiteSpace: 'nowrap' }}>
        {children}
      </Button>
    </Box>
  );
}