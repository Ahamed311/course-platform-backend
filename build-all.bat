@echo off
echo ========================================
echo   Build complet de la plateforme
echo ========================================
echo.

echo 1. Build du backend NestJS...
call npm run build
if %errorlevel% neq 0 (
    echo ERREUR: Build backend echoue
    pause
    exit /b 1
)
echo ✓ Backend build avec succes

echo.
echo 2. Build du frontend Next.js...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ERREUR: Build frontend echoue
    pause
    exit /b 1
)
echo ✓ Frontend build avec succes

cd ..
echo.
echo ========================================
echo   Build complet termine avec succes !
echo ========================================
echo.
echo Pour demarrer en production:
echo - Backend: npm run start:prod
echo - Frontend: cd frontend && npm start
echo.
pause