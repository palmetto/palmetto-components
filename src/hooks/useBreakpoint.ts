import { useState, useEffect } from 'react';
import { Breakpoint, PALMETTO_BREAKPOINTS } from '../lib/tokens';
import useWindowSize from './useWindowSize';

const defaultBreakpoint: Breakpoint = { name: 'base', minWidth: 0 };

function useBreakpoint(): Breakpoint {
  const windowSize = useWindowSize();

  const [breakpoint, setBreakpoint] = useState<Breakpoint>({ ...defaultBreakpoint });

  useEffect(() => {
    const sortedBreakpoints = [...PALMETTO_BREAKPOINTS].sort((a, b) => b.minWidth - a.minWidth);
    const activeBreakpoint = windowSize && sortedBreakpoints.find(b => b.minWidth < (windowSize.width as number));

    setBreakpoint(activeBreakpoint || { ...defaultBreakpoint });
  }, [windowSize]); // Empty array ensures that effect is only run on mount

  return breakpoint;
}

export default useBreakpoint;
