import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import palmettoTheme from './palmettoTheme';

import '!style-loader!css-loader!sass-loader!../src/styles/utilities.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/variables/index.scss';
import '!style-loader!css-loader!sass-loader!../src/styles/reset.scss';

addParameters({
  options: {
    theme: palmettoTheme,
  },
});