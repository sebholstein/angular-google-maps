const gulp = require('gulp');
const del = require('del');
const config = require('./config');

gulp.task('clean:dist', function cleanDist(done) {
  return del([config.PATHS.dist.base], done);
});

gulp.task('clean:test', function cleanTest(done) {
  return del([config.PATHS.testBuilt], done);
});
