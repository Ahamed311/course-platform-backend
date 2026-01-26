'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Page non trouvée" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent>
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page non trouvée</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Retour à l'accueil
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Page précédente
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}