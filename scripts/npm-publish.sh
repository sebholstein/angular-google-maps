#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "SebastianM/angular2-google-maps" ]; then
  #npm publish ./dist --tag next --access public
fi