// Seed pour la base de données Render PostgreSQL
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed de la base de données Render...');

  try {
    // Créer un utilisateur admin
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@eduplatform.com' },
      update: {},
      create: {
        email: 'admin@eduplatform.com',
        name: 'Administrateur',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    // Créer un utilisateur étudiant
    const studentPassword = await bcrypt.hash('password123', 12);
    const student = await prisma.user.upsert({
      where: { email: 'etudiant@eduplatform.com' },
      update: {},
      create: {
        email: 'etudiant@eduplatform.com',
        name: 'Étudiant Test',
        password: studentPassword,
        role: 'STUDENT',
      },
    });

    // Créer des modules
    const jsModule = await prisma.module.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'JavaScript Fundamentals',
        description: 'Apprenez les bases de JavaScript pour le développement web moderne',
      },
    });

    const reactModule = await prisma.module.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'React Development',
        description: 'Maîtrisez React pour créer des applications web interactives',
      },
    });

    // Créer des cours
    const jsCourse = await prisma.course.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Introduction à JavaScript',
        content: `# Introduction à JavaScript

JavaScript est un langage de programmation dynamique et polyvalent, principalement utilisé pour le développement web.

## Variables et Types de Données

\`\`\`javascript
let nom = "John";
const age = 25;
var isStudent = true;
\`\`\`

## Fonctions

\`\`\`javascript
function saluer(nom) {
  return "Bonjour " + nom + "!";
}
\`\`\`

## Objets et Tableaux

\`\`\`javascript
const personne = {
  nom: "Alice",
  age: 30
};

const nombres = [1, 2, 3, 4, 5];
\`\`\``,
        moduleId: jsModule.id,
      },
    });

    const reactCourse = await prisma.course.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Composants React',
        content: `# Composants React

React utilise des composants pour construire des interfaces utilisateur.

## Composant Fonctionnel

\`\`\`jsx
function Welcome(props) {
  return <h1>Bonjour, {props.name}!</h1>;
}
\`\`\`

## Hooks

\`\`\`jsx
import { useState, useEffect } from 'react';

function Counter() {
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
\`\`\``,
        moduleId: reactModule.id,
      },
    });

    // Créer des quiz
    const jsQuiz = await prisma.quiz.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Quiz JavaScript Basics',
        courseId: jsCourse.id,
      },
    });

    const reactQuiz = await prisma.quiz.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Quiz React Components',
        courseId: reactCourse.id,
      },
    });

    // Créer des questions pour le quiz JavaScript
    const jsQuestion1 = await prisma.question.upsert({
      where: { id: 1 },
      update: {},
      create: {
        text: 'Quel est le type de données pour les nombres en JavaScript ?',
        quizId: jsQuiz.id,
      },
    });

    const jsQuestion2 = await prisma.question.upsert({
      where: { id: 2 },
      update: {},
      create: {
        text: 'Comment déclare-t-on une constante en JavaScript ?',
        quizId: jsQuiz.id,
      },
    });

    // Créer des questions pour le quiz React
    const reactQuestion1 = await prisma.question.upsert({
      where: { id: 3 },
      update: {},
      create: {
        text: 'Quel hook utilise-t-on pour gérer l\'état local dans un composant fonctionnel ?',
        quizId: reactQuiz.id,
      },
    });

    // Créer des options pour les questions
    await prisma.option.createMany({
      data: [
        // Question JS 1
        { text: 'number', isCorrect: true, questionId: jsQuestion1.id },
        { text: 'string', isCorrect: false, questionId: jsQuestion1.id },
        { text: 'boolean', isCorrect: false, questionId: jsQuestion1.id },
        { text: 'object', isCorrect: false, questionId: jsQuestion1.id },
        
        // Question JS 2
        { text: 'const', isCorrect: true, questionId: jsQuestion2.id },
        { text: 'let', isCorrect: false, questionId: jsQuestion2.id },
        { text: 'var', isCorrect: false, questionId: jsQuestion2.id },
        { text: 'final', isCorrect: false, questionId: jsQuestion2.id },
        
        // Question React 1
        { text: 'useState', isCorrect: true, questionId: reactQuestion1.id },
        { text: 'useEffect', isCorrect: false, questionId: reactQuestion1.id },
        { text: 'useContext', isCorrect: false, questionId: reactQuestion1.id },
        { text: 'useReducer', isCorrect: false, questionId: reactQuestion1.id },
      ],
      skipDuplicates: true,
    });

    console.log('✅ Seed terminé avec succès !');
    console.log('');
    console.log('📊 Données créées :');
    console.log(`👤 Admin: admin@eduplatform.com / admin123`);
    console.log(`👤 Étudiant: etudiant@eduplatform.com / password123`);
    console.log(`📚 Modules: ${jsModule.title}, ${reactModule.title}`);
    console.log(`📖 Cours: ${jsCourse.title}, ${reactCourse.title}`);
    console.log(`🧪 Quiz: ${jsQuiz.title}, ${reactQuiz.title}`);
    console.log('');
    console.log('🚀 Base de données prête pour la production !');

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });