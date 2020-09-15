import React, { FC, AnchorHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TextLink.module.scss';

interface TextLinkBaseProps {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * Font color for text link.
   */
  variant?: 'primary' | 'danger';
}

interface TextLinkAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, TextLinkBaseProps {
  /**
   * Target URL
   */
  to?: never;
}

interface TextLinkRouterProps extends LinkProps, TextLinkBaseProps {
  /**
   * Target URL
   */
  href?: never;
}

type TextLinkProps = TextLinkAnchorProps | TextLinkRouterProps;

const TextLink: FC<TextLinkProps> = ({
  children,
  className = null,
  variant = 'primary',
  href = null,
  to = '',
  ...restProps
}) => {
  const linkClasses = classNames(
    styles['text-link'],
    styles[variant],
    className,
    // { [styles['is-disabled']]: isDisabled },
  );

  return (
    href ? (
      <a href={href} className={linkClasses} {...restProps}>
        {children}
      </a>
    ) : (
      <Link to={to} className={linkClasses} {...restProps}>
        {children}
      </Link>
    )
  );
};

export default TextLink;
