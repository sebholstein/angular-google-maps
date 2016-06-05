// load all files in gulp dir
require('require-dir')('./gulp');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// all grunt tasks, which are defined here, are intended for use via the CLI.
gulp.task('build', (done) => {
  runSequence(
    ['clean:dist', 'clean:tmp'],
    'lint',
    ['copyReleaseAssets', 'scripts', 'bundle'],
    'createPackageJson',
    done
  );
});

gulp.task('serve', ['connect', 'watch:srcFiles']);

gulp.task('test', (done) => {
  runSequence('clean:test', 'scripts:test', 'karma', done);
});

gulp.task('test:watch', ['scripts:test', 'watch:testfiles', 'watch:srcFiles', 'karma:watch']);
