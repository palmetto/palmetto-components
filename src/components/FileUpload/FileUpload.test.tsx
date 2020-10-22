import React, { FC } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  describe('Default', () => {
    it('renders a file upload input with default props', () => {
      render(<FileUpload id="file-input" labelText="myFileUpload" name="file-input" onChange={() => null} />);

      const fileInput = screen.getByLabelText('myFileUpload');
      const button = screen.getByText('Upload File').closest('button');
      const uploadIcon = screen.getByTestId('file-upload__upload-icon');

      expect(fileInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('light', 'md');
      expect(uploadIcon).toBeInTheDocument();
    });
  });

  describe('Button Variations', () => {
    it('renders a file upload button in different styles based on props', () => {
      interface Props { color?: 'dark' | 'light'; size?: 'sm' | 'md' | 'lg'; }
      const UploadComponent: FC<Props> = ({ color = 'light', size = 'md' }) => (
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          variant={color}
          size={size}
        />
      );
      const { rerender } = render(<UploadComponent />);
      let button;
      button = screen.getByText('Upload File').closest('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('light', 'md');

      rerender(<UploadComponent size="sm" color="dark" />);
      button = screen.getByText('Upload File').closest('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('dark', 'sm');

      rerender(<UploadComponent size="lg" color="dark" />);
      button = screen.getByText('Upload File').closest('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('dark', 'lg');
    });

    it('renders with no icon when boolean false is passed to `hasIcon`', () => {
      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          hasIcon={false}
        />,
      );

      const uploadIcon = screen.queryByTestId('file-upload__upload-icon');
      expect(uploadIcon).toBe(null);
    });

    it('renders a fullwidth input/button when prop is passed', () => {
      const { container } = render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          hasIcon={false}
          fullWidth
        />,
      );

      const button = screen.getByText('Upload File').closest('button');
      expect(button).toHaveClass('full-width');
      expect(container.children[0]).toHaveClass('w-100');
    });

    it('renders a disabled input/button when prop is passed', () => {
      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          isDisabled
        />,
      );

      const button = screen.getByText('Upload File').closest('button');
      const fileInput = screen.getByLabelText('myFileUpload');
      expect(button).toHaveAttribute('disabled', '');
      expect(fileInput).toHaveAttribute('disabled', '');
    });
  });

  describe('Callback Handling', () => {
    it('It fires an onChange callback when the input onchange event is triggered', () => {
      const mockedHandleChange = jest.fn();
      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={mockedHandleChange}
          hasIcon={false}
        />,
      );

      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      const fileUploadInput = screen.getByLabelText('myFileUpload');
      fireEvent.change(fileUploadInput, { target: { files: [file] } });

      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    it('fires the onClear callback when clear button is clicked', () => {
      const mockedHandleClear = jest.fn();
      const file = new File(['(⌐□_□)'], 'super-duper--duper-long-file-name.png', { type: 'image/png' });
      const fileList: any = []; // eslint-disable-line
      fileList[0] = file;
      fileList.item = (index: number) => fileList[index];

      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          files={fileList}
          onClearFiles={mockedHandleClear}
        />,
      );

      const clearButton = screen.getByText('Clear');

      expect(clearButton).toBeInTheDocument();
      fireEvent.click(clearButton);
      expect(mockedHandleClear).toBeCalledTimes(1);
    });
  });

  describe('Open File Reader', () => {
    it('opens the native filereader when button is clicked', () => {
      render(<FileUpload id="file-input" labelText="myFileUpload" name="file-input" onChange={() => null} />);

      const button = screen.getByText('Upload File').closest('button');

      if (button) {
        fireEvent.click(button);
      }

      expect(button).toBeInTheDocument();
    });
  });

  describe('Showing Files', () => {
    it('File names shown when filelist is passed', () => {
      const file = new File(['(⌐□_□)'], 'super-duper--duper-long-file-name.png', { type: 'image/png' });
      const fileList: any = []; // eslint-disable-line
      fileList[0] = file;
      fileList.item = (index: number) => fileList[index];

      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          files={fileList}
        />,
      );

      const fileName = screen.getByText('super-duper--duper-long-file-name.png');

      expect(fileName).toBeInTheDocument();
    });

    it('File names are truncated based on fileNameMaxLength prop', () => {
      const file = new File(['(⌐□_□)'], 'super-duper--duper-long-file-name.png', { type: 'image/png' });
      const fileList: any = []; // eslint-disable-line
      fileList[0] = file;
      fileList.item = (index: number) => fileList[index];

      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          fileNameMaxLength={10}
          files={fileList}
        />,
      );

      const fileName = screen.getByText('super...e.png');

      expect(fileName).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('is marked as required input when isRequired prop is passed', () => {
      render(
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          isRequired
        />,
      );

      const fileInput = screen.getByLabelText('myFileUpload');

      expect(fileInput).toHaveAttribute('required');
    });

    it('is shows an error when prop is passed', () => {
      interface Props { size?: 'sm' | 'md' | 'lg'; }
      const UploadComponent: FC<Props> = ({ size = 'md' }) => (
        <FileUpload
          id="file-input"
          labelText="myFileUpload"
          name="file-input"
          onChange={() => null}
          error="you did something wrong"
          size={size}
        />
      );
      const { rerender } = render(<UploadComponent />);
      let error;
      error = screen.getByText('you did something wrong');

      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('font-size-sm');

      rerender(<UploadComponent size="sm" />);

      error = screen.getByText('you did something wrong');

      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('font-size-xs');

      rerender(<UploadComponent size="lg" />);

      error = screen.getByText('you did something wrong');

      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('font-size-md');
    });
  });
});
