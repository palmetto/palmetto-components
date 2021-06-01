import React from 'react';
import classNames from 'classnames';
// import * as UtilitySystem from '../UtilitySystem/helpers';
import { DetailsSummary } from './DetailsSummary';
import styles from './Details.module.scss';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsProps extends BoxProps {
  /**
   * Whether the details below the summary are opened. Directly corresponds to `open` property in <detail> element.
   */
  isOpen: boolean;
}

export class Details extends React.Component<DetailsProps> {
  static Summary = DetailsSummary;

  render(): React.ReactNode {
    const {
      children,
      className,
      display = 'block',
      isOpen,
      ...restProps
    } = this.props;

    const detailsClasses = classNames(
      className,
      styles['details-reset'],
      styles.details,
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
