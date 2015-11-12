const gulp = require('gulp');
const config = require('./config');

gulp.task('watch', function watch() {
  gulp.watch(config.PATHS.tsSrcFiles, ['scripts:cjs', 'bundle:cjs', 'typings']);
});
