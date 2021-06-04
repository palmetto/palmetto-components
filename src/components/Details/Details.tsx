import React from 'react';
import classNames from 'classnames';
import { DetailsSummary } from './DetailsSummary';
import styles from './Details.module.scss';
import { Box, BoxProps } from '../Box/Box';

export interface DetailsProps extends BoxProps {
  /**
   * Whether the details below the summary are opened. Directly corresponds to `open` property in <details> element.
   */
  isOpen: boolean;
}

const DetailsBaseComponent: React.FC<DetailsProps> = React.forwardRef<HTMLDetailsElement, DetailsProps>((
  {
    children,
    className,
    display = 'block',
    isOpen,
    ...restProps
  },
  ref,
) => {
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
      ref={ref}
      {...restProps}
    >
      {children}
    </Box>
  );
});

export interface DetailsStatic {
  Summary: typeof DetailsSummary;
}

export type DetailsWithStaticComponents = typeof DetailsBaseComponent & DetailsStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Details = (() => {
  const Details = DetailsBaseComponent as DetailsWithStaticComponents; // eslint-disable-line no-shadow
  Details.Summary = DetailsSummary;
  return Details;
})();
