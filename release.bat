@echo off

del release\js\*.* /s/q
@echo *
@echo **** copying core files ****
@echo *
xcopy core\*.* release\ /d/e/c/y/r

@echo *
@echo **** combining javascript core ****
@echo *
tools\juxtapo-combiner "release\js\"

pause