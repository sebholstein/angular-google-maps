const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts:ts', function scriptsTs() {
  return gulp.src(config.PATHS.tsSrcFiles)
    .pipe(gulp.dest(config.PATHS.dist.ts));
});

gulp.task('scripts:es6', function scriptsEs6() {
  const taskConfig = $.typescript.createProject(config.PATHS.tsConfig, {
    target: 'ES6',
  });
  // todo: this emit errors right now because of duplicate ES6 declarations.
  // should be fixed when https://github.com/angular/angular/issues/4882 is included a new Angular2 version.
  const tsResult = gulp.src(config.PATHS.tsSrcFiles)
                  .pipe(sourcemaps.init())
                  .pipe($.typescript(taskConfig, undefined, $.typescript.reporter.nullReporter()));
  return tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.PATHS.dist.es6));
});

// we create the the tsConfig outside the task for fast incremential compilations during a watch.
const taskConfigCjs = $.typescript.createProject(config.PATHS.tsConfig, {
  target: 'ES5',
  'module': 'commonjs',
  declaration: true,
});

gulp.task('scripts:cjs', function scriptsEs5() {
  const tsResult = gulp.src(config.PATHS.tsSrcFiles)
                  .pipe(sourcemaps.init())
                  .pipe($.typescript(taskConfigCjs));

  return merge([
    tsResult.dts.pipe(gulp.dest(config.PATHS.dist.cjs.moduleDir)),
    tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.PATHS.dist.cjs.moduleDir)),
  ]);
});

gulp.task('scripts', ['scripts:cjs', 'scripts:es6', 'scripts:ts']);
