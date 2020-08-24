import React, {
  FC,
  ChangeEvent,
  FocusEvent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import RadioInput from './RadioInput/RadioInput';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import styles from './RadioGroup.module.scss';

interface RadioGroupProps {
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
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: boolean | string | ReactNode;
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

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  onChange,
  options,
  className = '',
  description = undefined,
  error = false,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  title = undefined,
  value = undefined,
}) => {
  const groupClasses = classNames(
    className,
    {
      [styles.loading]: error,
    },
  );

  const legendClasses = classNames(
    styles.legend,
    {
      [styles.error]: error,
    },
  );

  return (
    <div className={classNames(styles['radio-group'], groupClasses)}>
      <fieldset className={styles.fieldset}>
        {(title || description) && (
          <legend className={legendClasses}>
            {title}
            {isRequired && <span>&nbsp;*</span>}
            {description && <div className={styles.description}>{description}</div>}
          </legend>
        )}
        <div className={styles.options}>
          {options && options.map(option => (
            <RadioInput
              key={option.id}
              name={name}
              onChange={onChange}
              option={option}
              error={error}
              isDisabled={isDisabled || option.disabled || false}
              isSelected={value === option.value}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          ))}
        </div>
      </fieldset>
      {error && typeof error !== 'boolean' && <InputValidationMessage>{error}</InputValidationMessage>}
    </div>
  );
};

export default RadioGroup;
