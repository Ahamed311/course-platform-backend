@echo off
echo ========================================
echo   BACKEND PRODUCTION - EDUPLATFORM
echo ========================================
echo.

echo [1/3] Nettoyage des processus...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F >nul 2>&1

echo.
echo [2/3] Build de production...
call npm run build

echo.
echo [3/3] Demarrage sur port 3003...
echo.
echo ========================================
echo   SERVEUR DE PRODUCTION DEMARRE
echo   Port: 3003
echo   Mode: Production
echo   Base de donnees: Existante
echo ========================================
echo.

set NODE_ENV=production
set PORT=3003
call npm run start:prod

pause