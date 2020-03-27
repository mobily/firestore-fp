#!/bin/bash

yarn clean
yarn build
cp README.md dist
cp package.json dist
# np --yolo --no-yarn --contents=dist
