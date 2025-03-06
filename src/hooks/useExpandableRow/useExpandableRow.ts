import { useState, useCallback } from 'react';

export interface UseExpandableRowProps {
  expandedRow?: React.Key;
  onExpandedRowChange?: (expandedRow: React.Key | null) => void;
}
export const useExpandableRow = (props: UseExpandableRowProps = {}) => {
  const { expandedRow: controlledExpandedRow, onExpandedRowChange } = props;

  const [internalExpandedRow, setInternalExpandedRow] = useState<React.Key | null>(null);

  const isControlled = controlledExpandedRow !== undefined;
  const currentExpandedRow = isControlled
    ? controlledExpandedRow
    : internalExpandedRow;

  const handleToggle = useCallback(
    (rowId: React.Key | null) => {
      const newExpandedRow = currentExpandedRow === rowId ? null : rowId;

      if (!isControlled) {
        setInternalExpandedRow(newExpandedRow);
      }

      onExpandedRowChange?.(newExpandedRow);
    },
    [currentExpandedRow, isControlled, onExpandedRowChange],
  );

  return {
    expandedRow: currentExpandedRow,
    handleToggle,
  };
};
