import React, { FC, MouseEvent, forwardRef } from 'react';
import classNames from 'classnames';
import { handleReactRouterClick } from '../../lib/reactRouterClickHandler';
import styles from './TextLink.module.scss';

export interface TextLinkProps {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * Font color for text link.
   */
  variant?: 'primary' | 'danger';
  /**
   * Target URL
   */
  href?: string;
  /**
   * Prop reserved for when component is wrapped by `<Link>` from react-router.
   */
  navigate?: () => void;
  /**
   * Custom onClick -- Typically not necessary in an anchor but used by react-router when
   * wrapping with a Link component.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /**
   * HTML element tab index (defaults to 0)
   */
  tabIndex?: number;
  /**
   * HTML target property
   */
  target?: string;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const TextLink: FC<TextLinkProps> = forwardRef<HTMLAnchorElement, TextLinkProps>((
  {
    children,
    className = null,
    navigate = undefined,
    onClick = undefined,
    target = undefined,
    variant = 'primary',
    tabIndex = 0,
    ...restProps
  },
  ref,
) => {
  const linkClasses = classNames(
    styles['text-link'],
    styles[variant],
    className,
  );

  const handleClick = handleReactRouterClick;

  return (
    <a // eslint-disable-line jsx-a11y/click-events-have-key-events
      className={linkClasses}
      target={target}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => handleClick(event, onClick, target, navigate)}
      role="link"
      tabIndex={tabIndex}
      ref={ref}
      {...restProps}
    >
      {children}
    </a>
  );
});
