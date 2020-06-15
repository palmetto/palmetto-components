import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import './Heading.scss';

const Heading = (props) => {
  const {
    className,
    children,
    size,
  } = props;

  const Element = getElementType(Heading, props);

  const classes = classNames(
    className,
    'heading',
    { [`heading--${size}`]: size },
  );

  return (
    <Element className={classes}>{children}</Element>
  );
}

Heading.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Heading;
