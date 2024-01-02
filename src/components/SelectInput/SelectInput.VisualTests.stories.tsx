import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { SelectInput } from './SelectInput';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/SelectInput/Visual Regression Tests',
  component: SelectInput,
} as Meta;

export const Sizes = (): ReactElement => (
  <Box gap="xl">
    <SelectInput
      id="smallSelect"
      label="Small"
      options={[]}
      value={null}
      size="sm"
      onChange={() => {}} // eslint-disable-line
    />
    <SelectInput
      id="mediumSelect"
      label="Medium"
      options={[]}
      value={null}
      size="md"
      onChange={() => {}} // eslint-disable-line
    />
    <SelectInput
      id="largeSelect"
      label="Large"
      options={[]}
      value={null}
      size="lg"
      onChange={() => {}} // eslint-disable-line
    />
    <SelectInput
      id="responsiveSelect"
      label="Responsive"
      options={[]}
      value={null}
      size={{
        base: 'sm',
        tablet: 'md',
        desktop: 'lg',
        hd: 'sm',
      }}
      onChange={() => {}} // eslint-disable-line
    />
  </Box>
);

Sizes.parameters = RESPONSIVE_STORY;
