import React, { useState, useEffect, createContext } from 'react';

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
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth ?? 0);
  const [innerHeight, setInnerHeight] = useState(window?.innerHeight ?? 0);
  const [outerWidth, setOuterWidth] = useState(window?.outerWidth ?? 0);
  const [outerHeight, setOuterHeight] = useState(window?.outerHeight ?? 0);

  const handleWindowResize = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
    setOuterWidth(window.outerWidth);
    setOuterHeight(window.outerHeight);
  };

  useEffect(() => { // eslint-disable-line consistent-return
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
