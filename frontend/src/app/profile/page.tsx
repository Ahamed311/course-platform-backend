'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Card, { CardHeader, CardContent } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

interface QuizResult {
  id: number;
  score: number;
  total: number;
  createdAt: string;
  percentage?: number; // Calculé côté client
  quiz: {
    id: number;
    title: string;
    course: {
      title: string;
      module: {
        title: string;
      };
    };
  };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchUserResults();
  }, [user, router]);

  const fetchUserResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/quiz/results/user/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Calculer le pourcentage pour chaque résultat
        const resultsWithPercentage = data.map((result: any) => ({
          ...result,
          percentage: result.total > 0 ? (result.score / result.total) * 100 : 0
        }));
        setResults(resultsWithPercentage);
      }
    } catch (err) {
      setError('Erreur lors du chargement des résultats');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const averageScore = results.length > 0 
    ? Math.round(results.reduce((sum, result) => sum + (result.percentage || 0), 0) / results.length)
    : 0;

  const totalQuizzes = results.length;
  const excellentResults = results.filter(r => (r.percentage || 0) >= 90).length;
  const goodResults = results.filter(r => (r.percentage || 0) >= 70 && (r.percentage || 0) < 90).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Mon Profil"
        subtitle="Gérez votre compte et consultez vos résultats"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Profil' }
        ]}
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations du profil */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader
                title="Informations personnelles"
                icon={
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.name || 'Utilisateur'}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="mt-2">
                      <Badge variant={user.role === 'ADMIN' ? 'success' : 'default'}>
                        {user.role === 'ADMIN' ? 'Administrateur' : 'Étudiant'}
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Membre depuis</span>
                      <span className="font-medium">Janvier 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quiz complétés</span>
                      <span className="font-medium">{totalQuizzes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Score moyen</span>
                      <span className="font-medium">{averageScore}%</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier le profil
                    </Button>
                    <Button variant="outline" onClick={logout} className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistiques et résultats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{excellentResults}</div>
                    <div className="text-sm text-gray-600">Excellents résultats</div>
                    <div className="text-xs text-gray-500">≥ 90%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{goodResults}</div>
                    <div className="text-sm text-gray-600">Bons résultats</div>
                    <div className="text-xs text-gray-500">70-89%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{averageScore}%</div>
                    <div className="text-sm text-gray-600">Score moyen</div>
                    <div className="text-xs text-gray-500">Tous quiz</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Historique des résultats */}
            <Card>
              <CardHeader
                title="Historique des quiz"
                subtitle={`${totalQuizzes} quiz complétés`}
                icon={
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600">Aucun quiz complété pour le moment</p>
                    <Button onClick={() => router.push('/')} className="mt-4">
                      Explorer les cours
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((result) => (
                      <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {result.quiz?.title || 'Quiz sans titre'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {result.quiz?.course?.module?.title || 'Module'} → {result.quiz?.course?.title || 'Cours'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(result.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {result.score}/{result.total}
                            </div>
                            <Badge 
                              variant={
                                (result.percentage || 0) >= 90 ? 'success' :
                                (result.percentage || 0) >= 70 ? 'info' :
                                (result.percentage || 0) >= 50 ? 'warning' : 'error'
                              }
                            >
                              {Math.round(result.percentage || 0)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}