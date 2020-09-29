import React, { FC } from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../../../Box/Box';
import styles from '../../Card.module.scss';

const CardFooter: FC<BoxProps> = ({
  background = 'grey-lightest',
  children,
  className,
  padding = 'lg',
  ...restProps
}) => {
  const footerClasses = classNames(
    styles['card-footer'],
    className,
  );
  return (
    <Box
      background={background}
      className={footerClasses}
      padding={padding}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default CardFooter;
