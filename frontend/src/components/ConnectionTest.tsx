'use client';

import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/lib/config';
import Button from './Button';
import Card, { CardHeader, CardContent } from './Card';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}

export default function ConnectionTest() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Connexion Backend', status: 'pending', message: 'En attente...' },
    { name: 'Modules API', status: 'pending', message: 'En attente...' },
    { name: 'Authentification', status: 'pending', message: 'En attente...' },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (index: number, status: TestResult['status'], message: string) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, status, message } : test
    ));
  };

  const runTests = async () => {
    setIsRunning(true);
    
    // Test 1: Connexion de base
    try {
      const response = await fetch(buildApiUrl('/modules'));
      if (response.ok) {
        const data = await response.json();
        updateTest(0, 'success', `Backend accessible - ${data.length} modules trouvés`);
      } else {
        updateTest(0, 'error', `Erreur HTTP ${response.status}`);
      }
    } catch (error) {
      updateTest(0, 'error', `Erreur de connexion: ${error instanceof Error ? error.message : 'Inconnue'}`);
    }

    // Test 2: API Modules
    try {
      const response = await fetch(buildApiUrl('/modules'));
      if (response.ok) {
        const data = await response.json();
        updateTest(1, 'success', `${data.length} modules chargés`);
      } else {
        updateTest(1, 'error', `Erreur API: ${response.status}`);
      }
    } catch (error) {
      updateTest(1, 'error', `Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`);
    }

    // Test 3: Authentification
    try {
      const response = await fetch(buildApiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'etudiant@eduplatform.com',
          password: 'password123'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        updateTest(2, 'success', `Authentification OK - Token: ${data.access_token ? 'Présent' : 'Absent'}`);
      } else {
        updateTest(2, 'error', `Erreur auth: ${response.status}`);
      }
    } catch (error) {
      updateTest(2, 'error', `Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`);
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Diagnostic de Connexion"
        subtitle="Test de la connectivité avec le backend"
        icon={
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
      />
      <CardContent>
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  test.status === 'success' ? 'bg-green-500' :
                  test.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-medium">{test.name}</span>
              </div>
              <span className={`text-sm ${
                test.status === 'success' ? 'text-green-600' :
                test.status === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {test.message}
              </span>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? 'Test en cours...' : 'Relancer les tests'}
            </Button>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <strong>Solutions si erreur :</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Vérifiez que le backend est démarré : <code>npm run start:dev</code></li>
              <li>Vérifiez que PostgreSQL fonctionne</li>
              <li>Videz le cache du navigateur (Ctrl+Shift+R)</li>
              <li>Redémarrez le frontend : <code>cd frontend && npm run dev</code></li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}