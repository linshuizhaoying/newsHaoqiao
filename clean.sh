#! /bin/bash
rm rf ./client/build
sleep 1.5s
git reset --hard origin/master
git clean -f
git pull