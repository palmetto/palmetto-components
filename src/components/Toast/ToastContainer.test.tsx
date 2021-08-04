import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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

function wait(t: number) {
  return new Promise(function(resolve) { 
      window.setTimeout(resolve, t)
  });
}

describe('ToastContainer', () => {
  afterEach(() => {
    cleanup();
  });

  test('Default', () => {
    render(<ToastContainer data-testid="toast-container-default" />);

    expect(screen.getByTestId('toast-container-default')).toBeInTheDocument();
  });

  test('With Toasts', () => {
    render(<ToastContainer data-testid="toast-container" />);
    act(() => {
      toast('test blank toast');
    });

    expect(screen.getByText('test blank toast')).toBeInTheDocument();

    jest.useFakeTimers();
    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });
  
    expect(screen.queryByText('test blank toast')).toBe(null);
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
      test(`${position}`, () => {
        render(<ToastContainer data-testid={`toast-container-${position}`} position={position} />);

        act(() => {
          toast(`test position toast ${position}`);
        });

        expect(screen.getByTestId(`toast-container-${position}`)).toBeInTheDocument();

        expect(screen.getByText(`test position toast ${position}`)).toBeInTheDocument();

        const verticalStyle: React.CSSProperties = position.includes('top') ? { top: 0 } : { bottom: 0 };
        const horizontalStyle = {
          ...position.includes('center') && { justifyContent: 'center' },
          ...(!position.includes('center') && position.includes('right')) && { justifyContent: 'flex-end' },
        };

        expect(screen.getByTestId(`toast-container-${position}`).children[0]).toHaveStyle({
          ...verticalStyle,
          ...horizontalStyle,
        });

        jest.useFakeTimers();
        act(() => {
          toast.dismiss();
          jest.advanceTimersByTime(1000);
        });

        expect(screen.queryByText(`test position toast ${position}`)).toBe(null);

      });
    });

    positions.forEach(position => {
      test(`Custom toast positions ${position}`, () => {
        render(<ToastContainer />);
  
        act(() => {
          toast(`test custom position toast ${position}`, { position });
        });

        expect(screen.getByText(`test custom position toast ${position}`)).toBeInTheDocument();

        jest.useFakeTimers();
        act(() => {
          toast.dismiss();
          jest.advanceTimersByTime(1000);
        });

        expect(screen.queryByText(`test custom position toast ${position}`)).toBe(null);
      });
    });
  });

  describe('Toast Types', () => {
    test('Success', () => {
      render(<ToastContainer />);

      act(() => {
        toast.success('test success toast');
      });

      expect(screen.getByText('test success toast')).toBeInTheDocument();

      jest.useFakeTimers();
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('test success toast')).toBe(null);
    });

    test('error', () => {
      render(<ToastContainer />);

      act(() => {
        toast.error('test error toast');
      });

      expect(screen.getByText('test error toast')).toBeInTheDocument();

      jest.useFakeTimers();
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('test error toast')).toBe(null);
    });

    test('Loading', () => {
      render(<ToastContainer />);

      act(() => {
        toast.loading('test loading toast');
      });

      expect(screen.getByText('test loading toast')).toBeInTheDocument();

      jest.useFakeTimers();
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('test loading toast')).toBe(null);
    });

    test('Custom', () => {
      render(<ToastContainer />);

      act(() => {
        toast.custom(<p>test custom toast</p>);
      });

      expect(screen.getByText('test custom toast')).toBeInTheDocument();

      jest.useFakeTimers();
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('test custom toast')).toBe(null);
    });

    test('Async Success', async () => {
      render(<ToastContainer />);
      let myPromise: Promise<string>;

      myPromise = new Promise(async (resolve) => {
        await wait(1000);
        resolve('yay');
      });

      act(() => {
        toast.async(myPromise, {
          loading: 'loading...',
          success: data => `success ${data}`,
          error: err => `error ${err}`,
        });
      });

      expect(screen.getByText('loading...')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => { expect(screen.getByText('success yay')).toBeInTheDocument() });
    });

    test('Async Error', async () => {
      render(<ToastContainer />);
      let myPromise: Promise<string>;

      myPromise = new Promise(async (_resolve, reject) => {
        await wait(1000);
        reject('boo');
      });

      act(() => {
        toast.async(myPromise, {
          loading: 'loading...',
          success: data => `success ${data}`,
          error: err => `error ${err}`,
        });
      });

      expect(screen.getByText('loading...')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => { expect(screen.getByText('error boo')).toBeInTheDocument() });
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

      expect(screen.getByText('Custom and')).toBeInTheDocument();

      jest.useFakeTimers();
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('Custom and')).toBe(null);
    });
  });

  test('Compact', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    act(() => {
      toast('test compact toast', { isCompact: true });
    });

    expect(screen.getByText('test compact toast')).toBeInTheDocument();
    expect(screen.getByText('test compact toast').parentElement).toHaveClass('p-v-sm', 'p-h-md');

    jest.useFakeTimers();
    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('test compact toast')).toBe(null);
  });

  test('Dismissing Toast', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    act(() => {
      toast('dismissing toast');
    });

    const closeIcon =  await screen.getByTestId('icon-testid--remove-light');
    const closeButton = closeIcon.closest('button');
    expect(closeButton).toBeInTheDocument();

    jest.useFakeTimers();
    if (closeButton) {
      await act(async () => {
        await fireEvent.click(closeButton);
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.queryByText('dismissing toast')).toBe(null);
  });

  test('Non-dismissable toast', async() => {
    render(<ToastContainer data-testid="toast-container" />);
  
    act(() => {
      toast('cannot dismiss', { canDismiss: false });
    });

    await waitFor(() => {
      expect(screen.getByText('cannot dismiss')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-testid--remove-light')).toBe(null);
    });

    jest.useFakeTimers();
    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });
  
    expect(screen.queryByText('cannot dismiss')).toBe(null);
  });


});
