import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './HelpText.module.scss';

export interface HelpTextProps {
  /**
   * Contents of the help text.
   */
  children?: React.ReactNode;
  /**
   * Additional class names to add.
   */
  className?: string;
}

export const HelpText = forwardRef<HTMLDivElement, HelpTextProps>(
  ({ children, className }, ref) => (
    <Box
      ref={ref}
      className={classNames(
        'palmetto-components__variables__form-control',
        styles['help-text'],
        className,
      )}
      display="block"
    >
      {children}
    </Box>
  ),
);
