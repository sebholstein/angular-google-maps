const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const path = require('path');

gulp.task('tslint', () => {
  return gulp.src(config.PATHS.tsSrcFiles)
    .pipe($.tslint({
      configuration: require('../tslint.json'),
    }))
    .pipe($.tslint.report('verbose'));
});

gulp.task('eslint', () => {
  return gulp.src(config.PATHS.jsFiles)
    .pipe($.eslint({
      rulePaths: [path.join(__dirname, '../')],
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('lint', ['tslint', 'eslint']);
