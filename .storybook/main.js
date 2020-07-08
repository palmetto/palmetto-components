const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelRules = config => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

const scssRules = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 'postcss-loader', @TODO -- Add postcss config and re-enable loader.
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        // Provide path to the file with resources
        resources: [
          './src/styles/variables.scss',
          './src/styles/utilities.scss',
          './src/styles/reset.scss',
        ],
      },
    },
  ],
};

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: (config) => {
    config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules.push(scssRules);
    config = babelRules(config);
    return config;
  }
};
