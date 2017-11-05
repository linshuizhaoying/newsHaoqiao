#! /bin/bash
cd ./
echo 'client build'
yarn run build
node ./www/index.js