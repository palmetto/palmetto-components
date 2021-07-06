import React, { ChangeEvent, FocusEvent } from 'react';
import classNames from 'classnames';
import { Box } from '../../Box/Box';
import { FormLabel } from '../../FormLabel/FormLabel';
import styles from './RadioInput.module.scss';

export interface RadioInputProps {
  /**
   * Radio input name.
   */
  name: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options for radio group.
   */
  option: {
    id: string;
    value: string;
    label: string;
    disabled?: boolean | null;
  };
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * If the radio group should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * If the radio input should be hidden to make way for a custom radio.
   */
  isHidden?: boolean;
  /**
   * If the radio group should be disabled and not focusable.
   */
  isSelected?: boolean;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const RadioInput = React.forwardRef<HTMLDivElement, RadioInputProps>((
  {
    name,
    onChange,
    option,
    className = '',
    isDisabled = false,
    isHidden = false,
    isSelected = false,
    onBlur = undefined,
    onFocus = undefined,
  },
  ref,
) => {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
  };

  const labelProps = {
    inputId: option.id,
    isDisabled,
    displayInline: true,
    isRadioInputLabel: true,
  };

  const containerClasses = classNames(
    className,
    styles['radio-container'],
    { [styles.hidden]: isHidden },
  );

  return (
    <>
      {option && (
        <Box className={containerClasses} key={option.id} direction="row" alignItems="center" ref={ref}>
          <Box
            as="input"
            id={option.id}
            type="radio"
            name={name}
            value={option.value}
            checked={isSelected}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
            margin={isHidden ? '0' : '0 xs 0 2xs'}
          />
          {option.label && <FormLabel {...labelProps}>{option.label}</FormLabel>}
        </Box>
      )}
    </>
  );
});
