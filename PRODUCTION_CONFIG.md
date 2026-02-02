# Configuration Production - Backend NestJS

## Variables d'Environnement

### Fichier `.env.production`

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/eduplatform_prod"

# JWT Configuration
JWT_SECRET="your-super-secure-jwt-secret-for-production-change-this"
JWT_EXPIRES_IN="7d"

# Application
NODE_ENV="production"
PORT=3001

# CORS Origins (remplacez par vos vrais domaines)
CORS_ORIGINS="http://localhost:3000,https://your-frontend-domain.com"

# Logging
LOG_LEVEL="error"

# Security
BCRYPT_ROUNDS=12
```

## Configuration Base de Données

### PostgreSQL Production

1. **Créer la base de données** :
   ```sql
   CREATE DATABASE eduplatform_prod;
   CREATE USER eduplatform_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE eduplatform_prod TO eduplatform_user;
   ```

2. **Mettre à jour DATABASE_URL** :
   ```env
   DATABASE_URL="postgresql://eduplatform_user:secure_password@localhost:5432/eduplatform_prod"
   ```

### Migrations

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Seed optionnel
npx prisma db seed
```

## Sécurité

### JWT Secret

⚠️ **IMPORTANT** : Changez le JWT_SECRET en production !

```bash
# Générer un secret sécurisé
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### CORS

Configurez les domaines autorisés dans `CORS_ORIGINS` :

```env
# Développement
CORS_ORIGINS="http://localhost:3000"

# Production
CORS_ORIGINS="https://your-app.com,https://www.your-app.com"
```

## Déploiement

### Scripts Disponibles

- `START_PRODUCTION.bat` - Démarrage complet en production
- `SETUP_PRODUCTION_DB.bat` - Configuration de la base de données
- `npm run build` - Build de production
- `npm run start:prod` - Démarrage serveur de production

### Étapes de Déploiement

1. **Configuration** :
   ```bash
   # Copier et modifier le fichier d'environnement
   cp .env.production.example .env.production
   # Éditer .env.production avec vos vraies valeurs
   ```

2. **Base de données** :
   ```bash
   # Exécuter le script de configuration
   SETUP_PRODUCTION_DB.bat
   ```

3. **Build et démarrage** :
   ```bash
   # Démarrage complet
   START_PRODUCTION.bat
   ```

## Monitoring

### Logs

En production, seuls les logs d'erreur et d'avertissement sont affichés.

### Health Check

Endpoint disponible : `GET /health`

```bash
curl http://localhost:3001/health
```

### Processus

Vérifier que le serveur fonctionne :

```bash
netstat -ano | findstr :3001
```

## Optimisations Production

### Performance

- Logs réduits (error, warn uniquement)
- Validation stricte des données
- CORS configuré précisément
- Variables d'environnement sécurisées

### Sécurité

- JWT secret fort
- BCRYPT rounds élevés (12)
- CORS restrictif
- Validation des entrées

## Dépannage

### Port déjà utilisé

```bash
# Trouver le processus
netstat -ano | findstr :3001

# Arrêter le processus
taskkill /PID <PID> /F
```

### Erreurs de base de données

1. Vérifier la connexion PostgreSQL
2. Vérifier les permissions utilisateur
3. Relancer les migrations

### Erreurs CORS

1. Vérifier CORS_ORIGINS dans .env.production
2. Redémarrer le serveur après modification
3. Tester avec curl ou Postman