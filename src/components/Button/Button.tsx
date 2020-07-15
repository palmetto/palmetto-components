import React from 'react';
import classNames from 'classnames';
import './Button.scss';
import { ReactComponent as LoadingIndicator } from '../../images/loading.svg';

interface Props {
  /**
   * Children of the button
   */
  children: React.ReactNode;
  /**
    * A unique identifier for the button
    */
  id?: string;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Disables the button, making it inoperable
   */
  isDisabled?: boolean;
  /**
   * Additional ClassNames to add to button
   */
  className?: string;
  /**
   * Callback when button is pressed
   */
  fullWidth?: boolean;
  /**
   * Specify the tabIndex of the button
   */
  tabIndex?: number;
  /**
   * Button takes up the full width of its parent container
   */
  isLoading?: boolean;
  /**
   * Callback when button is pressed
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Callback when button receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * Callback when focus leaves button
   */
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
}

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

Button.defaultProps = defaultProps;

export default Button;
