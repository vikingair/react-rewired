#!/bin/bash

set -eu

# first clean up old files
rm -rf dist

# run rollup
yarn run rollup -c
