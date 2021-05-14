import React from 'react';
import mergeRefs from 'react-merge-refs';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { TabItem } from './TabItem';
import { ResponsiveProp } from '../../types/';
import styles from './TabsSlider.module.scss';

export const tabsSliderSizes = ['sm', 'md', 'lg'] as const;
export type TabsSliderSize = typeof tabsSliderSizes[number];

export const tabsSliderFontSizeMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const tabsSliderBorderWidthMap = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

export const tabsSliderPaddingMap = {
  sm: 'xs 0',
  md: 'sm 0',
  lg: 'md 0',
};

type TabsMeta = {
  clientWidth: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
} | undefined;

export interface TabsSliderProps extends BoxProps {
  /**
   * Value of current active tab.
   */
  value: number;
  /**
   * Callback fired  when user selects a tab either via click or keyboard event.
   */
  onChange: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
  /**
   * Size of tabs
   */
  size?: TabsSliderSize | ResponsiveProp<TabsSliderSize>;
  /**
   * NOTE: This prop is locked to a value  of 'grey-100' and will not be passed down to the underlying Box
   */
  background?: BoxProps['background'];
  /**
   * NOTE: This prop is locked to a value based on the 'size' prop and will not be passed down to the underlying Box.
   */
  radius?: BoxProps['radius'];
  /**
   * NOTE: This prop is locked to a value of 'auto' and will not be passed down to the underlying Box.
   */
  overflow?: BoxProps['overflow'];
  /**
   * NOTE: This prop is locked to a value of 'nav' and will not be passed down to the underlying Box.
   */
  as?: BoxProps['as'];
}

export class TabsSlider extends React.Component<TabsSliderProps> {
  static Item = TabItem;

  static defaultProps = { // eslint-disable-line react/static-property-placement
    size: 'md',
  }

  state = { // eslint-disable-line react/state-in-constructor
    indicatorStyle: {
      left: 0,
      width: 0,
    },
  };

  tabsRef = React.createRef<HTMLElement>();

  tabListRef = React.createRef<HTMLUListElement>();

  componentDidMount(): void {
    window.addEventListener('resize', this.updateIndicatorState);
    this.updateIndicatorState();
  }

  componentDidUpdate(prevProps: TabsSliderProps): void {
    const { value, children } = this.props;
    if (
      prevProps.value !== value
      || prevProps.children !== children
    ) {
      this.updateIndicatorState();
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateIndicatorState);
  }

  generateSize = (size: TabsSliderProps['size'], propertyMap: { sm: string; md: string; lg: string; }): string | ResponsiveProp<string> => {
    let propertySize: string | ResponsiveProp<string> = 'md';
    if (typeof size === 'string') {
      propertySize = propertyMap[size];
    } else if (size !== null && typeof size === 'object') {
      propertySize = Object.entries(size).reduce((acc, [key, value]) => ({ ...acc, [key]: propertyMap[value ?? 'md']}), {});
    }

    return propertySize;
  };

  get tabFontSize(): string | ResponsiveProp<string>  {
    const { size } = this.props;

    return this.generateSize(size, tabsSliderFontSizeMap);
  }

  get tabPadding(): string | ResponsiveProp<string>  {
    const { size } = this.props;

    return this.generateSize(size, tabsSliderPaddingMap);
  }

  get tabBorderWidth(): string | ResponsiveProp<string>  {
    const { size } = this.props;

    return this.generateSize(size, tabsSliderBorderWidthMap);
  }

  getTabsMeta = (): { tabsMeta: TabsMeta; tabMeta: DOMRect | undefined | null; } => {
    const tabsNode = this.tabsRef.current;
    const { value } = this.props;

    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();

      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && value !== undefined) {
      const children = this.tabListRef?.current?.children;

      if (children && children.length > 0) {
        const tab = children[value];

        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return { tabsMeta, tabMeta };
  };

  updateIndicatorState = (): void => {
    const { tabsMeta, tabMeta } = this.getTabsMeta();
    const { indicatorStyle } = this.state;
    let startValue = 0;

    if (tabMeta && tabsMeta) {
      const correction = tabsMeta.scrollLeft;
      startValue = (tabMeta?.left ?? 0) - (tabsMeta?.left ?? 0) + (correction ?? 0);
    }

    const newIndicatorStyle = {
      left: startValue,
      width: tabMeta ? tabMeta.width : 0,
    };

    const dStart = Math.abs(indicatorStyle.left - newIndicatorStyle.left);
    const dSize = Math.abs(indicatorStyle.width - newIndicatorStyle.width);

    if (dStart >= 1 || dSize >= 1) {
      this.setState({ indicatorStyle: { ...newIndicatorStyle } });
    }
  };

  render(): React.ReactNode {
    const {
      className,
      children,
      onChange,
      ref,
      size,
      value,
      ...restProps
    } = this.props;

    const { tabBorderWidth, tabFontSize, tabPadding } = this;
    const { indicatorStyle } = this.state;

    const decoratedChildren = React.Children.map(children, (child, index) => {
      let childToReturn = child;
      if (React.isValidElement(child)) {
        /**
         * Merging any existing onClick handlers with our onChange handler.
         */
        const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
          if (child.props.onClick) {
            (child.props.onClick(event));
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

        childToReturn = React.cloneElement(
          child,
          {
            className: classes,
            onClick: onClickHandler,
            fontSize: tabFontSize,
            padding: tabPadding,
            style: { ...child.props.style, flex: 1 },
          },
        );
      }

      return childToReturn;
    });

    const containerClasses = classNames(className, styles['tabs-slider-container']);

    return (
      <Box
        {...restProps}
        className={containerClasses}
        as="nav"
        overflow="auto"
        background="grey-100"
        radius="md"
        ref={mergeRefs([this.tabsRef, ref])}
      >
        <Box
          as="ul"
          direction="row"
          role="tablist"
          style={{ paddingInlineStart: '0' }}
          position="relative"
          ref={this.tabListRef}
        >
          {decoratedChildren}
          <Box
            radius="md"
            background="white"
            height="100"
            position="absolute"
            borderWidth={tabBorderWidth}
            borderColor="grey-100"
            style={{ ...indicatorStyle }}
            className={styles['tabs-slider-indicator']}
          />
        </Box>
      </Box>
    );
  }
}
