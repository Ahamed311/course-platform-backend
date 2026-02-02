@echo off
echo ========================================
echo   CONFIGURATION RAPIDE SQLITE
echo ========================================
echo.

echo [1/4] Copie du schema SQLite...
copy prisma\schema.sqlite.prisma prisma\schema.prisma

echo.
echo [2/4] Configuration DATABASE_URL...
echo DATABASE_URL="file:./production.db" > .env.production.sqlite

echo.
echo [3/4] Generation du client Prisma...
call npx prisma generate

echo.
echo [4/4] Creation de la base de donnees...
call npx prisma db push

echo.
echo ========================================
echo   CONFIGURATION TERMINEE
echo ========================================
echo.
echo Pret pour le demarrage !
pause