const webpackConfigDev = require('../webpack.dev');
const path = require('path');

// const svgRules = config => {
//   const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
//   const assetLoader = {
//     loader: assetRule.loader,
//     options: assetRule.options || assetRule.query
//   };
//   // Merge our rule with existing assetLoader rules
//   config.module.rules.unshift({
//     test: /\.svg$/,
//     use: ["@svgr/webpack", assetLoader]
//   });
//   return config;
// }

module.exports = {
  stories: ['../src/**/*.stories.([tj]sx|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
    // '@storybook/addon-viewport/register',
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
