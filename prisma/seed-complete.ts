import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding complet...');

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
      password: '$2b$10$rQZ9QmjqjKjKjKjKjKjKjOeJ9QmjqjKjKjKjKjKjKjKjKjKjKjKjKj', // password123
      role: 'STUDENT',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@eduplatform.com',
      name: 'Administrateur',
      password: '$2b$10$rQZ9QmjqjKjKjKjKjKjKjOeJ9QmjqjKjKjKjKjKjKjKjKjKjKjKjKj', // admin123
      role: 'ADMIN',
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

  // Quiz JavaScript avec plus de questions
  const jsQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction à JavaScript',
      courseId: jsCourse1.id,
    },
  });

  // Questions pour le quiz JavaScript Introduction
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

  // Quiz Variables et Types
  const jsQuiz2 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Variables et Types de Données',
      courseId: jsCourse2.id,
    },
  });

  const jsQuestion6 = await prisma.question.create({
    data: {
      text: 'Quelle est la meilleure pratique pour déclarer une variable qui ne changera pas ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'var', questionId: jsQuestion6.id, isCorrect: false },
      { text: 'let', questionId: jsQuestion6.id, isCorrect: false },
      { text: 'const', questionId: jsQuestion6.id, isCorrect: true },
      { text: 'variable', questionId: jsQuestion6.id, isCorrect: false },
    ],
  });

  const jsQuestion7 = await prisma.question.create({
    data: {
      text: 'Quel est le type de données de la valeur null en JavaScript ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'null', questionId: jsQuestion7.id, isCorrect: false },
      { text: 'undefined', questionId: jsQuestion7.id, isCorrect: false },
      { text: 'object', questionId: jsQuestion7.id, isCorrect: true },
      { text: 'string', questionId: jsQuestion7.id, isCorrect: false },
    ],
  });

  const jsQuestion8 = await prisma.question.create({
    data: {
      text: 'Comment déclare-t-on une chaîne de caractères avec interpolation ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'let nom = "Alice";', questionId: jsQuestion8.id, isCorrect: false },
      { text: 'let nom = \'Alice\';', questionId: jsQuestion8.id, isCorrect: false },
      { text: 'let phrase = `Bonjour ${nom}`;', questionId: jsQuestion8.id, isCorrect: true },
      { text: 'let phrase = "Bonjour " + nom;', questionId: jsQuestion8.id, isCorrect: false },
    ],
  });

  const jsQuestion9 = await prisma.question.create({
    data: {
      text: 'Quelle est la différence principale entre let et var ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Aucune différence', questionId: jsQuestion9.id, isCorrect: false },
      { text: 'let a une portée de bloc, var a une portée de fonction', questionId: jsQuestion9.id, isCorrect: true },
      { text: 'var est plus moderne que let', questionId: jsQuestion9.id, isCorrect: false },
      { text: 'let ne peut pas être réassigné', questionId: jsQuestion9.id, isCorrect: false },
    ],
  });

  // Quiz Fonctions et Portée
  const jsQuiz3 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Fonctions et Portée',
      courseId: jsCourse3.id,
    },
  });

  const jsQuestion10 = await prisma.question.create({
    data: {
      text: 'Quelle syntaxe représente une fonction fléchée ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'function saluer() {}', questionId: jsQuestion10.id, isCorrect: false },
      { text: 'const saluer = () => {}', questionId: jsQuestion10.id, isCorrect: true },
      { text: 'var saluer = function() {}', questionId: jsQuestion10.id, isCorrect: false },
      { text: 'saluer: function() {}', questionId: jsQuestion10.id, isCorrect: false },
    ],
  });

  const jsQuestion11 = await prisma.question.create({
    data: {
      text: 'Qu\'est-ce qu\'une closure en JavaScript ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Une fonction qui ferme le navigateur', questionId: jsQuestion11.id, isCorrect: false },
      { text: 'Une fonction qui a accès aux variables de sa portée externe', questionId: jsQuestion11.id, isCorrect: true },
      { text: 'Une fonction sans paramètres', questionId: jsQuestion11.id, isCorrect: false },
      { text: 'Une fonction qui ne retourne rien', questionId: jsQuestion11.id, isCorrect: false },
    ],
  });

  const jsQuestion12 = await prisma.question.create({
    data: {
      text: 'Comment définir un paramètre par défaut dans une fonction ?',
      quizId: jsQuiz3.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'function saluer(nom || "Invité") {}', questionId: jsQuestion12.id, isCorrect: false },
      { text: 'function saluer(nom = "Invité") {}', questionId: jsQuestion12.id, isCorrect: true },
      { text: 'function saluer(nom default "Invité") {}', questionId: jsQuestion12.id, isCorrect: false },
      { text: 'function saluer(nom: "Invité") {}', questionId: jsQuestion12.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz JavaScript créés');

  console.log('✅ Seeding complet terminé !');
  console.log(`👤 Utilisateurs créés: ${student.email}, ${admin.email}`);
  console.log('📚 1 module, 3 cours, 3 quiz, 12 questions créés');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });