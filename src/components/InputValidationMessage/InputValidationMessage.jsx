import React from 'react';
import PropTypes from 'prop-types';

const InputValidationMessage = ({
  children,
}) => (
    <div className="font-color-danger font-size-sm" style={{ marginTop: 'var(--size-spacing-xs)' }}>{children}</div>
  );

InputValidationMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputValidationMessage;
