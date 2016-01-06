const gulp = require('gulp');
const config = require('./config');

gulp.task('watch:srcFiles', function watch() {
  gulp.watch(config.PATHS.tsSrcFiles, ['scripts:cjs', 'bundle:cjs']);
});

gulp.task('watch:testfiles', function watch() {
  gulp.watch(config.PATHS.tsTestFiles, ['scripts:test']);
});
