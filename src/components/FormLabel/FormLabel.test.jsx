import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormLabel from './FormLabel';

beforeEach(() => {
  console.error = jest.fn(); // eslint-disable-line no-console
});

afterEach(() => {
  console.error.mockRestore(); // eslint-disable-line no-console
});

describe('FormLabel', () => {
  test('Throws error if required prop "inputId" is not supplied to component', () => {
    render(<FormLabel labelText="hello" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `inputId`');
  });

  test('Throws error if required prop "labelText" is not supplied to component', () => {
    render(<FormLabel inputId="myId" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `labelText`');
  });

  test('Label correctly renders with base props', () => {
    render(<FormLabel inputId="myId" labelText="my label" />);
    const labelElement = screen.getByText('my label');
    expect(labelElement).toHaveAttribute('for', 'myId');
    expect(labelElement).toHaveTextContent('my label');
  });

  test('Label correctly renders with askterisk if field is required', () => {
    render(<FormLabel inputId="myId" labelText="my label" isFieldRequired />);
    const labelElement = screen.getByText('my label');
    expect(labelElement).toHaveTextContent('*');
  });

  test('Label correctly renders with error class if field has eror', () => {
    render(<FormLabel inputId="myId" labelText="my label" hasError />);
    const labelElement = screen.getByText('my label');
    expect(labelElement.getAttribute('class')).toContain('error');
  });
});
