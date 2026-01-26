@echo off
title Nettoyage et Démarrage
color 0A

echo.
echo 🧹 NETTOYAGE COMPLET EN COURS...
echo.

REM Aller dans le bon dossier
cd /d "C:\Users\User\course-platform-backend"

REM Tuer TOUS les processus Node.js
echo Arrêt de tous les processus Node.js...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.exe >nul 2>&1

REM Nettoyer les ports
echo Nettoyage des ports...
netsh int ipv4 reset >nul 2>&1

REM Attendre que tout se libère
echo Attente de libération des ressources...
timeout /t 5 /nobreak >nul

echo.
echo 🚀 DÉMARRAGE PROPRE...
echo.

REM Démarrer le backend
echo [1/2] Démarrage du BACKEND...
start "🔧 BACKEND - NE PAS FERMER" cmd /k "title BACKEND ACTIF & color 0C & echo ✅ Backend sur http://localhost:3001 & npm run start:dev"

REM Attendre que le backend soit prêt
echo Attente du backend (15 secondes)...
timeout /t 15 /nobreak >nul

REM Démarrer le frontend
echo [2/2] Démarrage du FRONTEND...
start "🎨 FRONTEND - NE PAS FERMER" cmd /k "title FRONTEND ACTIF & color 0B & echo ✅ Frontend sur http://localhost:3000 & cd frontend && npm run dev"

REM Attendre que le frontend soit prêt
echo Attente du frontend (10 secondes)...
timeout /t 10 /nobreak >nul

echo.
echo ✅ DÉMARRAGE TERMINÉ !
echo.
echo 🌐 Votre site : http://localhost:3000
echo 👤 Compte test : etudiant@eduplatform.com / password123
echo.
echo ⚠️  IMPORTANT : Ne fermez pas les fenêtres BACKEND et FRONTEND !
echo.

REM Ouvrir le navigateur
echo Ouverture du navigateur dans 3 secondes...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo 🎉 Votre plateforme éducative est prête !
echo.
pause