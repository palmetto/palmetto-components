import { addParameters } from '@storybook/react';
import palmettoTheme from './palmettoTheme';

import '!style-loader!css-loader!sass-loader!../src/styles/utilities.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/variables/index.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/reset.scss';

addParameters({
  docs: {
    theme: palmettoTheme,
  },
});

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: false,
  },
};