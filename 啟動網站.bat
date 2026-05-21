@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set "PORT=8099"
set "SITE_DIR=%CD%"
set "URL=http://127.0.0.1:%PORT%/index.html"

start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SITE_DIR%\static-server.ps1" -Root "%SITE_DIR%" -Port %PORT%
ping -n 3 127.0.0.1 >nul
start "" "%URL%"
