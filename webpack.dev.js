/**
 * The majority of the development webpack config comes directly from the @storybook
 * default config, since the output is rendered by their platform.
 * These are additional config options that will get merged into the storybook config
 * in order to process Typescript components and SCSS files appropriately.
 */
module.exports = {
  mode: process.env.NODE_ENV, // Should be set in the yarn script since there is no true ENV.
  module: {
    rules: [
      // Process all SCSS modules which will be compiled inside the main JS bundle.
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          // 'postcss-loader',
          'sass-loader',
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        // Babel loader chosen over ts-loader so we can get accces to newer ES features should we want to.
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'build',
            },
          },
          {
            loader: 'react-docgen-typescript-loader',
            options: {
              shouldExtractLiteralValuesFromEnum: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
