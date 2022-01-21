import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';

describe('Alert', () => {
  describe('Default', () => {
    test('It renders an alert with a simple text message', () => {
      const message = 'Hello world!';
      render(<Alert message={message} />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      const alertMessage = screen.getByText(message);
      expect(alertMessage).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    ALERT_VARIANTS.map((variant, index) => test(`renders variant background color ${ALERT_VARIANTS[index]}`, () => {
      const { getByRole } = render(<Alert variant={variant} message={variant} key={variant} />);
      expect(getByRole('alert').classList).toContain(
        `alert__${variant}`,
      );
    }));
  });

  describe('Custom Class', () => {
    test('It renders with a custom class if provided', () => {
      const message = 'Hello world!';
      render(<Alert message={message} className="custom-class" />);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('With Icon', () => {
    test('It shows a relevant icon when passed the `hasIcon` prop', () => {
      const message = 'Hello world!';
      const variants = ['info' as const, 'success' as const, 'warning' as const, 'danger' as const];

      const { rerender } = render(<Alert message={message} />);

      variants.forEach(variant => {
        rerender(<Alert message={message} variant={variant} hasIcon />);
        const alertIcon = screen.getByTestId(`alert-icon-${variant}-test-id`);
        expect(alertIcon).toBeInTheDocument();
      });
    });
  });

  describe('With Title', () => {
    test('It renders an alert with a title if passed', () => {
      const message = 'Hello world!';
      const title = 'title';
      render(<Alert title={title} message={message} />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      const alertTitle = screen.getByText(title);
      expect(alertTitle).toBeInTheDocument();
    });
  });

  describe('With Custom JSX', () => {
    test('It renders custom JSX if passed to the message prop', () => {
      const jsxMessage: ReactNode = <button type="button">I am a button!</button>;

      render(<Alert message={jsxMessage} />);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');
    });

    test('It renders custom JSX if a render prop is passed with a render function', () => {
      const jsxRenderProp = (): ReactNode => <button type="button">I am a button!</button>;

      render(<Alert render={jsxRenderProp} />);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');
    });

    test('Render prop supersedes message prop', () => {
      const jsxRenderProp = (): ReactNode => <button type="button">I am a button!</button>;
      const message = 'Hello world!';

      render(<Alert render={jsxRenderProp} message={message} />);

      const alertButton = screen.getByRole('button');
      expect(alertButton).toBeInTheDocument();
      expect(alertButton.textContent).toBe('I am a button!');

      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });

  describe('Closable Alert', () => {
    test('It renders a close icon if `isClosable` prop is passed', () => {
      const message = 'I am closable!';
      const { rerender } = render(<Alert message={message} />);

      const noCloseButton = screen.queryByTestId('alert-close-icon-test-id');
      expect(noCloseButton).not.toBeInTheDocument();

      rerender(<Alert message={message} isClosable />);
      const closeButton = screen.queryByTestId('alert-close-icon-test-id');
      expect(closeButton).toBeInTheDocument();
    });

    test('It renders with custom close text if closeText prop is passed', () => {
      const message = 'I am closable too!';
      render(<Alert message={message} isClosable closeText="Close me!" />);

      const closeButton = screen.queryByText('Close me!');
      expect(closeButton).toBeInTheDocument();
    });

    test('It fires a callback if onClose prop is passed', () => {
      const message = 'I am closable too!';
      const mockOnClose = jest.fn();

      const { rerender } = render(<Alert message={message} isClosable onClose={mockOnClose} />);

      const closeButton = screen.queryByTestId('alert-close-icon-test-id');
      if (closeButton) fireEvent.click(closeButton);
      expect(mockOnClose).toBeCalledTimes(1);
      mockOnClose.mockReset();

      rerender(<Alert message={message} isClosable onClose={mockOnClose} closeText="close" />);
      const closeButtonSpan = screen.getByText('close');
      if (closeButtonSpan) {
        fireEvent.click(closeButtonSpan); // 1
        fireEvent.keyUp(closeButtonSpan, { keyCode: 13 }); // 2
        fireEvent.keyUp(closeButtonSpan, { keyCode: 13 }); // 3
        fireEvent.keyUp(closeButtonSpan, { keyCode: 30 }); // No-op
        fireEvent.keyUp(closeButtonSpan, { keyCode: 30 }); // No-op
      }
      expect(mockOnClose).toBeCalledTimes(3);
      mockOnClose.mockReset();

      rerender(<Alert message={message} isClosable closeText="close" />);
      const closeButtonNotClickable = screen.getByText('close');
      if (closeButtonNotClickable) {
        fireEvent.click(closeButtonSpan); // No-op
        fireEvent.keyUp(closeButtonSpan, { keyCode: 13 }); // No-op
        fireEvent.keyUp(closeButtonSpan, { keyCode: 30 }); // No-op
      }
      expect(mockOnClose).toBeCalledTimes(0);
    });
  });

  describe('Compact', () => {
    test('It renders with the compact class when isCompact prop is true', () => {
      const message = 'Hello world!';
      render(<Alert message={message} isCompact />);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('p-xs');
    });
  });
});
