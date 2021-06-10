import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
  /**
   * NOTE: This prop is locked to whatever value is passed in from the `size` prop in `TabsSlider` component.
   */
  padding?: BoxProps['padding'];
  /**
   * NOTE: This prop is locked to a value  of 'li' and will not be passed down to the underlying Box
   */
  as?: BoxProps['as'];
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  isDisabled = false,
  style,
  padding,
  ...restProps
}) => {
  const styles = {
    ...style,
    cursor: !isDisabled ? 'pointer' : 'not-allowed',
  };

  return (
    <Box style={{ ...styles }} role="tab" {...restProps} padding="0">
      <Box
        as="button"
        disabled={isDisabled}
        style={{
          background: 'transparent',
          whiteSpace: 'nowrap',
        }}
        borderWidth="0"
        color={isDisabled ? 'grey-300' : 'grey-400'}
        direction="row"
        justifyContent="center"
        alignItems="center"
        padding={padding}
      >
        {children}
      </Box>
    </Box>
  );
};
