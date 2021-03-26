import React from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { SpacingSize, BorderRadiusSize } from '../../types';

export interface FormInputProps extends BoxProps {
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: React.ReactNode;
  /**
   * The size of the text input.
   */
  size?: 'sm' | 'md' | 'lg';
}

export const inputPaddingSizes: { [key: string]: { [key: string]: SpacingSize; } } = {
  sm: {
    v: '2xs',
    h: '2xs',
  },
  md: {
    v: 'sm',
    h: 'sm',
  },
  lg: {
    v: 'md',
    h: 'md',
  },
};

export const childGapSizes: { [key: string]: SpacingSize } = {
  sm: '2xs',
  md: 'xs',
  lg: 'sm',
};

export const inputRadiusSizes: {[key: string]: BorderRadiusSize } = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const FormInput: React.FC<FormInputProps> = ({
  children,
  error,
  isDisabled,
  size = 'md',
  ...restProps
}) => {
  /**
   * Shallow merges existing classes of child node with a className based on the childGap value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decorateChildren = (child: string | number | React.ReactElement<any>, i: number, array: React.ReactElement<any>[]) => {
    if (!child || typeof child === 'string' || typeof child === 'number') {
      return child;
    }

    let classes;

    classes = classNames(child.props.className, `p-v-${inputPaddingSizes[size].v}`);
  
    if (array.length === 1) {
      classes = classNames(classes, `p-h-${inputPaddingSizes[size].h}`);
    }

    if (array.length === 2) {
      if (i === 0) {
        classes = classNames(classes, `p-left-${inputPaddingSizes[size].h}`);
      }

      if (i === 1) {
        classes = classNames(classes, `p-right-${inputPaddingSizes[size].h}`)
      }
    }

    if (array.length > 2) {
      if (i === 0) {
        classes = classNames(classes, `p-left-${inputPaddingSizes[size].h}`);
      }

      if (i === array.length - 1) {
        classes = classNames(classes, `p-right-${inputPaddingSizes[size].h}`)
      }
    }

    return React.cloneElement(child, {
      className: classes,
      key: child.key ?? i,
    });
  };

  let decoratedChildren = React.Children.toArray(children).filter(child => child !== null);

  decoratedChildren = decoratedChildren
    .map((value, index, array) => decorateChildren(
      value as string | number | React.ReactElement<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
      index,
      array as React.ReactElement<any>[], // eslint-disable-line @typescript-eslint/no-explicit-any
    ));

  return (
    <Box
      radius={inputRadiusSizes[size]}
      background={error ? 'warning-100' : 'white'}
      borderColor={error ? 'warning' : 'grey-100'}
      childGap={childGapSizes[size]}
      borderWidth="xs"
      shadow="2xs"
      {...restProps}
    >
      {decoratedChildren}
    </Box>
  );
}
