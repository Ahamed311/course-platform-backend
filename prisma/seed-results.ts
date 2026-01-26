import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addQuizResults() {
  console.log('📊 Ajout de résultats de quiz...');

  // Récupérer l'utilisateur et les quiz
  const user = await prisma.user.findFirst();
  const quizzes = await prisma.quiz.findMany();

  if (!user || quizzes.length === 0) {
    console.log('❌ Aucun utilisateur ou quiz trouvé');
    return;
  }

  // Ajouter des résultats variés pour simuler un vrai usage
  const results = [
    // JavaScript - Très bon
    { quizId: quizzes[0]?.id, score: 3, total: 3, userId: user.id },
    { quizId: quizzes[1]?.id, score: 2, total: 2, userId: user.id },
    
    // React - Bon
    { quizId: quizzes[2]?.id, score: 2, total: 2, userId: user.id },
    { quizId: quizzes[3]?.id, score: 1, total: 1, userId: user.id },
    
    // CSS - Moyen
    { quizId: quizzes[4]?.id, score: 1, total: 2, userId: user.id },
    
    // Base de données - À améliorer
    { quizId: quizzes[5]?.id, score: 1, total: 1, userId: user.id },
    { quizId: quizzes[6]?.id, score: 2, total: 3, userId: user.id },
  ];

  // Filtrer les résultats valides
  const validResults = results.filter(result => result.quizId);

  for (const result of validResults) {
    try {
      await prisma.quizResult.create({
        data: result,
      });
    } catch (error) {
      console.log(`⚠️ Résultat déjà existant pour le quiz ${result.quizId}`);
    }
  }

  console.log(`✅ ${validResults.length} résultats de quiz ajoutés !`);
}

addQuizResults()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });