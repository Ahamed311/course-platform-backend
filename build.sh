#!/bin/bash

echo "🔧 Build script pour Render"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Génération du client Prisma
echo "🗄️ Génération du client Prisma..."
npx prisma generate

# Application des migrations
echo "🔄 Application des migrations..."
npx prisma migrate deploy

# Build de l'application
echo "🏗️ Build de l'application..."
npm run build

echo "✅ Build terminé !"