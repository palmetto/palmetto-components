import React, { MouseEvent, KeyboardEvent } from 'react';
import { ENTER, SPACE } from '../../constants/keyCodes';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsSummaryProps extends BoxProps {
  isDetailsOpen: boolean;
  onToggle?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}

export const DetailsSummary: React.FC<DetailsSummaryProps> = ({
  children,
  display = 'block',
  isDetailsOpen,
  onToggle,
  ...restProps
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    // Needed to avoid default `details` behavior on a click event and keep this as controlled component.
    event.preventDefault();

    if (!onToggle && !restProps?.onClick) return;

    if (onToggle) {
      onToggle(event);
    }

    if (restProps?.onClick) {
      restProps.onClick(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ([ENTER, SPACE].indexOf(event.keyCode) !== -1) {
      // Needed to avoid default `details` behavior on a click event and keep this as controlled component.
      event.preventDefault();
    }

    if (!onToggle && !restProps?.onKeyDown) return;

    if (onToggle && [ENTER, SPACE].indexOf(event.keyCode) !== -1) {
      onToggle(event);
    }

    if (restProps?.onKeyDown) {
      restProps.onKeyDown(event);
    }
  };

  return (
    <Box
      {...restProps}
      as="summary"
      display={display}
      role="button"
      aria-expanded={isDetailsOpen}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Box>
  );
};
