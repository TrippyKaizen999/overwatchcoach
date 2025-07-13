@echo off
SETLOCAL

REM ──────────────────────────────────────────────────────────────────────────────
REM 1) Build React frontend
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo === Building React frontend ===
cd /d "%~dp0\overwatch-frontend"
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
echo Running build...
npm run build
if ERRORLEVEL 1 (
    echo Build failed. Check errors above.
    pause
    exit /b 1
)

REM ──────────────────────────────────────────────────────────────────────────────
REM 2) Install/verify Electron in root
REM ──────────────────────────────────────────────────────────────────────────────
cd /d "%~dp0"
if not exist node_modules (
    echo Installing root dependencies (including electron)...
    npm install
)

REM ──────────────────────────────────────────────────────────────────────────────
REM 3) Launch Electron
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo === Launching Electron app ===
npx electron .

ENDLOCAL
pause
