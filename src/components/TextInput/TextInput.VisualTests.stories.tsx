import React, { ReactElement, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TextInput, TextInputProps } from './TextInput';
import { Icon } from '../Icon/Icon';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TextInput/Visual Regression Tests',
  component: TextInput,
} as Meta;

const Template: Story<TextInputProps> = args => (
  <TextInput
    {...args}
    onChange={() => {}} // eslint-disable-line
  />
);

export const PrefixSuffixSizes: React.FC = (): ReactElement => {
  const [prefixValue, setPrefixValue] = useState('palmettosolar');
  const [prefixValue2, setPrefixValue2] = useState('49');
  const [prefixValue3, setPrefixValue3] = useState('');
  const [prefixValue4, setPrefixValue4] = useState('Pre-populated Value');
  return (
    <Box childGap="xl" direction="row">
      <Box childGap="md" width="33">
        <TextInput
          id="prefixSuffix1"
          value={prefixValue}
          label="Prefix"
          onChange={event => setPrefixValue(event.target.value)}
          prefix="@"
          size="sm"
        />
        <TextInput
          id="prefixSuffix2"
          value={prefixValue2}
          label="Prefix and Suffix"
          onChange={event => setPrefixValue2(event.target.value)}
          prefix="$"
          suffix=".99"
          size="sm"
        />
        <TextInput
          id="prefixSuffix3"
          value={prefixValue3}
          label="Suffix"
          placeholder="Contact name"
          onChange={event => setPrefixValue3(event.target.value)}
          suffix={<Icon name="book" />}
          size="sm"
        />
        <TextInput
          id="prefixSuffix4"
          value={prefixValue4}
          label="Suffix with Clear"
          placeholder="Contact name"
          onChange={event => setPrefixValue4(event.target.value)}
          onClear={() => setPrefixValue4('')}
          suffix={<Icon name="search" />}
          size="sm"
        />
      </Box>
      <Box childGap="md" width="33">
        <TextInput
          id="prefixSuffix5"
          value={prefixValue}
          label="Prefix"
          onChange={event => setPrefixValue(event.target.value)}
          prefix="@"
        />
        <TextInput
          id="prefixSuffix6"
          value={prefixValue2}
          label="Prefix and Suffix"
          onChange={event => setPrefixValue2(event.target.value)}
          prefix="$"
          suffix=".99"
        />
        <TextInput
          id="prefixSuffix7"
          value={prefixValue3}
          label="Suffix"
          placeholder="Contact name"
          onChange={event => setPrefixValue3(event.target.value)}
          suffix={<Icon name="book" />}
        />
        <TextInput
          id="prefixSuffix8"
          value={prefixValue4}
          label="Suffix with Clear"
          placeholder="Contact name"
          onChange={event => setPrefixValue4(event.target.value)}
          onClear={() => setPrefixValue4('')}
          suffix={<Icon name="search" />}
        />
      </Box>
      <Box childGap="md" width="33">
        <TextInput
          id="prefixSuffix9"
          value={prefixValue}
          label="Prefix"
          onChange={event => setPrefixValue(event.target.value)}
          prefix="@"
          size="lg"
        />
        <TextInput
          id="prefixSuffix10"
          value={prefixValue2}
          label="Prefix and Suffix"
          onChange={event => setPrefixValue2(event.target.value)}
          prefix="$"
          suffix=".99"
          size="lg"
        />
        <TextInput
          id="prefixSuffix11"
          value={prefixValue3}
          label="Suffix"
          placeholder="Contact name"
          onChange={event => setPrefixValue3(event.target.value)}
          suffix={<Icon name="book" />}
          size="lg"
        />
        <TextInput
          id="prefixSuffix112"
          value={prefixValue4}
          label="Suffix with Clear"
          placeholder="Contact name"
          onChange={event => setPrefixValue4(event.target.value)}
          onClear={() => setPrefixValue4('')}
          suffix={<Icon name="search" />}
          size="lg"
        />
      </Box>
    </Box>
  );
};

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
};
ResponsiveSize.parameters = RESPONSIVE_STORY;