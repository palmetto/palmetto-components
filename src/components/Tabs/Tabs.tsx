import React from 'react';
import classNames from 'classnames';
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
      value,
      variant = 'primary',
      ...restProps
    } = this.props;

    const decoratedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const classes = classNames(
          child.props.className,
          styles['tab-item'],
          'font-color-grey-400',
          { [styles.disabled]: child.props.isDisabled },
          { [styles['tab-item--selected']]: value === index },
          { ['font-weight-bold']: value === index },
          { ['font-color-primary']: value === index }
        );

        const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
          if (child.props.onClick){ 
            (child.props.onClick(event));
          }

          onChange(event, index);
        };

        return React.cloneElement(
          child,
          {
            className: classes,
            onClick: onClickHandler,
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
          justifyContent={isCentered ? 'center' : undefined}
          style={{ paddingInlineStart: '0' }}
        >
          {decoratedChildren}
        </Box>
      </Box>
    );
  }
}