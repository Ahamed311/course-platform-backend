@echo off
echo ========================================
echo   EDUPLATFORM - PRODUCTION READY
echo ========================================
echo.

echo [1/2] Nettoyage des processus...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F >nul 2>&1

echo.
echo [2/2] Demarrage du serveur de production...
echo.
echo ========================================
echo   SERVEUR DE PRODUCTION
echo   Backend:  http://localhost:3003
echo   Database: SQLite (production.db)
echo   Mode:     Production
echo ========================================
echo.

set NODE_ENV=production
set DATABASE_URL=file:./production.db
set PORT=3003
call npm run start:prod

pause