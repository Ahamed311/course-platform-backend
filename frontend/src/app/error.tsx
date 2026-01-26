'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-zinc-900">Plateforme de cours</h1>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-800">
            Une erreur est survenue
          </h2>
          <p className="mb-4 text-red-700">
            {error.message || 'Erreur inconnue'}
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              Réessayer
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="rounded-lg border border-red-300 px-4 py-2 text-red-700 transition hover:bg-red-100"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}