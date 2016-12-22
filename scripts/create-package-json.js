/**
 * Creates a package.json for the release NPM package structure.
 */
const fs = require('fs');
const path = require('path');

const pkgNames = ['core'];

pkgNames.forEach(function(pkgName) {
  const basePkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  // define the package name
  basePkgJson.name = `@angular-google-maps/${pkgName}`

  // remove scripts
  delete basePkgJson.scripts;

  // remove devDependencies (as there are important for the sourcecode only)
  delete basePkgJson.devDependencies;

  // transform dependencies to peerDependencies for the release
  basePkgJson.peerDependencies = Object.assign({}, basePkgJson.dependencies);
  basePkgJson.dependencies = {};

  const filepath = path.join(__dirname, `../dist/${pkgName}/package.json`);
  fs.writeFileSync(filepath, JSON.stringify(basePkgJson, null, 2), 'utf-8');
});