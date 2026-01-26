@echo off
echo Démarrage de votre plateforme...
echo.

echo Étape 1: Nettoyage...
taskkill /f /im node.exe 2>nul
timeout /t 2 >nul

echo Étape 2: Démarrage backend...
start cmd /k "npm run start:dev"
timeout /t 8 >nul

echo Étape 3: Démarrage frontend...
start cmd /k "cd frontend && npm run dev"
timeout /t 5 >nul

echo.
echo ✅ Terminé !
echo Allez sur: http://localhost:3000
echo.
pause