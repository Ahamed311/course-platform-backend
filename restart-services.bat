@echo off
echo 🚀 Démarrage de la Plateforme Éducative
echo.

echo 🧹 Nettoyage des processus existants...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo 📊 Vérification de PostgreSQL...
sc query postgresql-x64-17 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL n'est pas démarré
    echo Démarrez PostgreSQL et relancez ce script
    pause
    exit /b 1
)
echo ✅ PostgreSQL fonctionne

echo.
echo 🗄️ Initialisation de la base de données...
npx prisma db push >nul 2>&1
npx tsx prisma/seed-ultimate.ts >nul 2>&1
echo ✅ Base de données prête

echo.
echo 🔧 Démarrage du Backend...
start "Backend - NE PAS FERMER" cmd /k "npm run start:dev"
timeout /t 8 /nobreak >nul

echo.
echo 🎨 Démarrage du Frontend...
start "Frontend - NE PAS FERMER" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ✅ PLATEFORME DÉMARRÉE AVEC SUCCÈS !
echo.
echo 📍 Accès à la plateforme :
echo    Frontend : http://localhost:3000
echo    Backend  : http://localhost:3001
echo.
echo 👤 Comptes de test :
echo    Étudiant : etudiant@eduplatform.com / password123
echo    Admin    : admin@eduplatform.com / admin123
echo.
echo ⚠️  IMPORTANT : Ne fermez pas les fenêtres Backend et Frontend
echo.
pause