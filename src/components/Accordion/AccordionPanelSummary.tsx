import React from 'react';
import { Icon } from '../Icon/Icon';
import { DetailsSummary, DetailsSummaryProps } from '../Details/DetailsSummary';
import { Box } from '../Box/Box';

export interface AccordionPanelSummaryProps extends DetailsSummaryProps {
  hasCaret?: 'left' | 'right' | false;
}

export const AccordionPanelSummary: React.FC<AccordionPanelSummaryProps> = ({
  children,
  onToggle,
  padding = 'md',
  fontWeight = 'bold',
  hasCaret = 'right',
  isDetailsOpen,
  ...restProps
}) => (
  <DetailsSummary
    fontWeight={fontWeight}
    padding={padding}
    isDetailsOpen={isDetailsOpen}
    onToggle={onToggle}
    {...restProps}
  >
    <Box direction="row" childGap="sm">
      {hasCaret === 'left' && (
        <Box>
          <Icon name={isDetailsOpen ? 'caret-sm-down' : 'caret-sm-right'} color="grey-500" />
        </Box>
      )}
      {children}
      {hasCaret === 'right' && (
        <Box margin="0 0 0 auto">
          <Icon name={isDetailsOpen ? 'caret-sm-up' : 'caret-sm-down'} color="grey-500" />
        </Box>
      )}
    </Box>
  </DetailsSummary>
);
