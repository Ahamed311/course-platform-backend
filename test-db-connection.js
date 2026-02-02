// Test de connexion à la base de données locale
require('dotenv').config({ path: '.env.production.simple' });

console.log('=== TEST DE CONNEXION BASE DE DONNÉES ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('==========================================');

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
  
  try {
    console.log('🔄 Test de connexion en cours...');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie !');
    
    // Test de requête simple
    const userCount = await prisma.user.count();
    console.log(`👥 Nombre d'utilisateurs: ${userCount}`);
    
    const moduleCount = await prisma.module.count();
    console.log(`📚 Nombre de modules: ${moduleCount}`);
    
    console.log('🎉 Base de données opérationnelle !');
    
  } catch (error) {
    console.log('❌ Erreur de connexion:');
    console.log('   Message:', error.message);
    console.log('   Code:', error.code);
    
    if (error.message.includes('Authentication failed')) {
      console.log('');
      console.log('💡 Solutions possibles:');
      console.log('   1. Vérifier que PostgreSQL est démarré');
      console.log('   2. Vérifier les credentials (username/password)');
      console.log('   3. Vérifier que la base de données "eduplatform" existe');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();