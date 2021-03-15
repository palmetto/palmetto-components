import React, { MouseEvent } from 'react';
import classNames from 'classnames';
// import * as UtilitySystem from '../UtilitySystem/helpers';
import { DetailsSummary } from './DetailsSummary';
import styles from './Details.module.scss';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsProps extends BoxProps {
  isOpen: boolean;
  reset?: boolean;
};

export class Details extends React.Component<DetailsProps> {
  static Summary = DetailsSummary;

  render() {
    const {
      children,
      className,
      display = 'block',
      isOpen,
      reset = true,
      ...restProps
    } = this.props;

    const detailsClasses = classNames(
      className,
      { [styles['details-reset']]: reset },
      styles['details']
    );

    return (
      <Box
        as="details"
        className={detailsClasses}
        display={display}
        open={isOpen}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
}