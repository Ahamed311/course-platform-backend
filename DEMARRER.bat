@echo off
echo 🚀 Démarrage de votre plateforme éducative...
echo.
echo ⏳ Préparation en cours...

echo.
echo 🧹 Nettoyage...
taskkill /f /im node.exe 2>nul
timeout /t 3 /nobreak >nul

echo.
echo 🔧 Démarrage du serveur principal...
start "BACKEND - Laissez ouvert" cmd /k "npm run start:dev"
timeout /t 8 /nobreak >nul

echo.
echo 🎨 Démarrage de l'interface...
start "FRONTEND - Laissez ouvert" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ✅ TERMINÉ !
echo.
echo 🌐 Votre site est maintenant accessible sur :
echo    http://localhost:3000
echo.
echo 👤 Comptes pour vous connecter :
echo    Email    : etudiant@eduplatform.com
echo    Mot de passe : password123
echo.
echo ⚠️  IMPORTANT : Ne fermez pas les 2 fenêtres qui se sont ouvertes !
echo.
echo 🎉 Allez sur http://localhost:3000 dans votre navigateur !
echo.
pause