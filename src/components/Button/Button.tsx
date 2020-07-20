import React from 'react';
import classNames from 'classnames';
import './Button.scss';

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
};

const Button = ({
  id,
  type = 'button',
  className = '',
  children,
  isDisabled = false,
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
          <svg className="spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <title>circle</title>
            <g fill="#ffffff">
              <path
                fill="#ffffff"
                d="M8,16c-1.199,0-2.352-0.259-3.428-0.77l0.857-1.807C6.235,13.806,7.1,14,8,14c3.309,0,6-2.691,6-6 s-2.691-6-6-6S2,4.691,2,8c0,0.901,0.194,1.766,0.578,2.572l-1.806,0.859C0.26,10.354,0,9.2,0,8c0-4.411,3.589-8,8-8s8,3.589,8,8 S12.411,16,8,16z" />
            </g>
          </svg>
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

export default Button;
