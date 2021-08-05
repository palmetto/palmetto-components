export const prefersReducedMotion = (() => { // eslint-disable-line import/prefer-default-export
  let shouldReduceMotion: boolean | undefined;

  return () => {
    if (shouldReduceMotion === undefined) {
      const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
