import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import execute from 'rollup-plugin-execute';
import svg from 'rollup-plugin-svg';

const packageJson = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/components/index.ts',
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
    execute('tsc'),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
    peerDepsExternal(),
    resolve({
      extensions,
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
    }),
    commonjs(),
    postcss({
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
          src: 'src/styles/utilities.scss',
          dest: 'dist',
          rename: '/scss/utilities.scss',
        },
      ],
    }),
    cleaner({
      targets: [
        './dist/',
      ],
    }),
    svg(),
  ],
};
