#!/usr/bin/env bash
set -e

# PLEASE NOTE - make sure that you have set up these things before running this script!!:
#  - bump the package.json version
#  - generate the project with gulp build (dist folder should lookin good)
#  - Create Git tag
./node_modules/.bin/gulp changelog
git add CHANGELOG.md package.json
git commit -m "chore(release): add changelog and bump version"
git push origin master
./node_modules/.bin/gulp create-tag
git push origin master --tags
echo "--- DONE RELEASING --- Please publish to NPM now (run npm publish dist)"
