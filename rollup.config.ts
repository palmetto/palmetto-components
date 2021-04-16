import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import cleaner from 'rollup-plugin-cleaner';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import packageJson from './package.json';

export default {
  input: 'src/index.ts',
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
  external: ['@palmetto/palmetto-design-tokens', 'react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    json(),
    commonjs(),
    typescript(),
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
  ],
};
