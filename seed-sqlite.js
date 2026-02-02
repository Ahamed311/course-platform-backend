// Seed pour la base de données SQLite de production
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed de la base de données SQLite...');

  // Créer un utilisateur admin
  const adminPassword = await bcrypt.hash('admin123', 10);
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
  const studentPassword = await bcrypt.hash('password123', 10);
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

  // Créer un module
  const module = await prisma.module.create({
    data: {
      title: 'JavaScript Fundamentals',
      description: 'Apprenez les bases de JavaScript',
    },
  });

  // Créer un cours
  const course = await prisma.course.create({
    data: {
      title: 'Introduction à JavaScript',
      content: 'JavaScript est un langage de programmation...',
      moduleId: module.id,
    },
  });

  // Créer un quiz
  const quiz = await prisma.quiz.create({
    data: {
      title: 'Quiz JavaScript Basics',
      courseId: course.id,
    },
  });

  // Créer une question
  const question = await prisma.question.create({
    data: {
      text: 'Quel est le type de données pour les nombres en JavaScript ?',
      quizId: quiz.id,
    },
  });

  // Créer des options
  await prisma.option.createMany({
    data: [
      {
        text: 'number',
        isCorrect: true,
        questionId: question.id,
      },
      {
        text: 'string',
        isCorrect: false,
        questionId: question.id,
      },
      {
        text: 'boolean',
        isCorrect: false,
        questionId: question.id,
      },
    ],
  });

  console.log('✅ Seed terminé !');
  console.log(`👤 Admin: admin@eduplatform.com / admin123`);
  console.log(`👤 Étudiant: etudiant@eduplatform.com / password123`);
  console.log(`📚 Module: ${module.title}`);
  console.log(`📖 Cours: ${course.title}`);
  console.log(`🧪 Quiz: ${quiz.title}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });