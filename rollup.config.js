import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import execute from 'rollup-plugin-execute';
import svg from 'rollup-plugin-svg';
import svgr from '@svgr/rollup';

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
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    copy({
      targets: [
        {
          src: 'src/styles/variables/index.scss',
          dest: 'dist',
          rename: '/css/variables.css',
        },
        {
          src: 'src/styles/variables/buttons.scss',
          dest: 'dist/css',
        },
        {
          src: 'src/styles/variables/forms.scss',
          dest: 'dist/css',
        },
        {
          src: 'src/styles/variables/tokens.scss',
          dest: 'dist/css',
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
