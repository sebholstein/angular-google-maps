const gulp = require('gulp');
const del = require('del');
const config = require('./config');

gulp.task('clean:dist', function cleanDist() {
  return del([config.PATHS.dist.base]);
});
