import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { ToastContainer } from './ToastContainer';
import { ToastPosition } from '.';
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

afterEach(cleanup);

describe('ToastContainer', () => {
  test('Default', () => {
    render(<ToastContainer data-testid="toast-container" />);

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  test('With toasts', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    toast('test blank toast');

    await expect(screen.getByText('test blank toast')).toBeInTheDocument();
  });

  describe('Positions', () => {
    const positions: ToastPosition[] = [
      'top-left',
      'top-right',
      'top-center',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ];

    positions.forEach(position => {
      test(`${position}`, async () => {
        render(<ToastContainer data-testid={`toast-container-${position}`} position={position} />);

        toast(`test blank toast ${position}`);

        expect(screen.getByTestId(`toast-container-${position}`)).toBeInTheDocument();

        await expect(screen.getByText(`test blank toast ${position}`)).toBeInTheDocument();

        const verticalStyle: React.CSSProperties = position.includes('top') ? { top: 0 } : { bottom: 0 };
        const horizontalStyle = {
          ...position.includes('center') && { justifyContent: 'center' },
          ...(!position.includes('center') && position.includes('right')) && { justifyContent: 'flex-end' },
        };

        expect(screen.getByTestId(`toast-container-${position}`).children[0]).toHaveStyle({
          ...verticalStyle,
          ...horizontalStyle,
        });
      });
    });

    positions.forEach(position => {
      test(`Custom toast positions ${position}`, async () => {
        render(<ToastContainer />);

        toast(`test custom position toast ${position}`, { position });

        await expect(screen.getByText(`test custom position toast ${position}`)).toBeInTheDocument();
      });
    });
  });

  describe('Toast Types', () => {
    test('success', async () => {
      render(<ToastContainer />);

      toast.success('test success toast');

      await expect(screen.getByText('test success toast')).toBeInTheDocument();
    });

    test('error', async () => {
      render(<ToastContainer />);

      toast.error('test error toast');

      await expect(screen.getByText('test error toast')).toBeInTheDocument();
    });

    test('loading', async () => {
      render(<ToastContainer />);

      toast.loading('test loading toast');

      await expect(screen.getByText('test loading toast')).toBeInTheDocument();
    });

    test('custom', async () => {
      render(<ToastContainer />);

      toast.custom(<p>test custom toast</p>);

      await expect(screen.getByText('test custom toast')).toBeInTheDocument();
    });

    test('async', async () => {
      render(<ToastContainer />);
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Date.now() % 2 === 0) {
            resolve('yay');
          } else {
            // eslint-disable-next-line
            reject('oh no!');
          }
        }, 1000);
      });
      toast.async(myPromise, {
        loading: 'loading...',
        success: data => `success ${data}`,
        error: err => `error ${err}`,
      });

      await expect(screen.getByText('loading...')).toBeInTheDocument();
    });

    test('with children function', async () => {
      render(<ToastContainer />);

      toast(t => (
        <span>
          Custom and
          <b>bold</b>
          <button type="button" onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </span>
      ));

      await expect(screen.getByText('Custom and')).toBeInTheDocument();
    });
  });

  test('compact', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    toast('test compact toast', { isCompact: true });

    await expect(screen.getByText('test compact toast')).toBeInTheDocument();
  });
});
