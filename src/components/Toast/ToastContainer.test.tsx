import { act, cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { ToastPosition } from '.';
import { toast } from './toast';
import { ToastContainer } from './ToastContainer';

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

  test('With Toasts', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    act(() => {
      toast('test blank toast');
    });

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

        act(() => {
          toast(`test blank toast ${position}`);
        });

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

        act(() => {
          toast(`test custom position toast ${position}`, { position });
        });

        await expect(screen.getByText(`test custom position toast ${position}`)).toBeInTheDocument();
      });
    });
  });

  describe('Toast Types', () => {
    test('Success', async () => {
      render(<ToastContainer />);

      act(() => {
        toast.success('test success toast');
      });

      await expect(screen.getByText('test success toast')).toBeInTheDocument();
    });

    test('error', async () => {
      render(<ToastContainer />);

      act(() => {
        toast.error('test error toast');
      });

      await expect(screen.getByText('test error toast')).toBeInTheDocument();
    });

    test('Loading', async () => {
      render(<ToastContainer />);

      act(() => {
        toast.loading('test loading toast');
      });

      await expect(screen.getByText('test loading toast')).toBeInTheDocument();
    });

    test('Custom', async () => {
      render(<ToastContainer />);

      act(() => {
        toast.custom(<p>test custom toast</p>);
      });

      await expect(screen.getByText('test custom toast')).toBeInTheDocument();
    });

    test('Async', async () => {
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

      act(() => {
        toast.async(myPromise, {
          loading: 'loading...',
          success: data => `success ${data}`,
          error: err => `error ${err}`,
        });
      });

      await expect(screen.getByText('loading...')).toBeInTheDocument();
    });

    test('With children function', async () => {
      render(<ToastContainer />);

      act(() => {
        toast(t => (
          <span>
            Custom and
            <b>bold</b>
            <button type="button" onClick={() => toast.dismiss(t.id)}>Dismiss</button>
          </span>
        ));
      });

      await expect(screen.getByText('Custom and')).toBeInTheDocument();
    });
  });

  test('Compact', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    act(() => {
      toast('test compact toast', { isCompact: true });
    });

    await expect(screen.getByText('test compact toast')).toBeInTheDocument();
  });

  // test('Dismissing Toast', async () => {
  //   render(<ToastContainer data-testid="toast-container" />);

  //   toast('dismissing toast');

  //   const toastElement =  await screen.getByText('dismissing toast');
  //   console.log(toastElement);
  // });
});
