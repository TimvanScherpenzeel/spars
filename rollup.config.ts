// Vendor
// @ts-ignore: missing type definition
import commonjsPlugin from 'rollup-plugin-commonjs';
// @ts-ignore: missing type definition
import filesizePlugin from 'rollup-plugin-filesize';
// @ts-ignore: missing type definition
import resolvePlugin from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';
// @ts-ignore: missing type definition
import { uglify as uglifyPlugin } from 'rollup-plugin-uglify';

// Package
// @ts-ignore: JSON is imported without any issue, TSLint still raises issues
import pkg from './package.json';

const input = './src/index.ts';
const name = 'Ridge';

const plugins = ({ isUMD = false, isCJS = false, isES = false }) => [
  resolvePlugin(),
  (isUMD || isCJS) && commonjsPlugin(),
  typescriptPlugin({
    typescript: require('typescript'),
    useTsconfigDeclarationDir: true,
  }),
  !isES && !process.env.ROLLUP_WATCH && uglifyPlugin(),
  !isES && !process.env.ROLLUP_WATCH && filesizePlugin(),
];

export default [
  {
    input,
    output: [
      {
        exports: 'named',
        file: pkg.browser,
        format: 'umd',
        name,
      },
    ],
    plugins: plugins({ isUMD: true }),
    watch: {
      include: 'src/**',
    },
  },
  // {
  //   input,
  //   output: [
  //     {
  //       exports: 'named',
  //       file: pkg.main,
  //       format: 'cjs',
  //     },
  //   ],
  //   plugins: plugins({ isCJS: true }),
  //   watch: {
  //     include: 'src/**',
  //   },
  // },
  // {
  //   input,
  //   output: [
  //     {
  //       file: pkg.module,
  //       format: 'es',
  //       name,
  //     },
  //   ],
  //   plugins: plugins({ isES: true }),
  //   watch: {
  //     include: 'src/**',
  //   },
  // },
];
