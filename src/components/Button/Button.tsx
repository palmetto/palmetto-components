import React, {
  ReactNode, MouseEvent, FocusEvent, forwardRef, createElement, AnchorHTMLAttributes, ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { IconName, ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { handleReactRouterClick } from '../../lib/reactRouterClickHandler';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { getElementType } from '../../lib/getElementType';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'success' | 'danger' | 'light' | 'dark' | 'white';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
     /**
      * Contents of the button.
      */
     children?: ReactNode;
     /**
      * Additional ClassNames to add to button.
      */
     className?: string;
     /**
      * Button takes up the full width of its parent container.
      */
     fullWidth?: boolean;
     /**
      * Name of the icon to include before the button text
      */
     iconPrefix?: IconName;
     /**
      * Name of the icon to include after the button text
      */
     iconSuffix?: IconName;
     /**
      * A unique identifier for the button.
      */
     id?: string;
     /**
      * URL to navigate to when clicked. Passing this attribute automatically
      * renders an anchor <a> tag, NOT a <button> element.
      */
     href?: string;
     /**
      * Disables the button, making it inoperable.
      */
     isDisabled?: boolean;
     /**
      * Replaces the button text with a loading indicator and disables the button.
      */
     isLoading?: boolean;
     /**
      * Renders an outline version of the button. With a transparent background.
      */
     isOutlined?: boolean;
     /**
      * Render the button with no styles of its own, other than a pointer cursor.
      */
     isNaked?: boolean;
     /**
      * Prop reserved for when component is wrapped by `<Link>` from react-router.
      */
     navigate?: () => void;
     /**
      * Callback when Button is pressed.
      */
     onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
     /**
      * Callback when focus leaves Button.
      */
     onBlur?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
     /**
      * Callback when Button receives focus.
      */
     onFocus?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
     /**
      * Specify the tabIndex of the button.
      */
     tabIndex?: number;
     /**
      * Useful when using button as an anchor tag.
      */
     target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
     /**
      * The size of the button.
      */
     size?: ButtonSize | ResponsiveProp<ButtonSize>;
     /**
      * The color variant of the button
      */
     variant?: ButtonVariant;
     /**
      * ref - currently cannot be typed due to limitations of using the `as` prop
      */
}

export type AnchorButtonProps = { as: 'a'; } &
  BaseButtonProps & Omit<React.DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'ref'>

export type NormalButtonProps = { as?: 'button'; } &
  BaseButtonProps & Omit<React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'>

export type ButtonProps = NormalButtonProps | AnchorButtonProps

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (
    {
      children = undefined,
      as = 'button',
      className = '',
      fullWidth = false,
      id = undefined,
      href = undefined,
      iconPrefix = undefined,
      iconSuffix = undefined,
      isDisabled = false,
      isLoading = false,
      isOutlined = false,
      isNaked = false,
      navigate = undefined,
      onClick = undefined,
      onFocus = undefined,
      onBlur = undefined,
      tabIndex = undefined,
      target = undefined,
      type = undefined,
      size = 'md',
      variant = 'primary',
      ...restProps
    },
    ref,
  ) => {
    const disabled = isLoading || isDisabled;

    const responsiveClasses = generateResponsiveClasses('size', size).map(c => styles[c]);

    const buttonClasses = classNames(
      'palmetto-components__variables__button',
      'palmetto-components__variables__form-control',
      styles.button,
      className,
      ...!isNaked ? responsiveClasses : [],
      {
        [styles.outline]: isOutlined && !isNaked,
        [styles.loading]: isLoading,
        [styles.naked]: isNaked,
        [styles[variant]]: variant && !isNaked,
        [styles['full-width']]: fullWidth,
      },
    );

    const handleClick = handleReactRouterClick;

    const handleFocus = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (onFocus) onFocus(event);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (onBlur) onBlur(event);
    };

    const getSpinnerVariant = () => {
      if (isOutlined) return variant;

      return (variant === 'light' || variant === 'white') ? 'grey' : 'white';
    };

    const buttonContent = iconPrefix || iconSuffix ? (
      <Box
        display="inline-flex"
        direction="row"
        alignItems="center"
        childGap={size === 'xs' ? '2xs' : 'xs'}
      >
        {isLoading && (
          <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
        )}
        {iconPrefix && (
        <Icon
          className={styles.label}
          name={iconPrefix}
          aria-hidden="true"
          focusable="false"
          data-testid="prefixIcon"
        />
        )}
        {children && <span className={styles.label}>{children}</span>}
        {iconSuffix && (
        <Icon
          className={styles.label}
          name={iconSuffix}
          aria-hidden="true"
          focusable="false"
          data-testid="suffixIcon"
        />
        )}
      </Box>
    ) : (
      <>
        {isLoading && (
        <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
        )}
        {(() => {
          if (children) {
            if (isNaked) {
              return children;
            }
            return <span className={styles.label}>{children}</span>;
          }
          return null;
        })()}
      </>
    );

    const buttonElement = getElementType(Button, { as });

    return createElement(buttonElement, {
      id,
      href,
      className: buttonClasses,
      disabled,
      target: (as === 'a' && href) ? target : null,
      onBlur: handleBlur,
      onClick:
        (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => handleClick(event, onClick, target, navigate),
      onFocus: handleFocus,
      ref,
      type: type || ((as !== 'a' && !href) ? 'button' : undefined),
      tabIndex,
      ...restProps,
    }, buttonContent);
  },
);
