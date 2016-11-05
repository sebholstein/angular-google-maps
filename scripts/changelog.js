var conventionalChangelog = require('conventional-changelog');

conventionalChangelog({
  preset: 'angular',
  path: __dirname + '/../package.json'
})
  .pipe(process.stdout);