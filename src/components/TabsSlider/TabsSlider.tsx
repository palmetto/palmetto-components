import React from 'react';
import mergeRefs from 'react-merge-refs';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { ButtonVariant } from '../Button/Button';
import { Box, BoxProps } from '../Box/Box';
import { TabItem } from './TabItem';
import styles from './TabsSlider.module.scss';

export type TabsVariant = ButtonVariant;

export interface TabsSliderProps extends BoxProps {
  value: number;
  onChange: (event: React.MouseEvent<HTMLLIElement>, index: number) => void;
  size?: 'sm' | 'md' | 'lg' | ResponsiveProp<'xs' | 'sm' | 'md'>;
  background?: 'grey-100';
  radius?: 'md';
}

export class TabsSlider extends React.Component<TabsSliderProps> {
  static Item = TabItem;

  static defaultProps = {
    as: 'nav',
    background: 'grey-100',
    radius: 'md',
    overflow: 'auto',
    size: 'md',
  }

  state = {
    indicatorStyle: {
      left: 0,
      width: 0,
    },
  };

  tabsRef = React.createRef<HTMLElement>();
  tabListRef = React.createRef<HTMLUListElement>();

  componentDidMount() {
    if (!window && process.env.NODE_ENV !== 'production') {
      console.error(
        `
          Palmetto Components: It looks like you\'re trying to use the SliderTabs component in a server-rendered application.
          Without access to the window object, the selected tab indicator will not resize properly along with any window resizes.
          To ensure this component works as intended, please import it dynamically.
          \n\n
          NextJS example:
          \n
          import dynamic from 'next/dynamic';
          \n\n
          const SliderTabs = dynamic(import('@palmetto/palmetto-components').then((c) => c.SliderTabs));
        `
      );
    } else if (window) {
      window.addEventListener('resize', this.updateIndicatorState);
    }
    this.updateIndicatorState();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIndicatorState);
  }

  componentDidUpdate(prevProps: TabsSliderProps) {
    if (
      prevProps.value !== this.props.value
      || prevProps.children !== this.props.children
    ) {
      this.updateIndicatorState();
    }
  }

  get tabFontSize() {
    const { size } = this.props;

    switch(size) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'md'
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';    }
  };

  get tabHeight() {
    const { size } = this.props;

    switch(size) {
      case 'xs':
        return '20px';
      case 'sm':
        return '32px'
      case 'md':
        return '42px';
      case 'lg':
        return '55px';
    }
  }

  get tabBorderWidth() {
    const { size } = this.props;

    switch(size) {
      case 'xs':
        return 'sm';
      case 'sm':
        return 'sm'
      case 'md':
        return 'sm';
      case 'lg':
        return 'md';
    }
  }

  getTabsMeta = () => {
    const tabsNode = this.tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        // scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && this.props.value !== undefined) {
      const children = this.tabListRef?.current?.children;

      if (children && children.length > 0) {
        const tab = children[this.props.value];

        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return { tabsMeta, tabMeta };
  };

  updateIndicatorState = () => {
    const { tabsMeta, tabMeta } = this.getTabsMeta();
    let startValue = 0;

    if (tabMeta && tabsMeta) {
      const correction = tabsMeta.scrollLeft;
      startValue = (tabMeta?.left ?? 0) - (tabsMeta?.left ?? 0) + (correction ?? 0);
    }

    const newIndicatorStyle = {
      left: startValue,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0,
    };

    // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(this.state.indicatorStyle.left) || isNaN(this.state.indicatorStyle.width)) {
      this.setState({ indicatorStyle: { ...newIndicatorStyle } });
    } else {
      const dStart = Math.abs(this.state.indicatorStyle.left - newIndicatorStyle.left);
      const dSize = Math.abs(this.state.indicatorStyle.width - newIndicatorStyle.width);

      if (dStart >= 1 || dSize >= 1) {
        this.setState({ indicatorStyle: { ...newIndicatorStyle } });
      }
    }
  };

  render(): React.ReactNode {
    const {
      as,
      children,
      background,
      radius,
      onChange,
      overflow,
      ref,
      size,
      value,
      ...restProps
    } = this.props;

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

        childToReturn =  React.cloneElement(
          child,
          {
            className: classes,
            onClick: onClickHandler,
            fontSize: this.tabFontSize,
            height: this.tabHeight,
            style: { ...child.props.style, flex: 1 },
          },
        );
      }

      return childToReturn;
    });

    return (
      <Box
        as={as}
        overflow={overflow}
        background={background}
        borderColor={background}
        radius={size === 'xs' ? 'sm' : 'md'}
        ref={mergeRefs([this.tabsRef, this.props.ref])}
        {...restProps}
      >
        <Box
          as="ul"
          direction="row"
          role="tablist"
          style={{ paddingInlineStart: '0' }}
          position="relative"
          ref={this.tabListRef}
          height={this.tabHeight}
        >
          {decoratedChildren}
          <Box
            radius={size === 'xs' ? 'sm' : 'md'}
            background="white"
            height="100"
            position="absolute"
            borderWidth={this.tabBorderWidth}
            borderColor={background}
            style={{ ...this.state.indicatorStyle }}
            className={styles['tabs-slider-indicator']}
          />
        </Box>
      </Box>
    );
  }
}
