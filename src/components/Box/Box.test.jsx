/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  PALMETTO_FONT_COLOR_OPTIONS,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BACKGROUND_COLOR_OPTIONS,
  PALMETTO_BORDER_COLOR_OPTIONS,
  PALMETTO_SPACING_SIZE_OPTIONS,
} from '../../lib/tokens';
import Box from './Box';

describe('Box', () => {
  test('aria-label is applied if set', () => {
    const { getByLabelText } = render(<Box aria-label="test label" />);
    expect(getByLabelText('test label')).toBeDefined();
  });

  test('background color token classes are applied', () => {
    [...PALMETTO_BACKGROUND_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box background={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`background-color-${color}`);
    });
  });

  test('font size token classes are applied', () => {
    [...PALMETTO_FONT_SIZE_OPTIONS].forEach((fontSize, i) => {
      const { queryAllByText } = render(<Box fontSize={fontSize} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-size-${fontSize}`);
    });
  });

  test('text color token classes are applied', () => {
    [...PALMETTO_FONT_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box color={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-color-${color}`);
    });
  });

  test('border color token classes are applied', () => {
    [...PALMETTO_BORDER_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box border={color} key={i}>Test Box</Box>);
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

  test('childGap margin classes are applied for horizontal layout', () => {
    [...PALMETTO_SPACING_SIZE_OPTIONS].forEach((value, optionIndex) => {
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

  test('childGap margin classes are applied for vertical layout', () => {
    [...PALMETTO_SPACING_SIZE_OPTIONS].forEach((value, optionIndex) => {
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
      ];

      displayValues.forEach((value, i) => {
        const { queryAllByText } = render(<Box display={value}>hello</Box>);

        expect(queryAllByText('hello')[i]).toHaveClass(`display-${value}`);
      });
    });
  });

  describe('wrap', () => {
    test('box renders with wrap class is wrap is true', () => {
      const { getByText } = render(<Box wrap>Hello</Box>);
      expect(getByText('Hello')).toHaveClass('flex-wrap');
    });

    test('box renders with nowrap class is wrap is false', () => {
      const { getByText } = render(<Box>Hello</Box>);
      expect(getByText('Hello')).toHaveClass('flex-nowrap');
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
      const { getByText } = render(
        <Box
          width={spacing}
          height={spacing}
          maxWidth={spacing}
          maxHeight={spacing}
          padding={spacing}
          margin={spacing}
          fontSize={spacing}
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
});
