import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { OptionTile } from './OptionTile';

const options = [
  { value: 'chocolate', label: 'chocolate', id: 'chocolate' },
  { value: 'strawberry', label: 'strawberry', id: 'strawberry' },
  { value: 'vanilla', label: 'vanilla', id: 'vanilla' },
];

describe('OptionTile', () => {
  describe('Default', () => {
    test('it renders a radio input', async () => {
      render(
        <OptionTile
          name="default"
          onChange={jest.fn()}
          options={[...options]}
          value="default"
          id="default"
          isSelected={false}
          label="default"
        />,
      );

      const radioInputElement = screen.getByRole('radio');
      expect(radioInputElement).toBeInTheDocument();
    });

    test('it renders a checkbox input if checkbox inputType is passed', async () => {
      render(
        <OptionTile
          name="checkbox"
          onChange={jest.fn()}
          options={[...options]}
          value="checkbox"
          inputType="checkbox"
          id="checkbox"
          label="checkbox"
          isSelected={false}
        />,
      );

      const checkboxInput = screen.getByRole('checkbox');
      expect(checkboxInput).toBeInTheDocument();
    });
  });

  describe('States', () => {
    test('with option selected', () => {
      render(
        <OptionTile
          name="withOptionSelected"
          onChange={jest.fn()}
          options={[...options]}
          value="selected"
          id="selected"
          label="selected"
          isSelected
        />,
      );

      const selectedRadio = screen.getByLabelText('selected');
      expect(selectedRadio).toBeChecked();
    });

    test('checkbox with option selected', () => {
      render(
        <OptionTile
          name="withOptionSelected"
          onChange={jest.fn()}
          options={[...options]}
          value="selected"
          id="selected"
          label="selected"
          isSelected
          inputType="checkbox"
        />,
      );

      const selectedRadio = screen.getByLabelText('selected');
      expect(selectedRadio).toBeChecked();
    });

    test('disabled', async () => {
      render(
        <OptionTile
          name="disabled"
          onChange={jest.fn()}
          value="disabled"
          id="disabled"
          label="disabled"
          isSelected={false}
          disabled
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('checkbox disabled', async () => {
      render(
        <OptionTile
          name="disabled"
          onChange={jest.fn()}
          value="disabled"
          id="disabled"
          label="disabled"
          isSelected={false}
          disabled
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });
  });

  describe('Callbacks', () => {
    test('if fires an onChange method when an option is clicked', () => {
      const mockedOnChange = jest.fn();
      render(
        <OptionTile
          name="onChange"
          onChange={mockedOnChange}
          options={[...options]}
          value="onChange"
          id="onChange"
          label="onChange"
          isSelected={false}
        />,
      );

      const container = screen.getByLabelText('onChange').closest('div');
      if (container) {
        fireEvent.click(container);
      }
      expect(mockedOnChange).toBeCalledTimes(1);
    });
  });
});
