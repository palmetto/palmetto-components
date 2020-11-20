import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { IconName } from '../../types';
import icons from '../../icons';
import styles from './Icon.module.scss';

interface IconProps {
  className?: string;
  name: IconName;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const Icon: FC<IconProps> = forwardRef<SVGSVGElement, IconProps>((
  {
    className = undefined,
    name,
    ...restProps
  },
  ref,
) => {
  const iconClasses = classNames(styles.icon, className);
  const IconComponent = icons[name];

  return (
    <svg
      className={iconClasses}
      ref={ref}
      fill="currentColor"
      viewBox="0 0 32 32"
      {...restProps}
    >
      <title id="title">{`${name}-icon`}</title>
      <IconComponent />
    </svg>
  );
});

export default Icon;
