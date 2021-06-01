import React from 'react';
import { Details, DetailsProps } from '../Details/Details';

export type AccordionPanelProps = DetailsProps;

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  borderWidth = '0 0 xs 0',
  borderColor = 'grey-100',
  ...restProps
}) => (
  <Details {...restProps} borderColor={borderColor} borderWidth={borderWidth}>
    {children}
  </Details>
);
