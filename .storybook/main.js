const scssRules = {
  test: /\.scss$/,
  use: [
    'style-loader',
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

const fileLoaderRules = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [{
    loader: 'file-loader',
  }, ],
};

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
    config.module.rules.push(scssRules);
    config.module.rules.push(fileLoaderRules);
    const assetRule = config.module.rules.find(({
      test
    }) => test.test(".svg"));

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
  },
};
