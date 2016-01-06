const gulp = require('gulp');
const karma = require('karma');
const path = require('path');

function createKarmaServer(singleRun, done) {
  new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: singleRun,
  }).start(done);
}

gulp.task('karma:watch', function karmaStart(done) {
  return createKarmaServer(false, done);
});

gulp.task('karma', function karmaStart(done) {
  new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: true,
  }).start(done);
});
