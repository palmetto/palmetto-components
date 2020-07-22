import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormLabel.scss';

interface Props {
  /**
   * The id of the form control that the label is labeling
   */
  inputId: string;
  /**
   * The label text
   */
  labelText: React.ReactNode;
  /**
   * Mark the label has invalid
   */
  hasError?: boolean;
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired?: boolean;
};

const FormLabel: FC<Props> = ({
  hasError = false,
  inputId,
  isFieldRequired = false,
  labelText,
}) => {
  const labelClasses = classNames(
    'Palmetto-FormLabel',
    {
      error: hasError,
    },
  );

  return (
    <label
      id={`${inputId}Label`}
      className={labelClasses}
      htmlFor={inputId}
    >
      {labelText}
      {isFieldRequired && <span className="font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  isFieldRequired: PropTypes.bool,
};

export default FormLabel;
