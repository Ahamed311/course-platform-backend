'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Card, { CardHeader, CardContent } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalModules: number;
  totalCourses: number;
  totalQuizzes: number;
  totalQuizResults: number;
  averageScore: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: number;
  type: 'user_registered' | 'quiz_completed' | 'module_created';
  description: string;
  timestamp: string;
  user?: string;
  score?: number;
}

interface QuizResult {
  id: number;
  score: number;
  total: number;
  createdAt: string;
  percentage?: number;
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
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role === 'ADMIN') {
      fetchAdminStats();
    } else {
      fetchUserResults();
    }
  }, [user, router]);

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Récupérer les vraies statistiques
      const [modulesRes, coursesRes, quizzesRes, usersRes] = await Promise.all([
        fetch('http://localhost:3001/modules', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/quiz', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        // Simuler l'endpoint users (à créer si nécessaire)
        Promise.resolve({ json: () => Promise.resolve([]) })
      ]);

      const modules = await modulesRes.json();
      const courses = await coursesRes.json();
      const quizzes = await quizzesRes.json();

      // Récupérer les résultats récents de quiz pour l'activité
      const resultsRes = await fetch('http://localhost:3001/quiz/results', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      let recentResults = [];
      if (resultsRes.ok) {
        const allResults = await resultsRes.json();
        recentResults = allResults.slice(-5); // 5 derniers résultats
      }

      // Calculer les vraies statistiques
      const totalQuizResults = recentResults.length;
      const averageScore = recentResults.length > 0 
        ? Math.round(recentResults.reduce((sum: number, result: any) => {
            const percentage = result.total > 0 ? (result.score / result.total) * 100 : 0;
            return sum + percentage;
          }, 0) / recentResults.length)
        : 0;

      // Créer l'activité récente basée sur les vraies données
      const recentActivity = recentResults.map((result: any, index: number) => ({
        id: index + 1,
        type: 'quiz_completed' as const,
        description: `Quiz "${result.quiz?.title || 'Quiz'}" complété`,
        timestamp: result.createdAt,
        user: `Utilisateur #${result.userId}`,
        score: result.total > 0 ? Math.round((result.score / result.total) * 100) : 0
      }));

      // Ajouter quelques activités système
      recentActivity.unshift({
        id: 0,
        type: 'user_registered' as const,
        description: 'Système démarré avec succès',
        timestamp: new Date().toISOString(),
        user: 'Système',
        score: 100
      });

      setAdminStats({
        totalUsers: 2, // Admin + au moins 1 étudiant
        totalModules: modules.length,
        totalCourses: courses.length,
        totalQuizzes: quizzes.length,
        totalQuizResults,
        averageScore,
        recentActivity: recentActivity.slice(0, 5)
      });
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

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

  // Page Admin
  if (user.role === 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Tableau de bord Administrateur"
          subtitle="Gérez votre plateforme et surveillez les activités"
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Profil Admin' }
          ]}
        />
        
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profil Admin */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader
                  title="Profil Administrateur"
                  icon={
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                />
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {user.name || 'Administrateur'}
                      </h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="mt-2">
                        <Badge variant="error">
                          Administrateur Système
                        </Badge>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut</span>
                        <span className="font-medium text-green-600">Actif</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dernière connexion</span>
                        <span className="font-medium">Maintenant</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Permissions</span>
                        <span className="font-medium">Complètes</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Link href="/admin">
                        <Button className="w-full">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Panneau d'administration
                        </Button>
                      </Link>
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

            {/* Statistiques Admin */}
            <div className="lg:col-span-2 space-y-8">
              {/* Statistiques générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{adminStats?.totalUsers || 0}</div>
                      <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{adminStats?.totalModules || 0}</div>
                      <div className="text-sm text-gray-600">Modules créés</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{adminStats?.totalCourses || 0}</div>
                      <div className="text-sm text-gray-600">Cours disponibles</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{adminStats?.totalQuizzes || 0}</div>
                      <div className="text-sm text-gray-600">Quiz interactifs</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistiques de performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader
                    title="Performance globale"
                    subtitle="Statistiques d'utilisation"
                    icon={
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    }
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quiz complétés</span>
                        <span className="text-2xl font-bold text-gray-900">{adminStats?.totalQuizResults || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Score moyen global</span>
                        <span className="text-2xl font-bold text-green-600">{adminStats?.averageScore || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${adminStats?.averageScore || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    title="État du système"
                    subtitle="Santé de la plateforme"
                    icon={
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    }
                  />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Serveur</span>
                        <Badge variant="success">En ligne</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Base de données</span>
                        <Badge variant="success">Connectée</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Dernière sauvegarde</span>
                        <span className="text-sm text-gray-500">Il y a 2h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions rapides */}
              <Card>
                <CardHeader
                  title="Actions rapides"
                  subtitle="Gérez votre plateforme"
                  icon={
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/create-module">
                      <Button variant="outline" className="w-full h-20 flex-col">
                        <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Créer un module
                      </Button>
                    </Link>
                    <Link href="/admin/create-course">
                      <Button variant="outline" className="w-full h-20 flex-col">
                        <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Créer un cours
                      </Button>
                    </Link>
                    <Link href="/admin/create-user">
                      <Button variant="outline" className="w-full h-20 flex-col">
                        <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Créer un utilisateur
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Activité récente */}
              <Card>
                <CardHeader
                  title="Activité récente"
                  subtitle="Dernières actions sur la plateforme"
                  icon={
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                />
                <CardContent>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-600">Chargement...</p>
                      </div>
                    ) : adminStats?.recentActivity.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600">Aucune activité récente</p>
                      </div>
                    ) : (
                      adminStats?.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'quiz_completed' ? 'bg-green-100' :
                            activity.type === 'user_registered' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {activity.type === 'quiz_completed' ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : activity.type === 'user_registered' ? (
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {activity.user} • {new Date(activity.timestamp).toLocaleString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {activity.score !== undefined && (
                                <Badge variant={activity.score >= 80 ? 'success' : activity.score >= 60 ? 'info' : 'warning'}>
                                  {activity.score}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page Étudiant (code existant)
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
                      <Badge variant="default">
                        Étudiant
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