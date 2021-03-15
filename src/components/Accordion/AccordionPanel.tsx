import React from 'react';
import { Details, DetailsProps } from '../Details/Details';

export interface AccordionPanelProps extends DetailsProps {}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  ...restProps
}) => {

  return (
    <Details {...restProps}>
      {children}
    </Details>
  );
};