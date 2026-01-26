@echo off
title Plateforme Éducative
echo.
echo 🚀 Démarrage de votre plateforme éducative...
echo.

REM Aller dans le bon dossier
cd /d "C:\Users\User\course-platform-backend"

REM Nettoyer
echo 🧹 Nettoyage...
taskkill /f /im node.exe >nul 2>&1

REM Attendre un peu
timeout /t 3 /nobreak >nul

REM Démarrer backend
echo 🔧 Démarrage du serveur...
start "BACKEND" cmd /k "title BACKEND & echo Backend démarré ! & npm run start:dev"

REM Attendre que le backend démarre
echo ⏳ Attente du backend...
timeout /t 10 /nobreak >nul

REM Démarrer frontend
echo 🎨 Démarrage de l'interface...
start "FRONTEND" cmd /k "title FRONTEND & echo Frontend démarré ! & cd frontend && npm run dev"

REM Attendre que le frontend démarre
echo ⏳ Attente du frontend...
timeout /t 8 /nobreak >nul

echo.
echo ✅ TERMINÉ !
echo.
echo 🌐 Votre site : http://localhost:3000
echo 👤 Compte : etudiant@eduplatform.com / password123
echo.
echo ⚠️  Gardez les 2 fenêtres BACKEND et FRONTEND ouvertes !
echo.

REM Ouvrir le navigateur
start http://localhost:3000

echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul