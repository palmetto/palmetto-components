import React, { FC, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';
import Select, {
  components,
  FocusEventHandler,
  IndicatorProps,
  OptionTypeBase,
  ValueType,
  GroupedOptionsType,
  OptionsType,
} from 'react-select';
import { SimulatedEventPayloadType } from '../../types';
import { Z_INDEX_VALUES } from '../../lib/tokens';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import styles from './SelectInput.module.scss';

export interface BaseSelectInputProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: SimulatedEventPayloadType) => void;
  /**
   * The value(s) of select.
   */
  value: any | any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Autofocus select input on render.
   */
  autoFocus?: boolean;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * If the input value is clearable programmatically.
   */
  isClearable?: boolean;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * Is multi select enabled.
   */
  isMulti?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Select 'name' attribute.
   */
  name?: string;
  /**
   * A ref to portal the dropdown menu to. This is useful when the dropdown is located in a smaller container
   * and we want to avoid cutting off the menu.
   */
  menuPortalTarget?: HTMLElement;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Placeholder for input.
   */
  placeholder?: string;
  /**
   * The size of the text input.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional props to be spread. These will be applied specifically to
   * the `react-select` component that powers the select. For full docs on
   * react-select props, [Click Here](https://react-select.com/props)
   */
  [x: string]: any; // eslint-disable-line
}
export interface SelectInputProps extends BaseSelectInputProps {
  /**
   * Options for dropdown list.
   */
  options: GroupedOptionsType<OptionTypeBase> | OptionsType<OptionTypeBase>;
}

const SelectInput: FC<SelectInputProps> = ({
  id,
  label,
  onChange,
  options,
  value,
  autoFocus = false,
  className = '',
  error = false,
  helpText,
  hideLabel = false,
  isClearable = false,
  isDisabled = false,
  isMulti = false,
  isRequired = false,
  menuPortalTarget = null,
  name = '',
  onFocus = null,
  onBlur = null,
  placeholder = undefined,
  size = 'md',
  ...restProps
}) => {
  const handleChange = (values: ValueType<OptionTypeBase>) => {
    const simulatedEventPayloadType: SimulatedEventPayloadType = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayloadType);
  };

  const handleFocus: FocusEventHandler = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur: FocusEventHandler = e => {
    if (onBlur) onBlur(e);
  };

  const wrapperClasses = classNames('select-input-wrapper', className, styles[size], {
    [styles.disabled]: isDisabled,
  });

  const inputClasses = classNames('react-select', { [styles.error]: error });

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    helpText,
    className: styles['select-input-label'],
    isDisabled,
  };

  const ClearIndicator = (props: IndicatorProps<OptionTypeBase>) => (
    <components.ClearIndicator {...props}>
      <Icon name="remove" />
    </components.ClearIndicator>
  );

  return (
    <Box width="100%" className={wrapperClasses}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Select
        {...restProps}
        inputId={id}
        aria-label={label}
        components={{ ClearIndicator }}
        aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
        className={inputClasses}
        classNamePrefix="react-select"
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPortalTarget={menuPortalTarget}
        name={name}
        autoFocus={autoFocus}
        options={options}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={{ menuPortal: base => ({ ...base, zIndex: Number(Z_INDEX_VALUES.popover.value) }) }}
        value={value}
      />
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
};

export default SelectInput;
