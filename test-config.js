// Script de test pour vérifier la configuration
require('dotenv').config({ path: '.env.production' });

console.log('=== CONFIGURATION DE PRODUCTION ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configuré' : 'Non configuré');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Configuré' : 'Non configuré');
console.log('CORS_ORIGINS:', process.env.CORS_ORIGINS);
console.log('=====================================');

// Test de connexion à la base de données
const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Test de connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');
    
    // Test simple
    const userCount = await prisma.user.count();
    console.log(`📊 Nombre d'utilisateurs: ${userCount}`);
    
  } catch (error) {
    console.log('❌ Erreur de connexion à la base de données:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();