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
  return new Promise(resolve => {
    window.setTimeout(resolve, t);
  });
}

describe('Toast', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    jest.useFakeTimers();
    Element.prototype.getBoundingClientRect = jest.fn(() => (
      {
        width: 300,
        height: 50,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {}, // eslint-disable-line
      }
    ));
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  test('Default', () => {
    render(<ToastContainer data-testid="toast-container-default" />);

    expect(screen.getByTestId('toast-container-default')).toBeInTheDocument();
  });

  test('With Children', () => {
    render(
      <ToastContainer
        data-testid="toast-container-children"
        // eslint-disable-next-line
        children={t => <button type="button">{t.message}</button>}
      />,
    );

    act(() => {
      toast('test with children function');
    });

    expect(screen.getByText('test with children function').closest('button')).toBeInTheDocument();

    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('test with children function')).toBe(null);
  });

  test('With Toasts', () => {
    render(<ToastContainer data-testid="toast-container" />);
    act(() => {
      toast('test blank toast');
    });

    expect(screen.getByText('test blank toast')).toBeInTheDocument();

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

      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('test custom toast')).toBe(null);
    });

    test('Async Success', async () => {
      render(<ToastContainer />);

      const myPromise = new Promise(async resolve => { // eslint-disable-line no-async-promise-executor
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
        jest.useRealTimers();
      });

      await waitFor(() => { expect(screen.getByText('success yay')).toBeInTheDocument(); });
    });

    test('Async Error', async () => {
      render(<ToastContainer />);

      const myPromise = new Promise(async (_resolve, reject) => { // eslint-disable-line no-async-promise-executor
        await wait(1000);
        reject('boo'); // eslint-disable-line prefer-promise-reject-errors
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
        jest.useRealTimers();
      });

      await waitFor(() => { expect(screen.getByText('error boo')).toBeInTheDocument(); });
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
    expect(screen.getByText('test compact toast').parentElement).toHaveClass('p-sm');

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

    const closeIcon = await screen.getByTestId('icon-testid--remove-light');
    const closeButton = closeIcon.closest('button');
    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
      await act(async () => {
        await fireEvent.click(closeButton);
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.queryByText('dismissing toast')).toBe(null);
  });

  test('Non-dismissable toast', async () => {
    render(<ToastContainer data-testid="toast-container" />);

    act(() => {
      toast('cannot dismiss', { canDismiss: false });
    });

    await waitFor(() => {
      expect(screen.getByText('cannot dismiss')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-testid--remove-light')).toBe(null);
    });

    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('cannot dismiss')).toBe(null);
  });

  test('Dismiss a single toast', () => {
    render(<ToastContainer data-testid="toast-container" />);

    let toastId: string;

    act(() => {
      toast('multiple toasts 1');
      jest.advanceTimersByTime(1500);
      toastId = toast('multiple toasts 2');
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('multiple toasts 1')).toBeInTheDocument();
    expect(screen.getByText('multiple toasts 2')).toBeInTheDocument();

    act(() => {
      toast.dismiss(toastId);
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('multiple toasts 1')).toBeInTheDocument();
    expect(screen.queryByText('multiple toasts 2')).toBe(null);

    // cleanup -- dismiss remaining toast.
    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });
  });

  describe('Duration', () => {
    /**
     * Based on a default duration time for each toast,
     * we track the state of the toast at various points in time.
     */
    test('Default duration -- blank toast', async () => {
      render(<ToastContainer />);

      act(() => { toast('default timeout blank toast'); });
      expect(screen.getByText('default timeout blank toast')).toBeInTheDocument();

      // After 3000ms nothing should have changed.
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByText('default timeout blank toast')).toBeInTheDocument();

      // After 4000ms (3000 + 1000) the toast should still be in the DOM,
      // but not visible. We confirm this with the `not-visible` class.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.getByText('default timeout blank toast')?.parentElement)
        .toHaveClass('toast-notification--not-visible');

      // After another 1000ms the toast is cleared from the DOM completely (after animation is done).
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.queryByText('default timeout blank toast')).toBe(null);
    });

    test('Default duration -- error toast', async () => {
      render(<ToastContainer />);

      act(() => { toast.error('default timeout error toast'); });
      expect(screen.getByText('default timeout error toast')).toBeInTheDocument();

      // After 3000ms nothing should have changed.
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByText('default timeout error toast')).toBeInTheDocument();

      // After 4000ms (3000 + 1000) the toast should still be in the DOM,
      // but not visible. We confirm this with the `not-visible` class.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.getByText('default timeout error toast')?.parentElement)
        .toHaveClass('toast-notification--not-visible');

      // After another 1000ms the toast is cleared from the DOM completely (after animation is done).
      act(() => { jest.advanceTimersByTime(1000); });

      expect(screen.queryByText('default timeout error toast')).toBe(null);
    });
    test('Default duration -- success toast', async () => {
      render(<ToastContainer />);

      act(() => { toast.success('default timeout success toast'); });
      expect(screen.getByText('default timeout success toast')).toBeInTheDocument();

      // After 1000ms nothing should have changed.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.getByText('default timeout success toast')).toBeInTheDocument();

      // After 2000ms (1000 + 1000) the toast should still be in the DOM,
      // but not visible. We confirm this with the `not-visible` class.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.getByText('default timeout success toast')?.parentElement)
        .toHaveClass('toast-notification--not-visible');

      // After another 1000ms the toast is cleared from the DOM completely (after animation is done).
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.queryByText('default timeout success toast')).toBe(null);
    });
    test('Default duration -- loading toast', async () => {
      render(<ToastContainer />);

      act(() => { toast.loading('default timeout loading toast'); });
      expect(screen.getByText('default timeout loading toast')).toBeInTheDocument();

      // After any amount of time nothing should have changed.
      act(() => { jest.advanceTimersByTime(999999); });
      expect(screen.getByText('default timeout loading toast')).toBeInTheDocument();

      // Toast can be dismissed programmatically, however.
      act(() => {
        toast.dismiss();
        jest.advanceTimersByTime(1000);
      });
      expect(screen.queryByText('default timeout loading toast')).toBe(null);
    });
    test('With a custom duration on the container', async () => {
      render(<ToastContainer toastOptions={{ duration: 10000 }} />);

      act(() => { toast('custom timeout on container toast'); });
      expect(screen.getByText('custom timeout on container toast')).toBeInTheDocument();

      // After 8000ms nothing should have changed.
      act(() => { jest.advanceTimersByTime(8000); });
      expect(screen.getByText('custom timeout on container toast')).toBeInTheDocument();

      // after 10000ms toast should be in DOM but not visible.
      act(() => { jest.advanceTimersByTime(2000); });
      expect(screen.getByText('custom timeout on container toast')?.parentElement)
        .toHaveClass('toast-notification--not-visible');

      // after another 1000ms the toast should be removed from the DOM.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.queryByText('custom timeout on container toast')).toBe(null);
    });
    test('Overriding container duration in single toast', async () => {
      render(<ToastContainer />);

      act(() => { toast('custom timeout on individual toast', { duration: 10000 }); });
      expect(screen.getByText('custom timeout on individual toast')).toBeInTheDocument();

      // After 8000ms nothing should have changed.
      act(() => { jest.advanceTimersByTime(8000); });
      expect(screen.getByText('custom timeout on individual toast')).toBeInTheDocument();

      // after 10000ms toast should be in DOM but not visible.
      act(() => { jest.advanceTimersByTime(2000); });
      expect(screen.getByText('custom timeout on individual toast')?.parentElement)
        .toHaveClass('toast-notification--not-visible');

      // after another 1000ms the toast should be removed from the DOM.
      act(() => { jest.advanceTimersByTime(1000); });
      expect(screen.queryByText('custom timeout on individual toast')).toBe(null);
    });
  });

  test('Removing Toast', () => {
    render(<ToastContainer data-testid="toast-container" />);
    let toastId: string;

    act(() => {
      toastId = toast('test remove toast');
    });

    expect(screen.getByText('test remove toast')).toBeInTheDocument();

    act(() => {
      toast.remove(toastId);
    });

    expect(screen.queryByText('test remove toast')).toBe(null);
  });

  test('Pause duration on mouseover', async () => {
    render(<ToastContainer />);

    act(() => { toast('default timeout blank toast'); });
    expect(screen.getByText('default timeout blank toast')).toBeInTheDocument();

    // Mousing over the element should delay the duration until toast is dismissed
    await fireEvent.mouseOver(screen.getByText('default timeout blank toast'));

    // Toast should still be present since user has moused over it.
    act(() => { jest.advanceTimersByTime(99999); });
    expect(screen.getByText('default timeout blank toast')).toBeInTheDocument();

    // Mouse out should re-start timer.
    await fireEvent.mouseOut(screen.getByText('default timeout blank toast'));

    // After 3000ms nothing should have changed.
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('default timeout blank toast')).toBeInTheDocument();

    // After 4000ms (3000 + 1000) the toast should still be in the DOM,
    // but not visible. We confirm this with the `not-visible` class.
    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.getByText('default timeout blank toast')?.parentElement)
      .toHaveClass('toast-notification--not-visible');

    // After another 1000ms the toast is cleared from the DOM completely (after animation is done).
    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.queryByText('default timeout blank toast')).toBe(null);
  });

  test('Toasts in reverse order', () => {
    render(<ToastContainer data-testid="toast-container" reverseOrder />);
    act(() => {
      toast('test reverse order');
    });

    expect(screen.getByText('test reverse order')).toBeInTheDocument();

    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('test reverse order')).toBe(null);
  });

  test('Update Existing Toast', () => {
    render(<ToastContainer />);
    let toastId: string;

    act(() => {
      toastId = toast('test update toast');
    });

    expect(screen.getByText('test update toast')).toBeInTheDocument();

    act(() => {
      toast.success('updated to success', { id: toastId });
    });

    expect(screen.queryByText('test update toast')).toBe(null);
    expect(screen.getByText('updated to success')).toBeInTheDocument();

    act(() => {
      toast.remove();
    });

    expect(screen.queryByText('updated to success')).toBe(null);
  });

  test('Update after dismiss', () => {
    render(<ToastContainer />);
    let toastId: string;

    act(() => {
      toastId = toast('update after dismiss');
    });

    expect(screen.getByText('update after dismiss')).toBeInTheDocument();

    act(() => {
      toast.dismiss(toastId);
      jest.advanceTimersByTime(100);
    });

    act(() => {
      toast.success('updated after dismiss to success', { id: toastId });
    });

    expect(screen.queryByText('update after dismiss')).toBe(null);
    expect(screen.getByText('updated after dismiss to success')).toBeInTheDocument();

    act(() => {
      toast.remove();
    });

    expect(screen.queryByText('updated after dismiss to success')).toBe(null);
  });

  test('Dismiss toast that is already in dismiss queue', () => {
    render(<ToastContainer data-testid="toast-container" />);
    act(() => {
      toast('dismiss twice');
    });

    expect(screen.getByText('dismiss twice')).toBeInTheDocument();

    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(100);
    });

    act(() => {
      toast.dismiss();
      jest.advanceTimersByTime(900);
    });

    expect(screen.queryByText('dismiss twice')).toBe(null);
  });
});
