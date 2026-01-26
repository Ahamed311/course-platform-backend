# 🔧 Guide de Résolution des Problèmes

## ❌ Erreur : "Erreur de connexion au serveur"

### 🔍 Diagnostic Rapide

1. **Vérifiez les services** :
   ```bash
   # Vérifier si le backend fonctionne
   netstat -an | findstr :3001
   
   # Vérifier si le frontend fonctionne  
   netstat -an | findstr :3000
   ```

2. **Testez la connectivité** :
   - Accédez à : http://localhost:3000/diagnostic
   - Cette page teste automatiquement la connexion

### 🚀 Solutions Rapides

#### Solution 1 : Redémarrage Automatique
```bash
# Exécutez le script de redémarrage
restart-services.bat
```

#### Solution 2 : Redémarrage Manuel

**Backend :**
```bash
# Arrêter le processus existant (Ctrl+C)
# Puis redémarrer
npm run start:dev
```

**Frontend :**
```bash
# Arrêter le processus existant (Ctrl+C)
# Puis redémarrer
cd frontend
npm run dev
```

#### Solution 3 : Vider le Cache
- **Chrome/Edge** : Ctrl+Shift+R
- **Firefox** : Ctrl+F5
- Ou ouvrir en navigation privée

#### Solution 4 : Vérifier PostgreSQL
```bash
# Vérifier si PostgreSQL fonctionne
pg_isready -h localhost -p 5432
```

### 🔧 Diagnostic Avancé

#### Vérifier les Variables d'Environnement
```bash
# Vérifier le fichier .env
cat .env

# Variables requises :
# DATABASE_URL="postgresql://..."
# JWT_SECRET="..."
```

#### Vérifier les Ports
```bash
# Ports utilisés par la plateforme
netstat -an | findstr ":3000 :3001 :5432"
```

#### Logs de Debug
```bash
# Backend - vérifier les logs dans la console
npm run start:dev

# Frontend - vérifier les logs dans la console
cd frontend && npm run dev
```

### 📱 URLs de Test

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001
- **Modules API** : http://localhost:3001/modules
- **Diagnostic** : http://localhost:3000/diagnostic

### 👤 Comptes de Test

- **Étudiant** : `etudiant@eduplatform.com` / `password123`
- **Admin** : `admin@eduplatform.com` / `admin123`

## 🆘 Autres Problèmes Courants

### Problème : "Module not found"
```bash
# Réinstaller les dépendances
npm install
cd frontend && npm install
```

### Problème : "Database connection failed"
```bash
# Redémarrer PostgreSQL
# Vérifier DATABASE_URL dans .env
# Exécuter les migrations
npx prisma migrate dev
```

### Problème : "Port already in use"
```bash
# Trouver et arrêter le processus
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Problème : "JWT token invalid"
```bash
# Vider le localStorage du navigateur
# Ou se déconnecter/reconnecter
```

## 🔄 Réinitialisation Complète

Si rien ne fonctionne, réinitialisation complète :

```bash
# 1. Arrêter tous les processus
taskkill /f /im node.exe

# 2. Nettoyer les caches
npm cache clean --force
cd frontend && npm cache clean --force

# 3. Réinstaller les dépendances
npm install
cd frontend && npm install

# 4. Réinitialiser la base de données
npx prisma migrate reset
npx tsx prisma/seed-ultimate.ts

# 5. Redémarrer les services
npm run start:dev
# Dans un autre terminal :
cd frontend && npm run dev
```

## 📞 Support

Si le problème persiste :
1. Vérifiez les logs dans la console
2. Utilisez la page de diagnostic : http://localhost:3000/diagnostic
3. Vérifiez que tous les services sont démarrés
4. Redémarrez votre ordinateur en dernier recours

**La plateforme est stable et testée - la plupart des problèmes se résolvent avec un simple redémarrage !** ✨