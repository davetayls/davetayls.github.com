#!/usr/bin/env bash

rmdir -p ../src-build
../requirejs/build/build app.build.js

#jake