import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { Box, BoxProps } from '../Box/Box';
import { ResponsiveProp } from '../../types';

export type BaseCategoryFilterSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CategoryFilterProps extends BoxProps {
  isSelected: boolean;
  size: BaseCategoryFilterSize | ResponsiveProp<BaseCategoryFilterSize>;
}

type ResponsiveCategoryFilterProps = {
  fontSize: BoxProps['fontSize'];
  padding: BoxProps['padding'];
}

const propSizeMap: { [key in BaseCategoryFilterSize]: ResponsiveCategoryFilterProps} = {
  xs: {
    fontSize: 'xs',
    padding: '0',
  },
  sm: {
    fontSize: 'sm',
    padding: '2xs xs',
  },
  md: {
    fontSize: 'md',
    padding: 'sm md',
  },
  lg: {
    fontSize: 'lg',
    padding: 'sm md',
  }
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
  prop: 'fontSize' | 'padding',
) => {
  if (size && !(typeof size === 'string') && typeof size === 'object') {
    return Object.entries(size)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: propSizeMap[value][prop] }), {});
  }

  return propSizeMap[size][prop] as string;
};

export const CategoryFilter: ForwardRefExoticComponent<CategoryFilterProps> = forwardRef<HTMLDivElement, CategoryFilterProps>((
  {
    children,
    isSelected,
    size = 'md',
    ...restProps
  },
  ref,
) => {
  return (
    <Box
      as="button"
      aria-role="checkbox"
      background="transparent"
      hover={{
        background: 'grey-100',
      }}
      radius="lg"
      borderColor="grey-100"
      borderWidth="xs"
      aria-checked={isSelected}
      fontSize={computedResponsiveSize(size, 'fontSize')}
      padding={computedResponsiveSize(size, 'padding')}
      ref={ref}
      {...restProps}
    >
      {children}
    </Box>
  );
});