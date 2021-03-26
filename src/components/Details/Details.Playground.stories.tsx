import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../Button/Button';
import { Box, boxPropsKeys } from '../Box/Box';
import { Details, DetailsProps } from './Details';

export default {
  title: 'Components/Details/Playground',
  component: Details,
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
  },
} as Meta;

const Template: Story<DetailsProps> = ({
  isOpen,
  summaryText,
  detailsText,
  ...args
}) => (
  <Details isOpen={isOpen} {...args}>
    <Details.Summary isDetailsOpen={isOpen}>
      <Button>{summaryText}</Button>
    </Details.Summary>
    <Box padding="lg" background="grey-50" margin="sm 0 0 0">
      {detailsText}
    </Box>
  </Details>
);

/**
 * Use the playground to see different results
 */
export const Playground = Template.bind({});

Playground.args = {
  isOpen: false,
  summaryText: 'Summary',
  detailsText: 'Details go here!',
};
