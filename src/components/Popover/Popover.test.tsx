import React from 'react';
import { render, screen } from '@testing-library/react';
import Popover from './Popover';

describe('Popover', () => {
  describe('Default', () => {
    it('Renders a popover with default props', () => {
      render(<Popover>hello</Popover>);

      const popover = screen.getByText('hello');
      expect(popover).toBeInTheDocument();
    });
  });
});
