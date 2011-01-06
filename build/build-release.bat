del ..\src-build /q
call ../requirejs/build/build.bat app.build.js
del ..\src-build\_config.yml
rename ..\src-build\_config.live.yml _config.yml
bash --login -i /cygdrive/c/projects/davetayls.github.com/build/build.sh
pause
