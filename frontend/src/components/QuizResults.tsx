'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { buildApiUrl } from '@/lib/config';

interface QuizResultsProps {
  quizId: number;
  userId?: number;
}

interface QuizResult {
  id: number;
  score: number;
  total: number;
  percentage: number;
  createdAt: string;
}

export default function QuizResults({ quizId, userId = 1 }: QuizResultsProps) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Cette route devra être implémentée dans le backend
        const response = await fetch(buildApiUrl(`/quiz/${quizId}/results?userId=${userId}`));
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId, userId]);

  if (loading) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Résultats précédents
        </h3>
        <p className="text-zinc-600">Chargement...</p>
      </div>
    );
  }

  if (error || results.length === 0) {
    return null; // Ne pas afficher si pas de résultats ou erreur
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
        Résultats précédents
      </h3>
      <div className="space-y-2">
        {results.slice(0, 5).map((result) => (
          <div key={result.id} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-b-0">
            <span className="text-sm text-zinc-600">
              {new Date(result.createdAt).toLocaleDateString('fr-FR')}
            </span>
            <span className={`text-sm font-medium ${
              result.percentage >= 80 ? 'text-green-600' : 
              result.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {result.score}/{result.total} ({Math.round(result.percentage)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}