const path = require('path');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const copy = require('rollup-plugin-copy');

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

const addPluginsToConfig = (config, plugins) => {
  const updatedConfig = { ...config };
  updatedConfig.plugins.push(...plugins);

  return updatedConfig;
}

module.exports = {
  rollup(config, options) {
    config = addPluginsToConfig(config, [rollupPostCssConfig(path.resolve('dist/css/index.css'))]);
    return config;
  },
};