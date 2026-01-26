@echo off
echo ========================================
echo   Plateforme de cours - Demarrage Dev
echo ========================================
echo.

echo Demarrage du backend NestJS...
start "Backend" cmd /k "cd /d %~dp0 && npm run start:dev"

echo Attente de 5 secondes pour le backend...
timeout /t 5 /nobreak > nul

echo Demarrage du frontend Next.js...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   Services demarres !
echo ========================================
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Appuyez sur une touche pour fermer...
pause > nul