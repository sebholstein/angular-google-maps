const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const dts = require('dts-bundle');
const replace = require('replace');

gulp.task('typings', ['scripts:cjs'], function typings(done) {
  const outFile = path.join(__dirname, '../', config.PATHS.dist.typings, 'angular2-google-maps.d.ts');

  dts.bundle({
    name: 'angular2-google-maps',
    indent: ' ',
    prefix: '',
    main: path.join(config.PATHS.dist.cjs.moduleDir, 'angular2-google-maps.d.ts'),
    out: outFile,
  });

  replace({
    paths: [outFile],
    regex: 'declare module \'angular2-google-maps\'',
    replacement: 'declare module \'angular2-google-maps/angular2-google-maps\'',
    silent: true,
  });

  done();
});
