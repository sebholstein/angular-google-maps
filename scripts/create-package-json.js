/**
 * Creates a package.json for the release NPM package structure.
 */
const fs = require('fs');
const path = require('path');
const packages = require('./packages');

const rootPkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

packages.forEach(function(pkgName) {
  let basePkgJson;
  if (fs.existsSync(`./packages/${pkgName}/package.tpl.json`)) {
    basePkgJson = JSON.parse(fs.readFileSync(`./packages/${pkgName}/package.tpl.json`, 'utf8'));
  } else {
    basePkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  }

  // define the package name
  basePkgJson.name = `@agm/${pkgName}`

  // update version
  basePkgJson.version = rootPkgJson.version;

  // remove scripts
  delete basePkgJson.scripts;

  // remove devDependencies (as there are important for the sourcecode only)
  delete basePkgJson.devDependencies;

  // remove the private option
  delete basePkgJson.private;
  
  // remove dependencies for safety reasons as we use peerDependencies
  basePkgJson.dependencies = {};

  const filepath = path.join(__dirname, `../dist/packages/${pkgName}/package.json`);
  fs.writeFileSync(filepath, JSON.stringify(basePkgJson, null, 2), 'utf-8');
});