import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CheckboxInput } from './CheckboxInput';
import { FormLabel } from '../FormLabel/FormLabel';

jest.mock('../FormLabel/FormLabel');

describe('CheckboxInput', () => {
  beforeEach(() => {
    FormLabel.mockReturnValue(<div />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        isChecked={false}
        onChange={() => null}
      />,
    );
    const checkbox = getByLabelText('test checkbox');

    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
    expect(checkbox.getAttribute('aria-invalid')).toBe('false');
  });

  test('it calls FormLabel with the correct props', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        onChange={() => null}
        isChecked={false}
        helpText="i am help text"
      />,
    );
    expect(getByLabelText('test checkbox')).toBeDefined();
    expect(FormLabel).toHaveBeenCalledTimes(1);
    expect(FormLabel).toHaveBeenCalledWith(
      {
        inputId: 'testCheckbox',
        helpText: 'i am help text',
        children: 'test checkbox',
        className: 'm-top-2xs m-right-0 m-bottom-0 m-left-0',
        isDisabled: false,
        isFieldRequired: false,
        requiredIndicator: ' *',
      },
      {},
    );
  });

  test('it calls FormLabel with the correct props when checkbox is required', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        onChange={() => null}
        isChecked={false}
        isRequired
      />,
    );
    expect(getByLabelText('test checkbox')).toBeDefined();
    expect(FormLabel).toHaveBeenCalledTimes(1);
    expect(FormLabel).toHaveBeenCalledWith(
      {
        inputId: 'testCheckbox',
        helpText: undefined,
        children: 'test checkbox',
        className: 'm-top-2xs m-right-0 m-bottom-0 m-left-0',
        isDisabled: false,
        isFieldRequired: true,
        requiredIndicator: ' *',
      },
      {},
    );
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <CheckboxInput id="testCheckbox" label="test checkbox" onChange={() => null} isChecked />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(true);
  });

  test('input is not checked when isChecked is false', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        isChecked={false}
        onChange={() => null}
      />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute and calls FormLabel with expected props', () => {
    const { getByLabelText } = render(
      <CheckboxInput id="testInput" label="test label" value="hello" onChange={() => null} />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-labelledby', 'testInputLabel');
  });

  test('sets required properties when isRequired is true', () => {
    const { getByLabelText } = render(
      <CheckboxInput id="testInput" label="test label" value="hello" onChange={() => null} isRequired />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-required', 'true');
    expect(getByLabelText('test label')).toHaveAttribute('required');
  });

  describe('error states', () => {
    test('renders error message if error exists and is not true', () => {
      const { getByText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(getByText('This is the error message')).toBeInTheDocument();
    });

    test('calls FormLabel with the correct properties when error is a string', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith(
        {
          inputId: 'testCheckbox',
          helpText: undefined,
          children: 'test checkbox',
          className: 'm-top-2xs m-right-0 m-bottom-0 m-left-0',
          isDisabled: false,
          isFieldRequired: false,
          requiredIndicator: ' *',
        },
        {},
      );
    });

    test('calls FormLabel with the correct properties when error is a true', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith(
        {
          inputId: 'testCheckbox',
          helpText: undefined,
          children: 'test checkbox',
          className: 'm-top-2xs m-right-0 m-bottom-0 m-left-0',
          isDisabled: false,
          isFieldRequired: false,
          requiredIndicator: ' *',
        },
        {},
      );
    });
  });

  test('calls FormLabel with the correct properties when disabled', () => {
    render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        isChecked={false}
        onChange={() => null}
        isDisabled
      />,
    );
    expect(FormLabel).toHaveBeenCalledTimes(1);
    expect(FormLabel).toHaveBeenCalledWith(
      {
        inputId: 'testCheckbox',
        helpText: undefined,
        children: 'test checkbox',
        className: 'm-top-2xs m-right-0 m-bottom-0 m-left-0',
        isDisabled: true,
        isFieldRequired: false,
        requiredIndicator: ' *',
      },
      {},
    );
  });

  describe('Size', () => {
    test('calls FormLabel with the correct properties when size is small', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          size="sm"
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith(
        {
          inputId: 'testCheckbox',
          helpText: undefined,
          children: 'test checkbox',
          className: 'm-0',
          isDisabled: false,
          isFieldRequired: false,
          requiredIndicator: ' *',
        },
        {},
      );
    });
    test('calls FormLabel with the correct properties when size is large', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          size="lg"
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith(
        {
          inputId: 'testCheckbox',
          helpText: undefined,
          children: 'test checkbox',
          className: 'm-top-xs m-right-0 m-bottom-0 m-left-0',
          isDisabled: false,
          isFieldRequired: false,
          requiredIndicator: ' *',
        },
        {},
      );
    });

    const mockedHandleChange = jest.fn();
    const sizes = [
      'sm',
      'md',
      'lg',
    ];

    const breakpoints = ['tablet', 'desktop', 'hd'];

    sizes.forEach(size => {
      test(`it has a ${size} class applied to it`, () => {
        render(
          <CheckboxInput
            id="testId"
            onChange={mockedHandleChange}
            size={size}
            label="size test"
          />,
        );
        const checkbox = screen.getByLabelText('size test');
        const checkboxParent = checkbox.closest('div');
        expect(checkboxParent?.getAttribute('class')).toContain(size);
      });

      breakpoints.forEach(breakpoint => {
        test(`it applies responsive classes for breakpoint: ${breakpoint} and size: ${size}`, () => {
          render(
            <CheckboxInput
              id="testId"
              onChange={mockedHandleChange}
              size={{ [breakpoint]: size }}
              label="size test"
            />,
          );
          const checkbox = screen.getByLabelText('size test');
          const checkboxParent = checkbox.closest('div');

          expect(checkboxParent?.getAttribute('class')).toContain(`size-${size}-${breakpoint}`);
        });
      });
    });

    test('It applies responsive classes when multiple are applied', () => {
      render(
        <CheckboxInput
          id="testId"
          onChange={mockedHandleChange}
          size={{
            base: 'sm',
            tablet: 'md',
            desktop: 'lg',
            hd: 'sm',
          }}
          label="size test"
        />,
      );
      const checkbox = screen.getByLabelText('size test');
      const checkboxParent = checkbox.closest('div');

      expect(checkboxParent?.getAttribute('class')).toContain('size-sm');
      expect(checkboxParent?.getAttribute('class')).toContain('size-md-tablet');
      expect(checkboxParent?.getAttribute('class')).toContain('size-lg-desktop');
      expect(checkboxParent?.getAttribute('class')).toContain('size-sm-hd');
    });
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={mockedHandleChange}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange and passes checked value in event', () => {
      let value = true;
      const mockedHandleChange = jest.fn(event => {
        value = event.target.checked;
      });

      const { getByLabelText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          onChange={mockedHandleChange}
          isChecked={value}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toBeCalledTimes(1);
      expect(value).toBe(false);
    });
  });

  describe('onFocus', () => {
    test('onFocus event fires callback function if defined', () => {
      const mockedHandleFocus = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <CheckboxInput
            id="testCheckbox"
            label="test checkbox"
            isChecked={false}
            onChange={() => null}
            onFocus={mockedHandleFocus}
            onBlur={undefined}
          />
        </div>,
      );
      getByLabelText('test checkbox').focus();
      getByText('focus').focus();
      expect(mockedHandleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur', () => {
    test('onBlur event fires callback function if defined', () => {
      const mockedHandleBlur = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <CheckboxInput
            id="testCheckbox"
            label="test checkbox"
            isChecked={false}
            onChange={() => null}
            onBlur={mockedHandleBlur}
          />
        </div>,
      );
      getByLabelText('test checkbox').focus();
      getByText('focus').focus();
      expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
    });
  });
});
