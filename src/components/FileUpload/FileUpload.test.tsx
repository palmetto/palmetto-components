import React from 'react';
import { render, screen } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  describe('Default', () => {
    it('renders a file upload input with default props', () => {
      render(<FileUpload label="file-input" id="file-input" />);

      const fileInput = screen.getByLabelText('file-input');

      expect(fileInput).toBeInTheDocument();
    });
  });
});
