import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { Details, DetailsProps } from './Details';

export default {
  title: 'Components/Details/Playground',
  component: Details,
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<DetailsProps> = ({
  isOpen,
  summaryText,
  detailsText,
  ...args
}) => {
  return (
    <Details isOpen={isOpen} {...args}>
      <Details.Summary isDetailsOpen={isOpen}>
        <Button>{summaryText}</Button>
      </Details.Summary>
      <Box padding="lg" background="grey-50" margin="sm 0 0 0">
        {detailsText}
      </Box>
    </Details>
  );
};

/**
 * Use the playground to see different results
 */

export const Playground = Template.bind({});
Playground.args = {
  isOpen: false,
};

Playground.args = {
  summaryText: 'Summary',
  detailsText: 'Details go here!'
};
