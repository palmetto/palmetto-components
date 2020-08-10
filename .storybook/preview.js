import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import palmettoTheme from './palmettoTheme';

addParameters({
  options: {
    theme: palmettoTheme,
  },
});