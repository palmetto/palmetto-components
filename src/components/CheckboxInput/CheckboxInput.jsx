import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import './CheckboxInput.scss';

const CheckboxInput = ({
  id,
  className,
  selected,
  onChange,
  isDisabled,
  children,
}) => {
  const [isSelected, setIsSelected] = useState(selected || false);
  const inputId = id || uuid();

  const handleChange = () => {
    setIsSelected(!isSelected);
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
      <span className="checkboxInputInstructions">{children}</span>
    </div>
  );
};

CheckboxInput.defaultProps = {
  id: undefined,
  className: '',
  selected: false,
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
  selected: PropTypes.bool,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Content to be displayed to right of checkbox. Can be any valid node, anchors, etc.
   */
  children: PropTypes.element,
};

export default CheckboxInput;
