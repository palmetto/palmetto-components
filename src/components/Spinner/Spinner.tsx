import React, { FC } from 'react';
import classNames from 'classnames';
import { BRAND_COLORS } from '../../lib/tokens';
import { ColorName } from '../../types';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Custom className to be applied to spinner container div element.
   */
  className?: string;
  /**
   * Spinner variant (color), pass down one of the options from the Palmetto 'brand' palette.
   */
  variant?: ColorName;
  /**
   * Size of the spinner.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Spinner: FC<SpinnerProps> = ({ variant = 'dark', className, size = 'md' }) => {
  const classes = classNames(className, styles.spinner, `font-color-${variant}`);

  const sizeInPixels = () => {
    let pixels;
    if (size === 'sm') pixels = '12';
    if (size === 'md') pixels = '16';
    if (size === 'lg') pixels = '24';
    if (size === 'xl') pixels = '30';

    return pixels;
  };

  return (
    <span className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={sizeInPixels()}
        height={sizeInPixels()}
        viewBox="0 0 16 16"
        data-testid="spinner-testid"
      >
        <title>circle</title>
        <g fill={`${BRAND_COLORS[variant].base.value}`}>
          <path
            fill={`${BRAND_COLORS[variant].base.value}`}
            d="M8,16c-1.199,0-2.352-0.259-3.428-0.77l0.857-1.807C6.235,13.806,7.1,14,8,14c3.309,0,6-2.691,6-6 s-2.691-6-6-6S2,4.691,2,8c0,0.901,0.194,1.766,0.578,2.572l-1.806,0.859C0.26,10.354,0,9.2,0,8c0-4.411,3.589-8,8-8s8,3.589,8,8 S12.411,16,8,16z" /* eslint-disable-line max-len */
          />
        </g>
      </svg>
    </span>
  );
};

export default Spinner;
