const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: (config) => {
    config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules.push(scssRules);

    return config;
  }
};
