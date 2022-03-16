import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Components/Pagination/Playground',
  component: Pagination,
  argTypes: {
    activePage: {
      control: 'number',
    },
    itemsPerPage: {
      control: 'number',
    },
    totalItemsCount: {
      control: 'number',
    },
  },
} as Meta;

const Template: Story<PaginationProps> = ({ ...args }) => <Pagination {...args} />;
export const Playground = Template.bind({});
Playground.args = {
  arePagesVisible: true,
  activePage: 1,
};
Playground.parameters = {
  controls: {
    include: ['activePage', 'itemsPerPage', 'totalItemsCount'],
  },
};
