# 🔐 Système de Rôles et Permissions

## 👥 Rôles Disponibles

### 🎓 STUDENT (Étudiant)
**Rôle par défaut** - Utilisateur standard de la plateforme d'apprentissage

### 👨‍💼 ADMIN (Administrateur)
**Rôle privilégié** - Gestion complète de la plateforme

---

## 📋 Permissions par Rôle

### 🎓 ÉTUDIANT - Permissions
| Fonctionnalité | Accès | Description |
|---|---|---|
| **Inscription/Connexion** | ✅ Autorisé | Créer un compte et se connecter |
| **Consulter les modules** | ✅ Autorisé | Voir la liste des modules disponibles |
| **Consulter les cours** | ✅ Autorisé | Lire le contenu des cours |
| **Passer les quiz** | ✅ Autorisé | Répondre aux questions et soumettre |
| **Voir ses résultats** | ✅ Autorisé | Consulter ses propres scores |
| **Modifier son profil** | ✅ Autorisé | Changer nom, email, mot de passe |
| **Panel d'administration** | ❌ Interdit | Pas d'accès aux fonctions admin |
| **Gérer les utilisateurs** | ❌ Interdit | Ne peut pas voir/modifier d'autres comptes |
| **Créer du contenu** | ❌ Interdit | Ne peut pas ajouter modules/cours/quiz |

### 👨‍💼 ADMINISTRATEUR - Permissions
| Fonctionnalité | Accès | Description |
|---|---|---|
| **Toutes permissions étudiant** | ✅ Autorisé | Hérite de tous les droits étudiant |
| **Panel d'administration** | ✅ Autorisé | Accès complet au dashboard admin |
| **Gérer les utilisateurs** | ✅ Autorisé | Voir, activer, désactiver les comptes |
| **Voir tous les résultats** | ✅ Autorisé | Consulter les performances de tous |
| **Créer des modules** | ✅ Autorisé | Ajouter de nouveaux modules |
| **Créer des cours** | ✅ Autorisé | Ajouter du contenu pédagogique |
| **Créer des quiz** | ✅ Autorisé | Concevoir des évaluations |
| **Modifier le contenu** | ✅ Autorisé | Éditer modules/cours/quiz existants |
| **Supprimer du contenu** | ✅ Autorisé | Retirer des éléments de la plateforme |
| **Statistiques globales** | ✅ Autorisé | Voir les métriques de la plateforme |

---

## 🛡️ Protection des Routes

### Frontend (Pages protégées)
```
/login          → Public (redirige si connecté)
/register       → Public (redirige si connecté)
/               → Public (mais contenu adapté selon rôle)
/modules        → Public (mais quiz nécessitent connexion)
/courses/[id]   → Public (mais quiz nécessitent connexion)
/quiz/[id]      → 🔒 STUDENT + ADMIN (connexion requise)
/admin          → 🔒 ADMIN uniquement
/profile        → 🔒 STUDENT + ADMIN (connexion requise)
```

### Backend (API protégée)
```
POST /auth/register     → Public
POST /auth/login        → Public
GET  /auth/profile      → 🔒 STUDENT + ADMIN

GET  /modules           → Public
GET  /courses           → Public
GET  /quiz              → Public (métadonnées)
POST /quiz/:id/submit   → 🔒 STUDENT + ADMIN

GET  /users             → 🔒 ADMIN uniquement
PUT  /users/:id/status  → 🔒 ADMIN uniquement
POST /modules           → 🔒 ADMIN uniquement
POST /courses           → 🔒 ADMIN uniquement
POST /quiz              → 🔒 ADMIN uniquement
```

---

## 🎯 Cas d'Usage par Rôle

### 📚 Parcours Étudiant
1. **S'inscrire** sur la plateforme
2. **Explorer les modules** disponibles
3. **Lire les cours** de son choix
4. **Passer les quiz** pour tester ses connaissances
5. **Consulter ses résultats** et progresser
6. **Gérer son profil** personnel

### 🎛️ Parcours Administrateur
1. **Toutes les actions étudiant** +
2. **Accéder au panel admin** via le header
3. **Gérer les utilisateurs** (activer/désactiver)
4. **Créer du nouveau contenu** (modules, cours, quiz)
5. **Modifier le contenu existant**
6. **Analyser les statistiques** de la plateforme
7. **Modérer les résultats** si nécessaire

---

## 🔒 Sécurité Implémentée

### Authentification
- **JWT Tokens** avec expiration 24h
- **Mots de passe hachés** avec bcrypt
- **Validation des données** côté client et serveur

### Autorisation
- **Guards NestJS** pour protéger les routes API
- **Middleware React** pour protéger les pages
- **Vérification des rôles** à chaque requête sensible

### Protection Frontend
```typescript
// Exemple de protection de page
if (!user) {
  return <LoginRequired />;
}

if (user.role !== 'ADMIN') {
  return <AccessDenied />;
}
```

### Protection Backend
```typescript
// Exemple de protection d'endpoint
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('users')
findAllUsers() { ... }
```

---

## 📊 Interface Utilisateur Adaptée

### Header Dynamique
- **Non connecté** : Boutons "Connexion" et "Inscription"
- **Étudiant connecté** : Nom + "Déconnexion"
- **Admin connecté** : Nom + "Administration" + "Déconnexion"

### Contenu Conditionnel
- **Quiz** : Bouton "Commencer" seulement si connecté
- **Résultats** : Visibles seulement pour l'utilisateur concerné
- **Panel Admin** : Lien visible seulement pour les admins

---

## 🚀 Évolutions Futures Possibles

### Nouveaux Rôles
- **TEACHER** : Créer du contenu mais pas gérer les utilisateurs
- **MODERATOR** : Modérer les résultats mais pas créer de contenu

### Permissions Granulaires
- **Permissions par module** : Accès restreint à certains cours
- **Permissions temporaires** : Accès limité dans le temps
- **Groupes d'utilisateurs** : Classes, promotions, etc.

### Fonctionnalités Avancées
- **Audit logs** : Traçabilité des actions admin
- **Délégation de droits** : Admin peut donner des permissions temporaires
- **Approbation de contenu** : Workflow de validation

---

## ✅ État Actuel

Le système de rôles est **entièrement fonctionnel** avec :
- ✅ 2 rôles définis (STUDENT, ADMIN)
- ✅ Protection complète des routes
- ✅ Interface adaptée selon le rôle
- ✅ Sécurité robuste
- ✅ Comptes de test disponibles

**Comptes de test :**
- Admin : `admin@eduplatform.com` / `admin123`
- Étudiant : `student@eduplatform.com` / `student123`