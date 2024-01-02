/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  FONT_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  BRAND_COLOR_OPTIONS,
  SPACING_OPTIONS,
  BORDER_SIZE_OPTIONS,
  BOX_SHADOW_OPTIONS,
} from '../../lib/tokens';
import { Box } from './Box';

describe('Box', () => {
  test('aria-label is applied if set', () => {
    const { getByLabelText } = render(<Box aria-label="test label" />);
    expect(getByLabelText('test label')).toBeDefined();
  });

  test('background color token classes are applied', () => {
    [...BRAND_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box background={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`background-color-${color}`);
    });
  });

  test('font size token classes are applied', () => {
    [...FONT_SIZE_OPTIONS].forEach((fontSize, i) => {
      const { queryAllByText } = render(<Box fontSize={fontSize} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-size-${fontSize}`);
    });
  });

  test('text color token classes are applied', () => {
    [...FONT_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box color={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-color-${color}`);
    });
  });

  test('border color token classes are applied', () => {
    [...BRAND_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box borderColor={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`border-color-${color}`);
    });
  });

  test('overflow option classes are applied', () => {
    const overflowOptions = [
      'visible',
      'hidden',
      'clip',
      'scroll',
      'auto',
      'inherit',
      'initial',
      'unset',
    ];

    [...overflowOptions].forEach((value, i) => {
      const { queryAllByText } = render(<Box overflow={value} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`overflow-${value}`);
    });
  });

  test('childGap margin classes are applied for column layout', () => {
    [...SPACING_OPTIONS].forEach((value, optionIndex) => {
      const { container } = render(
        <Box childGap={value} key={optionIndex}>
          <Box className="foo" key={`child1${optionIndex}`}>child 1</Box>
          <Box className="foo" key={`child2${optionIndex}`}>child 2</Box>
        </Box>,
      );

      const { children } = container.children[0];

      Array.from(children).forEach((child, childIndex) => {
        expect(child.classList).toContain('foo');
        if (childIndex > children.length - 1) {
          expect(child.classList).toContain(`m-bottom-${value}`);
        }
      });
    });
  });

  test('childGap margin classes are applied for row layout', () => {
    [...SPACING_OPTIONS].forEach((value, optionIndex) => {
      const { container } = render(
        <Box childGap={value} key={optionIndex} direction="row">
          <Box className="foo" key={`child1${optionIndex}`}>child 1</Box>
          <Box className="foo" key={`child2${optionIndex}`}>child 2</Box>
        </Box>,
      );

      const { children } = container.children[0];

      Array.from(children).forEach((child, childIndex) => {
        expect(child.classList).toContain('foo');
        if (childIndex > children.length - 1) {
          expect(child.classList).toContain(`m-right-${value}`);
        }
      });
    });
  });

  describe('Display', () => {
    test('box renders with default display value of flex', () => {
      const { getByText } = render(<Box>Hello</Box>);

      expect(getByText('Hello')).toHaveClass('display-flex');
    });

    test('box renders with display class matching prop', () => {
      const displayValues = [
        'flex',
        'inline-flex',
        'block',
        'inline-block',
        'inline',
        'inherit',
        'grid',
      ];

      displayValues.forEach((value, i) => {
        const { queryAllByText } = render(<Box display={value}>hello</Box>);

        expect(queryAllByText('hello')[i]).toHaveClass(`display-${value}`);
      });
    });
  });

  describe('Position', () => {
    const positions = [
      'relative',
      'absolute',
      'fixed',
      'sticky',
      'static',
      'revert',
      'inherit',
      'initial',
      'unset',
    ];

    positions.forEach(p => {
      test(`renders with class for position ${p}`, () => {
        const { getByText } = render(<Box position={p}>my box</Box>);
        expect(getByText('my box')).toHaveClass(`position-${p}`);
      });
    });
  });

  describe('wrap', () => {
    test('box renders with wrap class if wrap is true', () => {
      const { getByText } = render(<Box wrap>Hello</Box>);
      expect(getByText('Hello')).toHaveClass('flex-wrap');
    });

    test('box renders with nowrap class if wrap is false', () => {
      const { getByText } = render(<Box wrap={false}>Hello</Box>);
      expect(getByText('Hello')).toHaveClass('flex-nowrap');
    });

    test('box will not add wrap class if display is not flex', () => {
      const { getByText } = render(<Box display="block" wrap>Hello</Box>);
      expect(getByText('Hello')).not.toHaveClass('flex-wrap');
    });
  });

  describe('Responsive styles and Classes', () => {
    test('box renders with the correct responsive spacing classes based on props', () => {
      const spacing = {
        base: 'sm',
        tablet: 'md',
        desktop: 'lg',
        hd: 'xl',
      };

      const position = {
        base: 'sticky',
        tablet: 'absolute',
        desktop: 'relative',
        hd: 'fixed',
      };
      const { getByText } = render(
        <Box
          width={spacing}
          height={spacing}
          maxWidth={spacing}
          maxHeight={spacing}
          padding={spacing}
          margin={spacing}
          fontSize={spacing}
          position={position}
        >
          my box
        </Box>,
      );
      const box = getByText('my box');

      expect(box).toHaveClass(...[
        'w-sm',
        'w-md-tablet',
        'w-lg-desktop',
        'w-xl-hd',
        'h-sm',
        'h-md-tablet',
        'h-lg-desktop',
        'h-xl-hd',
        'mw-sm',
        'mw-md-tablet',
        'mw-lg-desktop',
        'mw-xl-hd',
        'mh-sm',
        'mh-md-tablet',
        'mh-lg-desktop',
        'mh-xl-hd',
        'p-sm',
        'p-md-tablet',
        'p-lg-desktop',
        'p-xl-hd',
        'm-sm',
        'm-md-tablet',
        'm-lg-desktop',
        'm-xl-hd',
        'font-size-sm',
        'font-size-md-tablet',
        'font-size-lg-desktop',
        'font-size-xl-hd',
        'position-sticky',
        'position-absolute-tablet',
        'position-relative-desktop',
        'position-fixed-hd',
      ]);
    });

    test('box renders children with the correct gap classes for its children', () => {
      const direction = {
        base: 'column',
        tablet: 'column',
        desktop: 'row',
        hd: 'row',
      };

      const childGap = {
        base: 'sm',
        tablet: 'md',
        desktop: 'lg',
        hd: 'xl',
      };

      const { getByText } = render(
        <Box
          direction={direction}
          childGap={childGap}
        >
          <div>
            one
          </div>
          <div>
            two
          </div>
        </Box>,
      );
      const childBox = getByText('one');

      expect(childBox).toHaveClass(...[
        'm-bottom-sm',
        'm-right-0',
        'm-bottom-md-tablet',
        'm-right-0-tablet',
        'm-right-lg-desktop',
        'm-bottom-0-desktop',
        'm-right-xl-hd',
        'm-bottom-0-hd',
      ]);
    });
  });

  describe('Focus States', () => {
    test('Background Hover -- box rendered with proper background hover classes', () => {
      [...BRAND_COLOR_OPTIONS].forEach((brandColorOption, i) => {
        const { queryAllByText } = render(<Box hover={{ background: brandColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:background-color-${brandColorOption}`);
      });
    });

    test('Border Color Hover -- box rendered with proper border color hover classes', () => {
      [...BRAND_COLOR_OPTIONS].forEach((brandColorOption, i) => {
        const { queryAllByText } = render(<Box hover={{ borderColor: brandColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:border-color-${brandColorOption}`);
      });
    });

    test('Border Width Hover -- box rendered with proper border width hover classes', () => {
      [...BORDER_SIZE_OPTIONS].forEach((borderSizeOption, i) => {
        const { queryAllByText } = render(<Box hover={{ borderWidth: borderSizeOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:border-width-${borderSizeOption}`);
      });
    });

    test('Font Size Hover -- box rendered with proper font size hover classes', () => {
      [...FONT_SIZE_OPTIONS].forEach((fontSizeOption, i) => {
        const { queryAllByText } = render(<Box hover={{ fontSize: fontSizeOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:font-size-${fontSizeOption}`);
      });
    });

    test('Font Color Hover -- box rendered with proper font color hover classes', () => {
      [...FONT_COLOR_OPTIONS].forEach((fontColorOption, i) => {
        const { queryAllByText } = render(<Box hover={{ color: fontColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:font-color-${fontColorOption}`);
      });
    });

    test('Shadow Hover -- box rendered with proper font color hover classes', () => {
      [...BOX_SHADOW_OPTIONS].forEach((boxShadowOption, i) => {
        const { queryAllByText } = render(<Box hover={{ shadow: boxShadowOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`hover\:shadow-${boxShadowOption}`);
      });
    });
  });

  describe('Focus States', () => {
    test('Background Focus -- box rendered with proper background focus classes', () => {
      [...BRAND_COLOR_OPTIONS].forEach((brandColorOption, i) => {
        const { queryAllByText } = render(<Box focus={{ background: brandColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`focus\:background-color-${brandColorOption}`);
      });
    });

    test('Border Color Focus -- box rendered with proper border color focus classes', () => {
      [...BRAND_COLOR_OPTIONS].forEach((brandColorOption, i) => {
        const { queryAllByText } = render(<Box focus={{ borderColor: brandColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`focus\:border-color-${brandColorOption}`);
      });
    });

    test('Border Width Focus -- box rendered with proper border width focus classes', () => {
      [...BORDER_SIZE_OPTIONS].forEach((borderSizeOption, i) => {
        const { queryAllByText } = render(<Box focus={{ borderWidth: borderSizeOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`focus\:border-width-${borderSizeOption}`);
      });
    });

    test('Font Color Focus -- box rendered with proper font color focus classes', () => {
      [...FONT_COLOR_OPTIONS].forEach((fontColorOption, i) => {
        const { queryAllByText } = render(<Box focus={{ color: fontColorOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`focus\:font-color-${fontColorOption}`);
      });
    });

    test('Shadow Focus -- box rendered with proper font color focus classes', () => {
      [...BOX_SHADOW_OPTIONS].forEach((boxShadowOption, i) => {
        const { queryAllByText } = render(<Box focus={{ shadow: boxShadowOption }} key={i}>Test Box</Box>);
        expect(queryAllByText('Test Box')[i].classList).toContain(`focus\:shadow-${boxShadowOption}`);
      });
    });
  });

  describe('Cursor', () => {
    test('Renders with proper cursor utility class when prop is passed', () => {
      const { queryAllByText } = render(<Box cursor="pointer">Test Box</Box>);
      expect(queryAllByText('Test Box')[0].classList).toContain('cursor-pointer');
    });
  })
});
