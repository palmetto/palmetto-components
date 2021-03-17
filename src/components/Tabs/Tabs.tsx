import React from 'react';
import classNames from 'classnames';
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

export class Tabs extends React.Component<TabsProps> {
  static Item = TabItem;

  render(): React.ReactNode {
    const {
      as = 'nav',
      borderWidth = '0 0 xs 0',
      borderColor = 'grey-100',
      children,
      isCentered = false,
      isFullWidth = false,
      onChange,
      size = { base: 'sm', tablet: 'md', desktop: 'md', hd: 'md' },
      value,
      variant = 'primary',
      ...restProps
    } = this.props;

    const decoratedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        /**
         * Merging any existing onClick handlers with our onChange handler.
         */
        const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
          if (child.props.onClick){ 
            (child.props.onClick(event));
          }

          onChange(event, index);
        };

        /**
         * Merge our custom styling with existing className in child
         */
        const classes = classNames(
          child.props.className,
          styles['tab-item'],
          'font-color-grey-400',
          { [styles.disabled]: child.props.isDisabled },
          { [styles['tab-item--selected']]: value === index },
          { ['font-weight-bold']: value === index },
          { ['font-color-primary']: value === index }
        );

        return React.cloneElement(
          child,
          {
            className: classes,
            onClick: onClickHandler,
            fontSize: size,
            padding: size,
            style: { ...child.props.style, ...isFullWidth && { flex: 1 } },
          },
        );
      }
  
      return child;
    });

    return (
      <Box
        as={as}
        borderWidth={borderWidth}
        borderColor={borderColor}
        {...restProps}
      >
        <Box
          as="ul"
          direction="row"
          role="tablist"
          /**
           * NOTE: we use margins instead of justify-content here in order to avoid problems when the tabs overflow.
           * See this for details:
           * https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
           * */
          margin={isCentered ? '0 auto' : undefined}
          overflow="auto"
          style={{ paddingInlineStart: '0' }}
        >
          {decoratedChildren}
        </Box>
      </Box>
    );
  }
}