@echo off
echo ========================================
echo   BACKEND PRODUCTION - PORT 3003
echo ========================================
echo.

echo Arret des processus existants...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F >nul 2>&1

echo.
echo Demarrage en mode production...
set NODE_ENV=production
call npm run start:prod