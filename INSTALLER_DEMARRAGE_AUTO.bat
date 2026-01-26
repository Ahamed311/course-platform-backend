@echo off
title Installation Démarrage Automatique
color 0E

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║        INSTALLATION DU DÉMARRAGE AUTOMATIQUE                ║
echo  ║                                                              ║
echo  ║  Ce script va configurer votre plateforme pour qu'elle      ║
echo  ║  démarre automatiquement à chaque démarrage de Windows      ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo Voulez-vous installer le démarrage automatique ? (O/N)
set /p choice="Votre choix : "

if /i "%choice%"=="O" (
    echo.
    echo Installation en cours...
    
    REM Créer le raccourci dans le dossier de démarrage
    set "startup_folder=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
    set "script_path=%~dp0DEMARRAGE_AUTO.bat"
    
    REM Créer un raccourci
    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%temp%\CreateShortcut.vbs"
    echo sLinkFile = "%startup_folder%\Plateforme Educative.lnk" >> "%temp%\CreateShortcut.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%temp%\CreateShortcut.vbs"
    echo oLink.TargetPath = "%script_path%" >> "%temp%\CreateShortcut.vbs"
    echo oLink.WorkingDirectory = "%~dp0" >> "%temp%\CreateShortcut.vbs"
    echo oLink.Description = "Plateforme Éducative - Démarrage Automatique" >> "%temp%\CreateShortcut.vbs"
    echo oLink.Save >> "%temp%\CreateShortcut.vbs"
    
    cscript "%temp%\CreateShortcut.vbs" >nul
    del "%temp%\CreateShortcut.vbs"
    
    echo.
    echo ✅ INSTALLATION TERMINÉE !
    echo.
    echo 🎉 Maintenant, votre plateforme démarrera automatiquement
    echo    à chaque fois que vous allumerez votre PC !
    echo.
    echo 📍 Pour tester : redémarrez votre PC
    echo 🌐 Votre site sera sur : http://localhost:3000
    echo.
) else (
    echo.
    echo ❌ Installation annulée.
    echo.
    echo 💡 Vous pouvez toujours démarrer manuellement avec :
    echo    DEMARRAGE_AUTO.bat
    echo.
)

echo.
echo Appuyez sur une touche pour continuer...
pause >nul