'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { buildApiUrl, getAuthHeaders } from '@/lib/config';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Module {
  id: number;
  title: string;
  description?: string;
  _count?: {
    courses: number;
  };
}

function EditModuleContent() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.id as string;
  
  const [module, setModule] = useState<Module | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    try {
      const response = await fetch(buildApiUrl(`/modules/${moduleId}`));
      if (!response.ok) {
        throw new Error('Module non trouvé');
      }
      
      const moduleData = await response.json();
      setModule(moduleData);
      setFormData({
        title: moduleData.title,
        description: moduleData.description || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(buildApiUrl(`/modules/${moduleId}`), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du module');
      }

      router.push('/admin?tab=content');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de modification');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!module) return;
    
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer le module "${module.title}" ?\n\nCette action supprimera également tous les cours et quiz associés.`;
    
    if (confirm(confirmMessage)) {
      try {
        const response = await fetch(buildApiUrl(`/modules/${moduleId}`), {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }

        router.push('/admin?tab=content');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de suppression');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du module...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !module) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Erreur"
          subtitle="Module non trouvé"
        />
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Module non trouvé</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push('/admin?tab=content')}>
              Retour à l'administration
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Modifier le Module`}
        subtitle={module ? `Édition de "${module.title}"` : 'Modification du module'}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Modifier Module' }
        ]}
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire d'édition */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✏️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Modifier le Module</h2>
                <p className="text-gray-600">Mettez à jour les informations du module</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Module *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: JavaScript Fondamentaux"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez le contenu et les objectifs de ce module..."
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/admin?tab=content')}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving || !formData.title.trim()}
                    className="flex-1"
                  >
                    {saving ? 'Enregistrement...' : 'Enregistrer les Modifications'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Informations et actions */}
          <div className="space-y-6">
            {/* Informations du module */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Informations</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID du module :</span>
                  <span className="font-medium">#{moduleId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre de cours :</span>
                  <span className="font-medium">{module?._count?.courses || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut :</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Actif
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions rapides */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions Rapides</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/modules/${moduleId}`)}
                >
                  <span className="mr-2">👁️</span>
                  Voir le Module
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/admin/create-course?moduleId=${moduleId}`)}
                >
                  <span className="mr-2">➕</span>
                  Ajouter un Cours
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/admin?tab=content')}
                >
                  <span className="mr-2">📚</span>
                  Gérer le Contenu
                </Button>
              </div>
            </Card>

            {/* Zone de danger */}
            <Card className="p-6 border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4">⚠️ Zone de Danger</h3>
              <p className="text-sm text-red-700 mb-4">
                La suppression du module est irréversible et supprimera tous les cours et quiz associés.
              </p>
              <Button
                variant="danger"
                className="w-full"
                onClick={handleDelete}
              >
                🗑️ Supprimer le Module
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditModulePage() {
  return (
    <ProtectedRoute requireRole="ADMIN">
      <EditModuleContent />
    </ProtectedRoute>
  );
}