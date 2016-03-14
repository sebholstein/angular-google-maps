const path = require('path');

// package.json as JS object
module.exports.pkg = require(path.join(__dirname, '../package.json'));

// note: for all paths, the base dir is ../
module.exports.PATHS = {
  srcDir: 'src',
  tsSrcFiles: 'src/**/*.ts',
  tsTestFiles: [
    'test/**/*.ts',
    'typings/main.d.ts',
  ],
  releaseAssets: ['assets/release/**/*', 'LICENSE'],
  exampleFiles: 'examples/**/*',
  jsFiles: ['gulpfile.js', 'gulp/*.js'],
  tsConfig: path.join(__dirname, '../tsconfig.json'),
  dist: {
    base: 'dist/',
    cjs: 'dist/',
    es6: 'dist/es6/',
    ts: 'dist/ts/',
    bundles: 'dist/bundles/',
  },
  // todo: figure out why `..` is needed here to write compiled test files to test-build/ dir
  // instead of test-built/test/ dir.
  testBuilt: 'test-built/',
};
