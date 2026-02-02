import Link from "next/link";
import { api, Module } from "@/lib/api";
import Header from "@/components/Header";
import Card, { CardHeader, CardContent, CardFooter } from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

export default async function Home() {
  let modules: Module[] = [];
  let totalCourses = 0;
  let totalQuizzes = 0;
  let error = null;

  try {
    // Récupérer les modules
    modules = await api.modules.list();
    
    // Récupérer les cours
    const coursesResponse = await fetch('http://localhost:3001/courses');
    if (coursesResponse.ok) {
      const courses = await coursesResponse.json();
      totalCourses = courses.length;
    }
    
    // Récupérer les quiz
    const quizzesResponse = await fetch('http://localhost:3001/quiz');
    if (quizzesResponse.ok) {
      const quizzes = await quizzesResponse.json();
      totalQuizzes = quizzes.length;
    }
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title="Plateforme d'apprentissage"
        subtitle="Développez vos compétences avec nos modules de formation"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Erreur de chargement</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {modules.length === 0 && !error ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun module disponible</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Il n'y a pas encore de modules de formation. Créez-en via l'API pour commencer.
            </p>
            <div className="bg-slate-100 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-slate-700 font-medium mb-2">Pour créer un module :</p>
              <code className="text-xs bg-white px-2 py-1 rounded border text-slate-800">
                POST /modules
              </code>
            </div>
          </div>
        ) : (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{modules.length}</p>
                    <p className="text-sm text-slate-600">Modules disponibles</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{totalCourses}</p>
                    <p className="text-sm text-slate-600">Cours disponibles</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{totalQuizzes}</p>
                    <p className="text-sm text-slate-600">Quiz interactifs</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Liste des modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Link key={module.id} href={`/modules/${module.id}`}>
                  <Card hover className="h-full">
                    <CardHeader
                      title={module.title}
                      subtitle={module.description || "Module de formation"}
                      icon={
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      }
                      badge={<Badge variant="info">Module #{module.id}</Badge>}
                    />
                    
                    <CardContent>
                      <p className="text-slate-600 text-sm mb-4">
                        Explorez les cours et quiz de ce module pour approfondir vos connaissances.
                      </p>
                    </CardContent>

                    <CardFooter>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Durée flexible
                        </div>
                        <Button size="sm" variant="ghost">
                          Commencer
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}