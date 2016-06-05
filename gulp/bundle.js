const gulp = require('gulp');
const config = require('./config');
const $ = require('gulp-load-plugins')();

const tsCmd = `./node_modules/.bin/tsc --out ${config.PATHS.dist.cjs}/core/core.umd.js ` +
`--target es5 --allowJs ${config.PATHS.tmp}core.umd.js`;

gulp.task('rollup:umd', ['scripts:esm'],
  $.shell.task('./node_modules/.bin/rollup -c rollup.config.js'));

gulp.task('bundle:umd', ['rollup:umd'], $.shell.task(tsCmd, { ignoreErrors: true }));

gulp.task('bundle:umd:min', ['bundle:umd'], (done) => {
  done();
});

gulp.task('bundle', ['bundle:umd', 'bundle:umd:min']);
