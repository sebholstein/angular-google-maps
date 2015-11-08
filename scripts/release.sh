#!/usr/bin/env bash
set -e

# PLEASE NOTE - make sure that you have set up these things before running this script!!: 
#  - bump the package.json version
#  - generate the project with gulp build (dist folder should lookin good)
#  - ANGULAR2_GOOGLE_MAPS_TOKEN enviroment variable should be set with your Github token
./node_modules/.bin/gulp changelog
git add CHANGELOG.md package.json
git commit -m "chore(release): changelog/version bump"
git push origin master
./node_modules/.bin/gulp create-tag
git push origin master --tags
./node_modules/.bin/gulp github-release
echo "--- DONE RELEASING --- Please publish to NPM now"