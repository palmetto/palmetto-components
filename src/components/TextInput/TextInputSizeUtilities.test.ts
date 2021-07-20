import {
  computedResponsiveSize,
  borderRadiusSizeMap,
  containerPaddingSizeMap,
  childPaddingSizeMap,
  fontSizeMap,
} from './TextInputSizeUtilities';
import { BreakpointSizeWithBase } from '../../types';
import { TextInputSize } from './TextInput';

describe('TextInputSizeUtilities', () => {
  test('It returns correct map values based on established constants for single value sizes', () => {
    Object.entries(borderRadiusSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextInputSize, 'radius')).toBe(value);
    });

    Object.entries(containerPaddingSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextInputSize, 'containerPadding')).toBe(value);
    });

    Object.entries(childPaddingSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextInputSize, 'childPadding')).toBe(value);
    });

    Object.entries(fontSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextInputSize, 'fontSize')).toBe(value);
    });
  });

  test('It returns correct mapped responsive object props for each property', () => {
    const size: { [key in BreakpointSizeWithBase]: TextInputSize; } = {
      base: 'sm',
      tablet: 'md',
      desktop: 'lg',
      hd: 'md',
    };

    expect(computedResponsiveSize(size, 'radius')).toEqual({
      base: borderRadiusSizeMap[size.base],
      tablet: borderRadiusSizeMap[size.tablet],
      desktop: borderRadiusSizeMap[size.desktop],
      hd: borderRadiusSizeMap[size.hd],
    });

    expect(computedResponsiveSize(size, 'containerPadding')).toEqual({
      base: containerPaddingSizeMap[size.base],
      tablet: containerPaddingSizeMap[size.tablet],
      desktop: containerPaddingSizeMap[size.desktop],
      hd: containerPaddingSizeMap[size.hd],
    });

    expect(computedResponsiveSize(size, 'childPadding')).toEqual({
      base: childPaddingSizeMap[size.base],
      tablet: childPaddingSizeMap[size.tablet],
      desktop: childPaddingSizeMap[size.desktop],
      hd: childPaddingSizeMap[size.hd],
    });

    expect(computedResponsiveSize(size, 'fontSize')).toEqual({
      base: fontSizeMap[size.base],
      tablet: fontSizeMap[size.tablet],
      desktop: fontSizeMap[size.desktop],
      hd: fontSizeMap[size.hd],
    });
  });
});
