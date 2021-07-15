import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SelectInputNative } from './SelectInputNative';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function getByTextWithMarkup(text: string) {
  // eslint-disable-next-line
  // @ts-ignore
  return (content, element) => {
    const hasText = (node: Element) => node.textContent === text;
    const elementHasText = hasText(element);
    // eslint-disable-next-line
    // @ts-ignore
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));

    return elementHasText && childrenDontHaveText;
  };
}

describe('SelectInputNative', () => {
  describe('Callback Handling', () => {
    test('it fires onChange callback on change', async () => {
      const mockedHandleChange = jest.fn();

      const { getByLabelText } = render(
        <SelectInputNative
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
        <SelectInputNative
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
        <SelectInputNative
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

  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      test('it renders input without a visual label, and with a placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputNative
            id="testId"
            label="hidden label"
            hideLabel
            onChange={mockedHandleChange}
            placeholder="Test Placeholder"
            options={selectOptions}
            value={null}
          />,
        );
        expect(screen.queryByText('hidden label')).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
      const mockedHandleChange = jest.fn();

      render(
        <SelectInputNative
          id="testInput"
          label="hidden label"
          hideLabel
          onChange={mockedHandleChange}
          options={selectOptions}
          value={null}
        />,
      );
      const inputElement = screen.getByLabelText('hidden label');
      expect(inputElement).not.toHaveAttribute('aria-labelledby');
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputNative
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
          <SelectInputNative
            id="testInput"
            label="test label"
            options={selectOptions}
            value={null}
            onChange={() => null}
          />,
        );
        const inputElement = screen.getByLabelText('test label');
        expect(inputElement).toHaveAttribute('aria-labelledby', 'testInputLabel');
        expect(document.getElementById('testInputLabel')).toBeInTheDocument();
      });
    });

    // @TODO -- This test doesn't do what we need at this time. Need to find a way to check for the selected value
    // but react doesnt use the select attr in options.
    /* eslint-disable */
    // describe('Single select, pre-selected', () => {
    //   test('it renders with value pre-selected', () => {
    //     const mockedHandleChange = jest.fn();

    //     const { debug } = render(
    //       <SelectInputNative
    //         id="testId"
    //         onChange={mockedHandleChange}
    //         label="Select Label"
    //         options={selectOptions}
    //         value={selectOptions[2].value}
    //       />,
    //     );
    //     const selectElement = screen.getByLabelText('Select Label');
    //     const option = screen.getByText('Vanilla');

    //     expect(option).toHaveAttribute('selected', true);
    //   });
    // });
    /* eslint-enable */

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputNative
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isRequired
            value={selectOptions[0].value}
          />,
        );

        expect(screen.getByText(getByTextWithMarkup('Select Label *'))).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInputNative
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
          <SelectInputNative
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
    const sizes = [
      'sm',
      'md',
      'lg',
    ] as ('sm' | 'md' | 'lg')[];

    sizes.forEach(size => {
      test(`it has a ${size} class applied to it`, () => {
        render(
          <SelectInputNative
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
    });
  });
});
