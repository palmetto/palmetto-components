import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('States', () => {
    describe('Default', () => {
      test('Renders with default props', () => {
        const defaultSize = '16';
        const { getByTestId } = render(<Spinner />);
        const svg = getByTestId('spinner-testid');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', defaultSize);
        expect(svg).toHaveAttribute('height', defaultSize);
      });
    });

    describe('Sizes', () => {
      test('Renders with proper size when passed `sm` prop', () => {
        const smallSize = '12';
        const { getByTestId } = render(<Spinner size="sm" />);
        const svg = getByTestId('spinner-testid');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', smallSize);
        expect(svg).toHaveAttribute('height', smallSize);
      });

      test('Renders with proper size when passed `lg` prop', () => {
        const largeSize = '24';
        const { getByTestId } = render(<Spinner size="lg" />);
        const svg = getByTestId('spinner-testid');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', largeSize);
        expect(svg).toHaveAttribute('height', largeSize);
      });

      test('Renders with proper size when passed `xl` prop', () => {
        const extraLargeSize = '30';
        const { getByTestId } = render(<Spinner size="xl" />);
        const svg = getByTestId('spinner-testid');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', extraLargeSize);
        expect(svg).toHaveAttribute('height', extraLargeSize);
      });
    });
  });
});
