#!/usr/bin/env bash

#rmdir -p ../src-build
bash ../requirejs/build/build.sh app.build.js

#del ..\src-build /q
#call ../requirejs/build/buildj.bat app.build.js
#del ..\src-build\_config.yml
#rename ..\src-build\_config.live.yml _config.yml

#jake