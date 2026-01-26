'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api, Quiz, QuizResult } from '@/lib/api';
import Card, { CardHeader, CardContent, CardFooter } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

interface QuizFormProps {
  quiz: Quiz;
}

export default function QuizForm({ quiz }: QuizFormProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user) {
      setError('Vous devez être connecté pour soumettre un quiz');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await api.quiz.submit(quiz.id, {
        userId: user.id,
        answers: Object.entries(answers).map(([questionId, optionId]) => ({
          questionId: parseInt(questionId),
          optionId
        }))
      });

      setResult(result);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Connexion requise</h2>
              <p className="text-slate-600 mb-6">
                Vous devez être connecté pour passer ce quiz.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push('/login')} variant="primary">
                  Se connecter
                </Button>
                <Button onClick={() => router.push('/register')} variant="outline">
                  Créer un compte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (result) {
    const percentage = Math.round(result.percentage);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isAverage = percentage >= 50;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent>
            <div className="mb-6">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isExcellent ? 'bg-green-100' : 
                isGood ? 'bg-blue-100' : 
                isAverage ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {isExcellent ? (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : isGood ? (
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : isAverage ? (
                  <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {isExcellent ? 'Excellent !' : 
                 isGood ? 'Bien joué !' : 
                 isAverage ? 'Pas mal !' : 'À revoir'}
              </h2>
              
              <p className="text-lg text-slate-600 mb-6">
                Vous avez obtenu <span className="font-bold text-slate-900">{result.score}/{result.total}</span> soit <span className="font-bold">{percentage}%</span>
              </p>

              <div className="flex justify-center mb-6">
                <Badge 
                  variant={isExcellent ? 'success' : isGood ? 'info' : isAverage ? 'warning' : 'error'}
                  size="md"
                >
                  {percentage}% de réussite
                </Badge>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  {isExcellent ? 'Parfait ! Vous maîtrisez parfaitement ce sujet.' :
                   isGood ? 'Très bien ! Vous avez une bonne compréhension du sujet.' :
                   isAverage ? 'Correct ! Il y a encore quelques points à revoir.' :
                   'Il serait bon de revoir le cours avant de retenter le quiz.'}
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => router.back()} variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour au cours
              </Button>
              <Button onClick={() => window.location.reload()} variant="primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refaire le quiz
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const allQuestionsAnswered = quiz.questions.every(q => answers[q.id] !== undefined);
  const progress = (Object.keys(answers).length / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Barre de progression */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progression</span>
            <span className="text-sm text-slate-500">{Object.keys(answers).length}/{quiz.questions.length}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader
                title={`Question ${index + 1}`}
                subtitle={question.text}
                icon={
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                badge={
                  answers[question.id] ? (
                    <Badge variant="success">Répondu</Badge>
                  ) : (
                    <Badge variant="default">En attente</Badge>
                  )
                }
              />
              
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        answers[question.id] === option.id
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        answers[question.id] === option.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300'
                      }`}>
                        {answers[question.id] === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-slate-700 flex-1">{option.text}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Annuler
          </Button>
          
          <Button
            type="submit"
            disabled={!allQuestionsAnswered || isSubmitting}
            loading={isSubmitting}
            variant="primary"
            size="lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Soumettre le quiz
          </Button>
        </div>
      </form>
    </div>
  );
}