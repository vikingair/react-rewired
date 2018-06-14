#!/bin/bash

set -eu

# first clean up old files
rm -rf dist

# use the same babel configurations as create-react-app
NODE_ENV=production babel src/wired-react --out-dir dist

# generate flow source maps
for i in `ls src/wired-react/`; do cp src/wired-react/$i dist/$i.flow; done

# remove redundant test files
rm `ls dist/*.test.js*`
