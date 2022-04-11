const path = require('path');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const pkg = require('./package.json');

const rollupPostCssConfig = (destination) => postcss({
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
  inject: false,
  // only write out CSS for the first bundle (avoids pointless extra files):
  extract: destination
});

const addToConfig = (config, addedItems, configKey) => {
  const updatedConfig = { ...config };
  updatedConfig[configKey].push(...addedItems);

  return updatedConfig;
};

module.exports = {
  rollup(config) {
    config = addToConfig(config, [rollupPostCssConfig(path.resolve('dist/css/index.css'))], 'plugins');
    return config;
  },
};