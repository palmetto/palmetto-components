import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';
import TOGGLE_SIZES from './Toggle.constants';

describe('Toggle', () => {
  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <Toggle id="testToggle" label="test toggle" isChecked={false} onChange={() => null} />,
    );
    const toggle = getByLabelText('test toggle');

    expect(toggle.checked).toBe(false);
    expect(toggle.disabled).toBe(false);
    expect(toggle.getAttribute('aria-invalid')).toBe('false');
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <Toggle id="testToggle" label="test toggle" onChange={() => null} isChecked />,
    );
    const toggle = getByLabelText('test toggle');
    expect(toggle.checked).toEqual(true);
  });

  test('input is not checked when isChecked is false', () => {
    const { getByLabelText } = render(
      <Toggle id="testToggle" label="test toggle" isChecked={false} onChange={() => null} />,
    );
    const toggle = getByLabelText('test toggle');
    expect(toggle.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute', () => {
    const { getByLabelText } = render(
      <Toggle id="testInput" label="test label" value="hello" onChange={() => null} />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-labelledby', 'testInputLabel');
  });

  test('aria-label is assigned if label is hidden', () => {
    const { getByLabelText } = render(
      <Toggle
        id="testInput"
        label="hidden test label"
        hideLabel
        value="hello"
        onChange={() => null}
      />,
    );
    expect(getByLabelText('hidden test label')).toBeInTheDocument();
  });

  test('HelpText is rendered when set', () => {
    const { getByText } = render(
      <Toggle
        id="testInput"
        label="test label"
        helpText="help text"
        value="hello"
        onChange={() => null}
      />,
    );
    expect(getByText('help text')).toBeInTheDocument();
  });

  describe('error states', () => {
    test('renders error message if error exists and is not true', () => {
      const { getByText } = render(
        <Toggle
          id="testToggle"
          label="test toggle"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(getByText('This is the error message')).toBeInTheDocument();
    });
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <Toggle
          id="testToggle"
          label="test toggle"
          isChecked={false}
          onChange={mockedHandleChange}
        />,
      );
      const toggle = getByLabelText('test toggle');
      fireEvent.click(toggle);
      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange and passes checked value in event', () => {
      let value = true;
      const mockedHandleChange = jest.fn(event => {
        value = event.target.checked;
      });

      const { getByLabelText } = render(
        <Toggle
          id="testToggle"
          label="test toggle"
          onChange={mockedHandleChange}
          isChecked={value}
        />,
      );
      const toggle = getByLabelText('test toggle');
      fireEvent.click(toggle);
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
          <Toggle
            id="testToggle"
            label="test toggle"
            isChecked={false}
            onChange={() => null}
            onFocus={mockedHandleFocus}
            onBlur={undefined}
          />
        </div>,
      );
      getByLabelText('test toggle').focus();
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
          <Toggle
            id="testToggle"
            label="test toggle"
            isChecked={false}
            onChange={() => null}
            onBlur={mockedHandleBlur}
          />
        </div>,
      );
      getByLabelText('test toggle').focus();
      getByText('focus').focus();
      expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sizes', () => {
    TOGGLE_SIZES.map(size => test(`it has a ${size} class applied to the toggle thumb and track`, () => {
      const { getByTestId } = render(
        <Toggle
          id="testToggle"
          label={`test ${size} toggle`}
          isChecked={false}
          onChange={() => null}
          size={size}
        />,
      );

      expect(getByTestId('toggleTrack').getAttribute('class')).toContain(`track-${size}`);
      expect(getByTestId('toggleThumb').getAttribute('class')).toContain(`thumb-${size}`);
    }),
    );
  });
});
