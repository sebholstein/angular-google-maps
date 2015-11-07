/* global process */
// This file contains all release related tasks.

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const conventionalGithubReleaser = require('conventional-github-releaser');
const fs = require('fs');

gulp.task('copy-release-assets', function copyReleaseAssets() {
  return gulp.src(config.PATHS.releaseAssets)
    .pipe(gulp.dest(config.PATHS.dist.base));
});

gulp.task('changelog', function changelog() {
  return gulp.src('CHANGELOG.md', {
    buffer: false,
  })
    .pipe($.conventionalChangelog({
      preset: 'angular',
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('github-release', (done) => {
  if (process.env.ANGULAR2_GOOGLE_MAPS_TOKEN === '') {
    throw new Error('Env var ANGULAR2_GOOGLE_MAPS_TOKEN not set!, skipping github-release task!');
  }

  conventionalGithubReleaser({
    type: 'oauth',
    token: process.env.ANGULAR2_GOOGLE_MAPS_TOKEN,
  }, {
    preset: 'angular',
  }, done);
});

gulp.task('create-tag', function createTag(cb) {
  function getPackageJsonVersion() {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }

  const version = getPackageJsonVersion();
  $.git.tag(version, 'Created Tag for version: ' + version, function createGitTag(error) {
    if (error) {
      return cb(error);
    }
  });
});
