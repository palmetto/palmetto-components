import classNames from 'classnames';
import React, { FC, FocusEvent, FocusEventHandler, ReactNode } from 'react';
import Select, {
  components,
  OnChangeValue,
} from 'react-select';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { Z_INDEX_VALUES } from '../../lib/tokens';
import { IndicatorProps,
  OptionTypeBase,
  ResponsiveProp,
  SelectInputOptions,
  SimulatedEventPayloadType,
} from '../../types';
import { Box } from '../Box/Box';
import { FormLabel } from '../FormLabel/FormLabel';
import { Icon } from '../Icon/Icon';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import styles from './SelectInput.module.scss';

export interface SelectInputProps {
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
   * Options for dropdown list.
   */
  options: SelectInputOptions;
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
   * The required and aria-required attributes on the input
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
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * The size of the text input.
   */
  size?: 'sm' | 'md' | 'lg' | ResponsiveProp<'sm' | 'md' | 'lg'>;
  /**
   * Additional props to be spread. These will be applied specifically to
   * the `react-select` component that powers the select. For full docs on
   * react-select props, [Click Here](https://react-select.com/props)
   */
  [x: string]: any; // eslint-disable-line
}

export const SelectInput: FC<SelectInputProps> = ({
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
  requiredIndicator = ' *',
  size = 'md',
  ...restProps
}) => {
  const handleChange = (values: OnChangeValue<OptionTypeBase, boolean>) => {
    const simulatedEventPayloadType: SimulatedEventPayloadType = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayloadType);
  };

  const handleFocus: FocusEventHandler = (e: React.FocusEvent<HTMLElement, Element>) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur: FocusEventHandler = (e: React.FocusEvent<HTMLElement, Element>) => {
    if (onBlur) onBlur(e);
  };

  const responsiveClasses = generateResponsiveClasses('size', size);

  const wrapperClasses = classNames(
    'palmetto-components__variables__form-control',
    'select-input-wrapper',
    className,
    ...responsiveClasses.map(c => styles[c]),
    {
      [styles.disabled]: isDisabled,
    },
  );

  const inputClasses = classNames('react-select', { [styles.error]: error });

  const labelProps = {
    inputId: id,
    helpText,
    className: styles['select-input-label'],
    isDisabled,
    isFieldRequired: isRequired,
    requiredIndicator,
  };

  const ClearIndicator = (props: IndicatorProps<OptionTypeBase, boolean>) => (
    <components.ClearIndicator {...props}>
      <Icon name="remove-light" />
    </components.ClearIndicator>
  );

  const DropdownIndicator = (
    props: IndicatorProps<OptionTypeBase, boolean>,
  ) => (
    <components.ClearIndicator {...props}>
      <Icon name="caret-down" />
    </components.ClearIndicator>
  );

  return (
    <Box width="100%" className={wrapperClasses}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Select
        {...restProps}
        inputId={id}
        aria-label={label}
        components={{ ClearIndicator, DropdownIndicator }}
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
        styles={{
          menuPortal: (base: any) => ({
            ...base,
            zIndex: Number(Z_INDEX_VALUES.popover),
          }),
        }}
        value={value}
      />
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
};
