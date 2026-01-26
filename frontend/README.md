# Frontend - Plateforme de cours

Interface utilisateur moderne pour la plateforme de cours construite avec Next.js 16, React 19 et Tailwind CSS.

## 🚀 Fonctionnalités

### ✅ Implémentées
- **Navigation intuitive** : Modules → Cours → Quiz
- **Quiz interactifs** : Soumission des réponses et affichage des résultats
- **Gestion d'erreurs robuste** : ErrorBoundary et messages d'erreur clairs
- **Interface responsive** : Design adaptatif avec Tailwind CSS
- **États de chargement** : Indicateurs visuels pendant les requêtes
- **Pages d'erreur personnalisées** : 404, erreurs globales
- **Types TypeScript** : API typée pour une meilleure DX

### 🎨 Design
- Interface moderne et épurée
- Palette de couleurs zinc/blue cohérente
- Animations et transitions fluides
- Composants réutilisables

## 📁 Structure

```
frontend/src/
├── app/                    # Pages Next.js App Router
│   ├── courses/[id]/      # Page détail cours
│   ├── modules/[id]/      # Page détail module
│   ├── quiz/[id]/         # Page quiz interactif
│   ├── error.tsx          # Page d'erreur globale
│   ├── loading.tsx        # Page de chargement
│   ├── not-found.tsx      # Page 404
│   └── page.tsx           # Page d'accueil
├── components/            # Composants réutilisables
│   ├── ErrorBoundary.tsx  # Gestion d'erreurs React
│   ├── Loading.tsx        # Indicateur de chargement
│   ├── Navigation.tsx     # Composant de navigation
│   ├── Pagination.tsx     # Pagination des listes
│   ├── QuizForm.tsx       # Formulaire de quiz interactif
│   ├── QuizResults.tsx    # Affichage des résultats
│   ├── SearchBox.tsx      # Barre de recherche
│   └── StatusMessage.tsx  # Messages d'état
├── hooks/                 # Hooks personnalisés
│   └── useAsync.ts        # Hook pour requêtes async
└── lib/                   # Utilitaires
    └── api.ts             # Client API typé
```

## 🛠 Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start
```

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend requis
Le frontend nécessite que le backend NestJS soit démarré sur le port 3001.

## 📱 Pages disponibles

### 🏠 Accueil (`/`)
- Liste tous les modules disponibles
- Navigation vers les modules

### 📚 Module (`/modules/[id]`)
- Affiche tous les cours d'un module
- Navigation vers les cours individuels

### 📖 Cours (`/courses/[id]`)
- Contenu textuel du cours
- Liste des quiz disponibles
- Navigation vers les quiz

### 🎯 Quiz (`/quiz/[id]`)
- Interface interactive pour passer le quiz
- Sélection des réponses avec radio buttons
- Soumission et affichage des résultats
- Historique des tentatives précédentes

## 🎨 Composants clés

### QuizForm
Composant principal pour les quiz interactifs :
- Gestion des réponses utilisateur
- Validation côté client
- Soumission vers l'API
- Affichage des résultats avec score

### ErrorBoundary
Gestion robuste des erreurs :
- Capture les erreurs React
- Interface de récupération
- Messages d'erreur clairs

### API Client
Client typé pour toutes les requêtes :
- Types TypeScript complets
- Gestion d'erreurs centralisée
- Support des codes de statut HTTP

## 🚀 Améliorations apportées

1. **Quiz interactifs complets** - Remplacement de l'affichage statique
2. **Gestion d'erreurs robuste** - ErrorBoundary et pages d'erreur
3. **Types TypeScript** - API complètement typée
4. **Interface améliorée** - Design plus moderne et intuitif
5. **États de chargement** - Indicateurs visuels
6. **Composants réutilisables** - Architecture modulaire
7. **Validation côté client** - Meilleure UX

## 🔄 Intégration API

Le frontend communique avec le backend NestJS via :
- `GET /modules` - Liste des modules
- `GET /courses/module/:id` - Cours d'un module
- `GET /courses/:id` - Détail d'un cours
- `GET /quiz/course/:id` - Quiz d'un cours
- `GET /quiz/:id` - Détail d'un quiz
- `POST /quiz/:id/submit` - Soumission d'un quiz

## 📊 Performance

- **Build optimisé** : Next.js avec Turbopack
- **Rendu statique** : Pages pré-générées quand possible
- **Code splitting** : Chargement à la demande
- **Images optimisées** : Next.js Image component

Le frontend est maintenant parfaitement fonctionnel avec une interface moderne, des quiz interactifs complets et une gestion d'erreurs robuste !