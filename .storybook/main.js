/**
 * The majority of the development webpack config comes directly from the @storybook
 * default config, since the output is rendered by their platform.
 * Webpack.config.js is configured to determine whether or not the env is development/storybook,
 * and if so, generate additional config options that will get merged into the storybook config
 * in order to process Typescript components and SCSS files appropriately.
 */

const webpackConfig = require('../webpack.config');

module.exports = {
  stories: ['../src/**/*.stories.@([tj]sx|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: { 
        ...config.module,
        rules: [
          ...config.module.rules,
          ...webpackConfig.module.rules
        ],
      },
    }
  },
};
