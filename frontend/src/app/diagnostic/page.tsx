import ConnectionTest from '@/components/ConnectionTest';
import Header from '@/components/Header';

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Diagnostic Système"
        subtitle="Vérification de la connectivité et des services"
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ConnectionTest />
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Cette page de diagnostic vous aide à identifier les problèmes de connexion.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Accédez à cette page via : <code>http://localhost:3000/diagnostic</code>
          </p>
        </div>
      </div>
    </div>
  );
}