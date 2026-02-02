# Déploiement sur Render - EduPlatform Backend

## 🚀 Guide de Déploiement

### Prérequis
- Compte Render.com
- Repository GitHub avec le code
- Frontend déjà déployé sur Vercel

### Étapes de Déploiement

#### 1. Créer la Base de Données PostgreSQL

1. Aller sur [Render Dashboard](https://dashboard.render.com)
2. Cliquer sur "New +" → "PostgreSQL"
3. Configurer :
   - **Name** : `eduplatform-db`
   - **Database** : `eduplatform`
   - **User** : `eduplatform_user`
   - **Region** : Choisir la plus proche
   - **Plan** : Free (pour les tests)
4. Cliquer "Create Database"
5. **Noter l'URL de connexion** (Internal Database URL)

#### 2. Créer le Service Web

1. Cliquer sur "New +" → "Web Service"
2. Connecter votre repository GitHub
3. Configurer :
   - **Name** : `eduplatform-backend`
   - **Environment** : `Node`
   - **Region** : Même que la base de données
   - **Branch** : `main` ou `master`
   - **Build Command** : `npm install && npx prisma generate && npm run build`
   - **Start Command** : `npm run start:prod`

#### 3. Variables d'Environnement

Ajouter ces variables dans l'onglet "Environment" :

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=[URL de votre base PostgreSQL]
JWT_SECRET=[Générer une clé secrète forte]
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
LOG_LEVEL=error
CORS_ORIGINS=https://course-platform-frontend.vercel.app,http://localhost:3000
```

**Important** : Remplacer `DATABASE_URL` par l'URL fournie par Render PostgreSQL.

#### 4. Déploiement

1. Cliquer "Create Web Service"
2. Render va automatiquement :
   - Cloner le repository
   - Installer les dépendances
   - Générer le client Prisma
   - Builder l'application
   - Démarrer le serveur

#### 5. Migrations et Seed

Une fois déployé, exécuter dans la console Render :

```bash
# Appliquer les migrations
npx prisma migrate deploy

# Seed de la base de données
npm run db:seed-render
```

### 🔧 Configuration Frontend

Mettre à jour l'URL du backend dans Vercel :

1. Aller dans les settings de votre app Vercel
2. Ajouter/modifier la variable d'environnement :
   ```
   NEXT_PUBLIC_API_URL=https://eduplatform-backend.onrender.com
   ```
3. Redéployer le frontend

### 📊 URLs Finales

- **Backend** : `https://eduplatform-backend.onrender.com`
- **Frontend** : `https://course-platform-frontend.vercel.app`
- **Health Check** : `https://eduplatform-backend.onrender.com/health`

### 🔍 Vérification

1. **Health Check** :
   ```bash
   curl https://eduplatform-backend.onrender.com/health
   ```

2. **API Modules** :
   ```bash
   curl https://eduplatform-backend.onrender.com/modules
   ```

3. **Test de connexion** depuis le frontend

### 🐛 Dépannage

#### Erreur de Build
- Vérifier que `prisma/schema.prisma` utilise PostgreSQL
- S'assurer que `DATABASE_URL` est correcte

#### Erreur de Connexion DB
- Vérifier l'URL de la base de données
- S'assurer que la DB et le service sont dans la même région

#### Erreur CORS
- Vérifier `CORS_ORIGINS` inclut l'URL Vercel
- Redémarrer le service après modification

### 📝 Comptes de Test

Après le seed :
- **Admin** : `admin@eduplatform.com` / `admin123`
- **Étudiant** : `etudiant@eduplatform.com` / `password123`

### 🔄 Mises à Jour

Pour déployer des modifications :
1. Push sur GitHub
2. Render redéploie automatiquement
3. Les migrations s'appliquent automatiquement

### 💡 Conseils

- **Logs** : Utiliser la console Render pour voir les logs
- **Performance** : Le plan gratuit peut être lent au démarrage
- **Monitoring** : Configurer des alertes pour la production
- **Backup** : Render sauvegarde automatiquement la DB gratuite