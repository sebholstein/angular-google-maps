const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const $ = require('gulp-load-plugins')();

const Builder = require('systemjs-builder');

const bundleConfig = {
  baseURL: config.PATHS.dist.cjs.base,
  defaultJSExtensions: true,
  paths: {
    'angular2/*': path.join(__dirname, '../node_modules/angular2/*'),
    '@reactivex/*': path.join(__dirname, '../node_modules/angular2/node_modules/@reactivex/*'),
  },
};

function bundle(moduleName, outputFile, outputConfig) {
  const builder = new Builder();
  builder.config(bundleConfig);
  return builder.bundle(moduleName, outputFile, outputConfig);
}

gulp.task('bundle:cjs', ['scripts:cjs'], function cleanDist(done) {
  const distFileName = path.join(config.PATHS.dist.bundles, 'angular2-google-maps.js');
  bundle('angular2-google-maps/angular2-google-maps - angular2/* - @reactivex/*', distFileName, {
    sourceMaps: true,
  }).then(() => {
    gulp.src(distFileName)
    .pipe($.connect.reload());
    done();
  });
});

gulp.task('bundle:cjs-min', ['scripts:cjs'], function cleanDist() {
  bundle('angular2-google-maps/angular2-google-maps - angular2/* - @reactivex/*', path.join(config.PATHS.dist.bundles, 'angular2-google-maps.min.js'), {
    sourceMaps: true,
    minify: true,
  });
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs-min']);
