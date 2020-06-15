import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import './Heading.scss';

/**
 * Use `Headings` as labels for pages or sections of a page that make up an interface. `Headings` can label an entire page, or sections of related content.
 *
 * The `Heading` component allows you to specify an appropriate semantic element (h1-h6) and independently set its size so that it is appropriate for the surrounding content. If no size is specified, a default size will be applied.
 */
const Heading = (props) => {
  const { className, children, size } = props;

  const Element = getElementType(Heading, props);

  const classes = classNames(className, 'heading', {
    [`heading--${size}`]: size,
  });

  return <Element className={classes}>{children}</Element>;
};

Heading.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

Heading.defaultProps = {
  as: 'h4',
};

export default Heading;
