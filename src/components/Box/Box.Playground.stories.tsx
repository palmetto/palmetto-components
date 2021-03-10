import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Box, BoxProps } from './Box';
import {
  BORDER_SIZE_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  BOX_SHADOW_OPTIONS,
  FONT_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  SPACING_OPTIONS,
  BRAND_COLOR_OPTIONS,
  WIDTH_OPTIONS,
  HEIGHT_OPTIONS,
} from '../../lib/tokens';

export default {
  title: 'Components/Box/Playground',
  component: Box,
  argTypes: {
    childCount: {
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
      description: 'number of child Boxes to render within the parent Box',
      defaultValue: 5,
    },
    childGap: {
      control: {
        type: 'select',
        options: [null, ...SPACING_OPTIONS],
      },
    },
    display: {
      control: {
        type: 'select',
        options: [
          'none',
          'flex',
          'inline-flex',
          'block',
          'inline-block',
          'inline',
          'inherit',
          'grid',
        ],
      },
    },
    direction: {
      control: {
        type: 'select',
        options: [null, 'column', 'row'],
      },
    },
    alignContent: {
      control: {
        type: 'select',
        options: [
          null,
          'flex-start',
          'flex-end',
          'center',
          'stretch',
          'space-between',
          'space-around',
        ],
      },
    },
    alignItems: {
      control: {
        type: 'select',
        options: [null, 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      },
    },
    justifyContent: {
      control: {
        type: 'select',
        options: [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-around',
          'space-evenly',
        ],
      },
    },
    margin: {
      control: {
        type: 'select',
        options: [null, ...SPACING_OPTIONS],
      },
    },
    padding: {
      control: {
        type: 'select',
        options: [null, ...SPACING_OPTIONS],
      },
    },
    width: {
      control: {
        type: 'select',
        options: [undefined, ...WIDTH_OPTIONS],
      },
    },
    maxWidth: {
      control: {
        type: 'select',
        options: [null, ...WIDTH_OPTIONS],
      },
    },
    minWidth: {
      control: {
        type: 'select',
        options: [null, ...WIDTH_OPTIONS],
      },
    },
    height: {
      control: {
        type: 'select',
        options: [null, ...HEIGHT_OPTIONS],
      },
    },
    maxHeight: {
      control: {
        type: 'select',
        options: [null, ...WIDTH_OPTIONS],
      },
    },
    minHeight: {
      control: {
        type: 'select',
        options: [null, ...WIDTH_OPTIONS],
      },
    },
    overflow: {
      control: {
        type: 'select',
        options: [
          null,
          'inherit',
          'auto',
          'initial',
          'unset',
          'visible',
          'hidden',
          'clip',
          'scroll',
        ],
      },
    },
    wrap: {
      control: 'boolean',
    },
    background: {
      control: {
        type: 'select',
        options: [null, ...BRAND_COLOR_OPTIONS],
      },
    },
    radius: {
      control: {
        type: 'select',
        options: [null, ...BORDER_RADIUS_OPTIONS],
      },
    },
    borderWidth: {
      control: {
        type: 'select',
        options: [null, ...BORDER_SIZE_OPTIONS],
      },
    },
    borderColor: {
      control: {
        type: 'select',
        options: [null, ...BRAND_COLOR_OPTIONS],
      },
    },
    shadow: {
      control: {
        type: 'select',
        options: [null, ...BOX_SHADOW_OPTIONS],
      },
    },
    color: {
      control: {
        type: 'select',
        options: [null, ...FONT_COLOR_OPTIONS],
      },
    },
    fontSize: {
      control: {
        type: 'select',
        options: [null, ...FONT_SIZE_OPTIONS],
      },
    },
    fontWeight: {
      control: {
        type: 'select',
        options: [null, ...FONT_WEIGHT_OPTIONS],
      },
    },
    childTextAlign: {
      control: {
        type: 'inline-radio',
        options: [null, 'left', 'center', 'right'],
      },
      defaultValue: 'center',
    },
    childWidth: {
      control: {
        type: 'select',
        options: [null, ...WIDTH_OPTIONS],
      },
    },
    childHeight: {
      control: {
        type: 'select',
        options: [null, ...HEIGHT_OPTIONS],
      },
    },
    childBackground: {
      control: {
        type: 'select',
        options: [null, ...BRAND_COLOR_OPTIONS],
      },
    },
    className: {
      control: 'text',
    },
    as: {
      control: 'text',
      defaultValue: 'div',
    },
    style: {
      control: {
        type: 'object',
      },
    },
    textAlign: { control: false },
    flex: { control: false },
    children: { control: false },
    alignSelf: { control: false },
  },
} as Meta;

const Template: Story<BoxProps> = ({
  childCount,
  childBackground,
  childWidth,
  childHeight,
  childTextAlign,
  ...args
}) => {
  const childBoxes = [];

  for (let i = 0; i < childCount; i += 1) {
    childBoxes.push(
      <Box
        width={childWidth}
        height={childHeight}
        textAlign={childTextAlign}
        justifyContent="center"
        background={childBackground}
        radius="md"
        key={i}
        padding="sm"
      >
        {i + 1}
      </Box>,
    );
  }

  return <Box {...args}>{childBoxes}</Box>;
};

export const Playground = Template.bind({});
Playground.args = {
  background: 'info-300',
  direction: 'row',
  childWidth: 'lg',
  childHeight: 'lg',
  childGap: 'sm',
  padding: 'lg',
  width: '100',
  childBackground: 'white',
};
