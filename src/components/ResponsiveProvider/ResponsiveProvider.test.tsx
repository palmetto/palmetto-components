import React from 'react';
import { render } from '@testing-library/react';
import { ResponsiveProvider } from './ResponsiveProvider';
import { useWindowSize } from '../../hooks/useWindowSize/useWindowSize';
import { useBreakpoint } from '../../hooks/useBreakpoint/useBreakpoint';

describe('Default', () => {
  test('calls resize when initially mounted', async () => {
    const mockEventListener = jest.spyOn(window, 'addEventListener');
    mockEventListener.mockImplementation(() => {}); // eslint-disable-line

    render(<ResponsiveProvider><div /></ResponsiveProvider>);

    expect(mockEventListener.mock.calls.filter(call => call[0] === 'resize').length).toEqual(1);
  });
});

describe('Responsive hooks', () => {
  it('registers one resize handler with useWindowSize', () => {
    const mockEventListener = jest.spyOn(window, 'addEventListener');
    mockEventListener.mockImplementation(() => {}); // eslint-disable-line

    const Component = () => {
      useWindowSize();
      return <p />;
    };

    render(
      <ResponsiveProvider>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ResponsiveProvider>,
    );
    expect(mockEventListener.mock.calls.filter(call => call[0] === 'resize').length).toEqual(1);
  });

  it('registers one resize handler with useBreakpoint', () => {
    const mockEventListener = jest.spyOn(window, 'addEventListener');
    mockEventListener.mockImplementation(() => {}); // eslint-disable-line

    const Component = () => {
      useBreakpoint();
      return <p />;
    };

    render(
      <ResponsiveProvider>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ResponsiveProvider>,
    );
    expect(mockEventListener.mock.calls.filter(call => call[0] === 'resize').length).toEqual(1);
  });
});
