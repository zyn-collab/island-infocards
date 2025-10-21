@echo off
REM Simple local server starter for Windows
REM This starts a Python HTTP server to serve the website

echo ========================================
echo Maldives Islands Website Server
echo ========================================
echo.
echo Starting local web server...
echo.
echo Once started, open your browser and go to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when done.
echo ========================================
echo.

REM Try Python 3 first, then Python 2
python -m http.server 8000 2>nul || python -m SimpleHTTPServer 8000 2>nul || (
    echo ERROR: Python is not installed or not in PATH
    echo.
    echo Please install Python from https://www.python.org/downloads/
    echo Or use the alternative START_SERVER_NODE.bat if you have Node.js installed
    echo.
    pause
    exit /b 1
)

