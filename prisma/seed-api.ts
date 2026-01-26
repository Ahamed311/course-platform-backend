import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addApiModule() {
  console.log('🌐 Ajout du module API REST...');

  // Module API REST
  const apiModule = await prisma.module.create({
    data: {
      title: 'API REST et Architecture',
      description: 'Concevez et développez des APIs REST professionnelles',
    },
  });

  // Cours 1: Principes REST
  const apiCourse1 = await prisma.course.create({
    data: {
      title: 'Principes des API REST',
      content: `# Principes des API REST

REST (Representational State Transfer) est un style architectural pour concevoir des services web scalables et maintenables.

## Qu'est-ce que REST ?

REST est un ensemble de contraintes architecturales, pas un protocole ou un standard. Une API qui respecte ces contraintes est dite "RESTful".

## Les 6 Contraintes REST

### 1. Architecture Client-Serveur
Séparation claire entre le client et le serveur, permettant leur évolution indépendante.

### 2. Sans État (Stateless)
Chaque requête du client vers le serveur doit contenir toutes les informations nécessaires pour comprendre la requête.

### 3. Cacheable
Les réponses doivent être explicitement marquées comme cacheable ou non-cacheable.

### 4. Interface Uniforme
L'interface entre le client et le serveur doit être uniforme, simplifiée et découplée.

### 5. Système en Couches
L'architecture peut être composée de couches hiérarchiques.

### 6. Code à la Demande (Optionnel)
Le serveur peut étendre les fonctionnalités du client en transmettant du code exécutable.

## Méthodes HTTP

### GET - Récupérer des données
\`\`\`http
GET /api/users
GET /api/users/123
GET /api/users?page=1&limit=10
\`\`\`

### POST - Créer une ressource
\`\`\`http
POST /api/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
\`\`\`

### PUT - Remplacer une ressource
\`\`\`http
PUT /api/users/123
Content-Type: application/json

{
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}
\`\`\`

### PATCH - Modifier partiellement
\`\`\`http
PATCH /api/users/123
Content-Type: application/json

{
  "email": "alice.new@example.com"
}
\`\`\`

### DELETE - Supprimer une ressource
\`\`\`http
DELETE /api/users/123
\`\`\`

## Codes de Statut HTTP

### 2xx - Succès
- **200 OK** : Requête réussie
- **201 Created** : Ressource créée
- **204 No Content** : Succès sans contenu

### 3xx - Redirection
- **301 Moved Permanently** : Ressource déplacée
- **304 Not Modified** : Ressource non modifiée

### 4xx - Erreur Client
- **400 Bad Request** : Requête malformée
- **401 Unauthorized** : Authentification requise
- **403 Forbidden** : Accès interdit
- **404 Not Found** : Ressource non trouvée
- **422 Unprocessable Entity** : Erreur de validation

### 5xx - Erreur Serveur
- **500 Internal Server Error** : Erreur serveur
- **502 Bad Gateway** : Passerelle défaillante
- **503 Service Unavailable** : Service indisponible

## Structure des URLs

### Bonnes Pratiques
\`\`\`
✅ Bonnes URLs
/api/users                    # Collection
/api/users/123               # Ressource spécifique
/api/users/123/orders        # Sous-ressource
/api/orders?user_id=123      # Filtrage

❌ Mauvaises URLs
/api/getUsers                # Verbe dans l'URL
/api/user/123/delete         # Action dans l'URL
/api/users/123/orders/create # Verbe inutile
\`\`\`

### Nommage des Ressources
- Utilisez des **noms** (pas de verbes)
- Utilisez le **pluriel** pour les collections
- Utilisez des **tirets** pour séparer les mots
- Soyez **cohérent** dans toute l'API

## Format des Réponses

### Réponse Réussie
\`\`\`json
{
  "data": {
    "id": 123,
    "name": "Alice",
    "email": "alice@example.com",
    "created_at": "2026-01-25T10:00:00Z"
  }
}
\`\`\`

### Collection avec Pagination
\`\`\`json
{
  "data": [
    {
      "id": 123,
      "name": "Alice",
      "email": "alice@example.com"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 10,
    "total_pages": 15
  },
  "links": {
    "first": "/api/users?page=1",
    "last": "/api/users?page=15",
    "prev": null,
    "next": "/api/users?page=2"
  }
}
\`\`\`

### Réponse d'Erreur
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Les données fournies sont invalides",
    "details": [
      {
        "field": "email",
        "message": "L'email est requis"
      }
    ]
  }
}
\`\`\`

## Headers Importants

### Requête
\`\`\`http
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
User-Agent: MyApp/1.0
\`\`\`

### Réponse
\`\`\`http
Content-Type: application/json
Cache-Control: no-cache
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Location: /api/users/123
\`\`\`

## Versioning

### Dans l'URL
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

### Dans les Headers
\`\`\`http
Accept: application/vnd.api+json;version=1
API-Version: 1
\`\`\`

## Sécurité

### Authentification
- **JWT** : JSON Web Tokens
- **OAuth 2.0** : Standard d'autorisation
- **API Keys** : Clés d'API simples

### Bonnes Pratiques
- Toujours utiliser **HTTPS**
- Valider toutes les **entrées**
- Implémenter le **rate limiting**
- Logger les **accès** et **erreurs**
- Utiliser des **CORS** appropriés

## Documentation

### OpenAPI/Swagger
\`\`\`yaml
openapi: 3.0.0
info:
  title: Mon API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Liste des utilisateurs
      responses:
        '200':
          description: Succès
\`\`\`

Les API REST bien conçues sont la base des applications modernes !`,
      moduleId: apiModule.id,
    },
  });

  // Cours 2: Implémentation avec Express
  const apiCourse2 = await prisma.course.create({
    data: {
      title: 'Implémentation API avec Express.js',
      content: `# Implémentation API avec Express.js

Express.js est le framework Node.js le plus populaire pour créer des APIs REST rapides et robustes.

## Configuration de Base

### Installation
\`\`\`bash
npm init -y
npm install express cors helmet morgan dotenv
npm install -D nodemon @types/node
\`\`\`

### Serveur de Base
\`\`\`javascript
// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(helmet()); // Sécurité
app.use(cors()); // CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Structure de Projet

\`\`\`
src/
├── controllers/
│   ├── userController.js
│   └── productController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── users.js
│   └── products.js
├── utils/
│   └── database.js
└── app.js
\`\`\`

## Routage

### Routes de Base
\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
\`\`\`

### Intégration des Routes
\`\`\`javascript
// app.js
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
\`\`\`

## Middlewares

### Middleware d'Authentification
\`\`\`javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
\`\`\`

### Middleware de Validation
\`\`\`javascript
// middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

module.exports = { validateUser };
\`\`\`

## Contrôleurs

### Contrôleur Utilisateur
\`\`\`javascript
// controllers/userController.js
class UserController {
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const offset = (page - 1) * limit;

      let query = {};
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      const users = await User.find(query)
        .limit(limit * 1)
        .skip(offset)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(query);

      res.json({
        data: users,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ data: user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ error: 'User already exists' });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ data: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
\`\`\`

## Gestion d'Erreurs

### Middleware d'Erreur Global
\`\`\`javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    error: {
      message: error.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
\`\`\`

## Tests

### Tests d'Intégration
\`\`\`javascript
// tests/users.test.js
const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  test('GET /api/users should return users list', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/users should create a user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(userData.name);
  });
});
\`\`\`

## Déploiement

### Variables d'Environnement
\`\`\`bash
# .env
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Express.js offre tous les outils nécessaires pour créer des APIs REST professionnelles !`,
      moduleId: apiModule.id,
    },
  });

  // Quiz API REST
  const apiQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Principes REST',
      courseId: apiCourse1.id,
    },
  });

  const apiQuestion1 = await prisma.question.create({
    data: {
      text: 'Quelle méthode HTTP est utilisée pour créer une nouvelle ressource ?',
      quizId: apiQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'GET', questionId: apiQuestion1.id, isCorrect: false },
      { text: 'POST', questionId: apiQuestion1.id, isCorrect: true },
      { text: 'PUT', questionId: apiQuestion1.id, isCorrect: false },
      { text: 'DELETE', questionId: apiQuestion1.id, isCorrect: false },
    ],
  });

  const apiQuestion2 = await prisma.question.create({
    data: {
      text: 'Quel code de statut HTTP indique qu\'une ressource a été créée avec succès ?',
      quizId: apiQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: '200 OK', questionId: apiQuestion2.id, isCorrect: false },
      { text: '201 Created', questionId: apiQuestion2.id, isCorrect: true },
      { text: '204 No Content', questionId: apiQuestion2.id, isCorrect: false },
      { text: '400 Bad Request', questionId: apiQuestion2.id, isCorrect: false },
    ],
  });

  console.log('🌐 Module API REST créé avec succès !');
}

addApiModule()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });