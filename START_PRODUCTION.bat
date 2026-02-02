@echo off
echo ========================================
echo   DEMARRAGE PRODUCTION - BACKEND
echo ========================================
echo.

echo [1/4] Arret des processus existants...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Arret du processus %%a sur le port 3001
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo [2/4] Chargement des variables d'environnement...
if exist .env.production (
    echo Variables de production trouvees
) else (
    echo ATTENTION: Fichier .env.production manquant
    echo Utilisation des variables par defaut
)

echo.
echo [3/4] Build de production...
call npm run build

echo.
echo [4/4] Demarrage du serveur de production...
echo.
echo ========================================
echo   SERVEUR EN COURS DE DEMARRAGE...
echo ========================================
echo.

set NODE_ENV=production
call npm run start:prod

pause