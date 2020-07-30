const webpackConfigDev = require('../webpack.dev');
const path = require('path');

const babelRules = config => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          envName: 'build',
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          tsconfigPath:  path.resolve('tsconfig.json')
        },
      },
    ]
  });
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          tsconfigPath:  path.resolve('tsconfig.json')
        },
      },
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

const fileLoaderRules = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [{
    loader: 'file-loader',
  }, ],
};

const svgRules = config => {
  const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
  const assetLoader = {
    loader: assetRule.loader,
    options: assetRule.options || assetRule.query
  };
  // Merge our rule with existing assetLoader rules
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ["@svgr/webpack", assetLoader]
  });
  return config;
}

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
    // config.module.rules.push(scssModulesRules);
    // config.module.rules.push(customWebpackConfig.module.rules[0]);
    // config.module.rules.push(customWebpackConfig.module.rules[1]);
    config = babelRules(config);
    // config.module.rules.push(fileLoaderRules);
    // config = svgRules(config);
    // return config;
    return {
      ...config,
      module: { 
        ...config.module,
        rules: [
          ...config.module.rules,
          ...webpackConfigDev.module.rules
        ],
      },
    }
  },
};
