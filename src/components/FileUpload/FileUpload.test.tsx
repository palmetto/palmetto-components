import React from 'react';
import { render, screen } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  describe('Default', () => {
    it('renders a file upload input with default props', () => {
      render(<FileUpload id="file-input" labelText="myFileUpload" onChange={() => null} />);

      const fileInput = screen.getByLabelText('myFileUpload');

      expect(fileInput).toBeInTheDocument();
    });
  });
});
