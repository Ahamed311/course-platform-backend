'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ProtectedRoute from '@/components/ProtectedRoute';

interface CourseTemplate {
  title: string;
  content: string;
}

interface QuizTemplate {
  title: string;
  questions: {
    text: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

function CreateModuleContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    generateContent: false,
    coursesCount: 3,
    quizPerCourse: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Templates de contenu pour génération automatique
  const getContentTemplates = (moduleTitle: string): { courses: CourseTemplate[], quizzes: QuizTemplate[] } => {
    const baseTitle = moduleTitle.toLowerCase();
    
    if (baseTitle.includes('javascript') || baseTitle.includes('js')) {
      return {
        courses: [
          {
            title: "Introduction à JavaScript",
            content: `# Introduction à JavaScript

JavaScript est un langage de programmation dynamique et polyvalent, principalement utilisé pour le développement web.

## Qu'est-ce que JavaScript ?

JavaScript est un langage de programmation interprété qui permet d'ajouter de l'interactivité aux pages web. Il peut être exécuté côté client (navigateur) et côté serveur (Node.js).

## Caractéristiques principales

- **Langage interprété** : Pas besoin de compilation
- **Dynamique** : Types de variables déterminés à l'exécution
- **Orienté objet** : Support des objets et classes
- **Fonctionnel** : Support des fonctions de première classe

## Utilisations courantes

1. **Développement web frontend** : Manipulation du DOM, événements
2. **Développement web backend** : Node.js, Express
3. **Applications mobiles** : React Native, Ionic
4. **Applications desktop** : Electron

## Premier exemple

\`\`\`javascript
console.log("Bonjour le monde !");
\`\`\`

Ce cours vous donnera les bases solides pour commencer votre apprentissage de JavaScript.`
          },
          {
            title: "Variables et Types de Données",
            content: `# Variables et Types de Données en JavaScript

Les variables sont des conteneurs pour stocker des données. JavaScript propose plusieurs façons de déclarer des variables.

## Déclaration de variables

### var, let et const

\`\`\`javascript
var ancienneVariable = "Évitez var";
let variableModifiable = "Utilisez let";
const variableConstante = "Utilisez const";
\`\`\`

## Types de données primitifs

### 1. String (Chaîne de caractères)
\`\`\`javascript
let nom = "Alice";
let message = 'Bonjour';
let template = \`Salut \${nom}\`;
\`\`\`

### 2. Number (Nombre)
\`\`\`javascript
let age = 25;
let prix = 19.99;
let infini = Infinity;
\`\`\`

### 3. Boolean (Booléen)
\`\`\`javascript
let estVrai = true;
let estFaux = false;
\`\`\`

### 4. Undefined et Null
\`\`\`javascript
let nonDefini;
let vide = null;
\`\`\`

## Types de données complexes

### Array (Tableau)
\`\`\`javascript
let fruits = ["pomme", "banane", "orange"];
let nombres = [1, 2, 3, 4, 5];
\`\`\`

### Object (Objet)
\`\`\`javascript
let personne = {
  nom: "Alice",
  age: 30,
  ville: "Paris"
};
\`\`\`

## Vérification des types

\`\`\`javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
\`\`\`

Maîtriser les variables et types est essentiel pour programmer efficacement en JavaScript.`
          },
          {
            title: "Fonctions et Portée",
            content: `# Fonctions et Portée en JavaScript

Les fonctions sont des blocs de code réutilisables qui effectuent des tâches spécifiques.

## Déclaration de fonctions

### Fonction classique
\`\`\`javascript
function saluer(nom) {
  return "Bonjour " + nom;
}
\`\`\`

### Expression de fonction
\`\`\`javascript
const saluer = function(nom) {
  return "Bonjour " + nom;
};
\`\`\`

### Fonction fléchée (Arrow Function)
\`\`\`javascript
const saluer = (nom) => {
  return "Bonjour " + nom;
};

// Version courte
const saluer = nom => "Bonjour " + nom;
\`\`\`

## Paramètres et arguments

### Paramètres par défaut
\`\`\`javascript
function saluer(nom = "Anonyme") {
  return "Bonjour " + nom;
}
\`\`\`

### Paramètres rest
\`\`\`javascript
function somme(...nombres) {
  return nombres.reduce((total, num) => total + num, 0);
}
\`\`\`

## Portée (Scope)

### Portée globale
\`\`\`javascript
let variableGlobale = "Accessible partout";
\`\`\`

### Portée de fonction
\`\`\`javascript
function maFonction() {
  let variableLocale = "Accessible uniquement ici";
}
\`\`\`

### Portée de bloc
\`\`\`javascript
if (true) {
  let variableBloc = "Accessible dans ce bloc";
}
\`\`\`

## Closures

\`\`\`javascript
function compteur() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const monCompteur = compteur();
console.log(monCompteur()); // 1
console.log(monCompteur()); // 2
\`\`\`

Les fonctions sont au cœur de JavaScript et comprendre leur fonctionnement est crucial.`
          }
        ],
        quizzes: [
          {
            title: "Quiz - Introduction à JavaScript",
            questions: [
              {
                text: "Qu'est-ce que JavaScript ?",
                options: [
                  { text: "Un langage de programmation pour le web", isCorrect: true },
                  { text: "Un framework CSS", isCorrect: false },
                  { text: "Une base de données", isCorrect: false },
                  { text: "Un serveur web", isCorrect: false }
                ]
              },
              {
                text: "JavaScript peut-il être exécuté côté serveur ?",
                options: [
                  { text: "Oui, avec Node.js", isCorrect: true },
                  { text: "Non, uniquement côté client", isCorrect: false },
                  { text: "Seulement avec PHP", isCorrect: false },
                  { text: "Uniquement dans les navigateurs", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: "Quiz - Variables et Types",
            questions: [
              {
                text: "Quelle est la meilleure façon de déclarer une variable constante ?",
                options: [
                  { text: "const", isCorrect: true },
                  { text: "var", isCorrect: false },
                  { text: "let", isCorrect: false },
                  { text: "final", isCorrect: false }
                ]
              },
              {
                text: "Quel est le type de données de 'true' en JavaScript ?",
                options: [
                  { text: "boolean", isCorrect: true },
                  { text: "string", isCorrect: false },
                  { text: "number", isCorrect: false },
                  { text: "object", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: "Quiz - Fonctions",
            questions: [
              {
                text: "Comment déclare-t-on une fonction fléchée ?",
                options: [
                  { text: "const func = () => {}", isCorrect: true },
                  { text: "function func() {}", isCorrect: false },
                  { text: "func => {}", isCorrect: false },
                  { text: "arrow func() {}", isCorrect: false }
                ]
              },
              {
                text: "Qu'est-ce qu'une closure ?",
                options: [
                  { text: "Une fonction qui a accès aux variables de sa portée externe", isCorrect: true },
                  { text: "Une fonction sans paramètres", isCorrect: false },
                  { text: "Une fonction anonyme", isCorrect: false },
                  { text: "Une fonction récursive", isCorrect: false }
                ]
              }
            ]
          }
        ]
      };
    } else if (baseTitle.includes('react')) {
      return {
        courses: [
          {
            title: "Introduction à React",
            content: `# Introduction à React

React est une bibliothèque JavaScript pour créer des interfaces utilisateur interactives.

## Qu'est-ce que React ?

React est une bibliothèque JavaScript développée par Facebook pour construire des interfaces utilisateur, particulièrement pour les applications web.

## Concepts clés

- **Composants** : Blocs de construction réutilisables
- **JSX** : Syntaxe qui ressemble à HTML dans JavaScript
- **Virtual DOM** : Représentation virtuelle du DOM pour les performances
- **État (State)** : Données qui peuvent changer dans un composant

## Premier composant

\`\`\`jsx
function Bonjour() {
  return <h1>Bonjour le monde !</h1>;
}
\`\`\`

## Avantages de React

1. **Réutilisabilité** : Composants réutilisables
2. **Performance** : Virtual DOM optimisé
3. **Écosystème** : Large communauté et outils
4. **Flexibilité** : Peut être intégré progressivement

React révolutionne la façon de créer des interfaces utilisateur modernes.`
          },
          {
            title: "Composants et Props",
            content: `# Composants et Props en React

Les composants sont les blocs de construction de React, et les props permettent de leur passer des données.

## Types de composants

### Composant fonctionnel
\`\`\`jsx
function Salutation(props) {
  return <h1>Bonjour {props.nom} !</h1>;
}
\`\`\`

### Composant avec destructuring
\`\`\`jsx
function Salutation({ nom, age }) {
  return (
    <div>
      <h1>Bonjour {nom} !</h1>
      <p>Vous avez {age} ans</p>
    </div>
  );
}
\`\`\`

## Props (Propriétés)

Les props sont des données passées d'un composant parent à un composant enfant.

### Utilisation des props
\`\`\`jsx
function App() {
  return (
    <div>
      <Salutation nom="Alice" age={25} />
      <Salutation nom="Bob" age={30} />
    </div>
  );
}
\`\`\`

### Props par défaut
\`\`\`jsx
function Salutation({ nom = "Anonyme", age = 0 }) {
  return <h1>Bonjour {nom}, {age} ans !</h1>;
}
\`\`\`

## Composition de composants

\`\`\`jsx
function Carte({ titre, enfants }) {
  return (
    <div className="carte">
      <h2>{titre}</h2>
      <div>{enfants}</div>
    </div>
  );
}

function App() {
  return (
    <Carte titre="Ma Carte">
      <p>Contenu de la carte</p>
      <button>Action</button>
    </Carte>
  );
}
\`\`\`

## Bonnes pratiques

1. **Noms explicites** : Nommez vos composants clairement
2. **Props typées** : Utilisez PropTypes ou TypeScript
3. **Composants purs** : Évitez les effets de bord
4. **Réutilisabilité** : Créez des composants génériques

Les composants et props forment la base de toute application React.`
          },
          {
            title: "State et Hooks",
            content: `# State et Hooks en React

Le state permet aux composants de gérer leurs propres données, et les hooks offrent des fonctionnalités avancées.

## useState Hook

### État simple
\`\`\`jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

### État complexe
\`\`\`jsx
function Formulaire() {
  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    email: '',
    age: 0
  });

  const handleChange = (e) => {
    setUtilisateur({
      ...utilisateur,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form>
      <input 
        name="nom" 
        value={utilisateur.nom}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input 
        name="email" 
        value={utilisateur.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </form>
  );
}
\`\`\`

## useEffect Hook

### Effet simple
\`\`\`jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Temps écoulé: {seconds}s</div>;
}
\`\`\`

### Effet avec dépendances
\`\`\`jsx
function ProfilUtilisateur({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  if (!user) return <div>Chargement...</div>;

  return <div>Bonjour {user.name} !</div>;
}
\`\`\`

## Autres hooks utiles

### useContext
\`\`\`jsx
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Composant />
    </ThemeContext.Provider>
  );
}

function Composant() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Contenu</div>;
}
\`\`\`

## Règles des hooks

1. **Toujours au niveau supérieur** : Pas dans des boucles ou conditions
2. **Uniquement dans les composants React** : Ou dans des hooks personnalisés
3. **Ordre cohérent** : Même ordre à chaque rendu

Les hooks révolutionnent la gestion d'état et des effets en React.`
          }
        ],
        quizzes: [
          {
            title: "Quiz - Introduction à React",
            questions: [
              {
                text: "Qu'est-ce que React ?",
                options: [
                  { text: "Une bibliothèque JavaScript pour les interfaces utilisateur", isCorrect: true },
                  { text: "Un langage de programmation", isCorrect: false },
                  { text: "Une base de données", isCorrect: false },
                  { text: "Un serveur web", isCorrect: false }
                ]
              },
              {
                text: "Que signifie JSX ?",
                options: [
                  { text: "JavaScript XML", isCorrect: true },
                  { text: "Java Syntax Extension", isCorrect: false },
                  { text: "JSON XML", isCorrect: false },
                  { text: "JavaScript eXtended", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: "Quiz - Composants et Props",
            questions: [
              {
                text: "Comment passe-t-on des données à un composant enfant ?",
                options: [
                  { text: "Via les props", isCorrect: true },
                  { text: "Via les variables globales", isCorrect: false },
                  { text: "Via le localStorage", isCorrect: false },
                  { text: "Via les cookies", isCorrect: false }
                ]
              },
              {
                text: "Les props sont-elles modifiables dans le composant enfant ?",
                options: [
                  { text: "Non, elles sont en lecture seule", isCorrect: true },
                  { text: "Oui, on peut les modifier", isCorrect: false },
                  { text: "Seulement avec setState", isCorrect: false },
                  { text: "Seulement avec des hooks", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: "Quiz - State et Hooks",
            questions: [
              {
                text: "Quel hook utilise-t-on pour gérer l'état local ?",
                options: [
                  { text: "useState", isCorrect: true },
                  { text: "useEffect", isCorrect: false },
                  { text: "useContext", isCorrect: false },
                  { text: "useReducer", isCorrect: false }
                ]
              },
              {
                text: "Quand useEffect s'exécute-t-il sans tableau de dépendances ?",
                options: [
                  { text: "À chaque rendu", isCorrect: true },
                  { text: "Une seule fois", isCorrect: false },
                  { text: "Jamais", isCorrect: false },
                  { text: "Seulement au démontage", isCorrect: false }
                ]
              }
            ]
          }
        ]
      };
    } else {
      // Template générique
      return {
        courses: [
          {
            title: `Introduction à ${moduleTitle}`,
            content: `# Introduction à ${moduleTitle}

Ce module vous permettra d'apprendre les concepts fondamentaux de ${moduleTitle}.

## Objectifs d'apprentissage

À la fin de ce module, vous serez capable de :
- Comprendre les concepts de base
- Appliquer les bonnes pratiques
- Résoudre des problèmes courants

## Prérequis

- Connaissances de base en programmation
- Motivation pour apprendre

## Structure du cours

1. **Concepts fondamentaux**
2. **Exemples pratiques**
3. **Exercices d'application**

Commençons votre apprentissage de ${moduleTitle} !`
          },
          {
            title: `Concepts Avancés de ${moduleTitle}`,
            content: `# Concepts Avancés de ${moduleTitle}

Approfondissons vos connaissances avec des concepts plus avancés.

## Techniques avancées

Dans ce cours, nous explorerons :
- Les patterns avancés
- Les optimisations
- Les bonnes pratiques professionnelles

## Exemples concrets

Nous verrons des exemples réels d'utilisation de ${moduleTitle} dans des projets professionnels.

## Projet pratique

Vous réaliserez un projet complet pour mettre en pratique vos nouvelles compétences.

Prêt à passer au niveau supérieur ?`
          },
          {
            title: `Maîtrise de ${moduleTitle}`,
            content: `# Maîtrise de ${moduleTitle}

Ce cours final vous permettra de maîtriser complètement ${moduleTitle}.

## Expertise professionnelle

- Patterns experts
- Architectures complexes
- Performance et optimisation

## Cas d'usage avancés

Nous étudierons des cas d'usage complexes et leurs solutions.

## Certification

À la fin de ce cours, vous aurez toutes les compétences nécessaires pour être considéré comme expert en ${moduleTitle}.

Félicitations pour votre parcours d'apprentissage !`
          }
        ],
        quizzes: [
          {
            title: `Quiz - Introduction à ${moduleTitle}`,
            questions: [
              {
                text: `Quel est l'objectif principal de ${moduleTitle} ?`,
                options: [
                  { text: "Résoudre des problèmes spécifiques", isCorrect: true },
                  { text: "Compliquer les choses", isCorrect: false },
                  { text: "Remplacer tous les autres outils", isCorrect: false },
                  { text: "Être difficile à apprendre", isCorrect: false }
                ]
              },
              {
                text: `Quels sont les prérequis pour apprendre ${moduleTitle} ?`,
                options: [
                  { text: "Connaissances de base en programmation", isCorrect: true },
                  { text: "Aucun prérequis", isCorrect: false },
                  { text: "10 ans d'expérience", isCorrect: false },
                  { text: "Un diplôme en informatique", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: `Quiz - Concepts Avancés`,
            questions: [
              {
                text: `Que permet de faire ${moduleTitle} à un niveau avancé ?`,
                options: [
                  { text: "Créer des solutions complexes et optimisées", isCorrect: true },
                  { text: "Seulement des choses simples", isCorrect: false },
                  { text: "Rien de plus que le niveau débutant", isCorrect: false },
                  { text: "Compliquer inutilement le code", isCorrect: false }
                ]
              }
            ]
          },
          {
            title: `Quiz - Maîtrise`,
            questions: [
              {
                text: `Qu'est-ce qui caractérise un expert en ${moduleTitle} ?`,
                options: [
                  { text: "La capacité à résoudre des problèmes complexes efficacement", isCorrect: true },
                  { text: "Connaître toutes les fonctions par cœur", isCorrect: false },
                  { text: "Utiliser uniquement les fonctionnalités avancées", isCorrect: false },
                  { text: "Ne jamais faire d'erreurs", isCorrect: false }
                ]
              }
            ]
          }
        ]
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // 1. Créer le module
      const moduleResponse = await fetch('http://localhost:3001/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description
        }),
      });

      if (!moduleResponse.ok) {
        throw new Error('Erreur lors de la création du module');
      }

      const module = await moduleResponse.json();

      // 2. Si génération automatique activée
      if (formData.generateContent) {
        const templates = getContentTemplates(formData.title);
        
        // Créer les cours
        for (let i = 0; i < Math.min(formData.coursesCount, templates.courses.length); i++) {
          const course = templates.courses[i];
          const courseResponse = await fetch('http://localhost:3001/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: course.title,
              content: course.content,
              moduleId: module.id
            }),
          });

          if (courseResponse.ok && formData.quizPerCourse && templates.quizzes[i]) {
            const courseData = await courseResponse.json();
            const quiz = templates.quizzes[i];
            
            // Créer le quiz pour ce cours
            const quizResponse = await fetch('http://localhost:3001/quiz', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                title: quiz.title,
                courseId: courseData.id
              }),
            });

            if (quizResponse.ok) {
              const quizData = await quizResponse.json();
              
              // Créer les questions et options
              for (const question of quiz.questions) {
                const questionResponse = await fetch('http://localhost:3001/questions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    text: question.text,
                    quizId: quizData.id
                  }),
                });

                if (questionResponse.ok) {
                  const questionData = await questionResponse.json();
                  
                  // Créer les options
                  for (const option of question.options) {
                    await fetch('http://localhost:3001/options', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        text: option.text,
                        isCorrect: option.isCorrect,
                        questionId: questionData.id
                      }),
                    });
                  }
                }
              }
            }
          }
        }
      }

      router.push('/admin?tab=content');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Créer un Module"
        subtitle="Créez un module d'apprentissage avec contenu automatique"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Créer Module' }
        ]}
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 2 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-600">
              Étape {step} sur 2: {step === 1 ? 'Informations de base' : 'Options de génération'}
            </span>
          </div>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Informations du Module</h2>
                  <p className="text-gray-600">Définissez les caractéristiques de votre module</p>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Module *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: JavaScript Fondamentaux, React Avancé, Python pour Débutants..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    💡 Astuce: Incluez "JavaScript", "React", "Python" etc. pour une génération de contenu optimisée
                  </p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez le contenu et les objectifs de ce module d'apprentissage..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.title.trim()}
                  >
                    Suivant: Options de génération →
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Génération Automatique</h2>
                  <p className="text-gray-600">Configurez la création automatique de contenu</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="generateContent"
                      checked={formData.generateContent}
                      onChange={(e) => setFormData({ ...formData, generateContent: e.target.checked })}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <label htmlFor="generateContent" className="text-sm font-medium text-blue-900">
                        🚀 Générer automatiquement le contenu
                      </label>
                      <p className="text-sm text-blue-700 mt-1">
                        Créer automatiquement des cours et quiz basés sur le titre du module
                      </p>
                    </div>
                  </div>
                </div>

                {formData.generateContent && (
                  <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900">Options de génération</h3>
                    
                    <div>
                      <label htmlFor="coursesCount" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de cours à générer
                      </label>
                      <select
                        id="coursesCount"
                        value={formData.coursesCount}
                        onChange={(e) => setFormData({ ...formData, coursesCount: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 cours</option>
                        <option value={2}>2 cours</option>
                        <option value={3}>3 cours (recommandé)</option>
                        <option value={4}>4 cours</option>
                        <option value={5}>5 cours</option>
                      </select>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="quizPerCourse"
                        checked={formData.quizPerCourse}
                        onChange={(e) => setFormData({ ...formData, quizPerCourse: e.target.checked })}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <label htmlFor="quizPerCourse" className="text-sm font-medium text-gray-700">
                          Générer un quiz par cours
                        </label>
                        <p className="text-sm text-gray-500 mt-1">
                          Chaque cours aura son quiz avec questions à choix multiples
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">📋 Contenu qui sera généré :</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✅ {formData.coursesCount} cours avec contenu détaillé</li>
                        {formData.quizPerCourse && <li>✅ {formData.coursesCount} quiz interactifs</li>}
                        {formData.quizPerCourse && <li>✅ Questions à choix multiples</li>}
                        <li>✅ Contenu adapté au sujet du module</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    ← Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création en cours...
                      </span>
                    ) : (
                      `🚀 Créer le Module${formData.generateContent ? ' avec Contenu' : ''}`
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function CreateModulePage() {
  return (
    <ProtectedRoute requireRole="ADMIN">
      <CreateModuleContent />
    </ProtectedRoute>
  );
}