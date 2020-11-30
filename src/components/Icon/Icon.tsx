import React, { FC, forwardRef } from 'react';
import icons from '@palmetto/palmetto-design-tokens/build/icons/react';
import { IconName } from '../../types';

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
  const IconComponent = icons[name];

  if (!IconComponent) console.error(`Icon '${name}' not found`); // eslint-disable-line no-console

  return (
    IconComponent ? (
      <IconComponent
        className={className}
        ref={ref}
        data-testid={`icon-testid--${name}`}
        {...restProps}
      />
    ) : (
      <span>N/A</span>
    )
  );
});

export default Icon;
