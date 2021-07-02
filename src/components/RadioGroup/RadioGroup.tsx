import React, {
  FC, ChangeEvent, FocusEvent, ReactNode,
} from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { RadioInput } from './RadioInput/RadioInput';
import styles from './RadioGroup.module.scss';

export interface RadioGroupProps {
  /**
   * Radio group name.
   */
  name: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options for radio group.
   */
  options: {
    id: string;
    value: string;
    label: string;
    disabled?: boolean | null;
  }[];
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Description to be displayed below the title, and above the RadioGroup.
   */
  description?: ReactNode;
  /**
   * Whether the radios should be aligned in a row or in a column
   */
  direction?: 'row' | 'column';
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
   * Determines if radio group is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Title to be displayed above the RadioGroup.
   */
  title?: ReactNode;
  /**
   * The value of selected radio input.
   */
  value?: string;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  onChange,
  options,
  className = '',
  description = undefined,
  direction = 'column',
  error = false,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  title = undefined,
  value = undefined,
}) => {
  const groupClasses = classNames(className, {
    [styles.loading]: error,
  });

  return (
    <div className={classNames(styles['radio-group'], groupClasses)}>
      <fieldset className={styles.fieldset}>
        {(title || description) && (
          <legend className={styles.legend}>
            {title}
            {isRequired && <span>&nbsp;*</span>}
            {description && <div className={styles.description}>{description}</div>}
          </legend>
        )}
        <Box direction={direction} childGap="sm" className={styles.options}>
          {options
            && options.map(option => (
              <RadioInput
                key={option.id}
                name={name}
                onChange={onChange}
                option={option}
                isDisabled={isDisabled || option.disabled || false}
                isSelected={value === option.value}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            ))}
        </Box>
      </fieldset>
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </div>
  );
};
