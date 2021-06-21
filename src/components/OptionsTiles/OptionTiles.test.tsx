import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { OptionTiles } from './OptionTiles';

const options = [
  { value: 'chocolate', label: 'Chocolate', id: 'chocolate' },
  { value: 'strawberry', label: 'Strawberry', id: 'strawberry' },
  { value: 'vanilla', label: 'Vanilla', id: 'vanilla' },
];

describe('OptionTiles', () => {
  describe('Default', () => {
    test('it renders a radio group and radio inputs', async () => {
      render(
        <OptionTiles
          name="default"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
        />,
      );

      const radioInputElements = screen.getAllByRole('radio');
      expect(radioInputElements).toHaveLength(3);
    });

    test('it renders checkbox inputs if multiple elements can be selected', async () => {
      render(
        <OptionTiles
          name="defaultMulti"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          isMulti
        />,
      );

      const checkboxInputElements = screen.getAllByRole('checkbox');
      expect(checkboxInputElements).toHaveLength(3);
    });
  });

  describe('States', () => {
    test('with title', async () => {
      render(
        <OptionTiles
          name="withTitle"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          title="title"
        />,
      );

      const title = screen.getByText('title');
      expect(title).toBeInTheDocument();
    });

    test('with description', async () => {
      render(
        <OptionTiles
          name="withDescription"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          description="description"
        />,
      );

      const description = screen.getByText('description');
      expect(description).toBeInTheDocument();
    });

    test('with disabled options', async () => {
      render(
        <OptionTiles
          name="withDisabledOptions"
          onChange={jest.fn()}
          options={[...options, { label: 'disabled', id: 'disabled', value: 'disabled', disabled: true }]}
          value={null}
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('with content width (instead of fullWidth)', async () => {
      render(
        <OptionTiles
          name="withContentWidth"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          isFullWidth={false}
        />,
      );

      const fieldset = screen.getByRole('group');
      const container = fieldset.closest('div');
      const option = fieldset.children[0];
      expect(fieldset).toHaveClass('align-items-flex-start');
      expect(container).not.toHaveClass('w-100');
      expect(option).toHaveClass('flex-initial');
    });
  });
});
