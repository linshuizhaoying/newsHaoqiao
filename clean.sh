#! /bin/bash
rm rf ./client/build
git reset --hard origin/master
git clean -f
git pull