#!/bin/bash

echo "🔧 Build Render - EduPlatform Backend"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Génération du client Prisma
echo "🗄️ Génération du client Prisma..."
npx prisma generate

# Build de l'application NestJS
echo "🏗️ Build de l'application..."
npm run build

echo "✅ Build terminé avec succès !"