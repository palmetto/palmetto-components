import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import svg from 'rollup-plugin-svg';
import svgr from '@svgr/rollup';

const packageJson = require('./package.json');

export default {
  input: 'src/components/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['@palmetto/palmetto-design-tokens'],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    copy({
      targets: [
        {
          src: 'src/styles/variables.scss',
          dest: 'dist',
          rename: '/scss/variables.scss',
        },
        {
          src: 'src/styles/variables.css',
          dest: 'dist',
          rename: '/css/variables.css',
        },
        {
          src: 'src/styles/utilities.scss',
          dest: 'dist',
          rename: '/scss/utilities.scss',
        },
        {
          src: 'src/styles/utilities.scss',
          dest: 'dist',
          rename: '/css/utilities.css',
        },
      ],
    }),
    cleaner({
      targets: [
        './dist/',
      ],
    }),
    svg(),
    svgr(),
  ],
};
