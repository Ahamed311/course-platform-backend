// Test de différents mots de passe PostgreSQL
const { PrismaClient } = require('@prisma/client');

const passwords = [
  '', // Sans mot de passe
  'password',
  'postgres',
  'admin',
  '123456',
  'root'
];

async function testPassword(password) {
  const dbUrl = password 
    ? `postgresql://postgres:${password}@localhost:5432/postgres`
    : `postgresql://postgres@localhost:5432/postgres`;
    
  console.log(`🔄 Test avec: ${password || '(sans mot de passe)'}`);
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl
      }
    },
    log: []
  });
  
  try {
    await prisma.$connect();
    console.log(`✅ SUCCÈS avec: ${password || '(sans mot de passe)'}`);
    console.log(`   URL: ${dbUrl}`);
    
    // Tester si la base eduplatform existe
    const result = await prisma.$queryRaw`SELECT datname FROM pg_database WHERE datname = 'eduplatform'`;
    if (result.length > 0) {
      console.log(`✅ Base de données 'eduplatform' trouvée !`);
    } else {
      console.log(`⚠️  Base de données 'eduplatform' n'existe pas`);
    }
    
    await prisma.$disconnect();
    return password;
  } catch (error) {
    console.log(`❌ Échec avec: ${password || '(sans mot de passe)'}`);
    await prisma.$disconnect();
    return null;
  }
}

async function findWorkingPassword() {
  console.log('=== RECHERCHE DU MOT DE PASSE POSTGRESQL ===');
  console.log('');
  
  for (const password of passwords) {
    const working = await testPassword(password);
    if (working !== null) {
      console.log('');
      console.log('🎉 MOT DE PASSE TROUVÉ !');
      console.log(`   Utilisez: postgresql://postgres${working ? ':' + working : ''}@localhost:5432/eduplatform`);
      return;
    }
    console.log('');
  }
  
  console.log('❌ Aucun mot de passe ne fonctionne.');
  console.log('💡 Solutions:');
  console.log('   1. Réinitialiser le mot de passe PostgreSQL');
  console.log('   2. Utiliser SQLite pour les tests locaux');
}

findWorkingPassword();