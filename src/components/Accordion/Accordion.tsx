import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { AccordionPanel } from './AccordionPanel';
import { AccordionPanelDetails } from './AccordionPanelDetails';
import { AccordionPanelSummary } from './AccordionPanelSummary';

export type AccordionProps = BoxProps;

const AccordionBaseComponent: React.FC<AccordionProps> = React.forwardRef(({ children, ...restProps }, ref) => (
  <Box ref={ref} {...restProps}>{children}</Box>
));

export interface AccordionStatic {
  Panel: typeof AccordionPanel;
  PanelSummary: typeof AccordionPanelSummary;
  PanelDetails: typeof AccordionPanelDetails;
}

export type AccordionWithStaticComponents =
  typeof AccordionBaseComponent
  & AccordionStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Accordion = (() => {
  const Accordion = AccordionBaseComponent as AccordionWithStaticComponents; // eslint-disable-line no-shadow

  Accordion.Panel = AccordionPanel;
  Accordion.PanelSummary = AccordionPanelSummary;
  Accordion.PanelDetails = AccordionPanelDetails;

  return Accordion;
})();
