// Test avec la configuration de développement
require('dotenv').config({ path: '.env' });

console.log('=== TEST AVEC CONFIG DÉVELOPPEMENT ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('======================================');

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
  
  try {
    console.log('🔄 Test de connexion...');
    await prisma.$connect();
    console.log('✅ Connexion réussie !');
    
    const userCount = await prisma.user.count();
    console.log(`👥 Utilisateurs: ${userCount}`);
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();