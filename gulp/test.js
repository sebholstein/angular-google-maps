const gulp = require('gulp');
const karma = require('karma');
const path = require('path');

function createKarmaServer(singleRun, done) {
  return new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun,
  }).start(done);
}

gulp.task('karma:watch', (done) => createKarmaServer(false, done));

gulp.task('karma', (done) =>
  new karma.Server({
    configFile: path.join(process.cwd(), 'karma.conf.js'),
    singleRun: true,
  }).start(done)
);
