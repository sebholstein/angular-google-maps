const path = require('path');

const MODULE_NAME = 'angular2_google_maps';

// note: for all paths, the base dir is ../
module.exports.PATHS = {
  srcDir: 'src',
  tsSrcFiles: 'src/**/*.ts',
  releaseAssets: ['assets/release/**/*', 'package.json', 'LICENSE'],
  exampleFiles: 'examples/**/*',
  jsFiles: ['gulpfile.js', 'gulp/*.js'],
  tsConfig: path.join(__dirname, '../tsconfig.json'),
  dist: {
    base: 'dist',
    cjs: {
      base: 'dist/cjs',
      moduleDir: 'dist/cjs/' + MODULE_NAME,
    },
    es6: 'dist/es6/' + MODULE_NAME,
    ts: 'dist/ts/' + MODULE_NAME,
    typings: 'dist/typings',
    bundles: 'dist/bundles',
  },
  tmp: {
    base: 'tmp',
    typings: 'tmp/typings',
  },
};
