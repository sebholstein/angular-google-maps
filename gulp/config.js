const path = require('path');

// note: for all paths, the base dir is ../
module.exports.PATHS = {
  srcDir: 'src',
  tsSrcFiles: 'src/**/*.ts',
  releaseAssets: ['assets/release/**/*', 'package.json', 'LICENSE'],
  jsFiles: ['gulpfile.js', 'gulp/*.js'],
  tsConfig: path.join(__dirname, '../tsconfig.json'),
  dist: {
    base: 'dist',
    es5: 'dist',
    es6: 'dist/es6',
    ts: 'dist/ts',
    typings: 'dist/typings',
    bundles: 'dist/bundles',
  },
  tmp: {
    base: 'tmp',
    typings: 'tmp/typings',
  },
};
