import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addAdvancedContent() {
  console.log('🚀 Ajout de contenu avancé...');

  // Module 6: TypeScript
  const tsModule = await prisma.module.create({
    data: {
      title: 'TypeScript Avancé',
      description: 'Maîtrisez TypeScript pour des applications robustes',
    },
  });

  const tsCourse1 = await prisma.course.create({
    data: {
      title: 'Introduction à TypeScript',
      content: `# Introduction à TypeScript

TypeScript est un sur-ensemble de JavaScript qui ajoute un système de types statiques, développé par Microsoft.

## Qu'est-ce que TypeScript ?

TypeScript étend JavaScript en ajoutant des définitions de types. Il se compile en JavaScript pur et peut s'exécuter partout où JavaScript s'exécute.

## Avantages de TypeScript

### 1. Détection d'erreurs à la compilation
\`\`\`typescript
// JavaScript - erreur à l'exécution
function greet(name) {
  return "Hello " + name.toUpperCase();
}
greet(42); // Runtime error!

// TypeScript - erreur à la compilation
function greet(name: string): string {
  return "Hello " + name.toUpperCase();
}
greet(42); // Compile error!
\`\`\`

### 2. IntelliSense et autocomplétion
TypeScript fournit une meilleure expérience de développement avec l'autocomplétion et la documentation intégrée.

### 3. Refactoring sûr
Les outils peuvent refactoriser le code en toute sécurité grâce aux informations de type.

## Types de Base

### Types Primitifs
\`\`\`typescript
let nom: string = "Alice";
let age: number = 25;
let estActif: boolean = true;
let valeur: null = null;
let indefini: undefined = undefined;
\`\`\`

### Arrays et Tuples
\`\`\`typescript
// Array
let nombres: number[] = [1, 2, 3];
let fruits: Array<string> = ["pomme", "banane"];

// Tuple
let personne: [string, number] = ["Alice", 25];
\`\`\`

### Objects et Interfaces
\`\`\`typescript
interface Utilisateur {
  nom: string;
  age: number;
  email?: string; // Optionnel
}

let user: Utilisateur = {
  nom: "Bob",
  age: 30
};
\`\`\`

### Union Types
\`\`\`typescript
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";

function processId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}
\`\`\`

## Fonctions Typées

### Signatures de fonction
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

// Fonction fléchée
const multiply = (a: number, b: number): number => a * b;

// Paramètres optionnels
function greet(name: string, title?: string): string {
  return title ? \`Hello \${title} \${name}\` : \`Hello \${name}\`;
}

// Paramètres par défaut
function createUser(name: string, age: number = 18): Utilisateur {
  return { nom: name, age };
}
\`\`\`

### Overloads
\`\`\`typescript
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return value.toString();
}
\`\`\`

## Classes TypeScript

\`\`\`typescript
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  public speak(): void {
    console.log(\`\${this.name} makes a sound\`);
  }
}

class Dog extends Animal {
  private breed: string;
  
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  
  public speak(): void {
    console.log(\`\${this.name} barks\`);
  }
  
  public getBreed(): string {
    return this.breed;
  }
}
\`\`\`

## Generics

\`\`\`typescript
// Fonction générique
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let numberOutput = identity(42); // Type inféré

// Interface générique
interface Repository<T> {
  save(item: T): void;
  findById(id: number): T | null;
  findAll(): T[];
}

class UserRepository implements Repository<Utilisateur> {
  private users: Utilisateur[] = [];
  
  save(user: Utilisateur): void {
    this.users.push(user);
  }
  
  findById(id: number): Utilisateur | null {
    return this.users[id] || null;
  }
  
  findAll(): Utilisateur[] {
    return this.users;
  }
}
\`\`\`

## Configuration TypeScript

### tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

## Compilation et Exécution

\`\`\`bash
# Installation globale
npm install -g typescript

# Compilation
tsc app.ts

# Mode watch
tsc --watch

# Avec ts-node (développement)
npm install -g ts-node
ts-node app.ts
\`\`\`

TypeScript améliore significativement la qualité et la maintenabilité du code JavaScript !`,
      moduleId: tsModule.id,
    },
  });

  // Quiz TypeScript
  const tsQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : TypeScript Fondamentaux',
      courseId: tsCourse1.id,
    },
  });

  const tsQuestion1 = await prisma.question.create({
    data: {
      text: 'Quel est le principal avantage de TypeScript par rapport à JavaScript ?',
      quizId: tsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Il est plus rapide à l\'exécution', questionId: tsQuestion1.id, isCorrect: false },
      { text: 'Il ajoute un système de types statiques', questionId: tsQuestion1.id, isCorrect: true },
      { text: 'Il utilise moins de mémoire', questionId: tsQuestion1.id, isCorrect: false },
      { text: 'Il est plus facile à apprendre', questionId: tsQuestion1.id, isCorrect: false },
    ],
  });

  console.log('📚 Module TypeScript créé');
  // Module 7: Next.js
  const nextModule = await prisma.module.create({
    data: {
      title: 'Next.js Framework',
      description: 'Développez des applications React full-stack avec Next.js',
    },
  });

  const nextCourse1 = await prisma.course.create({
    data: {
      title: 'Next.js : Le Framework React',
      content: `# Next.js : Le Framework React

Next.js est un framework React de production qui offre le rendu hybride statique et serveur, le support TypeScript, le bundling intelligent, le préfetching de routes et plus encore.

## Qu'est-ce que Next.js ?

Next.js est un framework React open-source créé par Vercel qui permet de créer des applications web rapides et optimisées pour la production.

## Fonctionnalités Principales

### 1. Rendu Hybride
- **SSG (Static Site Generation)** : Pages pré-générées au build
- **SSR (Server-Side Rendering)** : Pages générées à la demande
- **ISR (Incremental Static Regeneration)** : Mise à jour statique incrémentale

### 2. Routing Basé sur les Fichiers
\`\`\`
pages/
├── index.js          → /
├── about.js          → /about
├── blog/
│   ├── index.js      → /blog
│   └── [slug].js     → /blog/:slug
└── api/
    └── users.js      → /api/users
\`\`\`

### 3. API Routes
\`\`\`javascript
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    // Créer un utilisateur
    res.status(201).json({ message: 'User created' });
  }
}
\`\`\`

## Pages et Routing

### Pages Statiques
\`\`\`jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>À Propos</h1>
      <p>Bienvenue sur notre site !</p>
    </div>
  );
}
\`\`\`

### Pages Dynamiques
\`\`\`jsx
// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Article : {slug}</h1>
    </div>
  );
}
\`\`\`

### Navigation
\`\`\`jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === '/' ? 'active' : ''}>
          Accueil
        </a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === '/about' ? 'active' : ''}>
          À Propos
        </a>
      </Link>
    </nav>
  );
}
\`\`\`

## Data Fetching

### getStaticProps (SSG)
\`\`\`jsx
// pages/blog.js
export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 60, // ISR - revalide toutes les 60 secondes
  };
}
\`\`\`

### getServerSideProps (SSR)
\`\`\`jsx
// pages/profile.js
export default function Profile({ user }) {
  return (
    <div>
      <h1>Profil de {user.name}</h1>
      <p>Email : {user.email}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await fetchUser(token);

  return {
    props: {
      user,
    },
  };
}
\`\`\`

### getStaticPaths (Pages Dynamiques)
\`\`\`jsx
// pages/blog/[slug].js
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking', // ou false, true
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);

  return {
    props: {
      post,
    },
  };
}
\`\`\`

## Optimisations

### Image Optimization
\`\`\`jsx
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      <Image
        src="/photo.jpg"
        alt="Description"
        width={500}
        height={300}
        priority // Pour les images above-the-fold
      />
    </div>
  );
}
\`\`\`

### Head et SEO
\`\`\`jsx
import Head from 'next/head';

export default function Article({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | Mon Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Head>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </>
  );
}
\`\`\`

## Configuration

### next.config.js
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
\`\`\`

## Déploiement

### Vercel (Recommandé)
\`\`\`bash
# Installation
npm i -g vercel

# Déploiement
vercel

# Production
vercel --prod
\`\`\`

### Build Statique
\`\`\`bash
# Build
npm run build

# Export statique
npm run export

# Servir localement
npm start
\`\`\`

## Avantages de Next.js

1. **Performance** : Optimisations automatiques
2. **SEO** : Rendu côté serveur
3. **DX** : Excellente expérience développeur
4. **Flexibilité** : Hybride statique/dynamique
5. **Écosystème** : Intégration React native

Next.js est le framework de choix pour les applications React modernes !`,
      moduleId: nextModule.id,
    },
  });

  // Quiz Next.js
  const nextQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Next.js Fondamentaux',
      courseId: nextCourse1.id,
    },
  });

  const nextQuestion1 = await prisma.question.create({
    data: {
      text: 'Que signifie SSG dans Next.js ?',
      quizId: nextQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Server-Side Generation', questionId: nextQuestion1.id, isCorrect: false },
      { text: 'Static Site Generation', questionId: nextQuestion1.id, isCorrect: true },
      { text: 'Secure Socket Gateway', questionId: nextQuestion1.id, isCorrect: false },
      { text: 'Simple State Generator', questionId: nextQuestion1.id, isCorrect: false },
    ],
  });

  console.log('📚 Module Next.js créé');

  console.log('✅ Contenu avancé ajouté avec succès !');
}

addAdvancedContent()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });