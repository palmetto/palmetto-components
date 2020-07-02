import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import './CheckboxInput.scss';

const CheckboxInput = ({
  id,
  className,
  isSelected,
  isDisabled,
  onChange,
  children,
}) => {
  const inputId = id || uuid();

  const handleChange = () => {
    onChange(!isSelected);
  };

  return (
    <div className={cx('checkboxInput', { isDisabled })}>
      <input
        id={inputId}
        checked={isSelected}
        disabled={isDisabled}
        onChange={handleChange}
        type="checkbox"
        className={className}
        value={isSelected}
        style={{ width: '24px', height: '24px' }}
      />
      <label htmlFor={inputId} className="checkboxInputInstructions">{children}</label>
    </div>
  );
};

CheckboxInput.defaultProps = {
  id: undefined,
  className: '',
  isSelected: false,
  isDisabled: false,
  children: undefined,
};

CheckboxInput.propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Set the checkbox as selected
   */
  isSelected: PropTypes.bool,
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  children: PropTypes.element,
};

export default CheckboxInput;
