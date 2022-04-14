import React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <Drawer isOpen ariaLabel="testDefault">
        test drawer
      </Drawer>,
    );
    expect(getByText('test drawer')).toBeInTheDocument();
  });

  test('it open and closes based on isOpen prop', () => {
    const { queryByText, getByText, rerender } = render(
      <Drawer isOpen={false} ariaLabel="testIsOpen">
        test drawer
      </Drawer>,
    );

    expect(queryByText('test modal')).toBe(null);

    rerender(
      <Drawer isOpen ariaLabel="testIsOpen">
        test drawer
      </Drawer>,
    );

    expect(getByText('test drawer')).toBeInTheDocument();
  });

  test('it applies the ariaLabel', () => {
    const { getByLabelText } = render(
      <Drawer isOpen ariaLabel="label test">
        test drawer
      </Drawer>,
    );
    expect(getByLabelText('label test')).toBeInTheDocument();
  });
});
