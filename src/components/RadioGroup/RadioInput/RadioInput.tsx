import React, { FC, ChangeEvent, FocusEvent } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../FormLabel/FormLabel';
import styles from './RadioInput.module.scss';

/**
 * Radio input w/label for use in RadioGroup.
 */

interface Props {
  /**
   * Radio group name
   */
  name: string;
  /**
   * Callback function to call on change event
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options for radio group
   */
  option: {
    id: string;
    value: string;
    label: string;
    disabled?: boolean | null;
  };
  /**
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: boolean | string | React.ReactNode;
  /**
   * If the radio group should be disabled and not focusable
   */
  isDisabled?: boolean;
  /**
   * If the radio group should be disabled and not focusable
   */
  isSelected?: boolean;
  /**
   * Callback function to call on blur event
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function to call on focus event
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }).isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

const RadioInput: FC<Props> = ({
  name,
  onChange,
  option,
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

  const generateLabelProps = () => ({
    inputId: option.id,
    labelText: option.label,
    isDisabled,
    displayInline: true,
    hasError: !!error,
    isRadioInputLabel: true,
  });

  return (
    <>
      {option && (
        <div className={styles.option} key={option.id}>
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
          {option.label && <FormLabel {...generateLabelProps()} />}
        </div>
      )}
    </>
  );
};

RadioInput.propTypes = propTypes;

export default RadioInput;
