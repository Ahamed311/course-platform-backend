# 🚀 DÉMARRAGE RAPIDE - PLATEFORME ÉDUCATIVE

## ⚡ Démarrage en 1 clic

```bash
# Exécutez simplement ce fichier :
restart-services.bat
```

**C'est tout !** La plateforme sera automatiquement démarrée.

## 📍 Accès à la Plateforme

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3001

## 👤 Comptes de Test

- **Étudiant** : `etudiant@eduplatform.com` / `password123`
- **Admin** : `admin@eduplatform.com` / `admin123`

## ✅ Vérifications Automatiques

Le script vérifie automatiquement :
- ✅ PostgreSQL est démarré
- ✅ Base de données initialisée
- ✅ Données de test créées
- ✅ Backend démarré
- ✅ Frontend démarré

## 🔧 Si Problème

1. **Vérifiez PostgreSQL** :
   - Service `postgresql-x64-17` doit être démarré
   
2. **Redémarrez tout** :
   ```bash
   restart-services.bat
   ```

3. **Vérifiez les ports** :
   - Port 3000 : Frontend
   - Port 3001 : Backend
   - Port 5432 : PostgreSQL

## 📚 Fonctionnalités Disponibles

### Pour les Étudiants
- ✅ Inscription/Connexion
- ✅ Navigation dans les modules
- ✅ Lecture des cours
- ✅ Passage des quiz
- ✅ Consultation des résultats
- ✅ Profil utilisateur

### Pour les Administrateurs
- ✅ Panel d'administration
- ✅ Gestion des utilisateurs
- ✅ Statistiques globales
- ✅ Contrôle des accès

## 🎯 Contenu Éducatif

### Modules Disponibles
1. **JavaScript Fondamentaux** (3 cours, 3 quiz)
2. **React Fondamentaux** (3 cours, 2 quiz)

### Quiz Interactifs
- **26+ questions** au total
- **Correction automatique**
- **Calcul des scores**
- **Historique des résultats**

## ⚠️ Important

- **Ne fermez pas** les fenêtres Backend et Frontend
- **Utilisez Ctrl+C** pour arrêter les services
- **Redémarrez** avec `restart-services.bat` si nécessaire

**La plateforme est maintenant 100% fonctionnelle !** 🎉