# Guide de Déploiement en Production - EduPlatform

## Configuration des Variables d'Environnement

### Fichiers de Configuration

1. **Développement Local** : `frontend/.env.local`
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

2. **Production** : `frontend/.env.production`
   ```env
   NEXT_PUBLIC_API_URL=https://votre-api.com
   ```

### Configuration Centralisée

Le fichier `frontend/src/lib/config.ts` centralise toute la configuration API :

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    AUTH: { LOGIN: '/auth/login', REGISTER: '/auth/register' },
    MODULES: '/modules',
    COURSES: '/courses',
    QUIZ: '/quiz',
    USERS: '/users',
    QUESTIONS: '/questions',
    OPTIONS: '/options',
  }
};

export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
```

## Étapes de Déploiement

### 1. Configuration Backend

Assurez-vous que votre backend NestJS est déployé et accessible via HTTPS.

### 2. Configuration Frontend

1. **Modifier `.env.production`** :
   ```env
   NEXT_PUBLIC_API_URL=https://votre-domaine-backend.com
   ```

2. **Build de production** :
   ```bash
   cd frontend
   npm run build
   ```

3. **Test local du build** :
   ```bash
   npm start
   ```

### 3. Déploiement

#### Option A: Vercel (Recommandé pour Next.js)
1. Connectez votre repository GitHub à Vercel
2. Configurez la variable d'environnement `NEXT_PUBLIC_API_URL`
3. Déployez automatiquement

#### Option B: Serveur traditionnel
1. Uploadez le dossier `frontend/.next` et `frontend/public`
2. Configurez votre serveur web (Nginx/Apache)
3. Assurez-vous que les variables d'environnement sont correctes

## Configuration CORS Backend

Assurez-vous que votre backend autorise les requêtes depuis votre domaine de production :

```typescript
// src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://votre-domaine-frontend.com'
  ],
  credentials: true,
});
```

## Vérification du Déploiement

1. **Test des endpoints API** :
   - GET /modules
   - POST /auth/login
   - GET /courses

2. **Test de l'authentification** :
   - Connexion utilisateur
   - Accès aux pages protégées
   - Déconnexion

3. **Test des fonctionnalités** :
   - Navigation entre les pages
   - Soumission de quiz
   - Interface admin

## Dépannage

### Erreurs CORS
- Vérifiez la configuration CORS du backend
- Assurez-vous que l'URL frontend est autorisée

### Erreurs 404 API
- Vérifiez que `NEXT_PUBLIC_API_URL` pointe vers le bon domaine
- Testez les endpoints directement avec curl/Postman

### Erreurs de Build
- Supprimez le dossier `.next` et rebuilder
- Vérifiez que toutes les dépendances sont installées

## Scripts Utiles

- `BUILD_PRODUCTION.bat` : Build automatique pour production
- `npm run build` : Build Next.js
- `npm start` : Serveur de production
- `npm run dev` : Serveur de développement

## Sécurité

1. **Variables d'environnement** : Ne jamais commiter les vraies URLs de production
2. **HTTPS** : Toujours utiliser HTTPS en production
3. **Authentification** : Les tokens JWT sont stockés en localStorage
4. **CORS** : Configurez strictement les domaines autorisés

## Monitoring

Surveillez les logs pour :
- Erreurs de connexion API
- Échecs d'authentification
- Erreurs de navigation
- Performance des requêtes