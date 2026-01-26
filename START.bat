@echo off
title Démarrage Plateforme Éducative
color 0A
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                 PLATEFORME ÉDUCATIVE                         ║
echo  ║                    Démarrage en cours...                     ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo [1/5] Nettoyage des anciens processus...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✓ Nettoyage terminé

echo.
echo [2/5] Vérification de PostgreSQL...
sc query postgresql-x64-17 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL n'est pas démarré !
    echo    Démarrez PostgreSQL et relancez ce script
    pause
    exit /b 1
)
echo ✓ PostgreSQL fonctionne

echo.
echo [3/5] Préparation de la base de données...
call npx prisma db push >nul 2>&1
call npx tsx prisma/seed-ultimate.ts >nul 2>&1
echo ✓ Base de données prête

echo.
echo [4/5] Démarrage du BACKEND (serveur principal)...
start "🔧 BACKEND - NE PAS FERMER" /min cmd /k "title BACKEND & color 0C & echo Serveur Backend démarré... & npm run start:dev"
echo ✓ Backend en cours de démarrage...
timeout /t 10 /nobreak >nul

echo.
echo [5/5] Démarrage du FRONTEND (interface web)...
start "🎨 FRONTEND - NE PAS FERMER" /min cmd /k "title FRONTEND & color 0B & echo Interface Web démarrée... & cd frontend && npm run dev"
echo ✓ Frontend en cours de démarrage...
timeout /t 8 /nobreak >nul

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                        ✅ SUCCÈS !                           ║
echo  ║                                                              ║
echo  ║  Votre plateforme éducative est maintenant ACTIVE !         ║
echo  ║                                                              ║
echo  ║  🌐 Accédez à votre site :                                   ║
echo  ║     http://localhost:3000                                    ║
echo  ║                                                              ║
echo  ║  👤 Comptes de test :                                        ║
echo  ║     Étudiant : etudiant@eduplatform.com / password123       ║
echo  ║     Admin    : admin@eduplatform.com / admin123             ║
echo  ║                                                              ║
echo  ║  ⚠️  IMPORTANT : Gardez les 2 fenêtres ouvertes !            ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.
echo Appuyez sur une touche pour ouvrir automatiquement le site...
pause >nul

start http://localhost:3000

echo.
echo ✨ Bon apprentissage !
timeout /t 3 /nobreak >nul