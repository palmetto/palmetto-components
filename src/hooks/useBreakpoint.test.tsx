import React from 'react';
import { render } from '@testing-library/react';
import useBreakpoint from './useBreakpoint';

const UseBreakpointExample = () => {
  const breakpoint = useBreakpoint();

  return <button type="button">{breakpoint.name}</button>;
};

describe('initial state', () => {
  test('the component renders with the default breakpoint (jest jsdom)', () => {
    const { getByRole } = render(<UseBreakpointExample />);

    const myButton = getByRole('button');

    expect(myButton).toHaveTextContent('base');
  });
});
