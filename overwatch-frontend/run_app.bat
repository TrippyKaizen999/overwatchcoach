@echo off
SETLOCAL

REM ───────────────────────────────────────────────
REM 1) Go to frontend folder and install/build
REM ───────────────────────────────────────────────
cd /d "%~dp0\overwatch-frontend"
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
echo Building React frontend...
npm run build
if ERRORLEVEL 1 (
    echo React build failed. Fix errors and try again.
    pause
    exit /b 1
)

REM ───────────────────────────────────────────────
REM 2) Go back to root and install root deps if needed
REM ───────────────────────────────────────────────
cd /d "%~dp0"
if not exist node_modules (
    echo Installing root dependencies (including Electron)...
    npm install
)

REM ───────────────────────────────────────────────
REM 3) Launch Electron app
REM ───────────────────────────────────────────────
echo Starting Electron...
npm run electron

ENDLOCAL
pause
