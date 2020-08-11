/**
 * This single config file handles both the production and development/storybook builds.
 * If the environment is production, a fully minified/production build,
 * using custom plugins and module rules, is generated and output to `/dist`.
 * If the environment is development/storybook, a custom set of module rules are created,
 * and a subset of the resulting config (plugins, module.rules, and resolve.extensions) are consumed by
 * `.storybook/main.js` to supplement Storybook's existing config.
 */

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Common plugins shared between storybook and production builds.
const plugins = [
  // Add Typescript type checking on build.
  new ForkTsCheckerWebpackPlugin(),
];

// Common module rules shared between storybook and production builds.
const rules = [
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
      'sass-loader',
    ],
    include: /\.module\.scss$/,
  },
];

// Check environment; customize plugins and module rules based on this.
if (process.env.NODE_ENV === 'production' && process.env.IS_PUBLISHING) {
  // Extract css to its own .css file as opposed to a JS module.
  plugins.push(new MiniCssExtractPlugin({ filename: 'css/[name].css' }));
  // Clear out /dist directory on every build.
  plugins.push(new CleanWebpackPlugin());
  // This removes empty .js files generated for css/scss-only entries. Issue inherent to webpack, more details here:
  // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
  plugins.push(new FixStyleOnlyEntriesPlugin());

  // Process all global SCSS files (and export them to css)
  rules.push(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
      exclude: /\.module\.scss$/,
    },
  );
  rules.push(
    {
      test: /\.(ts|tsx|js|jsx)?$/,
      use: [
        'babel-loader',
        'ts-loader',
      ],
      exclude: /node_modules/,
    },
  );
} else {
  rules.push(
    {
      test: /\.(ts|tsx|js|jsx)?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            envName: 'build',
          },
        },
        'ts-loader',
        {
          loader: 'react-docgen-typescript-loader',
          options: {
            shouldExtractLiteralValuesFromEnum: true,
          },
        },
      ],
      exclude: /node_modules/,
    },
  );
}

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
  plugins,
  module: {
    rules,
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
