const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');

function replaceSrcDir(path) {
  path.dirname = path.dirname.replace(/^src/ig, ''); // eslint-disable-line no-param-reassign
}

gulp.task('scripts:ts', () => {
  gulp.src(config.PATHS.tsSrcFiles)
    .pipe($.header(config.banner, {
      pkg: config.pkg,
    }))
    .pipe(gulp.dest(config.PATHS.dist.ts));
});

gulp.task('scripts:esm', () => {
  const taskConfig = $.typescript.createProject(config.PATHS.tsConfig, {
    module: 'ES6',
    target: 'ES6',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
  });
  // todo: this emit errors right now because of duplicate ES6 declarations.
  // should be fixed when https://github.com/angular/angular/issues/4882 is included a new Angular2 version.
  const tsResult = gulp.src(config.PATHS.tsSrcFiles)
                  .pipe($.sourcemaps.init())
                  .pipe($.typescript(taskConfig, undefined, $.typescript.reporter.nullReporter()));
  return tsResult.js
    .pipe($.header(config.banner, {
      pkg: config.pkg,
    }))
    .pipe($.rename(replaceSrcDir))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.PATHS.dist.esm));
});


gulp.task('scripts:cjs', () => {
  // todo: figure out why gulp-typescript don't write to the defined root dir (dist)
  const tsResult = gulp.src([config.PATHS.tsSrcFiles, 'typings/index.d.ts'])
                  .pipe($.sourcemaps.init())
                  .pipe($.typescript(config.tscConfigCjs));

  return merge([
    tsResult.dts.pipe($.header(config.banner, {
      pkg: config.pkg,
    }))
    .pipe($.rename(replaceSrcDir))
    .pipe(gulp.dest(config.PATHS.dist.cjs)),

    tsResult.js.pipe($.header(config.banner, {
      pkg: config.pkg,
    }))
    .pipe($.rename(replaceSrcDir))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.PATHS.dist.cjs)),
  ]);
});

gulp.task('scripts:test', () => {
  const tsResult = gulp.src(config.PATHS.tsTestFiles)
                  .pipe(sourcemaps.init())
                  .pipe($.typescript(config.taskConfigCjs));

  // todo: figure out why gulp-typescript don't write to the defined root dir (test-built)
  function replaceTestDir(path) {
    path.dirname = path.dirname.replace('test/', ''); // eslint-disable-line no-param-reassign
  }
  return merge([
    tsResult.dts
      .pipe($.header(config.banner, {
        pkg: config.pkg,
      }))
      .pipe($.rename(replaceTestDir))
      .pipe(gulp.dest(config.PATHS.testBuilt)),
    tsResult.js
      .pipe($.rename(replaceTestDir))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(config.PATHS.testBuilt)),
  ]);
});

gulp.task('scripts', ['scripts:cjs', 'scripts:esm', 'scripts:ts']);
