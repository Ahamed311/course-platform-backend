'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { buildApiUrl, getAuthHeaders } from '@/lib/config';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Module {
  id: number;
  title: string;
  description?: string;
}

function CreateCourseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedModuleId = searchParams.get('moduleId');
  
  const [modules, setModules] = useState<Module[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    moduleId: preselectedModuleId ? parseInt(preselectedModuleId) : 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const response = await fetch(buildApiUrl('/modules'));
      const modulesData = await response.json();
      setModules(modulesData);
    } catch (err) {
      setError('Erreur lors du chargement des modules');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(buildApiUrl('/courses'), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du cours');
      }

      router.push('/admin?tab=content');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Créer un Cours"
        subtitle="Ajoutez un nouveau cours à un module existant"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Créer Cours' }
        ]}
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📖</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Nouveau Cours</h2>
            <p className="text-gray-600">Créez un cours détaillé pour enrichir vos modules</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700 mb-2">
                Module de destination *
              </label>
              <select
                id="moduleId"
                required
                value={formData.moduleId}
                onChange={(e) => setFormData({ ...formData, moduleId: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={0}>Sélectionnez un module</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre du Cours *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Introduction aux Variables JavaScript"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu du Cours *
              </label>
              <textarea
                id="content"
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="# Titre du Cours

## Introduction

Votre contenu ici...

## Concepts Clés

- Point 1
- Point 2

## Exemples

```javascript
// Votre code ici
```

## Conclusion

Résumé du cours..."
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Vous pouvez utiliser Markdown pour formater votre contenu (titres, listes, code, etc.)
              </p>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim() || formData.moduleId === 0}
                className="flex-1"
              >
                {loading ? 'Création...' : 'Créer le Cours'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function CreateCoursePage() {
  return (
    <ProtectedRoute requireRole="ADMIN">
      <CreateCourseContent />
    </ProtectedRoute>
  );
}