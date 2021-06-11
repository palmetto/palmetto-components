import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { AccordionPanel } from './AccordionPanel';
import { AccordionPanelDetails } from './AccordionPanelDetails';
import { AccordionPanelSummary } from './AccordionPanelSummary';

export type AccordionProps = BoxProps;

export class Accordion extends React.Component<AccordionProps> {
  static Panel = AccordionPanel;

  static PanelSummary = AccordionPanelSummary;

  static PanelDetails = AccordionPanelDetails;

  render(): React.ReactNode {
    const { children, ...restProps } = this.props;

    return <Box {...restProps}>{children}</Box>;
  }
}
