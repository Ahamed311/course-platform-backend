import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔐 Création de l\'utilisateur administrateur...');

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eduplatform.com' },
    update: {},
    create: {
      email: 'admin@eduplatform.com',
      password: hashedPassword,
      name: 'Administrateur',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Utilisateur administrateur créé:', {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  // Create a test student user
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@eduplatform.com' },
    update: {},
    create: {
      email: 'student@eduplatform.com',
      password: studentPassword,
      name: 'Étudiant Test',
      role: 'STUDENT',
      isActive: true,
    },
  });

  console.log('✅ Utilisateur étudiant créé:', {
    id: student.id,
    email: student.email,
    name: student.name,
    role: student.role,
  });

  console.log('\n📋 Informations de connexion:');
  console.log('Admin - Email: admin@eduplatform.com, Mot de passe: admin123');
  console.log('Étudiant - Email: student@eduplatform.com, Mot de passe: student123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });