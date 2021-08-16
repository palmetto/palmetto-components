import { BorderRadiusSize, FontSize } from '../../types';
import { BoxProps } from '../Box/Box';
import { TextareaInputProps, TextareaInputSize } from './TextareaInput'; // eslint-disable-line import/no-cycle

export const borderRadiusSizeMap: { [key in TextareaInputSize]: BorderRadiusSize; } = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

export const paddingSizeMap: { [key in TextareaInputSize]: BoxProps['padding']; } = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export const fontSizeMap: { [key in TextareaInputSize]: FontSize; } = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const inputSizeMaps = {
  radius: borderRadiusSizeMap,
  fontSize: fontSizeMap,
  padding: paddingSizeMap,
};

/**
 * Convert TextareaInputSize (sm | md | lg) to their corresponding values on a per prop basis.
 *
 * @param size size prop passed down to component
 * @param prop Property map to use to map each breakpoint value.
 * @returns A mapping of responsive prop objects to their corresponding values per prop
 */
export const computedResponsiveSize = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  size: TextareaInputProps['size'],
  prop: 'padding' | 'radius' | 'fontSize',
) => {
  if (size && !(typeof size === 'string') && typeof size === 'object') {
    return Object.entries(size)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: inputSizeMaps[prop][value || 'md'] }), {});
  }

  return inputSizeMaps[prop][size || 'md'] as string;
};
