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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [outerWidth, setOuterWidth] = useState(window.outerWidth);
  const [outerHeight, setOuterHeight] = useState(window.outerHeight);

  const handleWindowResize = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
    setOuterWidth(window.outerWidth);
    setOuterHeight(window.outerHeight);
  };

  useEffect(() => {
    let timeoutId: any; // eslint-disable-line
    const throttledResize = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after throttle time has elapsed.
      timeoutId = setTimeout(handleWindowResize, throttle);
    };

    window.addEventListener('resize', throttledResize);

    return () => window.removeEventListener('resize', throttledResize);
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
