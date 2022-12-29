import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { useOpenClose, UseOpenCloseProps } from './useOpenClose';
import { Details } from '../../components/Details/Details';

const mockedOnOpen = jest.fn(() => null);
const mockedOnClose = jest.fn(() => null);

const UseOpenCloseExample = (props: UseOpenCloseProps) => {
  const { isOpen, handleToggle } = useOpenClose({ ...props });

  return (
    <Details isOpen={isOpen}>
      <Details.Summary
        isDetailsOpen={isOpen}
        onToggle={handleToggle}
        display="inline"
      >
        Details Summary
      </Details.Summary>
      <div data-testid="details-content">
        We are on a mission to stop climate change before we reach an
        irreversible tipping point.
      </div>
    </Details>
  );
};

describe('useOpenClose', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('initial state', () => {
    test('component does not render the disclosure by default', () => {
      const { getByText, getByTestId } = render(<UseOpenCloseExample />);

      const myButton = getByText('Details Summary');

      expect(myButton).toBeInTheDocument();
      expect(getByTestId('details-content')).not.toBeVisible();
    });
    test('component shows and hides the disclosure when toggle is pressed', () => {
      render(<UseOpenCloseExample />);

      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).toBeVisible();

      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).not.toBeVisible();
    });
  });

  describe('callbacks', () => {
    test('onOpen callback is called when toggle is run', () => {
      render(<UseOpenCloseExample onOpen={mockedOnOpen} />);

      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).toBeVisible();

      expect(mockedOnOpen).toHaveBeenCalledTimes(1);
    });
    test('onClose callback is called when toggle is run', () => {
      render(<UseOpenCloseExample onClose={mockedOnClose} defaultIsOpen />);

      expect(screen.getByTestId('details-content')).toBeVisible();
      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).not.toBeVisible();
      expect(mockedOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('controlled', () => {
    test('does not close when toggle is called when isOpen', () => {
      render(<UseOpenCloseExample isOpen />);

      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).toBeVisible();
    });
    test('calls onClose, but does not call onOpen when isOpen', () => {
      render(
        <UseOpenCloseExample
          isOpen
          onOpen={mockedOnOpen}
          onClose={mockedOnClose}
        />,
      );

      fireEvent.click(screen.getByText('Details Summary'));
      expect(mockedOnClose).toHaveBeenCalledTimes(1);
      expect(mockedOnOpen).toHaveBeenCalledTimes(0);
      fireEvent.click(screen.getByText('Details Summary'));
      expect(mockedOnClose).toHaveBeenCalledTimes(2);
      expect(mockedOnOpen).toHaveBeenCalledTimes(0);
    });
    test('does not open when toggle is called and isOpen is false', () => {
      render(<UseOpenCloseExample isOpen={false} />);

      fireEvent.click(screen.getByText('Details Summary'));
      expect(screen.getByTestId('details-content')).not.toBeVisible();
    });
    test('calls onOpen, but does not call onClose when isOpen is false', () => {
      render(
        <UseOpenCloseExample
          isOpen={false}
          onOpen={mockedOnOpen}
          onClose={mockedOnClose}
        />,
      );

      fireEvent.click(screen.getByText('Details Summary'));
      expect(mockedOnOpen).toHaveBeenCalledTimes(1);
      expect(mockedOnClose).toHaveBeenCalledTimes(0);
      fireEvent.click(screen.getByText('Details Summary'));
      expect(mockedOnOpen).toHaveBeenCalledTimes(2);
      expect(mockedOnClose).toHaveBeenCalledTimes(0);
    });
  });
});
