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
  hasCaret = 'left',
  isDetailsOpen,
  ...restProps
}) => {
  const getSummaryIcon = () => {
    if (hasCaret === 'left') {
      return isDetailsOpen ? 'caret-down' : 'caret-right';
    }

    if (hasCaret === 'right') {
      return isDetailsOpen ? 'caret-up' : 'caret-down';
    }

    return '';
  };

  return (
    <DetailsSummary isDetailsOpen={isDetailsOpen} onToggle={onToggle} {...restProps}>
      <Box direction="row" borderWidth="0 0 xs 0" borderColor="grey-100" padding="sm">
        {hasCaret === 'left' && (
          <Box margin="0 sm 0 0">
            <Icon name={getSummaryIcon() as IconName} />
          </Box>
        )}
        {children}
        {hasCaret === 'right' && (
          <Box margin="0 0 0 auto">
            <Icon name={getSummaryIcon() as IconName} />
          </Box>
        )}
      </Box>
    </DetailsSummary>
  );
};
