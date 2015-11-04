// load all files in gulp dir
require('require-dir')('./gulp');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// all grunt tasks, which are defined here, are intended for use via the CLI.
gulp.task('build', function build(done) {
  runSequence('clean:dist', 'lint', ['copy-release-assets', 'scripts', 'typings', 'bundle'], done);
});

gulp.task('serve', ['connect', 'watch']);
