#!/bin/bash

set -eu

# first clean up old files
rm -rf dist

# use the same babel configurations as create-react-app
NODE_ENV=production babel src/react-rewired --out-dir dist

# generate flow source maps
for i in `ls src/react-rewired/`; do cp src/react-rewired/$i dist/$i.flow; done
