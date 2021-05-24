const path = require('path');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const copy = require('rollup-plugin-copy');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: path.resolve('dist/styles/index.css')
      }),
      // copy({
      //   targets: [
      //     { src: 'src/styles/variables/index.scss', dest: 'dist/css', rename: 'variables.css' },
      //     { src: 'src/styles/utilities.scss', dest: 'dist/css', rename: 'utilities.css' },
      //     { src: 'src/styles/fonts.scss', dest: 'dist/css', rename: 'fonts.css' },
      //   ],
      // }),
    );

    // config.input.push('src/styles/utilities.scss');
    return config;
  },
};