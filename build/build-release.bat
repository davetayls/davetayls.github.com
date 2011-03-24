del ..\src-build /q
call ../requirejs/build/buildj.bat app.build.js
del ..\src-build\_config.yml
rename ..\src-build\_config.live.yml _config.yml
bash --login -i -c 'cd `cygpath "%CD%"`;bash build.sh'
pause
