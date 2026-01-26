import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer les données existantes
  await prisma.quizResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.course.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Données existantes supprimées');

  // Créer un utilisateur de test
  const user = await prisma.user.create({
    data: {
      email: 'etudiant@eduplatform.com',
    },
  });

  console.log('👤 Utilisateur créé');

  // Module 1: JavaScript Fondamentaux
  const jsModule = await prisma.module.create({
    data: {
      title: 'JavaScript Fondamentaux',
      description: 'Apprenez les bases du JavaScript moderne',
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

JavaScript est un langage essentiel pour tout développeur web moderne. Dans les prochains cours, nous explorerons ses concepts fondamentaux.`,
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

### 4. Undefined
\`\`\`javascript
let variable; // undefined
\`\`\`

### 5. Null
\`\`\`javascript
let vide = null;
\`\`\`

## Types de Données Complexes

### Array (Tableau)
\`\`\`javascript
let fruits = ["pomme", "banane", "orange"];
let nombres = [1, 2, 3, 4, 5];
\`\`\`

### Object (Objet)
\`\`\`javascript
let personne = {
  nom: "Dupont",
  prenom: "Marie",
  age: 28,
  ville: "Paris"
};
\`\`\`

## Vérification du Type
\`\`\`javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (particularité JS)
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
\`\`\`

## Bonnes Pratiques

1. **Utilisez const** par défaut
2. **Utilisez let** quand vous devez réassigner
3. **Évitez var** (problèmes de portée)
4. **Nommage descriptif** : \`userName\` plutôt que \`u\`
5. **CamelCase** pour les variables : \`monNomDeVariable\`

La compréhension des variables et types est fondamentale pour maîtriser JavaScript !`,
      moduleId: jsModule.id,
    },
  });

  console.log('📚 Cours JavaScript créés');
  // Quiz JavaScript Fondamentaux
  const jsQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction à JavaScript',
      courseId: jsCourse1.id,
    },
  });

  // Questions pour le quiz JavaScript
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

  // Quiz Variables et Types
  const jsQuiz2 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Variables et Types de Données',
      courseId: jsCourse2.id,
    },
  });

  const jsQuestion4 = await prisma.question.create({
    data: {
      text: 'Quelle est la meilleure pratique pour déclarer une variable qui ne changera pas ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'var', questionId: jsQuestion4.id, isCorrect: false },
      { text: 'let', questionId: jsQuestion4.id, isCorrect: false },
      { text: 'const', questionId: jsQuestion4.id, isCorrect: true },
      { text: 'variable', questionId: jsQuestion4.id, isCorrect: false },
    ],
  });

  const jsQuestion5 = await prisma.question.create({
    data: {
      text: 'Quel est le type de données de la valeur null en JavaScript ?',
      quizId: jsQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'null', questionId: jsQuestion5.id, isCorrect: false },
      { text: 'undefined', questionId: jsQuestion5.id, isCorrect: false },
      { text: 'object', questionId: jsQuestion5.id, isCorrect: true },
      { text: 'string', questionId: jsQuestion5.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz JavaScript créés');
  // Module 2: React Fondamentaux
  const reactModule = await prisma.module.create({
    data: {
      title: 'React Fondamentaux',
      description: 'Maîtrisez les concepts de base de React',
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

## Avantages de React

- **Performance** : Virtual DOM et optimisations
- **Flexibilité** : Peut être intégré progressivement
- **Testabilité** : Composants faciles à tester
- **SEO-friendly** : Avec Next.js ou Gatsby
- **Mobile** : React Native pour les apps mobiles

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

## Types de Props

### Props Simples
\`\`\`jsx
<MonComposant 
  titre="Mon Titre"
  nombre={42}
  estVisible={true}
/>
\`\`\`

### Props Objets
\`\`\`jsx
const utilisateur = {
  nom: "Alice",
  email: "alice@example.com"
};

<ProfilUtilisateur utilisateur={utilisateur} />
\`\`\`

### Props Fonctions
\`\`\`jsx
function Parent() {
  const gererClic = () => {
    console.log("Bouton cliqué !");
  };

  return <Enfant onClic={gererClic} />;
}

function Enfant({ onClic }) {
  return <button onClick={onClic}>Cliquez-moi</button>;
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
5. **PropTypes** : Valider les types de props (optionnel)

\`\`\`jsx
import PropTypes from 'prop-types';

Salutation.propTypes = {
  nom: PropTypes.string.isRequired,
  age: PropTypes.number
};
\`\`\`

Les composants et props forment la base de toute application React moderne !`,
      moduleId: reactModule.id,
    },
  });

  console.log('📚 Cours React créés');
  // Quiz React
  const reactQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction à React',
      courseId: reactCourse1.id,
    },
  });

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

  const reactQuiz2 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Composants et Props',
      courseId: reactCourse2.id,
    },
  });

  const reactQuestion3 = await prisma.question.create({
    data: {
      text: 'Comment passe-t-on des données à un composant enfant ?',
      quizId: reactQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Via les props', questionId: reactQuestion3.id, isCorrect: true },
      { text: 'Via le state', questionId: reactQuestion3.id, isCorrect: false },
      { text: 'Via les refs', questionId: reactQuestion3.id, isCorrect: false },
      { text: 'Via le context', questionId: reactQuestion3.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz React créés');

  // Module 3: CSS et Design
  const cssModule = await prisma.module.create({
    data: {
      title: 'CSS et Design Web',
      description: 'Apprenez à styliser vos pages web avec CSS',
    },
  });

  const cssCourse1 = await prisma.course.create({
    data: {
      title: 'Fondamentaux CSS',
      content: `# Fondamentaux CSS

CSS (Cascading Style Sheets) est le langage utilisé pour styliser et mettre en forme les pages web. Il contrôle l'apparence visuelle de votre contenu HTML.

## Qu'est-ce que CSS ?

CSS sépare le contenu (HTML) de la présentation (style). Cette séparation permet une meilleure maintenabilité et flexibilité dans le développement web.

## Syntaxe CSS

### Structure de base
\`\`\`css
sélecteur {
  propriété: valeur;
  propriété: valeur;
}
\`\`\`

### Exemple concret
\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}
\`\`\`

## Types de Sélecteurs

### 1. Sélecteur d'élément
\`\`\`css
p {
  color: black;
}
\`\`\`

### 2. Sélecteur de classe
\`\`\`css
.ma-classe {
  background-color: yellow;
}
\`\`\`

### 3. Sélecteur d'ID
\`\`\`css
#mon-id {
  border: 1px solid red;
}
\`\`\`

### 4. Sélecteurs combinés
\`\`\`css
/* Descendant */
div p {
  margin: 10px;
}

/* Enfant direct */
div > p {
  padding: 5px;
}

/* Frère adjacent */
h1 + p {
  font-weight: bold;
}
\`\`\`

## Propriétés CSS Essentielles

### Couleurs
\`\`\`css
.element {
  color: red;                    /* Nom de couleur */
  color: #ff0000;               /* Hexadécimal */
  color: rgb(255, 0, 0);        /* RGB */
  color: rgba(255, 0, 0, 0.5);  /* RGBA avec transparence */
  color: hsl(0, 100%, 50%);     /* HSL */
}
\`\`\`

### Typographie
\`\`\`css
.texte {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  text-decoration: underline;
}
\`\`\`

### Espacement
\`\`\`css
.boite {
  margin: 20px;          /* Marge extérieure */
  padding: 15px;         /* Marge intérieure */
  border: 2px solid black;
}

/* Espacement spécifique */
.element {
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
  
  /* Équivalent à */
  margin: 10px 15px;
}
\`\`\`

## Modèle de Boîte (Box Model)

Chaque élément HTML est une boîte composée de :

1. **Content** : Le contenu
2. **Padding** : Espace intérieur
3. **Border** : Bordure
4. **Margin** : Espace extérieur

\`\`\`css
.boite {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid blue;
  margin: 10px;
  
  /* Taille totale = 200 + (20*2) + (5*2) + (10*2) = 270px */
}
\`\`\`

## Intégration CSS

### 1. CSS Inline
\`\`\`html
<p style="color: red; font-size: 18px;">Texte rouge</p>
\`\`\`

### 2. CSS Interne
\`\`\`html
<head>
  <style>
    p { color: blue; }
  </style>
</head>
\`\`\`

### 3. CSS Externe (Recommandé)
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

## Cascade et Spécificité

L'ordre de priorité CSS :
1. **!important**
2. **Styles inline**
3. **IDs**
4. **Classes, attributs, pseudo-classes**
5. **Éléments**

\`\`\`css
/* Spécificité croissante */
p { color: black; }           /* 1 point */
.classe { color: blue; }      /* 10 points */
#id { color: red; }           /* 100 points */
p.classe#id { color: green; } /* 111 points */
\`\`\`

CSS est la base du design web moderne. Maîtriser ces fondamentaux vous permettra de créer des interfaces attrayantes !`,
      moduleId: cssModule.id,
    },
  });

  console.log('📚 Cours CSS créés');
  // Quiz CSS
  const cssQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Fondamentaux CSS',
      courseId: cssCourse1.id,
    },
  });

  const cssQuestion1 = await prisma.question.create({
    data: {
      text: 'Que signifie CSS ?',
      quizId: cssQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Computer Style Sheets', questionId: cssQuestion1.id, isCorrect: false },
      { text: 'Cascading Style Sheets', questionId: cssQuestion1.id, isCorrect: true },
      { text: 'Creative Style Sheets', questionId: cssQuestion1.id, isCorrect: false },
      { text: 'Colorful Style Sheets', questionId: cssQuestion1.id, isCorrect: false },
    ],
  });

  const cssQuestion2 = await prisma.question.create({
    data: {
      text: 'Quel sélecteur a la plus haute spécificité ?',
      quizId: cssQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Sélecteur d\'élément', questionId: cssQuestion2.id, isCorrect: false },
      { text: 'Sélecteur de classe', questionId: cssQuestion2.id, isCorrect: false },
      { text: 'Sélecteur d\'ID', questionId: cssQuestion2.id, isCorrect: true },
      { text: 'Sélecteur universel', questionId: cssQuestion2.id, isCorrect: false },
    ],
  });

  // Module 4: Base de Données
  const dbModule = await prisma.module.create({
    data: {
      title: 'Bases de Données et SQL',
      description: 'Apprenez à gérer et interroger des bases de données',
    },
  });

  const dbCourse1 = await prisma.course.create({
    data: {
      title: 'Introduction aux Bases de Données',
      content: `# Introduction aux Bases de Données

Une base de données est un système organisé pour stocker, gérer et récupérer des informations de manière efficace et sécurisée.

## Qu'est-ce qu'une Base de Données ?

Une base de données est une collection structurée de données qui peut être facilement consultée, gérée et mise à jour. Elle permet de stocker de grandes quantités d'informations de manière organisée.

## Types de Bases de Données

### 1. Bases de Données Relationnelles (SQL)
- **Structure** : Tables avec lignes et colonnes
- **Exemples** : MySQL, PostgreSQL, SQLite, Oracle
- **Avantages** : ACID, intégrité des données, requêtes complexes

### 2. Bases de Données NoSQL
- **Document** : MongoDB, CouchDB
- **Clé-Valeur** : Redis, DynamoDB
- **Colonnes** : Cassandra, HBase
- **Graphe** : Neo4j, ArangoDB

## Concepts Fondamentaux

### Table (Relation)
Une table stocke des données dans un format structuré :

\`\`\`
Utilisateurs
+----+---------+------------------+-----+
| ID | Nom     | Email            | Age |
+----+---------+------------------+-----+
| 1  | Alice   | alice@email.com  | 25  |
| 2  | Bob     | bob@email.com    | 30  |
| 3  | Charlie | charlie@email.com| 28  |
+----+---------+------------------+-----+
\`\`\`

### Clé Primaire (Primary Key)
- Identifiant unique pour chaque enregistrement
- Ne peut pas être NULL
- Généralement un ID auto-incrémenté

### Clé Étrangère (Foreign Key)
- Référence vers la clé primaire d'une autre table
- Maintient l'intégrité référentielle

### Relations
- **Un-à-Un** : Un utilisateur a un profil
- **Un-à-Plusieurs** : Un utilisateur a plusieurs commandes
- **Plusieurs-à-Plusieurs** : Utilisateurs et rôles

## Avantages des Bases de Données

### 1. Organisation
Les données sont structurées et organisées logiquement.

### 2. Intégrité
Contraintes pour maintenir la cohérence des données.

### 3. Sécurité
Contrôle d'accès et permissions utilisateur.

### 4. Concurrence
Plusieurs utilisateurs peuvent accéder simultanément.

### 5. Sauvegarde
Mécanismes de sauvegarde et récupération.

## SGBD (Système de Gestion de Base de Données)

Un SGBD est un logiciel qui permet de :
- Créer et gérer des bases de données
- Exécuter des requêtes
- Maintenir la sécurité
- Gérer les transactions

### SGBD Populaires

**Relationnels :**
- **MySQL** : Open source, populaire pour le web
- **PostgreSQL** : Avancé, extensible
- **SQLite** : Léger, embarqué
- **Oracle** : Entreprise, robuste
- **SQL Server** : Microsoft

**NoSQL :**
- **MongoDB** : Documents JSON
- **Redis** : Cache en mémoire
- **Elasticsearch** : Recherche et analyse

## Cas d'Usage

### E-commerce
- Produits, commandes, utilisateurs
- Inventaire, paiements

### Réseaux Sociaux
- Profils utilisateurs, posts, relations
- Messages, notifications

### Banque
- Comptes, transactions, historique
- Sécurité et conformité

### Analytics
- Logs, métriques, rapports
- Business Intelligence

## Bonnes Pratiques

1. **Normalisation** : Éviter la redondance
2. **Index** : Optimiser les performances
3. **Sauvegarde** : Stratégie de backup régulière
4. **Sécurité** : Chiffrement et accès contrôlé
5. **Monitoring** : Surveillance des performances

Les bases de données sont essentielles dans le développement d'applications modernes !`,
      moduleId: dbModule.id,
    },
  });

  const dbCourse2 = await prisma.course.create({
    data: {
      title: 'SQL : Langage de Requête',
      content: `# SQL : Langage de Requête Structuré

SQL (Structured Query Language) est le langage standard pour interagir avec les bases de données relationnelles.

## Qu'est-ce que SQL ?

SQL permet de :
- **Interroger** des données (SELECT)
- **Insérer** de nouvelles données (INSERT)
- **Modifier** des données existantes (UPDATE)
- **Supprimer** des données (DELETE)
- **Créer** et modifier la structure (DDL)

## Types de Commandes SQL

### 1. DQL (Data Query Language)
- **SELECT** : Récupérer des données

### 2. DML (Data Manipulation Language)
- **INSERT** : Ajouter des données
- **UPDATE** : Modifier des données
- **DELETE** : Supprimer des données

### 3. DDL (Data Definition Language)
- **CREATE** : Créer des objets
- **ALTER** : Modifier la structure
- **DROP** : Supprimer des objets

### 4. DCL (Data Control Language)
- **GRANT** : Accorder des permissions
- **REVOKE** : Révoquer des permissions

## Requêtes SELECT

### Syntaxe de base
\`\`\`sql
SELECT colonne1, colonne2
FROM table
WHERE condition
ORDER BY colonne
LIMIT nombre;
\`\`\`

### Exemples pratiques
\`\`\`sql
-- Sélectionner tous les utilisateurs
SELECT * FROM utilisateurs;

-- Sélectionner des colonnes spécifiques
SELECT nom, email FROM utilisateurs;

-- Avec condition
SELECT * FROM utilisateurs WHERE age > 25;

-- Avec tri
SELECT * FROM utilisateurs ORDER BY nom ASC;

-- Limiter les résultats
SELECT * FROM utilisateurs LIMIT 10;
\`\`\`

## Conditions WHERE

### Opérateurs de comparaison
\`\`\`sql
-- Égalité
SELECT * FROM produits WHERE prix = 100;

-- Inégalité
SELECT * FROM produits WHERE prix != 100;
SELECT * FROM produits WHERE prix <> 100;

-- Comparaisons numériques
SELECT * FROM produits WHERE prix > 50;
SELECT * FROM produits WHERE prix <= 200;

-- Plage de valeurs
SELECT * FROM produits WHERE prix BETWEEN 50 AND 200;

-- Liste de valeurs
SELECT * FROM produits WHERE categorie IN ('Livre', 'DVD', 'CD');

-- Recherche de motif
SELECT * FROM utilisateurs WHERE nom LIKE 'A%';  -- Commence par A
SELECT * FROM utilisateurs WHERE email LIKE '%@gmail.com';  -- Finit par @gmail.com
\`\`\`

### Opérateurs logiques
\`\`\`sql
-- ET
SELECT * FROM produits WHERE prix > 50 AND categorie = 'Livre';

-- OU
SELECT * FROM produits WHERE categorie = 'Livre' OR categorie = 'DVD';

-- NON
SELECT * FROM produits WHERE NOT categorie = 'Livre';

-- Valeurs nulles
SELECT * FROM utilisateurs WHERE telephone IS NULL;
SELECT * FROM utilisateurs WHERE telephone IS NOT NULL;
\`\`\`

## Jointures

### INNER JOIN
\`\`\`sql
SELECT u.nom, c.total
FROM utilisateurs u
INNER JOIN commandes c ON u.id = c.utilisateur_id;
\`\`\`

### LEFT JOIN
\`\`\`sql
SELECT u.nom, c.total
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id;
\`\`\`

### RIGHT JOIN
\`\`\`sql
SELECT u.nom, c.total
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id;
\`\`\`

## Fonctions d'Agrégation

\`\`\`sql
-- Compter
SELECT COUNT(*) FROM utilisateurs;
SELECT COUNT(DISTINCT ville) FROM utilisateurs;

-- Somme
SELECT SUM(total) FROM commandes;

-- Moyenne
SELECT AVG(age) FROM utilisateurs;

-- Min/Max
SELECT MIN(prix), MAX(prix) FROM produits;

-- Groupement
SELECT ville, COUNT(*) as nombre_utilisateurs
FROM utilisateurs
GROUP BY ville
HAVING COUNT(*) > 5;
\`\`\`

## Modification des Données

### INSERT
\`\`\`sql
-- Insérer un enregistrement
INSERT INTO utilisateurs (nom, email, age)
VALUES ('Alice', 'alice@email.com', 25);

-- Insérer plusieurs enregistrements
INSERT INTO utilisateurs (nom, email, age)
VALUES 
  ('Bob', 'bob@email.com', 30),
  ('Charlie', 'charlie@email.com', 28);
\`\`\`

### UPDATE
\`\`\`sql
-- Modifier un enregistrement
UPDATE utilisateurs
SET age = 26
WHERE nom = 'Alice';

-- Modifier plusieurs colonnes
UPDATE utilisateurs
SET age = 31, ville = 'Paris'
WHERE nom = 'Bob';
\`\`\`

### DELETE
\`\`\`sql
-- Supprimer des enregistrements
DELETE FROM utilisateurs WHERE age < 18;

-- Supprimer tous les enregistrements (attention !)
DELETE FROM utilisateurs;
\`\`\`

## Bonnes Pratiques SQL

1. **Toujours utiliser WHERE** avec UPDATE/DELETE
2. **Utiliser des index** pour les performances
3. **Éviter SELECT *** en production
4. **Utiliser des alias** pour la lisibilité
5. **Commenter** les requêtes complexes
6. **Tester** sur un échantillon avant production

SQL est un outil puissant pour manipuler et analyser des données !`,
      moduleId: dbModule.id,
    },
  });

  console.log('📚 Cours Base de Données créés');
  // Quiz Base de Données
  const dbQuiz1 = await prisma.quiz.create({
    data: {
      title: 'Quiz : Introduction aux Bases de Données',
      courseId: dbCourse1.id,
    },
  });

  const dbQuestion1 = await prisma.question.create({
    data: {
      text: 'Qu\'est-ce qu\'une clé primaire ?',
      quizId: dbQuiz1.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Une clé qui peut être dupliquée', questionId: dbQuestion1.id, isCorrect: false },
      { text: 'Un identifiant unique pour chaque enregistrement', questionId: dbQuestion1.id, isCorrect: true },
      { text: 'Une clé optionnelle', questionId: dbQuestion1.id, isCorrect: false },
      { text: 'Une clé qui peut être NULL', questionId: dbQuestion1.id, isCorrect: false },
    ],
  });

  const dbQuiz2 = await prisma.quiz.create({
    data: {
      title: 'Quiz : SQL Fondamentaux',
      courseId: dbCourse2.id,
    },
  });

  const dbQuestion2 = await prisma.question.create({
    data: {
      text: 'Quelle commande SQL permet de récupérer des données ?',
      quizId: dbQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'GET', questionId: dbQuestion2.id, isCorrect: false },
      { text: 'SELECT', questionId: dbQuestion2.id, isCorrect: true },
      { text: 'FETCH', questionId: dbQuestion2.id, isCorrect: false },
      { text: 'RETRIEVE', questionId: dbQuestion2.id, isCorrect: false },
    ],
  });

  const dbQuestion3 = await prisma.question.create({
    data: {
      text: 'Que fait la clause WHERE en SQL ?',
      quizId: dbQuiz2.id,
    },
  });

  await prisma.option.createMany({
    data: [
      { text: 'Trie les résultats', questionId: dbQuestion3.id, isCorrect: false },
      { text: 'Filtre les résultats selon une condition', questionId: dbQuestion3.id, isCorrect: true },
      { text: 'Groupe les résultats', questionId: dbQuestion3.id, isCorrect: false },
      { text: 'Limite le nombre de résultats', questionId: dbQuestion3.id, isCorrect: false },
    ],
  });

  console.log('❓ Quiz Base de Données créés');

  // Module 5: Node.js et Backend
  const nodeModule = await prisma.module.create({
    data: {
      title: 'Node.js et Développement Backend',
      description: 'Créez des applications serveur avec Node.js',
    },
  });

  const nodeCourse1 = await prisma.course.create({
    data: {
      title: 'Introduction à Node.js',
      content: `# Introduction à Node.js

Node.js est un environnement d'exécution JavaScript côté serveur qui permet de créer des applications web rapides et scalables.

## Qu'est-ce que Node.js ?

Node.js est un runtime JavaScript construit sur le moteur V8 de Chrome. Il permet d'exécuter du JavaScript en dehors du navigateur, notamment pour créer des serveurs web.

## Caractéristiques Principales

### 1. Asynchrone et Non-Bloquant
Node.js utilise un modèle d'E/S non-bloquant qui le rend efficace et léger.

\`\`\`javascript
// Opération non-bloquante
fs.readFile('fichier.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Cette ligne s\'exécute immédiatement');
\`\`\`

### 2. Mono-Thread avec Event Loop
Un seul thread principal avec une boucle d'événements pour gérer les opérations asynchrones.

### 3. NPM (Node Package Manager)
Le plus grand écosystème de bibliothèques open source au monde.

## Installation et Configuration

### Installation
\`\`\`bash
# Vérifier l'installation
node --version
npm --version

# Initialiser un projet
npm init -y
\`\`\`

### Premier Serveur
\`\`\`javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bonjour depuis Node.js !');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Serveur démarré sur le port \${PORT}\`);
});
\`\`\`

## Modules Node.js

### Modules Intégrés
\`\`\`javascript
// Système de fichiers
const fs = require('fs');

// Chemin
const path = require('path');

// HTTP
const http = require('http');

// URL
const url = require('url');

// Crypto
const crypto = require('crypto');
\`\`\`

### Modules Personnalisés
\`\`\`javascript
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// app.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
\`\`\`

## Gestion des Fichiers

### Lecture de Fichiers
\`\`\`javascript
const fs = require('fs');

// Synchrone (bloquant)
try {
  const data = fs.readFileSync('fichier.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Asynchrone (non-bloquant)
fs.readFile('fichier.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Avec Promises
const fsPromises = require('fs').promises;

async function lireFichier() {
  try {
    const data = await fsPromises.readFile('fichier.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

### Écriture de Fichiers
\`\`\`javascript
// Écrire un fichier
fs.writeFile('nouveau.txt', 'Contenu du fichier', (err) => {
  if (err) throw err;
  console.log('Fichier sauvegardé !');
});

// Ajouter au fichier
fs.appendFile('fichier.txt', 'Nouveau contenu', (err) => {
  if (err) throw err;
  console.log('Contenu ajouté !');
});
\`\`\`

## Serveur HTTP Avancé

\`\`\`javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (path === '/api/users' && method === 'GET') {
    const users = [
      { id: 1, nom: 'Alice' },
      { id: 2, nom: 'Bob' }
    ];
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else if (path === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Utilisateur créé', user: newUser }));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route non trouvée' }));
  }
});

server.listen(3000, () => {
  console.log('Serveur API démarré sur le port 3000');
});
\`\`\`

## NPM et Packages

### Installation de Packages
\`\`\`bash
# Installation locale
npm install express

# Installation globale
npm install -g nodemon

# Installation de développement
npm install --save-dev jest

# Installation depuis package.json
npm install
\`\`\`

### Package.json
\`\`\`json
{
  "name": "mon-app",
  "version": "1.0.0",
  "description": "Mon application Node.js",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
\`\`\`

## Avantages de Node.js

1. **Performance** : V8 engine rapide
2. **Scalabilité** : Gestion efficace des connexions
3. **Écosystème** : NPM avec millions de packages
4. **JavaScript partout** : Même langage frontend/backend
5. **Communauté** : Large communauté active

## Cas d'Usage Idéaux

- **APIs REST** : Services web rapides
- **Applications temps réel** : Chat, notifications
- **Microservices** : Architecture distribuée
- **Outils de build** : Webpack, Gulp
- **Applications IoT** : Objets connectés

Node.js révolutionne le développement backend avec JavaScript !`,
      moduleId: nodeModule.id,
    },
  });

  console.log('📚 Cours Node.js créés');

  console.log('✅ Seeding terminé avec succès !');
  console.log(`
📊 Données créées :
- 👤 1 utilisateur
- 📚 5 modules
- 📖 8 cours
- ❓ 7 quiz
- 🔍 15 questions
- ✅ 60 options
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });