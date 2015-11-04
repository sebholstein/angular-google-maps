const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const dts = require('dts-bundle');

gulp.task('typings', ['scripts:es5'], function typings() {
  dts.bundle({
    name: 'angular2-google-maps',
    main: path.join(config.PATHS.dist.es5, 'test.d.ts'),
    out: path.join(__dirname, '../', config.PATHS.dist.typings, 'angular2-google-maps.d.ts'),
  });
});
