const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV, // Should be set in the yarn script since there is no true ENV.
  // Files to be bundled
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
  // Final files based on entry files.
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
      // Process all global SCSS files (and export them to css)
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
        exclude: /\.module\.scss$/,
      },
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
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // If multiple files share the same name but have different extensions,
    // webpack will resolve the one with the extension listed first in the array and skip the rest.
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
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
