import React from 'react';
import { IconName } from '../../types';
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
}) => {
  const getSummaryIcon = () => {
    if (hasCaret === 'left') {
      return isDetailsOpen ? 'caret-sm-down' : 'caret-sm-right';
    }

    if (hasCaret === 'right') {
      return isDetailsOpen ? 'caret-sm-up' : 'caret-sm-down';
    }

    return '';
  };

  return (
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
            <Icon name={getSummaryIcon() as IconName} color="grey-500" />
          </Box>
        )}
        {children}
        {hasCaret === 'right' && (
          <Box margin="0 0 0 auto">
            <Icon name={getSummaryIcon() as IconName} color="grey-500" />
          </Box>
        )}
      </Box>
    </DetailsSummary>
  );
};
