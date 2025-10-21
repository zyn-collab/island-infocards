@echo off
REM Alternative server starter using Node.js
REM Use this if you have Node.js installed instead of Python

echo ========================================
echo Maldives Islands Website Server (Node.js)
echo ========================================
echo.
echo Installing http-server (if needed)...
call npx http-server -p 8000 -c-1 --cors

REM If npx doesn't work, show error
if errorlevel 1 (
    echo.
    echo ERROR: Node.js/npx is not installed or not in PATH
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Or use START_SERVER.bat if you have Python installed
    echo.
    pause
)

