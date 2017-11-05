#! /bin/bash
cd ./
echo 'client build'
kill -9 $(lsof -i:8801 |awk '{print $2}' | tail -n 2) 
node ./www/index.js