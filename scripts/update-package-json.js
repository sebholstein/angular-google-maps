/**
 * Creates a package.json for the release NPM package structure.
 */
const fs = require('fs');
const path = require('path');

const rootPkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const DIST = './dist/@agm';

fs.readdirSync(DIST).forEach(function(file) {
  const pkgPath = path.join(DIST, file, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  delete pkgJson['$schema'];

  ['version', 'repository', 'license', 'bugs', 'homepage'].forEach(function(key) {
    pkgJson[key] = rootPkgJson[key]
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2), 'utf-8');
});
