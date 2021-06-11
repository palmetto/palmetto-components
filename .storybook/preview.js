import { addParameters } from '@storybook/react';
import palmettoTheme from './palmettoTheme';

import '!style-loader!css-loader!sass-loader!../src/styles/utilities.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/variables/index.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/reset.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/fonts.scss';

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
  options: {
    storySort: {
      order: [
        'About',
        ['Introduction', 'Get Started', 'Contributing'],
        'Components',
        'Patterns',
        'Design Tokens',
      ],
    },
  },
};
