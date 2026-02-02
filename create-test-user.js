// Script pour créer un utilisateur de test sur Render
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  console.log('🔧 Création d\'un utilisateur de test...');

  try {
    // Vérifier la connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // Compter les utilisateurs existants
    const userCount = await prisma.user.count();
    console.log(`👥 Utilisateurs existants: ${userCount}`);

    // Créer un utilisateur admin de test
    const adminPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {
        password: adminPassword,
      },
      create: {
        email: 'admin@test.com',
        name: 'Admin Test',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    // Créer un utilisateur étudiant de test
    const studentPassword = await bcrypt.hash('student123', 12);
    
    const student = await prisma.user.upsert({
      where: { email: 'student@test.com' },
      update: {
        password: studentPassword,
      },
      create: {
        email: 'student@test.com',
        name: 'Student Test',
        password: studentPassword,
        role: 'STUDENT',
        isActive: true,
      },
    });

    console.log('✅ Utilisateurs de test créés:');
    console.log(`👤 Admin: admin@test.com / admin123`);
    console.log(`👤 Student: student@test.com / student123`);

    // Vérifier le total
    const newUserCount = await prisma.user.count();
    console.log(`👥 Total utilisateurs: ${newUserCount}`);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();