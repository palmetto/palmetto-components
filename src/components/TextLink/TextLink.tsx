import React, { FC, AnchorHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';
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

interface TextLinkAnchorProps extends TextLinkBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Target URL (Anchor Tag)
   */
  href: string;
  /**
   * `navigate` prop which is passed when using the `component` prop in a react router `Link`.
   * This needs to be documented in the component interface but will be stripped out automatically
   * from the anchor tag.
   */
  navigate: any // eslint-disable-line
}

interface TextLinkRouterProps extends TextLinkBaseProps, LinkProps {
  /**
   * Target URL
   */
  href?: never;
  /**
   * `navigate` prop which is passed when using the `component` prop in a react router `Link`.
   */
  navigate: any; // eslint-disable-line
}

type TextLinkProps = TextLinkAnchorProps | TextLinkRouterProps;

const TextLink: FC<TextLinkProps> = ({
  children,
  className = null,
  variant = 'primary',
  navigate, // eslint-disable-line
  ...restProps
}) => {
  const linkClasses = classNames(
    styles['text-link'],
    styles[variant],
    className,
  );

  return (
    <a className={linkClasses} {...restProps}>
      {children}
    </a>
  );
};

export default TextLink;
