import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { boxPropsKeys } from '../Box/Box';
import { OptionTiles, OptionTilesProps } from './OptionTiles';

export default {
  title: 'Components/OptionTiles/Playground',
  component: OptionTiles,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: ['chocolate', 'strawberry', 'vanilla'],
      },
    },
    isFullWidth: {
      control: {
        type: 'boolean',
      },
    },
    isMulti: {
      control: {
        type: 'boolean',
      },
    },
    hideInput: {
      control: {
        type: 'boolean',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
    direction: {
      control: {
        type: 'select',
        options: ['row', 'column'],
      },
    },
  },
} as Meta;

const Template: Story<OptionTilesProps> = ({
  value,
  onChange,
  name,
  ...args
}) => (
  <OptionTiles
    {...args}
    options={[
      { value: 'chocolate', label: 'chocolate', id: 'chocolate' },
      { value: 'strawberry', label: 'strawberry', id: 'strawberry' },
      { value: 'vanilla', label: 'vanilla', id: 'vanilla' },
    ]}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export const Playground = Template.bind({});

Playground.args = {
  value: null,
  onChange: () => {}, // eslint-disable-line
  name: 'optionTilesPlayground',
};
