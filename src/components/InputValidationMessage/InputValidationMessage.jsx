import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Used by form inputs such as TextInput, to display a validation message for an invalid input.
 */

const propTypes = {
  children: PropTypes.node.isRequired,
};

const classes = classNames(
  'font-color-danger',
  'font-size-sm',
  'm-top-xs',
);

const InputValidationMessage = ({ children }) => (
  <div className={classes}>{children}</div>
);

InputValidationMessage.propTypes = propTypes;

export default InputValidationMessage;
