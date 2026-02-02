@echo off
echo ========================================
echo   EDUPLATFORM - PRODUCTION COMPLETE
echo ========================================
echo.

echo [1/4] Nettoyage des processus existants...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F >nul 2>&1

echo.
echo [2/4] Build du backend...
call npm run build

echo.
echo [3/4] Build du frontend...
cd frontend
call npm run build
cd ..

echo.
echo [4/4] Demarrage des serveurs...
echo.
echo ========================================
echo   SERVEURS DE PRODUCTION
echo   Backend:  http://localhost:3003
echo   Frontend: http://localhost:3000
echo ========================================
echo.

echo Demarrage du backend...
start "Backend Production" cmd /c "set NODE_ENV=production && set PORT=3003 && npm run start:prod"

timeout /t 5 /nobreak >nul

echo Demarrage du frontend...
start "Frontend Production" cmd /c "cd frontend && npm start"

echo.
echo ========================================
echo   SYSTEME DEMARRE
echo   Ouvrez: http://localhost:3000
echo ========================================
echo.
pause