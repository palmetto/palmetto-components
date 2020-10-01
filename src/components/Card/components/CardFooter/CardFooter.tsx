import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box from '../../../Box/Box';
import styles from '../../Card.module.scss';
import { DisplayType } from '../../../../lib/types';

export interface CardFooterProps {
  /**
   * Elements to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to footer container.
   */
  className?: string;
  /**
   * Display property. Only select values supported.
   */
  display?: DisplayType;
}

const CardFooter: FC<CardFooterProps> = ({
  children,
  className,
  display = 'block',
  ...restProps
}) => {
  const footerClasses = classNames(
    styles['card-footer'],
    className,
  );
  return (
    <Box
      background="grey-lightest"
      className={footerClasses}
      display={display}
      padding="md lg"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default CardFooter;
