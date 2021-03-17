import React from 'react';
import { filter } from '../../lib/react-children-utilities';
import { Box, BoxProps } from '../Box/Box';


export interface TabPanelsProps extends BoxProps {
  value: number;
}

export class TabPanels extends React.Component<TabPanelsProps> {
  render(): React.ReactNode {
    const {
      children,
      value,
    } = this.props;

    const filteredChildren = filter(children, (child, index) => index === value);

    return (
      <Box>
        {filteredChildren}
      </Box>
    )
  }
}