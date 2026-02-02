export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">EduPlatform</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Plateforme d'apprentissage moderne avec modules, cours textuels et quiz interactifs.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Fonctionnalités</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Modules structurés</li>
              <li>• Cours textuels détaillés</li>
              <li>• Quiz interactifs</li>
              <li>• Suivi des résultats</li>
            </ul>
          </div>

          {/* Informations techniques */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Technologies</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Next.js 16 + React 19</li>
              <li>• NestJS + Prisma</li>
              <li>• PostgreSQL</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © 2026 EduPlatform. Plateforme de cours moderne.
          </p>
          
        </div>
      </div>
    </footer>
  );
}