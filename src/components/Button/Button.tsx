import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import './Button.scss';
import { ReactComponent as LoadingIndicator } from '../../images/loading.svg';

type ButtonType = 'button' | 'submit' | 'reset';
const BUTTON_TYPES: ButtonType[] = ['button', 'submit', 'reset'];

const propTypes = {
  /**
   * A unique identifier for the button
   */
  id: PropTypes.string,
  /**
   * Button type
   */
  type: PropTypes.oneOf(BUTTON_TYPES).isRequired,
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Contents of the button
   */
  children: PropTypes.node.isRequired,
  /**
   * Disables the button, making it inoperable
   */
  isDisabled: PropTypes.bool,
  /**
   * Button takes up the full width of its parent container
   */
  isLoading: PropTypes.bool,
  /**
   * Allow the button to grow to its container's full width
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback when button is pressed
   */
  onClick: PropTypes.func,
  /**
   * Callback when button receives focus
   */
  onFocus: PropTypes.func,
  /**
   * Callback when focus leaves button
   */
  onBlur: PropTypes.func,
  /**
   * Specify the tabIndex of the button
   */
  tabIndex: PropTypes.number,
};

type Props = InferProps<typeof propTypes>;

const defaultProps: Partial<Props> = {
  type: 'button',
  className: '',
  isDisabled: false,
};

const Button = ({
  id,
  type = 'button',
  className,
  children,
  isDisabled,
  fullWidth,
  onClick,
  tabIndex,
  isLoading,
  onFocus,
  onBlur,
}: Props) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames('Palmetto-Button', className, {
    loading: isLoading,
    fullWidth,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (onBlur) onBlur(e);
  };

  const content = (
    <>
      {isLoading && (
        <div className="buttonLoadingIndicator">
          <LoadingIndicator className="img" alt="Loading..." />
        </div>
      )}
      <span className="buttonLabel">{children}</span>
    </>
  );

  return (
    <button
      id={id || undefined}
      type={type} // eslint-disable-line react/button-has-type
      disabled={disabled || undefined}
      className={buttonClasses}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={tabIndex === null ? undefined : tabIndex}
      aria-label={isLoading ? 'Loading' : undefined}
      aria-busy={isLoading ? true : undefined}
    >
      {content}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
