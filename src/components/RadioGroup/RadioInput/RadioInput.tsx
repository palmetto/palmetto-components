import React, { FC, ChangeEvent, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';
import FormLabel from '../../FormLabel/FormLabel';
import styles from './RadioInput.module.scss';

interface RadioInputProps {
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
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * If the radio group should be disabled and not focusable.
   */
  isDisabled?: boolean;
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

const RadioInput: FC<RadioInputProps> = ({
  name,
  onChange,
  option,
  className = '',
  error = false,
  isDisabled = false,
  isSelected = false,
  onBlur = undefined,
  onFocus = undefined,
}) => {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
  };

  const radioClasses = classNames(className, styles.option);

  const labelProps = {
    inputId: option.id,
    isDisabled,
    displayInline: true,
    hasError: !!error,
    isRadioInputLabel: true,
  };

  return (
    <>
      {option && (
        <div className={radioClasses} key={option.id}>
          <input
            id={option.id}
            type="radio"
            name={name}
            className={styles.input}
            value={option.value}
            checked={isSelected}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isDisabled}
          />
          {option.label && <FormLabel {...labelProps}>{option.label}</FormLabel>}
        </div>
      )}
    </>
  );
};

export default RadioInput;
