const path = require('path');
const ts = require('typescript');
const $ = require('gulp-load-plugins')();

// package.json as JS object
module.exports.pkg = require(path.join(__dirname, '../package.json'));

// note: for all paths, the base dir is ../
module.exports.PATHS = {
  srcDir: 'src',
  tsSrcFiles: 'src/**/*.ts',
  tsTestFiles: [
    'test/**/*.ts',
    'typings/index.d.ts',
  ],
  lintFiles: [
    'src/**/*.ts',
    'test/**/*.spec.ts',
  ],
  releaseAssets: ['assets/release/**/*', 'LICENSE'],
  exampleFiles: 'examples/**/*',
  jsFiles: ['gulpfile.js', 'gulp/*.js'],
  tsConfig: path.join(__dirname, '../tsconfig.json'),
  tmp: '.tmp/',
  dist: {
    base: 'dist/',
    cjs: 'dist/',
    esm: 'dist/esm/',
    ts: 'dist/ts/',
    bundles: 'dist/bundles/',
  },
  // todo: figure out why `..` is needed here to write compiled test files to test-build/ dir
  // instead of test-built/test/ dir.
  testBuilt: 'test-built/',
};

module.exports.banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

 // we create the the tsConfig outside the task for fast incremential compilations during a watch.
module.exports.tscConfigCjs = $.typescript.createProject(module.exports.PATHS.tsConfig, {
  target: 'ES5',
  module: 'commonjs',
  moduleResolution: 'node',
  declaration: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  typescript: ts,
  allowJs: true,
});
