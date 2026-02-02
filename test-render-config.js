// Test de la configuration Render
require('dotenv').config({ path: '.env.production' });

console.log('=== TEST CONFIGURATION RENDER ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configuré ✅' : 'Manquant ❌');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Configuré ✅' : 'Manquant ❌');
console.log('CORS_ORIGINS:', process.env.CORS_ORIGINS);
console.log('=====================================');

// Test de connexion à la base de données Render
const { PrismaClient } = require('@prisma/client');

async function testRenderDatabase() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
  
  try {
    console.log('🔄 Test de connexion à la base Render...');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base Render réussie !');
    
    // Test de requête simple
    try {
      const userCount = await prisma.user.count();
      console.log(`👥 Nombre d'utilisateurs: ${userCount}`);
      
      const moduleCount = await prisma.module.count();
      console.log(`📚 Nombre de modules: ${moduleCount}`);
      
      console.log('🎉 Base de données Render opérationnelle !');
    } catch (queryError) {
      console.log('⚠️  Base connectée mais pas de données (normal pour une nouvelle DB)');
      console.log('💡 Exécutez: npm run db:seed-render');
    }
    
  } catch (error) {
    console.log('❌ Erreur de connexion à Render:');
    console.log('   Message:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('');
      console.log('💡 Solutions possibles:');
      console.log('   1. Vérifier DATABASE_URL dans .env.production');
      console.log('   2. Vérifier que la base Render est active');
      console.log('   3. Vérifier les credentials de connexion');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testRenderDatabase();