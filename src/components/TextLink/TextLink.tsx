import React, { ReactNode, FC } from 'react';
import classNames from 'classnames';
import styles from './TextLink.module.scss';
import { Link } from 'react-router-dom';

interface TextLinkBaseProps {
  /**
   * Text to be rendered.
   */
  children: ReactNode;
}

interface TextLinkAnchorProps extends TextLinkBaseProps {
  /**
   * Target URL
   */
  href: string;
  /**
   * Target URL
   */
  to?: never;
}

interface TextLinkRouterProps extends TextLinkBaseProps {
  /**
   * Target URL
   */
  to: string;
  /**
   * Target URL
   */
  href?: never;
}

type TextLinkProps = TextLinkAnchorProps | TextLinkRouterProps;

const TextLink: FC<TextLinkProps> = ({
  children = null,
  href = null,
  to = null,
  ...restProps
}) => {
  const linkClasses = classNames(
    styles['text-link'],
    // { [styles['is-disabled']]: isDisabled },
  );

  return (
    href ? (
      <a href={href} className={linkClasses} {...restProps}>
        {children}
      </a>
    ) : (
      <Link to={to} {...restProps}>{children}</Link>
    )
  );
};

export default TextLink;
