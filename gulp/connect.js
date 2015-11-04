const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('connect', function connect() {
  $.connect.server({
    root: '.',
    livereload: true,
  });
});
