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
    'angular2/*': path.join(__dirname, '../node_modules/angular2/*'),
    'rxjs/*': path.join(__dirname, '../node_modules/rxjs/*'),
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
  const bundlePromise = builder.bundle(moduleName + ' - angular2/* - rxjs/*', outputFile, outputConfig);

  if (!minify) {
    bundlePromise.then(() => {
      gulp.src(outputFile)
      .pipe($.connect.reload());
      done();
    });
  }
  return bundlePromise;
}

gulp.task('bundle:cjs', ['scripts:cjs'], function bundleCjs(done) {
  bundle('angular2-google-maps/core', 'angular2-google-maps', false, done);
});

gulp.task('bundle:cjs:min', ['scripts:cjs'], function bundleCjsMin(done) {
  bundle('angular2-google-maps/core', 'angular2-google-maps', true, done);
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs:min']);
