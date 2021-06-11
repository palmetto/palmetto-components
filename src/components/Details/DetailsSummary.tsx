import React, { MouseEvent, KeyboardEvent } from 'react';
import * as KEYS from '../../constants/keyCodes';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsSummaryProps extends BoxProps {
  isDetailsOpen: boolean;
  onToggle?: () => void;
}

export const DetailsSummary: React.FC<DetailsSummaryProps> = ({
  children,
  display = 'block',
  isDetailsOpen,
  onToggle,
  ...restProps
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!onToggle) return;

    onToggle();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ([KEYS.ENTER, KEYS.SPACE].indexOf(event.keyCode) !== -1) {
      event.preventDefault();
      if (!onToggle) return;

      onToggle();
    }
  };

  return (
    <Box
      as="summary"
      display={display}
      role="button"
      aria-expanded={isDetailsOpen}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
    </Box>
  );
};
