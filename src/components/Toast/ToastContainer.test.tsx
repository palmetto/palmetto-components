import React from 'react';
import {
  screen,
  render,
  fireEvent,
  act,
} from '@testing-library/react';
import { ToastContainer } from './ToastContainer';
import { toast } from './toast';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ToastContainer', () => {
  test('Default', async () => {
    act(() => {
      render(<ToastContainer />);
    });

    act(() => {
      toast('blank test toast');
    });

    // jest.useFakeTimers();

    await new Promise(res => setTimeout(res, 2000));
    expect(screen.getByText('blank test toast')).toBeInTheDocument();

    // jest.runAllTimers();
  }, 3000);

});