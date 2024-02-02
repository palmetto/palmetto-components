import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Box } from '../../Box/Box';

export default {
  title: 'Components/CheckboxInput/Components/Checkbox',
  component: Checkbox,
};

export const BasicExample: React.ReactNode = () => {
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  return (
    <Box gap="lg" direction="row">
      <Checkbox
        id="checkbox"
        label="checked checkbox"
        onChange={event => setChecked(event.target.checked)}
        isChecked={checked}
      />
      <Checkbox
        id="unchecked"
        label="unchecked checkbox"
        onChange={event => setUnchecked(event.target.checked)}
        isChecked={unchecked}
      />
    </Box>
  );
};

export const Sizes: React.ReactNode = () => {
  const [smCheckbox, setSmCheckbox] = useState(true);
  const [mdCheckbox, setMdCheckbox] = useState(true);
  const [lgCheckbox, setLgCheckbox] = useState(true);
  const [responsiveCheckbox, setResponsiveCheckbox] = useState(true);
  return (
    <Box gap="lg" direction="row" alignItems="flex-start">
      <Checkbox
        id="sm"
        label="small"
        onChange={event => setSmCheckbox(event.target.checked)}
        isChecked={smCheckbox}
        size="sm"
      />
      <Checkbox
        id="md"
        label="medium"
        onChange={event => setMdCheckbox(event.target.checked)}
        isChecked={mdCheckbox}
        size="md"
      />
      <Checkbox
        id="lg"
        label="large"
        onChange={event => setLgCheckbox(event.target.checked)}
        isChecked={lgCheckbox}
        size="lg"
      />
      <Checkbox
        id="lg"
        label="responsive"
        onChange={event => setResponsiveCheckbox(event.target.checked)}
        isChecked={responsiveCheckbox}
        size={{
          base: 'sm',
          tablet: 'md',
          desktop: 'lg',
          hd: 'sm',
        }}
      />
    </Box>
  );
};

export const Disabled: React.ReactNode = () => {
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  return (
    <Box gap="lg" direction="row">
      <Checkbox
        id="checkbox"
        label="Label"
        onChange={event => setChecked(event.target.checked)}
        isChecked={checked}
        isDisabled
      />
      <Checkbox
        id="unchecked"
        label="unchecked"
        onChange={event => setUnchecked(event.target.checked)}
        isChecked={unchecked}
        isDisabled
      />
    </Box>
  );
};

export const Error: React.ReactNode = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Box gap="lg" direction="row">
      <Checkbox
        id="checkbox"
        label="Label"
        onChange={event => setChecked(event.target.checked)}
        isChecked={checked}
        error
      />
    </Box>
  );
};
