import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Accordion, AccordionProps } from './Accordion';
import { boxPropsKeys } from '../Box/Box';

export default {
  title: 'Components/Accordion/Playground',
  component: Accordion,
  argTypes: {
    openPanels: {
      control: {
        type: 'check',
        options: [0, 1, 2],
      },
    },
    hasCaret: {
      control: {
        type: 'select',
        options: ['right', 'left', false],
      },
    },
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
  },
} as Meta;

const Template: Story<AccordionProps> = ({
  hasCaret,
  openPanels,
  ...args
}) => (
  <Accordion {...args}>
    <Accordion.Panel isOpen={openPanels.includes(0)}>
      <Accordion.PanelSummary isDetailsOpen={openPanels.includes(0)} hasCaret={hasCaret}>
        Question 0
      </Accordion.PanelSummary>
      <Accordion.PanelDetails>
        Answer 0
      </Accordion.PanelDetails>
    </Accordion.Panel>
    <Accordion.Panel isOpen={openPanels.includes(1)}>
      <Accordion.PanelSummary isDetailsOpen={openPanels.includes(1)} hasCaret={hasCaret}>
        Question 1
      </Accordion.PanelSummary>
      <Accordion.PanelDetails>
        Answer 1
      </Accordion.PanelDetails>
    </Accordion.Panel>
    <Accordion.Panel isOpen={openPanels.includes(2)}>
      <Accordion.PanelSummary isDetailsOpen={openPanels.includes(2)} hasCaret={hasCaret}>
        Question 2
      </Accordion.PanelSummary>
      <Accordion.PanelDetails>
        Answer 2
      </Accordion.PanelDetails>
    </Accordion.Panel>
  </Accordion>
);

export const Playground = Template.bind({});

Playground.args = {
  openPanels: [],
  hasCaret: 'right',
};
