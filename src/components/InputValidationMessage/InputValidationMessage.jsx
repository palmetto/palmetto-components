import React from 'react';
import PropTypes from 'prop-types';

/**
 * Used by form inputs such as TextInput, to display a validation message for an invalid input.
 */

const propTypes = {
  children: PropTypes.node.isRequired,
};

const InputValidationMessage = ({ children }) => (
  <div className="font-color-danger font-size-sm" style={{ marginTop: 'var(--size-spacing-xs)' }}>{children}</div>
);

InputValidationMessage.propTypes = propTypes;

export default InputValidationMessage;
