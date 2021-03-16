import React from 'react';
import { Details, DetailsProps } from '../Details/Details';

export type AccordionPanelProps = DetailsProps;

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  ...restProps
}) => (
  <Details {...restProps}>
    {children}
  </Details>
);
