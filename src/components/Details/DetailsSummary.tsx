import React, { MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import * as KEYS from '../../constants/keyCodes';
import styles from './DetailsSummary.module.scss';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsSummaryProps extends BoxProps {
  className: string;
  children: React.ReactNode;
  isDetailsOpen: boolean;
  onToggle: () => void;
}

export const DetailsSummary: React.FC<DetailsSummaryProps> = ({
  className,
  children,
  display = 'block',
  id,
  isDetailsOpen,
  onToggle,
}) => {
  const classes = classNames(className, styles['details-summary']);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    console.log('clicked');
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
      className={classes}
      display={display}
      id={id}
      role="button"
      aria-expanded={isDetailsOpen}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Box>
  );
}