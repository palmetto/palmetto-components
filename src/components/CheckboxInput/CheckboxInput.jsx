import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import './CheckboxInput.scss';

const CheckboxInput = ({
  id,
  className,
  isChecked,
  isDisabled,
  onChange,
  children,
}) => {
  const inputId = id || uuid();

  const handleChange = e => {
    onChange(e.target.checked);
  };

  return (
    <div className={cx('checkboxInput', className, { isDisabled })}>
      <input
        id={inputId}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        type="checkbox"
        className="input"
      />
      <label htmlFor={inputId} className="checkboxInputInstructions">{children}</label>
    </div>
  );
};

CheckboxInput.defaultProps = {
  id: undefined,
  className: '',
  isChecked: false,
  isDisabled: false,
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
   * The checkbox input "checked" attribute
   */
  isChecked: PropTypes.bool,
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
  children: PropTypes.node.isRequired,
};

export default CheckboxInput;
