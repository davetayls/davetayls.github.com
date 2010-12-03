@echo off
call ../requirejs/build/build.bat app.build.js
bash --login -i /cygdrive/d/projects/siteblueprint/build/build.sh
pause
