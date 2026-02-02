import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Fonction pour charger les variables d'environnement de manière robuste
function loadEnvironment() {
  const logger = new Logger('Environment');
  
  // Essayer différents fichiers d'environnement
  const envFiles = [
    '.env.production.simple',
    '.env.production',
    '.env.local',
    '.env'
  ];
  
  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      logger.log(`📁 Chargement de ${envFile}`);
      dotenv.config({ path: envFile });
      
      // Vérifier si DATABASE_URL est définie
      if (process.env.DATABASE_URL) {
        logger.log(`✅ DATABASE_URL trouvée dans ${envFile}`);
        return envFile;
      }
    }
  }
  
  // Fallback : configuration par défaut
  logger.warn('⚠️  Aucun fichier d\'environnement trouvé, utilisation des valeurs par défaut');
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./fallback.db';
  process.env.PORT = process.env.PORT || '3003';
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  
  return 'default';
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  // Charger l'environnement
  const envFile = loadEnvironment();
  
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log'] 
      : ['log', 'error', 'warn', 'debug', 'verbose']
  });

  // Configuration CORS dynamique selon l'environnement
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : [
        'http://localhost:3000', 
        'http://127.0.0.1:3000',
        'http://192.168.1.65:3000'
      ];

  // Fonction pour valider les origines Vercel
  const isValidOrigin = (origin: string) => {
    if (!origin) return false;
    
    // Autoriser localhost pour le développement
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return true;
    }
    
    // Autoriser toutes les URLs Vercel du projet
    if (origin.includes('vercel.app') && 
        (origin.includes('course-platform') || origin.includes('ahamed-seidous-projects'))) {
      return true;
    }
    
    // Autoriser les origines configurées
    return corsOrigins.includes(origin);
  };

  app.enableCors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);
      
      if (isValidOrigin(origin)) {
        callback(null, true);
      } else {
        logger.warn(`🚫 CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuration du port
  const port = process.env.PORT ?? 3001;
  
  try {
    await app.listen(port);
    
    const environment = process.env.NODE_ENV || 'development';
    logger.log(`🚀 Application démarrée en mode ${environment}`);
    logger.log(`📁 Configuration chargée depuis: ${envFile}`);
    logger.log(`📡 API disponible sur : http://localhost:${port}`);
    logger.log(`🏥 Health check : http://localhost:${port}/health`);
    logger.log(`🌐 CORS autorisé pour : ${corsOrigins.join(', ')}`);
    logger.log(`🗄️  Base de données : ${process.env.DATABASE_URL?.substring(0, 50)}...`);
    
  } catch (error) {
    logger.error(`❌ Erreur lors du démarrage : ${error.message}`);
    
    // Suggestions d'aide
    if (error.message.includes('Authentication failed')) {
      logger.error('💡 Problème de base de données détecté');
      logger.error('   Solutions possibles:');
      logger.error('   1. Exécuter: setup-sqlite-production.bat');
      logger.error('   2. Vérifier PostgreSQL et les credentials');
      logger.error('   3. Utiliser SQLite: DATABASE_URL="file:./production.db"');
    }
    
    process.exit(1);
  }
}
bootstrap();
