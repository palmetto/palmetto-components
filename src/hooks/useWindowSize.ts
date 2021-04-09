import React from 'react';
import { ResponsiveContext } from '../components/ResponsiveProvider/ResponsiveProvider';

export const useWindowSize = () => {
  const {
    innerWidth,
    innerHeight,
    outerHeight,
    outerWidth,
    isCreated,
  } = React.useContext(ResponsiveContext);

  if (isCreated) {
    return {
      innerHeight,
      innerWidth,
      outerHeight,
      outerWidth,
    };
  }

  return {};
}