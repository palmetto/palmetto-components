import React from 'react';
import { render, screen } from '@testing-library/react';
import FormLabel from './FormLabel';

beforeEach(() => {
  console.error = jest.fn(); // eslint-disable-line no-console
});

afterEach(() => {
  console.error.mockRestore(); // eslint-disable-line no-console
});

describe('FormLabel', () => {
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

  test('correctly assigns an id when given an inputId', () => {
    render(<FormLabel inputId="myId" labelText="my label" hasError />);
    const labelElement = screen.getByText('my label');
    expect(labelElement).toHaveAttribute('id', 'myIdLabel');
  });
});
