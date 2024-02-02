import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { ResponsiveProp } from '../../types';
import styles from './CategoryFilter.module.scss';

export type BaseCategoryFilterSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CategoryFilterProps extends BoxProps {
  isSelected: boolean;
  isDisabled?: boolean;
  size?: BaseCategoryFilterSize | ResponsiveProp<BaseCategoryFilterSize>;
}

type ResponsiveCategoryFilterProps = {
  fontSize: BoxProps['fontSize'];
  padding: BoxProps['padding'];
  gap: BoxProps['gap'];
}

const propSizeMap: { [key in BaseCategoryFilterSize]: ResponsiveCategoryFilterProps} = {
  xs: {
    fontSize: 'xs',
    padding: '2xs xs',
    gap: '2xs',
  },
  sm: {
    fontSize: 'sm',
    padding: '2xs xs',
    gap: '2xs',
  },
  md: {
    fontSize: 'md',
    padding: 'sm md',
    gap: 'xs',
  },
  lg: {
    fontSize: 'lg',
    padding: 'sm md',
    gap: 'xs',
  },
};

/**
 * Convert BaseCategoryFilterSize (xs | sm | md | lg) to their corresponding values on a per prop basis.
 *
 * @param size size prop passed down to component
 * @param prop Property map to use to map each breakpoint value.
 * @returns A mapping of responsive prop objects to their corresponding values per prop
 */
export const computedResponsiveSize = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  size: CategoryFilterProps['size'],
  prop: 'fontSize' | 'padding' | 'gap',
) => {
  if (size && !(typeof size === 'string') && typeof size === 'object') {
    return Object.entries(size)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .reduce((acc, [key, value]) => ({ ...acc, [key]: propSizeMap[value!][prop] }), {});
  }

  return propSizeMap[size || 'md'][prop] as string;
};

type CategoryFilterComponent = ForwardRefExoticComponent<CategoryFilterProps>;

export const CategoryFilter: CategoryFilterComponent = forwardRef<HTMLDivElement, CategoryFilterProps>((
  {
    children,
    isSelected,
    isDisabled = false,
    className = undefined,
    size = 'md',
    ...restProps
  },
  ref,
) => {
  const classes = classNames(
    'palmetto-components__variables__button',
    'palmetto-components__variables__form-control',
    styles['category-filter'],
    className,
    {
      [styles.disabled]: isDisabled,
      [styles.selected]: isSelected,
    },
  );

  return (
    <Box
      as="button"
      role="checkbox"
      alignItems="center"
      disabled={isDisabled}
      className={classes}
      gap={computedResponsiveSize(size, 'gap')}
      direction="row"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      borderWidth="xs"
      aria-checked={isSelected}
      fontSize={computedResponsiveSize(size, 'fontSize')}
      fontWeight="bold"
      padding={computedResponsiveSize(size, 'padding')}
      ref={ref}
      {...restProps}
    >
      {!!isSelected && <Icon name="check" />}
      {children}
    </Box>
  );
});
