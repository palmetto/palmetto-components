import React, { useState, createContext } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayouEffect';

export interface ResponsiveContextShape {
  isCreated: boolean;
  innerWidth?: number;
  innerHeight?: number;
  outerWidth?: number;
  outerHeight?: number;
}

export const ResponsiveContext = createContext<ResponsiveContextShape>({ isCreated: false });

export interface ResponsiveProviderProps {
  children?: React.ReactNode;
  /**
   * Time (in milliseconds) to delay execution of resize handler. Default is 50.
   */
  throttle?: number;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children = null, throttle = 50 }) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [outerWidth, setOuterWidth] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);

  const handleWindowResize = () => {
    setInnerWidth(window?.innerWidth ?? 0);
    setInnerHeight(window?.innerHeight ?? 0);
    setOuterWidth(window?.outerWidth ?? 0);
    setOuterHeight(window?.outerHeight ?? 0);
  };

  useIsomorphicLayoutEffect(() => { // eslint-disable-line consistent-return
    if (typeof window !== 'undefined') {
      // Set values on render if window wasn't available for useState initialization.
      handleWindowResize();

      let timeoutId: any; // eslint-disable-line
      const throttledResize = () => {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId);
        // change width from the state object after throttle time has elapsed.
        timeoutId = setTimeout(handleWindowResize, throttle);
      };

      window.addEventListener('resize', throttledResize);

      return () => window.removeEventListener('resize', throttledResize);
    }
  }, [throttle]);

  return (
    <ResponsiveContext.Provider
      value={{
        innerWidth,
        innerHeight,
        outerHeight,
        outerWidth,
        isCreated: true,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};
