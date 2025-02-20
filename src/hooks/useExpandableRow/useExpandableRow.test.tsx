import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useExpandableRow from './useExpandableRow';

const UseExpandableRowExample = ({ onExpandedRowChange, expandedRow }: any) => {
  const { handleToggle, expandedRow: currentExpandedRow } = useExpandableRow({
    expandedRow,
    onExpandedRowChange,
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => handleToggle('row1')}
        data-testid="toggle-row1"
      >
        Toggle Row 1
      </button>
      <button
        type="button"
        onClick={() => handleToggle('row2')}
        data-testid="toggle-row2"
      >
        Toggle Row 2
      </button>
      <div data-testid="expanded-row">{currentExpandedRow}</div>
    </div>
  );
};

describe('useExpandableRow', () => {
  const mockOnExpandedRowChange = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('uncontrolled behavior', () => {
    test('initializes with null expandedRow', () => {
      const { getByTestId } = render(<UseExpandableRowExample />);
      expect(getByTestId('expanded-row').textContent).toBe('');
    });

    test('toggles row expansion when handleToggle is called', () => {
      const { getByTestId } = render(
        <UseExpandableRowExample
          onExpandedRowChange={mockOnExpandedRowChange}
        />,
      );

      fireEvent.click(getByTestId('toggle-row1'));
      expect(getByTestId('expanded-row').textContent).toBe('row1');
      expect(mockOnExpandedRowChange).toHaveBeenCalledWith('row1');

      fireEvent.click(getByTestId('toggle-row1'));
      expect(getByTestId('expanded-row').textContent).toBe('');
      expect(mockOnExpandedRowChange).toHaveBeenCalledWith(null);
    });

    test('changes to different row when another row is toggled', () => {
      const { getByTestId } = render(
        <UseExpandableRowExample
          onExpandedRowChange={mockOnExpandedRowChange}
        />,
      );

      fireEvent.click(getByTestId('toggle-row1'));
      expect(getByTestId('expanded-row').textContent).toBe('row1');

      fireEvent.click(getByTestId('toggle-row2'));
      expect(getByTestId('expanded-row').textContent).toBe('row2');
      expect(mockOnExpandedRowChange).toHaveBeenLastCalledWith('row2');
    });
  });

  describe('controlled behavior', () => {
    test('uses controlled value for expandedRow', () => {
      const { getByTestId } = render(
        <UseExpandableRowExample
          expandedRow="row1"
          onExpandedRowChange={mockOnExpandedRowChange}
        />,
      );

      expect(getByTestId('expanded-row').textContent).toBe('row1');
    });

    test('calls onExpandedRowChange but does not update internal state', () => {
      const { getByTestId } = render(
        <UseExpandableRowExample
          expandedRow="row1"
          onExpandedRowChange={mockOnExpandedRowChange}
        />,
      );

      fireEvent.click(getByTestId('toggle-row1'));
      expect(getByTestId('expanded-row').textContent).toBe('row1');
      expect(mockOnExpandedRowChange).toHaveBeenCalledWith(null);

      fireEvent.click(getByTestId('toggle-row2'));
      expect(getByTestId('expanded-row').textContent).toBe('row1');
      expect(mockOnExpandedRowChange).toHaveBeenCalledWith('row2');
    });
  });
});
