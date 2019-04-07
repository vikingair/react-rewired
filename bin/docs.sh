#!/bin/bash

set -eu

yarn run dist

node ./config/build-app.js

# build the performance app
pushd performance &>/dev/null
rm -rf build
yarn run build
rm build/service-worker.js
popd &>/dev/null

# merge the built performance app into the overall built
mkdir docs/performance
mv performance/build/* docs/performance/
