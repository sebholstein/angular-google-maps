const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const dts = require('dts-bundle');
const replace = require('replace');

gulp.task('typings', ['scripts:cjs'], function typings(done) {
  const outFile = path.join(__dirname, '../', config.PATHS.dist.typings, 'angular2_google_maps.d.ts');

  dts.bundle({
    name: 'angular2_google_maps',
    indent: ' ',
    prefix: '',
    main: path.join(config.PATHS.dist.cjs.moduleDir, 'angular2_google_maps.d.ts'),
    out: outFile,
  });

  replace({
    paths: [outFile],
    regex: 'declare module \'angular2_google_maps\'',
    replacement: 'declare module \'angular2_google_maps/angular2_google_maps\'',
    silent: true,
  });

  done();
});
