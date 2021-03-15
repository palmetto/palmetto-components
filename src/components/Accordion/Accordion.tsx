import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { AccordionPanel } from './AccordionPanel';
import { AccordionPanelDetails } from './AccordionPanelDetails';
import { AccordionPanelSummary } from './AccordionPanelSummary';

export interface AccordionProps extends BoxProps {}

export class Accordion extends React.Component<AccordionProps> {
  static Panel = AccordionPanel;
  static PanelSummary = AccordionPanelSummary;
  static PanelDetails = AccordionPanelDetails;

  render() {
    return (
      <Box {...this.props}>
        {this.props.children}
      </Box>
    )
  }
}