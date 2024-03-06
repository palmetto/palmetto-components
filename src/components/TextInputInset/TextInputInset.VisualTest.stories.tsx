import React, { ReactElement, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@storybook/testing-library';
import { TextInputInset, TextInputInsetProps } from './TextInputInset';
import { Icon } from '../Icon/Icon';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TextInputInset/Visual Regression Tests',
  component: TextInputInset,
} as Meta;

const Template: Story<TextInputInsetProps> = args => (
  <TextInputInset
    {...args}
    onChange={() => {}} // eslint-disable-line
  />
);

export const DefaultFocus = Template.bind({});

DefaultFocus.args = {
  label: 'Default Focus',
};

DefaultFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByLabelText('Default Focus').focus();
};

export const ErrorFocus = Template.bind({});

ErrorFocus.args = {
  label: 'Error Focus',
  error: 'validation message',
};

ErrorFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByLabelText('Error Focus').focus();
};

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  size: {
    base: 'md',
    tablet: 'lg',
    desktop: 'md',
    hd: 'lg',
  },
  label: 'label',
  value: 'responsive',
  suffix: '00',
  prefix: '$',
};
ResponsiveSize.parameters = RESPONSIVE_STORY;

export const PrefixSuffixSizes: React.FC = (): ReactElement => {
  const [prefixValue, setPrefixValue] = useState('palmettosolar');
  const [prefixValue2, setPrefixValue2] = useState('');
  const [prefixValue3, setPrefixValue3] = useState('');
  const [prefixValue4, setPrefixValue4] = useState('Pre-populated Value');
  return (
    <Box gap="xl">
      <Box gap="md">
        <TextInputInset
          id="prefixSuffix5"
          value={prefixValue}
          label="Prefix with Value"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue(event.target.value)
          }
          prefix="@"
        />
        <TextInputInset
          id="prefixSuffix6"
          value={prefixValue2}
          label="Prefix and Suffix"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue2(event.target.value)
          }
          prefix="$"
          suffix=".99"
        />
        <TextInputInset
          id="prefixSuffix7"
          value={prefixValue3}
          label="Suffix"
          placeholder="Contact name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue3(event.target.value)
          }
          suffix={<Icon name="book" />}
        />
        <TextInputInset
          id="prefixSuffix8"
          value={prefixValue4}
          label="Suffix with Clear"
          placeholder="Contact name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue4(event.target.value)
          }
          onClear={() => setPrefixValue4('')}
          suffix={<Icon name="search" />}
        />
      </Box>
      <Box gap="md">
        <TextInputInset
          id="prefixSuffix9"
          value={prefixValue}
          label="Prefix with Value"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue(event.target.value)
          }
          prefix="@"
          size="lg"
        />
        <TextInputInset
          id="prefixSuffix10"
          value={prefixValue2}
          label="Prefix and Suffix"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue2(event.target.value)
          }
          prefix="$"
          suffix=".99"
          size="lg"
        />
        <TextInputInset
          id="prefixSuffix11"
          value={prefixValue3}
          label="Suffix"
          placeholder="Contact name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue3(event.target.value)
          }
          suffix={<Icon name="book" />}
          size="lg"
        />
        <TextInputInset
          id="prefixSuffix112"
          value={prefixValue4}
          label="Suffix with Clear"
          placeholder="Contact name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPrefixValue4(event.target.value)
          }
          onClear={() => setPrefixValue4('')}
          suffix={<Icon name="search" />}
          size="lg"
        />
      </Box>
    </Box>
  );
};
