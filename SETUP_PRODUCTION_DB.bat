@echo off
echo ========================================
echo   CONFIGURATION BASE DE DONNEES PROD
echo ========================================
echo.

echo [1/3] Generation du client Prisma...
call npx prisma generate

echo.
echo [2/3] Application des migrations...
call npx prisma migrate deploy

echo.
echo [3/3] Seed de la base de donnees (optionnel)...
set /p seed="Voulez-vous executer le seed de production ? (y/N): "
if /i "%seed%"=="y" (
    echo Execution du seed...
    call npx prisma db seed
) else (
    echo Seed ignore
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE
echo ========================================
echo.
echo La base de donnees de production est prete
echo.
pause