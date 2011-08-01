#!/usr/bin/env bash

# remove master package
cd ../../
rm -r -f davetayls.github.com-master

# clone master from current repo but clear files
git clone -b master davetayls.github.com/.git davetayls.github.com-master
rm -r -f davetayls.github.com-master/*

# run requirejs copy and build
cd davetayls.github.com/build/
bash ../requirejs/build/build.sh app.build.js

# run jake tasks
jake

# switch files for live env
rm -f ../../davetayls.github.com-master/_config.yml 
mv ../../davetayls.github.com-master/_config.live.yml ../../davetayls.github.com-master/_config.yml

cd ../../davetayls.github.com-master
git commit -am "release"
git push

cd ../davetayls.github.com
