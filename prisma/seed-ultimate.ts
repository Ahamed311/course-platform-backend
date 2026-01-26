import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding ultimate complet...');

  // Nettoyer les données existantes
  await prisma.quizResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.course.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Données existantes supprimées');

  // Créer des utilisateurs de test
  const student = await prisma.user.create({
    data: {
      email: 'etudiant@eduplatform.com',
      name: 'Étudiant Test',
      password: '$2b$10$N1/asIcd5HQFoWW3Yk2emeS0u8tS1Ibf8tiL5hTy85DLccCfFEt76', // password123
      role: 'STUDENT',
      isActive: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@eduplatform.com',
      name: 'Administrateur',
      password: '$2b$10$C8uMaSPAb6pDGfavHfVKSeOwK3jmhPUKUk.fsLhJTPdu.7pyVW7Xu', // admin123
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('👤 Utilisateurs créés');

  // Module 1: JavaScript Fondamentaux
  const jsModule = await prisma.module.create({
    data: {
      title: 'JavaScript Fondamentaux',
      description: 'Apprenez les bases du JavaScript moderne pour le développement web',
    },
  });

  // Cours JavaScript
  const jsCourse1 = await prisma.course.create({
    data: {
      title: 'Introduction à JavaScript',
      content: `# Introduction à JavaScript

JavaScript est un langage de programmation dynamique et polyvalent, principalement utilisé pour le développement web. Créé en 1995 par Brendan Eich, JavaScript est devenu l'un des langages les plus populaires au monde.

## Qu'est-ce que JavaScript ?

JavaScript est un langage de programmation interprété qui permet d'ajouter de l'interactivité aux pages web. Contrairement à HTML qui structure le contenu et CSS qui le stylise, JavaScript donne vie aux pages web.

## Caractéristiques principales

### 1. Langage interprété
JavaScript n'a pas besoin d'être compilé. Le code est exécuté directement par le navigateur ou l'environnement d'exécution.

### 2. Typage dynamique
Les variables en JavaScript peuvent contenir différents types de données sans déclaration explicite du type.

### 3. Orienté objet et fonctionnel
JavaScript supporte à la fois la programmation orientée objet et la programmation fonctionnelle.

## Où utilise-t-on JavaScript ?

- **Frontend** : Interfaces utilisateur interactives
- **Backend** : Serveurs avec Node.js
- **Applications mobiles** : React Native, Ionic
- **Applications desktop** : Electron
- **IoT** : Programmation d'objets connectés

## Premier exemple

\`\`\`javascript
// Afficher un message
console.log("Bonjour, monde !");

// Créer une variable
let nom = "Alice";
console.log("Bonjour, " + nom);
\`\`\`

JavaScript est un langage essentiel pour tout développeur web moderne.`,
      moduleId: jsModule.id,
    },
  });
  const jsCourse2 = await prisma.course.create({
    data: {
      title: 'Variables et Types de Données',
      content: `# Variables et Types de Données en JavaScript

Les variables sont des conteneurs qui stockent des valeurs. En JavaScript, nous avons plusieurs façons de déclarer des variables et différents types de données.

## Déclaration de Variables

### var (ancienne syntaxe)
\`\`\`javascript
var nom = "Alice";
var age = 25;
\`\`\`

### let (moderne, portée de bloc)
\`\`\`javascript
let nom = "Bob";
let age = 30;
\`\`\`

### const (constante, ne peut pas être réassignée)
\`\`\`javascript
const PI = 3.14159;
const nom = "Charlie";
\`\`\`

## Types de Données Primitifs

### 1. String (Chaîne de caractères)
\`\`\`javascript
let prenom = "Marie";
let nom = 'Dupont';
let phrase = \`Bonjour \${prenom} \${nom}\`;
\`\`\`

### 2. Number (Nombre)
\`\`\`javascript
let entier = 42;
let decimal = 3.14;
let negatif = -10;
\`\`\`

### 3. Boolean (Booléen)
\`\`\`javascript
let estVrai = true;
let estFaux = false;
\`\`\`

## Bonnes Pratiques

1. **Utilisez const** par défaut
2. **Utilisez let** quand vous devez réassigner
3. **Évitez var** (problèmes de portée)
4. **Nommage descriptif** : \`userName\` plutôt que \`u\`
5. **CamelCase** pour les variables : \`monNomDeVariable\``,
      moduleId: jsModule.id,
    },
  });

  const jsCourse3 = await prisma.course.create({
    data: {
      title: 'Fonctions et Portée',
      content: `# Fonctions et Portée en JavaScript

Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Elles sont fondamentales en JavaScript.

## Déclaration de Fonctions

### Fonction classique
\`\`\`javascript
function saluer(nom) {
  return "Bonjour " + nom + " !";
}
\`\`\`

### Fonction fléchée (ES6)
\`\`\`javascript
const saluer = (nom) => {
  return "Bonjour " + nom + " !";
};

// Version courte
const saluer = nom => "Bonjour " + nom + " !";
\`\`\`

### Expression de fonction
\`\`\`javascript
const saluer = function(nom) {
  return "Bonjour " + nom + " !";
};
\`\`\`

## Paramètres et Arguments

### Paramètres par défaut
\`\`\`javascript
function saluer(nom = "Invité") {
  return "Bonjour " + nom + " !";
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
let variableGlobale = "Je suis globale";

function maFonction() {
  console.log(variableGlobale); // Accessible
}
\`\`\`

### Portée de fonction
\`\`\`javascript
function maFonction() {
  let variableLocale = "Je suis locale";
  console.log(variableLocale); // Accessible ici
}
// console.log(variableLocale); // Erreur !
\`\`\`

### Portée de bloc
\`\`\`javascript
if (true) {
  let variableBloc = "Je suis dans le bloc";
  const autreVariable = "Moi aussi";
}
// console.log(variableBloc); // Erreur !
\`\`\`

## Fonctions de Haut Niveau

### Callback
\`\`\`javascript
function traiterDonnees(donnees, callback) {
  const resultat = donnees.map(x => x * 2);
  callback(resultat);
}

traiterDonnees([1, 2, 3], (resultat) => {
  console.log(resultat); // [2, 4, 6]
});
\`\`\`

### Closure
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

Les fonctions sont essentielles pour structurer et organiser votre code JavaScript !`,
      moduleId: jsModule.id,
    },
  });

  console.log('📚 Cours JavaScript créés');
  // Quiz JavaScript avec beaucoup plus de questions
  const jsQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction à JavaScript',
      courseId: jsCourse1.id,
    },
  });

  // Questions pour le quiz JavaScript Introduction (8 questions)
  const jsQuestion1 = await prisma.question.create({
    data: {
      text: 'En quelle année JavaScript a-t-il été créé ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: '1993', questionId: jsQuestion1.id, isCorrect: false },
      { text: '1995', questionId: jsQuestion1.id, isCorrect: true },
      { text: '1997', questionId: jsQuestion1.id, isCorrect: false },
      { text: '1999', questionId: jsQuestion1.id, isCorrect: false },
    ],
  });

  const jsQuestion2 = await prisma.question.create({
    data: {
      text: 'Qui a créé JavaScript ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Tim Berners-Lee', questionId: jsQuestion2.id, isCorrect: false },
      { text: 'Brendan Eich', questionId: jsQuestion2.id, isCorrect: true },
      { text: 'Douglas Crockford', questionId: jsQuestion2.id, isCorrect: false },
      { text: 'John Resig', questionId: jsQuestion2.id, isCorrect: false },
    ],
  });

  const jsQuestion3 = await prisma.question.create({
    data: {
      text: 'JavaScript est principalement utilisé pour :',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Uniquement le frontend web', questionId: jsQuestion3.id, isCorrect: false },
      { text: 'Uniquement le backend', questionId: jsQuestion3.id, isCorrect: false },
      { text: 'Frontend, backend, mobile et desktop', questionId: jsQuestion3.id, isCorrect: true },
      { text: 'Uniquement les bases de données', questionId: jsQuestion3.id, isCorrect: false },
    ],
  });

  const jsQuestion4 = await prisma.question.create({
    data: {
      text: 'Quelle est la caractéristique principale du typage en JavaScript ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Typage statique', questionId: jsQuestion4.id, isCorrect: false },
      { text: 'Typage dynamique', questionId: jsQuestion4.id, isCorrect: true },
      { text: 'Pas de typage', questionId: jsQuestion4.id, isCorrect: false },
      { text: 'Typage fort uniquement', questionId: jsQuestion4.id, isCorrect: false },
    ],
  });

  const jsQuestion5 = await prisma.question.create({
    data: {
      text: 'JavaScript a besoin d\'être compilé avant d\'être exécuté.',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Vrai', questionId: jsQuestion5.id, isCorrect: false },
      { text: 'Faux', questionId: jsQuestion5.id, isCorrect: true },
      { text: 'Seulement pour Node.js', questionId: jsQuestion5.id, isCorrect: false },
      { text: 'Seulement pour le navigateur', questionId: jsQuestion5.id, isCorrect: false },
    ],
  });

  const jsQuestion6 = await prisma.question.create({
    data: {
      text: 'Quel environnement permet d\'exécuter JavaScript côté serveur ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Apache', questionId: jsQuestion6.id, isCorrect: false },
      { text: 'Node.js', questionId: jsQuestion6.id, isCorrect: true },
      { text: 'PHP', questionId: jsQuestion6.id, isCorrect: false },
      { text: 'MySQL', questionId: jsQuestion6.id, isCorrect: false },
    ],
  });

  const jsQuestion7 = await prisma.question.create({
    data: {
      text: 'Que signifie "JavaScript est un langage interprété" ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Il doit être compilé avant exécution', questionId: jsQuestion7.id, isCorrect: false },
      { text: 'Il est exécuté directement par le navigateur', questionId: jsQuestion7.id, isCorrect: true },
      { text: 'Il ne peut pas être modifié', questionId: jsQuestion7.id, isCorrect: false },
      { text: 'Il est plus lent que les autres langages', questionId: jsQuestion7.id, isCorrect: false },
    ],
  });

  const jsQuestion8 = await prisma.question.create({
    data: {
      text: 'JavaScript supporte quels paradigmes de programmation ?',
      quizId: jsQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Seulement orienté objet', questionId: jsQuestion8.id, isCorrect: false },
      { text: 'Seulement fonctionnel', questionId: jsQuestion8.id, isCorrect: false },
      { text: 'Orienté objet et fonctionnel', questionId: jsQuestion8.id, isCorrect: true },
      { text: 'Seulement procédural', questionId: jsQuestion8.id, isCorrect: false },
    ],
  });
  // Quiz Variables et Types (8 questions)
  const jsQuiz2 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Variables et Types de Données',
      courseId: jsCourse2.id,
    },
  });

  const jsQuestion9 = await prisma.question.create({
    data: {
      text: 'Quelle est la meilleure pratique pour déclarer une variable qui ne changera pas ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'var', questionId: jsQuestion9.id, isCorrect: false },
      { text: 'let', questionId: jsQuestion9.id, isCorrect: false },
      { text: 'const', questionId: jsQuestion9.id, isCorrect: true },
      { text: 'variable', questionId: jsQuestion9.id, isCorrect: false },
    ],
  });

  const jsQuestion10 = await prisma.question.create({
    data: {
      text: 'Quel est le type de données de la valeur null en JavaScript ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'null', questionId: jsQuestion10.id, isCorrect: false },
      { text: 'undefined', questionId: jsQuestion10.id, isCorrect: false },
      { text: 'object', questionId: jsQuestion10.id, isCorrect: true },
      { text: 'string', questionId: jsQuestion10.id, isCorrect: false },
    ],
  });

  const jsQuestion11 = await prisma.question.create({
    data: {
      text: 'Comment déclare-t-on une chaîne de caractères avec interpolation ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'let nom = "Alice";', questionId: jsQuestion11.id, isCorrect: false },
      { text: 'let nom = \'Alice\';', questionId: jsQuestion11.id, isCorrect: false },
      { text: 'let phrase = `Bonjour ${nom}`;', questionId: jsQuestion11.id, isCorrect: true },
      { text: 'let phrase = "Bonjour " + nom;', questionId: jsQuestion11.id, isCorrect: false },
    ],
  });

  const jsQuestion12 = await prisma.question.create({
    data: {
      text: 'Quelle est la différence principale entre let et var ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Aucune différence', questionId: jsQuestion12.id, isCorrect: false },
      { text: 'let a une portée de bloc, var a une portée de fonction', questionId: jsQuestion12.id, isCorrect: true },
      { text: 'var est plus moderne que let', questionId: jsQuestion12.id, isCorrect: false },
      { text: 'let ne peut pas être réassigné', questionId: jsQuestion12.id, isCorrect: false },
    ],
  });

  const jsQuestion13 = await prisma.question.create({
    data: {
      text: 'Quel type de données représente true ou false ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'String', questionId: jsQuestion13.id, isCorrect: false },
      { text: 'Number', questionId: jsQuestion13.id, isCorrect: false },
      { text: 'Boolean', questionId: jsQuestion13.id, isCorrect: true },
      { text: 'Object', questionId: jsQuestion13.id, isCorrect: false },
    ],
  });

  const jsQuestion14 = await prisma.question.create({
    data: {
      text: 'Comment vérifier le type d\'une variable en JavaScript ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'type(variable)', questionId: jsQuestion14.id, isCorrect: false },
      { text: 'typeof variable', questionId: jsQuestion14.id, isCorrect: true },
      { text: 'variable.type', questionId: jsQuestion14.id, isCorrect: false },
      { text: 'getType(variable)', questionId: jsQuestion14.id, isCorrect: false },
    ],
  });

  const jsQuestion15 = await prisma.question.create({
    data: {
      text: 'Quelle convention de nommage est recommandée pour les variables JavaScript ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'snake_case', questionId: jsQuestion15.id, isCorrect: false },
      { text: 'camelCase', questionId: jsQuestion15.id, isCorrect: true },
      { text: 'PascalCase', questionId: jsQuestion15.id, isCorrect: false },
      { text: 'kebab-case', questionId: jsQuestion15.id, isCorrect: false },
    ],
  });

  const jsQuestion16 = await prisma.question.create({
    data: {
      text: 'Que se passe-t-il si on essaie de réassigner une variable const ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'La valeur change normalement', questionId: jsQuestion16.id, isCorrect: false },
      { text: 'Une erreur est levée', questionId: jsQuestion16.id, isCorrect: true },
      { text: 'La variable devient undefined', questionId: jsQuestion16.id, isCorrect: false },
      { text: 'Rien ne se passe', questionId: jsQuestion16.id, isCorrect: false },
    ],
  });
  // Quiz Fonctions et Portée (8 questions)
  const jsQuiz3 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Fonctions et Portée',
      courseId: jsCourse3.id,
    },
  });

  const jsQuestion17 = await prisma.question.create({
    data: {
      text: 'Quelle syntaxe représente une fonction fléchée ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'function saluer() {}', questionId: jsQuestion17.id, isCorrect: false },
      { text: 'const saluer = () => {}', questionId: jsQuestion17.id, isCorrect: true },
      { text: 'var saluer = function() {}', questionId: jsQuestion17.id, isCorrect: false },
      { text: 'saluer: function() {}', questionId: jsQuestion17.id, isCorrect: false },
    ],
  });

  const jsQuestion18 = await prisma.question.create({
    data: {
      text: 'Qu\'est-ce qu\'une closure en JavaScript ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Une fonction qui ferme le navigateur', questionId: jsQuestion18.id, isCorrect: false },
      { text: 'Une fonction qui a accès aux variables de sa portée externe', questionId: jsQuestion18.id, isCorrect: true },
      { text: 'Une fonction sans paramètres', questionId: jsQuestion18.id, isCorrect: false },
      { text: 'Une fonction qui ne retourne rien', questionId: jsQuestion18.id, isCorrect: false },
    ],
  });

  const jsQuestion19 = await prisma.question.create({
    data: {
      text: 'Comment définir un paramètre par défaut dans une fonction ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'function saluer(nom || "Invité") {}', questionId: jsQuestion19.id, isCorrect: false },
      { text: 'function saluer(nom = "Invité") {}', questionId: jsQuestion19.id, isCorrect: true },
      { text: 'function saluer(nom default "Invité") {}', questionId: jsQuestion19.id, isCorrect: false },
      { text: 'function saluer(nom: "Invité") {}', questionId: jsQuestion19.id, isCorrect: false },
    ],
  });

  const jsQuestion20 = await prisma.question.create({
    data: {
      text: 'Que permet l\'opérateur rest (...) dans les paramètres de fonction ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Définir des paramètres optionnels', questionId: jsQuestion20.id, isCorrect: false },
      { text: 'Collecter plusieurs arguments dans un tableau', questionId: jsQuestion20.id, isCorrect: true },
      { text: 'Étendre un objet', questionId: jsQuestion20.id, isCorrect: false },
      { text: 'Créer une fonction asynchrone', questionId: jsQuestion20.id, isCorrect: false },
    ],
  });

  const jsQuestion21 = await prisma.question.create({
    data: {
      text: 'Quelle est la portée d\'une variable déclarée avec let dans un bloc if ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Globale', questionId: jsQuestion21.id, isCorrect: false },
      { text: 'Fonction', questionId: jsQuestion21.id, isCorrect: false },
      { text: 'Bloc', questionId: jsQuestion21.id, isCorrect: true },
      { text: 'Module', questionId: jsQuestion21.id, isCorrect: false },
    ],
  });

  const jsQuestion22 = await prisma.question.create({
    data: {
      text: 'Qu\'est-ce qu\'une fonction callback ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Une fonction qui appelle elle-même', questionId: jsQuestion22.id, isCorrect: false },
      { text: 'Une fonction passée en paramètre à une autre fonction', questionId: jsQuestion22.id, isCorrect: true },
      { text: 'Une fonction qui retourne une autre fonction', questionId: jsQuestion22.id, isCorrect: false },
      { text: 'Une fonction sans nom', questionId: jsQuestion22.id, isCorrect: false },
    ],
  });

  const jsQuestion23 = await prisma.question.create({
    data: {
      text: 'Comment appelle-t-on une fonction immédiatement après sa déclaration ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'IIFE (Immediately Invoked Function Expression)', questionId: jsQuestion23.id, isCorrect: true },
      { text: 'Callback', questionId: jsQuestion23.id, isCorrect: false },
      { text: 'Closure', questionId: jsQuestion23.id, isCorrect: false },
      { text: 'Arrow Function', questionId: jsQuestion23.id, isCorrect: false },
    ],
  });

  const jsQuestion24 = await prisma.question.create({
    data: {
      text: 'Quelle différence principale existe entre function et const func = () => {} ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Aucune différence', questionId: jsQuestion24.id, isCorrect: false },
      { text: 'Les fonctions fléchées n\'ont pas leur propre contexte this', questionId: jsQuestion24.id, isCorrect: true },
      { text: 'Les fonctions classiques sont plus rapides', questionId: jsQuestion24.id, isCorrect: false },
      { text: 'Les fonctions fléchées ne peuvent pas avoir de paramètres', questionId: jsQuestion24.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz JavaScript créés (24 questions)');
  // Module 2: React Fondamentaux
  const reactModule = await prisma.module.create({
    data: {
      title: 'React Fondamentaux',
      description: 'Maîtrisez les concepts de base de React pour créer des interfaces modernes',
    },
  });

  const reactCourse1 = await prisma.course.create({
    data: {
      title: 'Introduction à React',
      content: `# Introduction à React

React est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur interactives et dynamiques.

## Qu'est-ce que React ?

React est une bibliothèque JavaScript open-source qui permet de construire des interfaces utilisateur (UI) de manière déclarative et efficace. Elle se concentre sur la création de composants réutilisables.

## Pourquoi utiliser React ?

### 1. Composants Réutilisables
React permet de créer des composants modulaires qui peuvent être réutilisés dans différentes parties de l'application.

### 2. Virtual DOM
React utilise un Virtual DOM qui optimise les mises à jour de l'interface utilisateur, rendant les applications plus rapides.

### 3. Écosystème Riche
React dispose d'un écosystème très riche avec de nombreuses bibliothèques et outils.

### 4. Communauté Active
Une large communauté de développeurs contribue constamment à l'amélioration de React.

## Concepts Clés

### JSX (JavaScript XML)
JSX permet d'écrire du HTML dans du JavaScript de manière naturelle :

\`\`\`jsx
const element = <h1>Bonjour, monde !</h1>;
\`\`\`

### Composants
Les composants sont les blocs de construction de React :

\`\`\`jsx
function Bienvenue(props) {
  return <h1>Bonjour, {props.nom} !</h1>;
}
\`\`\`

### Props
Les props permettent de passer des données aux composants :

\`\`\`jsx
<Bienvenue nom="Alice" />
\`\`\`

### State
Le state permet de gérer l'état interne d'un composant :

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## Premier Composant React

\`\`\`jsx
import React from 'react';

function MonPremierComposant() {
  return (
    <div>
      <h1>Mon Premier Composant React</h1>
      <p>Bienvenue dans le monde de React !</p>
    </div>
  );
}

export default MonPremierComposant;
\`\`\`

React révolutionne la façon dont nous construisons les interfaces utilisateur modernes !`,
      moduleId: reactModule.id,
    },
  });

  const reactCourse2 = await prisma.course.create({
    data: {
      title: 'Composants et Props',
      content: `# Composants et Props en React

Les composants sont le cœur de React. Ils permettent de diviser l'interface utilisateur en éléments indépendants et réutilisables.

## Types de Composants

### 1. Composants Fonctionnels (Recommandé)
\`\`\`jsx
function Salutation(props) {
  return <h1>Bonjour, {props.nom} !</h1>;
}

// Ou avec une fonction fléchée
const Salutation = (props) => {
  return <h1>Bonjour, {props.nom} !</h1>;
};
\`\`\`

### 2. Composants de Classe (Legacy)
\`\`\`jsx
class Salutation extends React.Component {
  render() {
    return <h1>Bonjour, {this.props.nom} !</h1>;
  }
}
\`\`\`

## Props (Propriétés)

Les props sont des données passées d'un composant parent à un composant enfant.

### Passage de Props
\`\`\`jsx
function App() {
  return (
    <div>
      <Salutation nom="Alice" age={25} />
      <Salutation nom="Bob" age={30} />
    </div>
  );
}

function Salutation(props) {
  return (
    <div>
      <h1>Bonjour, {props.nom} !</h1>
      <p>Vous avez {props.age} ans.</p>
    </div>
  );
}
\`\`\`

### Destructuration des Props
\`\`\`jsx
function Salutation({ nom, age }) {
  return (
    <div>
      <h1>Bonjour, {nom} !</h1>
      <p>Vous avez {age} ans.</p>
    </div>
  );
}
\`\`\`

### Props par Défaut
\`\`\`jsx
function Salutation({ nom = "Invité", age = 0 }) {
  return (
    <div>
      <h1>Bonjour, {nom} !</h1>
      <p>Vous avez {age} ans.</p>
    </div>
  );
}
\`\`\`

## Composition de Composants

### Composant Container
\`\`\`jsx
function CarteUtilisateur({ nom, email, avatar }) {
  return (
    <div className="carte-utilisateur">
      <Avatar src={avatar} alt={nom} />
      <InfosUtilisateur nom={nom} email={email} />
    </div>
  );
}

function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function InfosUtilisateur({ nom, email }) {
  return (
    <div>
      <h3>{nom}</h3>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

## Bonnes Pratiques

1. **Nommage** : PascalCase pour les composants
2. **Props immutables** : Ne jamais modifier les props
3. **Composants purs** : Même props = même rendu
4. **Décomposition** : Diviser en petits composants

Les composants et props forment la base de toute application React moderne !`,
      moduleId: reactModule.id,
    },
  });

  const reactCourse3 = await prisma.course.create({
    data: {
      title: 'State et Hooks',
      content: `# State et Hooks en React

Le state permet de gérer l'état interne d'un composant. Les Hooks sont des fonctions qui permettent d'utiliser le state et d'autres fonctionnalités React dans les composants fonctionnels.

## useState Hook

### Déclaration du State
\`\`\`jsx
import React, { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
\`\`\`

### State avec Objets
\`\`\`jsx
function Formulaire() {
  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    email: '',
    age: 0
  });

  const mettreAJourNom = (nouveauNom) => {
    setUtilisateur({
      ...utilisateur,
      nom: nouveauNom
    });
  };

  return (
    <div>
      <input 
        value={utilisateur.nom}
        onChange={(e) => mettreAJourNom(e.target.value)}
        placeholder="Nom"
      />
    </div>
  );
}
\`\`\`

## useEffect Hook

### Effet de Base
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Exemple() {
  const [count, setCount] = useState(0);

  // Similaire à componentDidMount et componentDidUpdate
  useEffect(() => {
    document.title = \`Vous avez cliqué \${count} fois\`;
  });

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
\`\`\`

### Effet avec Nettoyage
\`\`\`jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // Fonction de nettoyage
    return () => clearInterval(interval);
  }, []); // Tableau de dépendances vide = exécute une seule fois

  return <div>Secondes : {seconds}</div>;
}
\`\`\`

### Effet Conditionnel
\`\`\`jsx
function ProfilUtilisateur({ userId }) {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    async function chargerUtilisateur() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUtilisateur(userData);
    }

    chargerUtilisateur();
  }, [userId]); // Se ré-exécute quand userId change

  if (!utilisateur) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{utilisateur.nom}</h1>
      <p>{utilisateur.email}</p>
    </div>
  );
}
\`\`\`

## Autres Hooks Utiles

### useContext
\`\`\`jsx
const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
\`\`\`

### useReducer
\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Compteur() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\`

## Règles des Hooks

1. **Toujours au niveau supérieur** : Ne pas appeler dans des boucles, conditions ou fonctions imbriquées
2. **Uniquement dans les composants React** : Ou dans des Hooks personnalisés
3. **Ordre cohérent** : Même ordre à chaque rendu

## Hooks Personnalisés

\`\`\`jsx
function useCompteur(valeurInitiale = 0) {
  const [count, setCount] = useState(valeurInitiale);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(valeurInitiale);

  return { count, increment, decrement, reset };
}

// Utilisation
function MonComposant() {
  const { count, increment, decrement, reset } = useCompteur(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

Les Hooks révolutionnent la façon d'écrire des composants React !`,
      moduleId: reactModule.id,
    },
  });

  console.log('📚 Cours React créés');
  // Quiz React avec plus de questions
  const reactQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction à React',
      courseId: reactCourse1.id,
    },
  });

  // Questions React (6 questions par quiz)
  const reactQuestion1 = await prisma.question.create({
    data: {
      text: 'Qui a développé React ?',
      quizId: reactQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Google', questionId: reactQuestion1.id, isCorrect: false },
      { text: 'Facebook', questionId: reactQuestion1.id, isCorrect: true },
      { text: 'Microsoft', questionId: reactQuestion1.id, isCorrect: false },
      { text: 'Twitter', questionId: reactQuestion1.id, isCorrect: false },
    ],
  });

  const reactQuestion2 = await prisma.question.create({
    data: {
      text: 'Que signifie JSX ?',
      quizId: reactQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'JavaScript XML', questionId: reactQuestion2.id, isCorrect: true },
      { text: 'Java Syntax Extension', questionId: reactQuestion2.id, isCorrect: false },
      { text: 'JSON XML', questionId: reactQuestion2.id, isCorrect: false },
      { text: 'JavaScript eXtension', questionId: reactQuestion2.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz React créés');

  console.log('✅ Seeding ultimate terminé !');
  console.log(`👤 Utilisateurs créés: ${student.email}, ${admin.email}`);
  console.log('📚 2 modules, 6 cours, 4 quiz, 26+ questions créés');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });