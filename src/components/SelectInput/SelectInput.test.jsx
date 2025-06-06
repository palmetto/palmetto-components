import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { SelectInput } from './SelectInput';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function getByTextWithMarkup(text) {
  return (content, element) => {
    const hasText = node => node.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      child => !hasText(child),
    );

    return elementHasText && childrenDontHaveText;
  };
}

describe('SelectInput', () => {
  describe('Callback Handling', () => {
    test('it fires onChange callback on change', async () => {
      const mockedHandleChange = jest.fn();

      const { getByLabelText } = render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          placeholder="Test Placeholder"
          label="onchange test"
          options={selectOptions}
        />,
      );

      await selectEvent.select(getByLabelText('onchange test'), 'Vanilla');

      expect(mockedHandleChange).toBeCalledTimes(1);
    });

    test('it fires onFocus callback on focus', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
          label="onfocus test"
        />,
      );

      fireEvent.focus(screen.getByLabelText('onfocus test'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('it fires onBlur callback on blur', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
          label="onblur test"
        />,
      );

      fireEvent.blur(screen.getByLabelText('onblur test'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      test('it renders input without a visual label, and with a placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            label="hidden label"
            hideLabel
            onChange={mockedHandleChange}
            placeholder="Test Placeholder"
            options={selectOptions}
          />,
        );
        expect(screen.queryByText('hidden label')).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
      const mockedHandleChange = jest.fn();

      render(
        <SelectInput
          id="testInput"
          label="hidden label"
          hideLabel
          onChange={mockedHandleChange}
        />,
      );
      const inputElement = screen.getByLabelText('hidden label');
      expect(inputElement).not.toHaveAttribute('aria-labelledby');
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label correct id, when a label is provided', () => {
        render(<SelectInput id="testInput" label="test label" />);
        const inputElement = screen.getByLabelText('test label');
        expect(inputElement).toHaveAttribute(
          'aria-labelledby',
          'testInputLabel',
        );
        expect(document.getElementById('testInputLabel')).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[2]}
          />,
        );

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Multi select, no selection', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      test('it renders input with a label, and with two items selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
            value={[selectOptions[0], selectOptions[2]]}
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.queryByText('Select...')).toBeNull();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isRequired
          />,
        );

        expect(
          screen.getByText(getByTextWithMarkup('Select Label *')),
        ).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isDisabled
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            error="Helpful message"
          />,
        );

        expect(screen.getByText('Helpful message')).toBeInTheDocument();
      });
    });

    describe('Is Clearable', () => {
      test('it renders the X icon if input has value and is clearable', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[0]}
            isClearable
          />,
        );

        expect(
          screen.getByTestId('icon-testid--remove-light'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    const mockedHandleChange = jest.fn();
    const sizes = ['sm', 'md', 'lg'];

    const breakpoints = ['tablet', 'desktop', 'hd'];

    sizes.forEach(size => {
      test(`it has a ${size} class applied to it`, () => {
        const { container } = render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            options={selectOptions}
            value={selectOptions[0].value}
            size={size}
            label="size test"
          />,
        );

        expect(container.children[0].getAttribute('class')).toContain(size);
      });

      breakpoints.forEach(breakpoint => {
        test(`it applies responsive classes for breakpoint: ${breakpoint} and size: ${size}`, () => {
          const { container } = render(
            <SelectInput
              id="testId"
              onChange={mockedHandleChange}
              options={selectOptions}
              value={selectOptions[0].value}
              size={{ [breakpoint]: size }}
              label="size test"
            />,
          );

          expect(container.children[0].getAttribute('class')).toContain(
            `size-${size}-${breakpoint}`,
          );
        });
      });
    });

    test('It applies responsive classes when multiple are applied', () => {
      const { container } = render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          options={selectOptions}
          value={selectOptions[0].value}
          size={{
            base: 'sm',
            tablet: 'md',
            desktop: 'lg',
            hd: 'sm',
          }}
          label="size test"
        />,
      );

      expect(container.children[0].getAttribute('class')).toContain('size-sm');
      expect(container.children[0].getAttribute('class')).toContain(
        'size-md-tablet',
      );
      expect(container.children[0].getAttribute('class')).toContain(
        'size-lg-desktop',
      );
      expect(container.children[0].getAttribute('class')).toContain(
        'size-sm-hd',
      );
    });
  });
});
