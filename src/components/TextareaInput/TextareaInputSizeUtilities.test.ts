import {
  computedResponsiveSize,
  borderRadiusSizeMap,
  paddingSizeMap,
  fontSizeMap,
} from './TextareaInputSizeUtilities';
import { BreakpointSizeWithBase } from '../../types';
import { TextareaInputSize } from './TextareaInput';

describe('TextareaInputSizeUtilities', () => {
  test('It returns correct map values based on established constants for single value sizes', () => {
    Object.entries(borderRadiusSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextareaInputSize, 'radius')).toBe(value);
    });

    Object.entries(paddingSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextareaInputSize, 'padding')).toBe(value);
    });

    Object.entries(fontSizeMap).forEach(([key, value]) => {
      expect(computedResponsiveSize(key as TextareaInputSize, 'fontSize')).toBe(value);
    });
  });

  test('It returns correct mapped responsive object props for each property', () => {
    const size: { [key in BreakpointSizeWithBase]: TextareaInputSize; } = {
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

    expect(computedResponsiveSize(size, 'padding')).toEqual({
      base: paddingSizeMap[size.base],
      tablet: paddingSizeMap[size.tablet],
      desktop: paddingSizeMap[size.desktop],
      hd: paddingSizeMap[size.hd],
    });

    expect(computedResponsiveSize(size, 'fontSize')).toEqual({
      base: fontSizeMap[size.base],
      tablet: fontSizeMap[size.tablet],
      desktop: fontSizeMap[size.desktop],
      hd: fontSizeMap[size.hd],
    });
  });
});
