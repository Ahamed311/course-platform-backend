# 🎓 Plateforme de cours (sans vidéo)

Plateforme d'apprentissage complète avec modules, cours textuels et quiz interactifs.

## 🏗 Architecture

### Backend (NestJS + Prisma + PostgreSQL)
- **API REST** complète avec validation
- **Base de données** PostgreSQL avec Prisma ORM
- **Modules** : Gestion des modules de cours
- **Cours** : Contenu textuel structuré
- **Quiz** : Questions à choix multiples
- **Résultats** : Suivi des performances

### Frontend (Next.js 16 + React 19 + Tailwind CSS)
- **Interface moderne** et responsive
- **Quiz interactifs** avec soumission en temps réel
- **Navigation intuitive** : Modules → Cours → Quiz
- **Gestion d'erreurs** robuste
- **Types TypeScript** complets

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Installation complète

```bash
# 1. Cloner et installer les dépendances
git clone <repo>
cd course-platform-backend
npm install
cd frontend && npm install && cd ..

# 2. Configuration de la base de données
# Créer un fichier .env avec vos paramètres PostgreSQL
cp .env.example .env

# 3. Initialiser la base de données
npx prisma migrate dev
npx prisma generate

# 4. Démarrer en développement
# Option 1: Script automatique (Windows)
start-dev.bat

# Option 2: Manuel
npm run start:dev          # Backend sur :3001
cd frontend && npm run dev  # Frontend sur :3000
```

## 📊 Fonctionnalités

### ✅ Implémentées
- **CRUD complet** pour modules, cours, quiz, questions, options
- **Quiz interactifs** avec soumission et résultats
- **Interface utilisateur** moderne et intuitive
- **Gestion d'erreurs** robuste côté client et serveur
- **Validation** des données avec class-validator
- **Types TypeScript** complets
- **Base de données** relationnelle avec contraintes
- **API REST** documentée

### 🎯 Flux utilisateur
1. **Accueil** : Liste des modules disponibles
2. **Module** : Affichage des cours du module
3. **Cours** : Lecture du contenu + accès aux quiz
4. **Quiz** : Interface interactive avec soumission
5. **Résultats** : Score et pourcentage de réussite

## 🛠 Développement

### Structure du projet
```
course-platform-backend/
├── src/                    # Backend NestJS
│   ├── modules/           # Gestion des modules
│   ├── courses/           # Gestion des cours
│   ├── quiz/              # Gestion des quiz
│   ├── questions/         # Gestion des questions
│   ├── options/           # Gestion des options
│   ├── users/             # Gestion des utilisateurs
│   └── prisma/            # Service Prisma
├── frontend/              # Frontend Next.js
│   ├── src/app/          # Pages App Router
│   ├── src/components/   # Composants réutilisables
│   ├── src/lib/          # Utilitaires et API client
│   └── src/hooks/        # Hooks personnalisés
├── prisma/               # Schéma et migrations
└── scripts/              # Scripts utilitaires
```

### Commandes utiles

```bash
# Backend
npm run start:dev          # Développement avec hot-reload
npm run build             # Build de production
npm run start:prod        # Démarrage production
npm run test              # Tests unitaires
npm run test:e2e          # Tests end-to-end

# Frontend
cd frontend
npm run dev               # Développement
npm run build             # Build de production
npm run start             # Démarrage production
npm run lint              # Linting

# Base de données
npx prisma studio         # Interface graphique
npx prisma migrate dev    # Nouvelle migration
npx prisma generate       # Régénérer le client
npx prisma db seed        # Données de test
```

## 🔧 Configuration

### Variables d'environnement

**Backend (.env)**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/course_platform"
PORT=3001
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📡 API Endpoints

### Modules
- `GET /modules` - Liste des modules
- `POST /modules` - Créer un module
- `GET /modules/:id` - Détail d'un module
- `PATCH /modules/:id` - Modifier un module
- `DELETE /modules/:id` - Supprimer un module

### Cours
- `GET /courses` - Liste des cours
- `GET /courses/module/:moduleId` - Cours d'un module
- `POST /courses` - Créer un cours
- `GET /courses/:id` - Détail d'un cours
- `PATCH /courses/:id` - Modifier un cours
- `DELETE /courses/:id` - Supprimer un cours

### Quiz
- `GET /quiz/course/:courseId` - Quiz d'un cours
- `POST /quiz` - Créer un quiz
- `GET /quiz/:id` - Détail d'un quiz avec questions
- `POST /quiz/:id/submit` - Soumettre un quiz
- `PATCH /quiz/:id` - Modifier un quiz
- `DELETE /quiz/:id` - Supprimer un quiz

## 🎨 Design System

### Couleurs
- **Primary** : Blue-600 (#2563eb)
- **Background** : Zinc-50 (#fafafa)
- **Cards** : White (#ffffff)
- **Text** : Zinc-900/700/600/500
- **Success** : Green-600
- **Error** : Red-600
- **Warning** : Yellow-600

### Composants
- **Cards** : Bordures arrondies, ombres subtiles
- **Buttons** : États hover/disabled, transitions fluides
- **Forms** : Validation visuelle, messages d'erreur
- **Navigation** : Breadcrumbs, liens de retour

## 🚀 Déploiement

### Production
```bash
# Build complet
./build-all.bat  # Windows
# ou
npm run build && cd frontend && npm run build

# Démarrage production
npm run start:prod &          # Backend
cd frontend && npm start &    # Frontend
```

### Docker (optionnel)
```dockerfile
# Dockerfile pour le backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

## 🧪 Tests

### Backend
- Tests unitaires avec Jest
- Tests d'intégration pour les contrôleurs
- Tests E2E pour les flux complets

### Frontend
- Tests de composants avec React Testing Library
- Tests d'intégration des pages
- Tests E2E avec Playwright (à implémenter)

## 📈 Améliorations futures

### Fonctionnalités
- [ ] Authentification utilisateur
- [ ] Système de progression
- [ ] Certificats de completion
- [ ] Quiz avec limite de temps
- [ ] Questions de différents types (texte libre, glisser-déposer)
- [ ] Statistiques avancées
- [ ] Mode hors ligne
- [ ] Notifications push

### Technique
- [ ] Cache Redis
- [ ] CDN pour les assets
- [ ] Monitoring avec Sentry
- [ ] Tests E2E automatisés
- [ ] CI/CD avec GitHub Actions
- [ ] Documentation API avec Swagger

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Plateforme de cours** - Une solution complète pour l'apprentissage en ligne 🎓