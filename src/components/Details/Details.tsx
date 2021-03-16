import React, { MouseEvent } from 'react';
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
  /**
   * Determines whether our component resets the standard HTML style of the details/summary elements. Set to `true` by default
   * since in most cases we will not want to use the default styling.
   */
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