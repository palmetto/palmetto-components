const webpackConfigDev = require('../webpack.dev');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.([tj]sx|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        ...webpackConfigDev.plugins,
      ],
      module: { 
        ...config.module,
        rules: [
          ...config.module.rules,
          ...webpackConfigDev.module.rules
        ],
      },
      resolve: {
        ...config.resolve,
        extensions: [
          ...config.resolve.extensions,
          ...webpackConfigDev.resolve.extensions,
        ],
      }
    }
  },
};
