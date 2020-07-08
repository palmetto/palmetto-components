import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import './FormLabel.scss';

const propTypes = {
  /**
   * Mark the label has invalid
   */
  hasError: PropTypes.bool.isRequired,
  /**
   * The id of the form control that the label is labeling
   */
  inputId: PropTypes.string.isRequired,
  /**
   * The label text
   */
  labelText: PropTypes.node.isRequired,
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired: PropTypes.bool.isRequired,
};


const FormLabel = ({
  hasError,
  inputId,
  isFieldRequired,
  labelText,
}: InferProps<typeof propTypes>) => {
  const labelClasses = classNames(
    'label',
    {
      error: hasError,
    },
  );

  return (
    <label className={labelClasses} htmlFor={inputId}>
      {labelText}
      {isFieldRequired && <span className="font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = propTypes;

FormLabel.defaultProps = {
  hasError: false,
  isFieldRequired: false,
};

export default FormLabel;
