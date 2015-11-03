const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');

gulp.task('tslint', () => {
  return gulp.src(config.PATHS.tsSrcFiles)
    .pipe($.tslint({
      configuration: require('../tslint.json')
    }))
    .pipe($.tslint.report('verbose'));
});