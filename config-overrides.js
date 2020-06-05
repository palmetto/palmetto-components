const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  webpack: function (config, env) {
    if (env === 'development') {
      config.plugins.push(
        new StylelintPlugin({
          configFile: '.stylelintrc',
          context: 'src',
          files: '**/*.css',
          failOnError: false,
          quiet: false,
          emitErrors: true
        }),
      );
    }

    return config;
  }
}