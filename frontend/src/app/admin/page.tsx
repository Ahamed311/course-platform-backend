'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProtectedRoute from '@/components/ProtectedRoute';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  _count?: {
    quizResults: number;
  };
}

interface Stats {
  users: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
    students: number;
  };
  quiz: {
    totalResults: number;
    averageScore: number;
  };
  recent?: {
    users: User[];
  };
}

interface Module {
  id: number;
  title: string;
  description?: string;
  _count?: {
    courses: number;
  };
}

function AdminContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'analytics'>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Load users
      const usersResponse = await fetch('http://localhost:3001/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const usersData = await usersResponse.json();
      
      // Load stats
      const statsResponse = await fetch('http://localhost:3001/users/stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const statsData = await statsResponse.json();
      
      // Load modules
      const modulesResponse = await fetch('http://localhost:3001/modules');
      const modulesData = await modulesResponse.json();
      
      setUsers(usersData.users || usersData);
      setStats(statsData);
      setModules(modulesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action: string, userId: number, data?: any) => {
    try {
      const token = localStorage.getItem('token');
      
      switch (action) {
        case 'toggle-status':
          await fetch(`http://localhost:3001/users/${userId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ isActive: !data.isActive }),
          });
          break;
        case 'change-role':
          await fetch(`http://localhost:3001/users/${userId}/role`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ role: data.role }),
          });
          break;
        case 'delete':
          if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            await fetch(`http://localhost:3001/users/${userId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` },
            });
          }
          break;
        case 'reset-progress':
          if (confirm('Êtes-vous sûr de vouloir réinitialiser les progrès de cet utilisateur ?')) {
            await fetch(`http://localhost:3001/users/${userId}/quiz-results`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` },
            });
          }
          break;
      }
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'action');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && user.isActive) ||
                         (filterStatus === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du panel admin...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Administration"
        subtitle="Gestion de la plateforme éducative"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration' }
        ]}
      />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
              { id: 'users', label: 'Utilisateurs', icon: '👥' },
              { id: 'content', label: 'Contenu', icon: '📚' },
              { id: 'analytics', label: 'Statistiques', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-700">Utilisateurs Total</p>
                    <p className="text-3xl font-bold text-blue-900">{stats.users.total}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">✅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-700">Utilisateurs Actifs</p>
                    <p className="text-3xl font-bold text-green-900">{stats.users.active}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-700">Quiz Complétés</p>
                    <p className="text-3xl font-bold text-purple-900">{stats.quiz.totalResults}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">⭐</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-yellow-700">Score Moyen</p>
                    <p className="text-3xl font-bold text-yellow-900">{stats.quiz.averageScore.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Actions Rapides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="flex items-center justify-center space-x-2"
                  onClick={() => setActiveTab('users')}
                >
                  <span>👤</span>
                  <span>Gérer Utilisateurs</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                  onClick={() => setActiveTab('content')}
                >
                  <span>📚</span>
                  <span>Gérer Contenu</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                  onClick={() => setActiveTab('analytics')}
                >
                  <span>📊</span>
                  <span>Voir Analytics</span>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            {stats.recent?.users && (
              <Card>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">📅 Utilisateurs Récents</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {stats.recent.users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name || 'Sans nom'}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === 'ADMIN' ? 'success' : 'default'}>
                            {user.role === 'ADMIN' ? 'Admin' : 'Étudiant'}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="🔍 Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les rôles</option>
                    <option value="STUDENT">Étudiants</option>
                    <option value="ADMIN">Administrateurs</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="active">Actifs</option>
                    <option value="inactive">Inactifs</option>
                  </select>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push('/admin/create-user')}>
                  ➕ Nouvel Utilisateur
                </Button>
              </div>
            </Card>

            {/* Users Table */}
            <Card>
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">
                  Gestion des Utilisateurs ({filteredUsers.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quiz
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                              user.role === 'ADMIN' ? 'bg-purple-500' : 'bg-blue-500'
                            }`}>
                              {user.role === 'ADMIN' ? '👨‍💼' : '👨‍🎓'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name || 'Sans nom'}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => handleUserAction('change-role', user.id, { role: e.target.value })}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                          >
                            <option value="STUDENT">Étudiant</option>
                            <option value="ADMIN">Administrateur</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {user._count?.quizResults || 0}
                          </div>
                          <div className="text-xs text-gray-500">quiz complétés</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUserAction('toggle-status', user.id, { isActive: user.isActive })}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white ${
                                user.isActive 
                                  ? 'bg-orange-600 hover:bg-orange-700' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                            >
                              {user.isActive ? 'Désactiver' : 'Activer'}
                            </button>
                            <button
                              onClick={() => handleUserAction('reset-progress', user.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => handleUserAction('delete', user.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg">Aucun utilisateur trouvé</p>
                  <p className="text-gray-400 text-sm">Essayez de modifier vos filtres</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">📚 Gestion du Contenu Éducatif</h2>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push('/admin/create-module')}>
                ➕ Nouveau Module
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xl">📖</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                        <Badge variant="default" className="text-xs">ID: {module.id}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        router.push(`/admin/edit-module/${module.id}`);
                      }}
                    >
                      ✏️ Modifier
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">📚</span>
                      <span>{module._count?.courses || 0} cours</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => router.push(`/modules/${module.id}`)}
                      >
                        👁️ Voir
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="text-xs"
                        onClick={async () => {
                          if (confirm(`Êtes-vous sûr de vouloir supprimer le module "${module.title}" ?`)) {
                            try {
                              const token = localStorage.getItem('token');
                              await fetch(`http://localhost:3001/modules/${module.id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${token}` },
                              });
                              loadData(); // Recharger les données
                            } catch (err) {
                              setError('Erreur lors de la suppression');
                            }
                          }
                        }}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {modules.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun module trouvé</h3>
                <p className="text-gray-500 mb-4">Commencez par créer votre premier module éducatif</p>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push('/admin/create-module')}>
                  ➕ Créer le Premier Module
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && stats && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">📈 Analytiques Avancées</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎭 Répartition des Rôles</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👨‍🎓</span>
                      <span className="text-gray-700 font-medium">Étudiants</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{stats.users.students}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">👨‍💼</span>
                      <span className="text-gray-700 font-medium">Administrateurs</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{stats.users.admins}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Statut des Utilisateurs</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">✅</span>
                      <span className="text-gray-700 font-medium">Actifs</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{stats.users.active}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">❌</span>
                      <span className="text-gray-700 font-medium">Inactifs</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">{stats.users.inactive}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Performance des Quiz</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{stats.quiz.totalResults}</div>
                    <div className="text-sm text-gray-600">Quiz Complétés</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">{stats.quiz.averageScore.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Score Moyen</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{modules.length}</div>
                    <div className="text-sm text-gray-600">Modules Actifs</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireRole="ADMIN">
      <AdminContent />
    </ProtectedRoute>
  );
}