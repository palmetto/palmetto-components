import { addParameters } from '@storybook/react';
import palmettoTheme from './palmettoTheme';

require('!style-loader!css-loader!sass-loader!../src/styles/utilities.scss');
require('!style-loader!css-loader!sass-loader!../src/styles/variables/index.scss');
require('!style-loader!css-loader!sass-loader!../src/styles/reset.scss');
require('!style-loader!css-loader!sass-loader!../src/styles/fonts.scss');

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
        'Foundation',
        ['Design Principles', 'Design Tokens'],
        'Content',
        ['Goals and Principles', 'Voice and Tone', 'Grammar and Mechanics', 'Word List'],
        'Theming',
        ['Overview', 'Form Controls'],
        'Components',
        'Patterns',
      ],
    },
  },
};
