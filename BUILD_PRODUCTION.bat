@echo off
echo ========================================
echo   BUILD PRODUCTION - EDUPLATFORM
echo ========================================
echo.

echo [1/3] Nettoyage des fichiers de build...
cd frontend
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

echo.
echo [2/3] Installation des dependances...
call npm install

echo.
echo [3/3] Build de production...
call npm run build

echo.
echo ========================================
echo   BUILD TERMINE
echo ========================================
echo.
echo Le build de production est pret dans le dossier 'frontend/.next'
echo.
echo Pour tester en local avec les variables de production:
echo   cd frontend
echo   npm start
echo.
pause