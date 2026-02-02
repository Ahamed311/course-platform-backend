# Script PowerShell pour démarrer le backend en production

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEMARRAGE PRODUCTION - BACKEND" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Arrêter les processus existants sur les ports 3001-3003
Write-Host "[1/4] Nettoyage des processus existants..." -ForegroundColor Yellow
$ports = @(3001, 3002, 3003)
foreach ($port in $ports) {
    $processes = netstat -ano | Select-String ":$port " | ForEach-Object { ($_ -split '\s+')[-1] }
    foreach ($processId in $processes) {
        if ($processId -and $processId -ne "0") {
            try {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "  Processus $processId arrêté (port $port)" -ForegroundColor Green
            } catch {
                Write-Host "  Impossible d'arrêter le processus $processId" -ForegroundColor Red
            }
        }
    }
}

Write-Host ""
Write-Host "[2/4] Configuration de l'environnement..." -ForegroundColor Yellow
$env:NODE_ENV = "production"
$env:PORT = "3003"

if (Test-Path ".env.production") {
    Write-Host "  Variables de production chargées" -ForegroundColor Green
} else {
    Write-Host "  ATTENTION: Fichier .env.production manquant" -ForegroundColor Red
}

Write-Host ""
Write-Host "[3/4] Build de production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors du build" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[4/4] Démarrage du serveur..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   SERVEUR EN COURS DE DEMARRAGE..." -ForegroundColor Green
Write-Host "   Port: 3003" -ForegroundColor Green
Write-Host "   Mode: Production" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Démarrer le serveur
npm run start:prod