import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../lib/tokens';
import { Breakpoint } from '../types';
import { useWindowSize } from './useWindowSize';

const defaultBreakpoint: Breakpoint = { name: 'base', minWidth: 0 };

export interface WhichBreakpoint {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHd: boolean;
  activeBreakpoint: Breakpoint;
}
export const useBreakpoint = (): WhichBreakpoint => {
  const windowSize = useWindowSize();

  const [breakpoint, setBreakpoint] = useState<Breakpoint>({ ...defaultBreakpoint });

  useEffect(() => {
    const sortedBreakpoints = [...BREAKPOINTS].sort((a, b) => b.minWidth - a.minWidth);
    const activeBreakpoint = windowSize && sortedBreakpoints.find(b => b.minWidth < (windowSize.innerWidth as number));

    setBreakpoint(activeBreakpoint || { ...defaultBreakpoint });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth, windowSize.innerHeight, windowSize.outerWidth, windowSize.outerHeight]);

  return {
    isMobile: breakpoint.name === 'base',
    isTablet: breakpoint.name === 'tablet',
    isDesktop: breakpoint.name === 'desktop',
    isHd: breakpoint.name === 'hd',
    activeBreakpoint: breakpoint,
  };
};
