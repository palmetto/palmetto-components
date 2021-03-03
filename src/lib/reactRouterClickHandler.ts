import { MouseEvent, AnchorHTMLAttributes } from 'react';

const isModifiedEvent = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => (
  !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
);

/**
 * Due to react-router's handling of custom components used in RR <Link>
 * we must add this validation that ensures the router will execute the passed `navigate`
 * prop, thus navigating the user without triggering a refresh.
 *
 * SOURCES:
 *    https://github.com/ReactTraining/react-router/issues/7727
 *    https://github.com/ReactTraining/react-router/issues/7761
 * */
const handleClick = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  onClick: ((e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void) | undefined,
  target: AnchorHTMLAttributes<HTMLAnchorElement>['target'] | undefined,
  navigate: (() => void) | undefined,
): void => {
  if (onClick) onClick(event);

  if (
    !event.defaultPrevented// onClick prevented default
    && event.button === 0 // ignore everything but left clicks
    && (!target || target === '_self') // let browser handle "target=_blank" etc.
    && !isModifiedEvent(event) // ignore clicks with modifier keys
    && navigate
  ) {
    event.preventDefault();
    navigate();
  }
};

export default handleClick;
