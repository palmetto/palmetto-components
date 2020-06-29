const StylelintPlugin = require('stylelint-webpack-plugin')
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
  webpack: function (config, env) {
    if (env === 'development') {
      config.plugins.push(
        new StylelintPlugin({
          configFile: '.stylelintrc',
          context: 'src',
          files: '**/*.scss',
          failOnError: false,
          quiet: false,
          emitErrors: true
        }),
      );
    }

    config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules.push(scssRules);

    return config;
  }
}