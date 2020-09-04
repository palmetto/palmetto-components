import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert', () => {
  describe('Default', () => {
    test('It renders an alert with a simple text message', () => {
      const message = 'Hello world!';
      render(<Alert message={message} />);

      const alert = screen.getByText(message);
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Types', () => {
    test('It renders with specific classes based on the type prop', () => {
      const message = 'Hello world!';
      const types = [
        'info',
        'success',
        'warning',
        'danger',
      ];

      const { rerender } = render(<Alert message={message} />);

      types.forEach(type => {
        rerender(<Alert message={message} type={type} />);
        const alert = screen.getByText(message);
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass(type);
      });
    });
  });
});
