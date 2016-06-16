const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const path = require('path');
const tslint = require('../tslint.json');

gulp.task('tslint', () =>
  gulp.src(config.PATHS.lintFiles)
    .pipe($.tslint({
      configuration: tslint,
    }))
    .pipe($.tslint.report('verbose'))
);

gulp.task('eslint', () =>
  gulp.src(config.PATHS.jsFiles)
    .pipe($.eslint({
      rulePaths: [path.join(__dirname, '../')],
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
);

gulp.task('clang:check', () =>
  gulp.src(config.PATHS.lintFiles)
     .pipe($.clangFormat.checkFormat('file', undefined, {
       verbose: true,
       fail: true,
     }))
);

gulp.task('clang:format', () =>
  gulp.src(config.PATHS.tsSrcFiles)
     .pipe($.clangFormat.format('file'))
     .pipe(gulp.dest(config.PATHS.srcDir))
);

gulp.task('lint', ['clang:check', 'tslint', 'eslint']);
