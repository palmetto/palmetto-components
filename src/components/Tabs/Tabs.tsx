import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';
import mergeRefs from 'react-merge-refs';
import { ResponsiveProp } from '../../types';
import { ButtonVariant } from '../Button/Button';
import { Box, BoxProps } from '../Box/Box';
import { TabItem } from './TabItem';
import styles from './Tabs.module.scss';

export type TabsVariant = ButtonVariant;

export interface TabsProps extends BoxProps {
  value: number;
  onChange: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
  isFullWidth?: boolean;
  isCentered?: boolean;
  size?: 'sm' | 'md' | ResponsiveProp<'sm' | 'md'>;
}

const TabsBaseComponent: React.FC<TabsProps> = React.forwardRef(
  (
    {
      as = 'nav',
      borderWidth = '0 0 xs 0',
      borderColor = 'grey-100',
      children,
      isCentered = false,
      isFullWidth = false,
      onChange,
      overflow = 'auto',
      size = 'md',
      value,
      ...restProps
    },
    ref,
  ) => {
    const activeTabRef = React.useRef() as React.RefObject<HTMLDivElement>;

    const decoratedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        /**
         * Merging any existing onClick handlers with our onChange handler.
         */
        const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
          if (child.props.onClick) {
            child.props.onClick(event);
          }

          if (!child.props.isDisabled && onChange) {
            onChange(event, index);
          }
        };

        /**
         * Merge our custom styling with existing className in child
         */
        const classes = classNames(
          child.props.className,
          styles['tab-item'],
          { [styles.disabled]: child.props.isDisabled },
          { [styles['tab-item--selected']]: value === index },
        );

        return React.cloneElement(child, {
          ...child.props,
          className: classes,
          onClick: onClickHandler,
          fontSize: size,
          padding: size,
          key: child.key,
          style: { ...child.props.style, ...(isFullWidth && { flex: 1 }) },
          'aria-posinset': index + 1,
          'aria-setsize': React.Children.toArray(children).length,
          'aria-selected': value === index,
          ref: mergeRefs([
            value === index ? activeTabRef : null,
            (child as ReactNode & { ref: RefObject<HTMLElement>; }).ref,
          ]),
        });
      }

      return child;
    });

    React.useEffect(() => {
      if (activeTabRef.current) {
        activeTabRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, []);

    return (
      <Box
        as={as}
        borderWidth={borderWidth}
        borderColor={borderColor}
        overflow={overflow}
        ref={ref}
        {...restProps}
      >
        <Box
          direction="row"
          role="tablist"
          /**
           * NOTE: we use margins instead of justify-content here in order to avoid problems when the tabs overflow.
           * See this for details:
           * https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
           * */
          margin={isCentered ? '0 auto' : undefined}
          style={{ paddingInlineStart: '0' }}
        >
          {decoratedChildren}
        </Box>
      </Box>
    );
  },
);

export interface TabsStatic {
  Item: typeof TabItem;
}

export type TabsWithStaticComponents = typeof TabsBaseComponent & TabsStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Tabs = (() => {
  const Tabs = TabsBaseComponent as TabsWithStaticComponents; // eslint-disable-line no-shadow

  Tabs.Item = TabItem;

  return Tabs;
})();
