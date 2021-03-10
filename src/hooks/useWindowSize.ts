import { useState, useEffect } from 'react';

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
}

/**
 * Gets the current window dimensions (width and height).
 *
 * @param timeout determines how long to wait before the listener function is run. Since window
 * 'resize' events are called very frequently when a user resizes their browser window, this avoids
 * the function being run too frequently which could result in performance issues with a
 * high number of listeners.
 */
export default function useWindowSize(timeout = 100): WindowDimensions {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    let timeoutId: any; // eslint-disable-line
    const handleResize = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      }), timeout);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [timeout]); // Empty array ensures that effect is only run on mount

  return windowSize;
}
