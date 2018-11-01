import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import vue from 'rollup-plugin-vue';

import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import nested from 'postcss-nested';
import presetEnv from 'postcss-preset-env';
import simpleVars from 'postcss-simple-vars';

const serveOptions = {
  open: false, // 是否打开浏览器
  contentBase: './', // 入口HTML 文件位置
  historyApiFallback: true, // Set to true to return index.html instead of 404
  host: 'localhost',
  port: 23333,
  https: {
    key: fs.readFileSync('public/ssl/server.key'),
    cert: fs.readFileSync('public/ssl/server.crt'),
    ca: fs.readFileSync('public/ssl/ca.pem')
  },
};

const plugins = [
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  eslint({
    fix: true,
    exclude: [
      'src/styles/**'
    ]
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs(),
  vue({
    template: {
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  postcss({
    extract: 'dist/css/bundle.css',
    sourceMap: true,
    minimize: true,
    extensions: ['.scss', '.css'],
    plugins: [
      autoprefixer(),
      cssnano(),
      nested(),
      presetEnv(),
      simpleVars()
    ]
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  json({
    exclude: 'node_modules/**',
  })
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(livereload());
  plugins.push(serve(serveOptions));
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/js/bundle.js',
    sourcemap: true,
    format: 'umd'
  },
  plugins
};
