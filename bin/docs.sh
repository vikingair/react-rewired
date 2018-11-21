#!/bin/bash

set -eux

# first clean up old files
rm -rf build

# build the app itself
yarn run build

# build the performance app
pushd performance &>/dev/null
rm -rf build
yarn run build
popd &>/dev/null

# merge the built app into the overall built
mkdir build/performance
mv performance/build/* build/performance/

# update the docs folder
rm -rf docs
mv build docs
