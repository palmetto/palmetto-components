module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
        exclude: /\.module\.scss$/,
      },
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
