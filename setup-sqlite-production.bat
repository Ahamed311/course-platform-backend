@echo off
echo ========================================
echo   CONFIGURATION SQLITE POUR PRODUCTION
echo ========================================
echo.

echo [1/5] Sauvegarde du schema PostgreSQL...
copy prisma\schema.prisma prisma\schema.postgres.backup

echo.
echo [2/5] Installation du schema SQLite...
copy prisma\schema.sqlite.prisma prisma\schema.prisma

echo.
echo [3/5] Configuration des variables d'environnement...
echo NODE_ENV=production > .env.production.sqlite
echo PORT=3003 >> .env.production.sqlite
echo DATABASE_URL="file:./production.db" >> .env.production.sqlite
echo JWT_SECRET="UneCleSuperSecretePourLaProduction" >> .env.production.sqlite
echo CORS_ORIGINS="http://localhost:3000" >> .env.production.sqlite

echo.
echo [4/5] Generation du client Prisma...
call npx prisma generate

echo.
echo [5/5] Creation de la base de donnees SQLite...
call npx prisma db push

echo.
echo ========================================
echo   CONFIGURATION TERMINEE
echo ========================================
echo.
echo Base de donnees SQLite creee : production.db
echo Pret pour le demarrage en production !
echo.
pause