const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const $ = require('gulp-load-plugins')();
const Builder = require('systemjs-builder');

const bundleConfig = {
  baseURL: config.PATHS.dist.cjs,
  defaultJSExtensions: true,
  paths: {
    'angular2-google-maps/*': '*',
    '@angular/*': './node_modules/@angular/*',
    'rxjs/*': './node_modules/rxjs/*',
  },
  packages: {
    '@angular/core': { main: 'index.js', defaultExtension: 'js' },
    '@angular/common': { main: 'index.js', defaultExtension: 'js' },
    '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
  },
  map: {
    '@angular': '@angular',
  },
};

function bundle(moduleName, moduleBundleName, minify, done) {
  const outputConfig = {
    sourceMaps: true,
    minify: minify,
  };
  const builder = new Builder();
  builder.config(bundleConfig);
  const outputFile = path.join(config.PATHS.dist.bundles, moduleBundleName + (minify ? '.min' : '') + '.js');
  // todo: newest systemjs-builder version requires to explicitly exclude .d.ts files - probably a systemjs-builder bug.
  const bundlePromise = builder.bundle(moduleName + ' - @angular/core/*.ts - @angular/core/*.js - rxjs/*.ts - rxjs/*.js', outputFile, outputConfig);

  if (!minify) {
    bundlePromise.then(() => {
      gulp.src(outputFile)
      .pipe($.connect.reload());
    });
  }
  return bundlePromise.then(() => {
    done();
  });
}

gulp.task('bundle:cjs', ['scripts:cjs'], function bundleCjs(done) {
  bundle('angular2-google-maps/core', 'angular2-google-maps', false, done);
});

gulp.task('bundle:cjs:min', ['scripts:cjs'], function bundleCjsMin(done) {
  bundle('angular2-google-maps/core', 'angular2-google-maps', true, done);
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs:min']);
