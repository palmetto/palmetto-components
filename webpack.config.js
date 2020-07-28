const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: [path.join(__dirname, 'src/components/index.ts')], // React components
    utilities: [path.join(__dirname, 'src/styles/utilities.scss')], // Utilities CSS only.
    variables: [path.join(__dirname, 'src/styles/variables/index.scss')], // Variables CSS only.
  },
  optimization: {
    minimizer: [
      // Minify Javascript
      new TerserJSPlugin({}),
      // Minify CSS/SCSS
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  plugins: [
    // Extract css to its own .css file as opposed to a JS module.
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    // Clear out /dist directory on every build.
    new CleanWebpackPlugin(),
    // This removes empty .js files generated for css/scss-only entries. Issue inherent to webpack, more details here:
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
    new FixStyleOnlyEntriesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     // Provide path to the file with resources
          //     resources: [
          //       path.join(__dirname, '/src/styles/variables/index.scss'),
          //       path.join(__dirname, '/src/styles/globals/utilities.scss'),
          //       path.join(__dirname, './src/styles/reset.scss'),
          //     ],
          //   },
          // },
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
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     // Provide path to the file with resources
          //     resources: [
          //       path.join(__dirname, '/src/styles/variables/index.scss'),
          //       path.join(__dirname, '/src/styles/globals/utilities.scss'),
          //       path.join(__dirname, './src/styles/reset.scss'),
          //     ],
          //   },
          // },
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        // Babel loader chosen over ts-loader so we can get accces to newer ES features should we want to.
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss', '.css'],
  },
  // Exclude 'react' and 'react-dom' from being bundled with our components.
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
};
