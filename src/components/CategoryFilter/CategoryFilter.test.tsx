import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryFilter } from './CategoryFilter';

describe('CategoryFilter', () => {
  describe('Default', () => {
    test('It renders a button', () => {
      render(
        <CategoryFilter isSelected={false}>
          default button
        </CategoryFilter>,
      );

      const buttonElement = screen.getByText('default button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute('role', 'checkbox');
    });
  });

  describe('Active', () => {
    test('It renders the button with a checked status', () => {
      const { rerender } = render(
        <CategoryFilter isSelected={false}>
          is not selected
        </CategoryFilter>,
      );

      const notSelected = screen.getByText('is not selected');

      expect(notSelected).toHaveAttribute('aria-checked', 'false');

      rerender(
        <CategoryFilter isSelected>
          is selected
        </CategoryFilter>,
      );

      const selected = screen.getByText('is selected');

      expect(selected).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Disabled', () => {
    test('It disables a tab when isDisabled is passed to tab item', () => {
      render(
        <>
          <CategoryFilter isDisabled isSelected={false}>
            disabled not selected
          </CategoryFilter>
          <CategoryFilter isDisabled isSelected>
            disabled selected
          </CategoryFilter>
        </>,
      );

      const disabledNotSelected = screen.getByText('disabled not selected');
      const disabledSelected = screen.getByText('disabled selected');

      expect(disabledNotSelected).toHaveAttribute('disabled', '');
      expect(disabledSelected).toHaveAttribute('disabled', '');
      expect(disabledSelected).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Sizes', () => {
    test('it renders correct size attributes based on prop', () => {
      render(
        <>
          <CategoryFilter isSelected size="xs">xs</CategoryFilter>
          <CategoryFilter isSelected size="sm">sm</CategoryFilter>
          <CategoryFilter isSelected size="md">md</CategoryFilter>
          <CategoryFilter isSelected size="lg">lg</CategoryFilter>
          <CategoryFilter isSelected size={{ tablet: 'sm' }}>responsive</CategoryFilter>
        </>,
      );

      const xs = screen.getByText('xs');
      const sm = screen.getByText('sm');
      const md = screen.getByText('md');
      const lg = screen.getByText('lg');
      const responsive = screen.getByText('responsive');

      expect(xs).toHaveClass('p-v-2xs', 'p-h-xs');
      expect(sm).toHaveClass('p-v-2xs', 'p-h-xs');
      expect(md).toHaveClass('p-v-sm', 'p-h-md');
      expect(lg).toHaveClass('p-v-sm', 'p-h-md');
      expect(responsive).toHaveClass('p-v-2xs-tablet', 'p-h-xs-tablet');
    });
  });
});
