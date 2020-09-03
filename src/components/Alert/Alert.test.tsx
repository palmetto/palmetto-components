import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert', () => {
  describe('States', () => {
    test('It renders an alert with a simple text message', () => {
      const message = 'Hello world!';
      render(<Alert message={message} />);

      const alert = screen.getByText(message);
      expect(alert).toBeInTheDocument();
    });
  });
});
