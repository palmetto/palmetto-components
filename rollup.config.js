import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "rollup-plugin-typescript2";
import babel from '@rollup/plugin-babel';
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default {
  input: "src/components/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    // typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      use: ['sass'],
    }),
    copy({
      targets: [
        {
          src: "src/styles/variables.scss",
          dest: "dist",
          rename: "/scss/variables.scss"
        },
        {
          src: "src/styles/utilities.scss",
          dest: "dist",
          rename: "/scss/utilities.scss"
        }
      ]
    })
  ]
};