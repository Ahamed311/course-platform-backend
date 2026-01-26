@echo off
title Plateforme Éducative - Démarrage Automatique
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║            🎓 PLATEFORME ÉDUCATIVE 🎓                        ║
echo  ║                                                              ║
echo  ║  Ce script démarre automatiquement votre plateforme         ║
echo  ║  à chaque fois que vous allumez votre PC                    ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo [ÉTAPE 1] Attente que Windows soit prêt...
timeout /t 10 /nobreak >nul

echo [ÉTAPE 2] Nettoyage des anciens processus...
taskkill /f /im node.exe >nul 2>&1

echo [ÉTAPE 3] Vérification de PostgreSQL...
:check_postgres
sc query postgresql-x64-17 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo ⏳ PostgreSQL pas encore prêt, attente...
    timeout /t 5 /nobreak >nul
    goto check_postgres
)
echo ✅ PostgreSQL fonctionne

echo [ÉTAPE 4] Navigation vers le dossier du projet...
cd /d "%~dp0"

echo [ÉTAPE 5] Préparation de la base de données...
call npx prisma db push >nul 2>&1

echo [ÉTAPE 6] Démarrage du BACKEND...
start "🔧 BACKEND" /min cmd /k "title BACKEND ACTIF & color 0C & echo ✅ Backend démarré sur http://localhost:3001 & npm run start:dev"
timeout /t 12 /nobreak >nul

echo [ÉTAPE 7] Démarrage du FRONTEND...
start "🎨 FRONTEND" /min cmd /k "title FRONTEND ACTIF & color 0B & echo ✅ Frontend démarré sur http://localhost:3000 & cd frontend && npm run dev"
timeout /t 8 /nobreak >nul

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                    ✅ PLATEFORME ACTIVE !                    ║
echo  ║                                                              ║
echo  ║  🌐 Votre site : http://localhost:3000                       ║
echo  ║                                                              ║
echo  ║  👤 Comptes :                                                ║
echo  ║     etudiant@eduplatform.com / password123                   ║
echo  ║     admin@eduplatform.com / admin123                         ║
echo  ║                                                              ║
echo  ║  ⚠️  Les 2 fenêtres Backend/Frontend restent ouvertes        ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo Ouverture automatique du site dans 5 secondes...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo ✨ Votre plateforme éducative est prête !
echo.
echo Pour arrêter : fermez les fenêtres Backend et Frontend
echo Pour redémarrer : double-cliquez sur ce fichier
echo.
timeout /t 3 /nobreak >nul