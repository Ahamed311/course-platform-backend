'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from './Button';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, breadcrumbs, actions }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation principale */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  EduPlatform
                </h1>
                <p className="text-xs text-slate-500 -mt-1">Plateforme d'apprentissage</p>
              </div>
            </Link>
          </div>

          {/* Actions et authentification */}
          <div className="flex items-center space-x-4">
            {actions}
            
            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Administration
                    </Button>
                  </Link>
                )}
                
                <Link href="/profile">
                  <Button variant="outline" size="sm">
                    Mon Profil
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.role === 'ADMIN' ? 'Administrateur' : 'Étudiant'}
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumbs et titre */}
        {(breadcrumbs || title) && (
          <div className="pb-6 pt-4">
            {breadcrumbs && (
              <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && (
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {item.href ? (
                      <Link href={item.href} className="hover:text-blue-600 transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-slate-900 font-medium">{item.label}</span>
                    )}
                  </div>
                ))}
              </nav>
            )}
            
            {title && (
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{title}</h1>
                {subtitle && (
                  <p className="text-lg text-slate-600">{subtitle}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}