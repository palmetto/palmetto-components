import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BreakpointSize } from '../../types';
import { SelectInputInset } from './SelectInputInset';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

describe('SelectInputInset', () => {
  describe('Callback Handling', () => {
    test('it fires onChange callback on change', async () => {
      const mockedHandleChange = jest.fn();

      const { getByLabelText } = render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          placeholder="Test Placeholder"
          label="onchange test"
          options={selectOptions}
          value={null}
        />,
      );

      await fireEvent.change(getByLabelText('onchange test'));

      expect(mockedHandleChange).toBeCalledTimes(1);
    });

    test('it fires onFocus callback on focus', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
          value={null}
          label="onfocus test"
        />,
      );
      const select = screen.getByLabelText('onfocus test');
      fireEvent.focus(select);

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('it fires onBlur callback on blur', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
          value={null}
          label="onblur test"
        />,
      );

      const select = screen.getByLabelText('onblur test');
      fireEvent.blur(select);

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('onClear', () => {
    test('onClear prop renders clear icon when input has value', () => {
      const mockedHandleChange = jest.fn();
      render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          options={selectOptions}
          value="chocolate"
          label="onClear test"
          onClear={() => null}
        />,
      );
      const clearButton = screen.getByTestId('text-input-clear-button');
      expect(clearButton).toBeInTheDocument();
    });

    test('onClear event fires callback function', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleClear = jest.fn(() => null);

      render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          options={selectOptions}
          value="chocolate"
          label="onClear test"
          onClear={mockedHandleClear}
        />,
      );
      const clearButton = screen.getByTestId('text-input-clear-button');
      expect(clearButton).toBeInTheDocument();

      fireEvent.click(clearButton);
      expect(mockedHandleClear).toHaveBeenCalledTimes(1);
      fireEvent.keyUp(clearButton, { keyCode: 13 });
      expect(mockedHandleClear).toHaveBeenCalledTimes(2);
      fireEvent.keyUp(clearButton, { keyCode: 99 });
      expect(mockedHandleClear).toHaveBeenCalledTimes(2);
    });
  });

  describe('States', () => {
    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[1].value}
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label correct id, when a label is provided', () => {
        render(
          <SelectInputInset
            id="testInput"
            label="test label"
            options={selectOptions}
            value={null}
            onChange={() => null}
          />,
        );
        const inputElement = screen.getByLabelText('test label');
        expect(inputElement).toHaveAttribute(
          'aria-labelledby',
          'testInputLabel',
        );
        expect(document.getElementById('testInputLabel')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it sets the required and aria-required properties on the input', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            label="Required Select"
            options={selectOptions}
            isRequired
            value={selectOptions[0].value}
          />,
        );

        const inputElement = screen.getByLabelText('Required Select');
        expect(inputElement).toHaveAttribute('aria-required', 'true');
        expect(inputElement).toHaveAttribute('required');
      });

      test('it renders an asterisk in the label by default', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isRequired
            value={selectOptions[0].value}
          />,
        );

        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            label="disabled test"
            options={selectOptions}
            isDisabled
            value={null}
          />,
        );
        const select = screen.getByLabelText('disabled test');
        expect(select).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            error="Helpful message"
            value={null}
          />,
        );

        expect(screen.getByText('Helpful message')).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    const mockedHandleChange = jest.fn();
    const sizes = ['md', 'lg'] as ('md' | 'lg')[];

    const breakpoints: BreakpointSize[] = ['tablet', 'desktop', 'hd'];

    sizes.forEach(size => {
      test(`it has a ${size} class applied to it`, () => {
        render(
          <SelectInputInset
            id="testId"
            onChange={mockedHandleChange}
            options={selectOptions}
            value={selectOptions[0].value}
            size={size}
            label="size test"
          />,
        );
        const select = screen.getByLabelText('size test');
        const selectParent = select.closest('div');
        expect(selectParent?.getAttribute('class')).toContain(size);
      });

      breakpoints.forEach(breakpoint => {
        test(`it applies responsive classes for breakpoint: ${breakpoint} and size: ${size}`, () => {
          render(
            <SelectInputInset
              id="testId"
              onChange={mockedHandleChange}
              options={selectOptions}
              value={selectOptions[0].value}
              size={{ [breakpoint]: size }}
              label="size test"
            />,
          );
          const select = screen.getByLabelText('size test');
          const selectParent = select.closest('div');

          expect(selectParent?.getAttribute('class')).toContain(
            `size-${size}-${breakpoint}`,
          );
        });
      });
    });

    test('It applies responsive classes when multiple are applied', () => {
      render(
        <SelectInputInset
          id="testId"
          onChange={mockedHandleChange}
          options={selectOptions}
          value={selectOptions[0].value}
          size={{
            base: 'md',
            tablet: 'md',
            desktop: 'lg',
            hd: 'lg',
          }}
          label="size test"
        />,
      );
      const select = screen.getByLabelText('size test');
      const selectParent = select.closest('div');

      expect(selectParent?.getAttribute('class')).toContain('size-md');
      expect(selectParent?.getAttribute('class')).toContain('size-md-tablet');
      expect(selectParent?.getAttribute('class')).toContain('size-lg-desktop');
      expect(selectParent?.getAttribute('class')).toContain('size-lg-hd');
    });
  });
});
