import React from 'react';
import { render } from '@testing-library/react';
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

  test('Matches the snapshot for component with default props', () => {
    const { asFragment } = render(<FormLabel inputId="myId" labelText="hello world" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for component with isRequired prop', () => {
    const { asFragment } = render(<FormLabel inputId="myId" labelText="hello world" isRequired />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for component with hasError prop', () => {
    const { asFragment } = render(<FormLabel inputId="myId" labelText="hello world" hasError />);
    expect(asFragment()).toMatchSnapshot();
  });
});
