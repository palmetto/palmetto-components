import { BorderRadiusSize, FontSize } from '../../types';
import { BoxProps } from '../Box/Box';
import { TextInputProps, TextInputSize } from './TextInput'; // eslint-disable-line import/no-cycle

export const borderRadiusSizeMap: { [key in TextInputSize]: BorderRadiusSize; } = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

export const containerPaddingSizeMap: { [key in TextInputSize]: BoxProps['padding']; } = {
  sm: '0 xs',
  md: '0 sm',
  lg: '0 md',
};

export const childPaddingSizeMap: { [key in TextInputSize]: BoxProps['padding']; } = {
  sm: 'xs 0',
  md: 'sm 0',
  lg: 'md 0',
};

export const fontSizeMap: { [key in TextInputSize]: FontSize; } = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const inputSizeMaps = {
  radius: borderRadiusSizeMap,
  fontSize: fontSizeMap,
  containerPadding: containerPaddingSizeMap,
  childPadding: childPaddingSizeMap,
};

/**
 * Convert TextInputSize (sm | md | lg) to their corresponding values on a per prop basis.
 *
 * @param size size prop passed down to component
 * @param prop Property map to use to map each breakpoint value.
 * @returns A mapping of responsive prop objects to their corresponding values per prop
 */
export const computedResponsiveSize = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  size: TextInputProps['size'],
  prop: 'containerPadding' | 'childPadding' | 'radius' | 'fontSize',
) => {
  if (size && !(typeof size === 'string') && typeof size === 'object') {
    return Object.entries(size)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: inputSizeMaps[prop][value || 'md'] }), {});
  }

  return inputSizeMaps[prop][size || 'md'] as string;
};
