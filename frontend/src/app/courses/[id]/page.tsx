import Link from "next/link";
import { notFound } from "next/navigation";
import { api, Course, Quiz } from "@/lib/api";
import Header from "@/components/Header";
import Card, { CardHeader, CardContent, CardFooter } from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courseId = Number(id);
  if (Number.isNaN(courseId)) notFound();

  let course: Course | null = null;
  let quizzes: Quiz[] = [];
  let error = null;

  try {
    [course, quizzes] = await Promise.all([
      api.courses.one(courseId),
      api.quiz.byCourse(courseId),
    ]);
  } catch (err: any) {
    if (err.status === 404) {
      notFound();
    }
    error = err.message;
  }

  if (!course && !error) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={course?.title || `Cours #${courseId}`}
        subtitle="Contenu du cours et quiz associés"
        breadcrumbs={[
          { label: "Modules", href: "/" },
          ...(course?.module ? [{ label: course.module.title, href: `/modules/${course.module.id}` }] : []),
          { label: course?.title || `Cours #${courseId}` }
        ]}
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

        {course && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader
                  title="Contenu du cours"
                  subtitle={`${course.content.length} caractères • ~${Math.ceil(course.content.length / 200)} min de lecture`}
                  icon={
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />
                
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {course.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Informations du cours */}
              <Card className="mb-6">
                <CardHeader
                  title="Informations"
                  icon={
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">ID du cours</span>
                      <Badge variant="default">#{course.id}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Module</span>
                      <Badge variant="info">{course.module?.title || 'N/A'}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Quiz disponibles</span>
                      <Badge variant="success">{quizzes.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz disponibles */}
              <Card>
                <CardHeader
                  title="Quiz disponibles"
                  subtitle={`${quizzes.length} quiz pour tester vos connaissances`}
                  icon={
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
                
                <CardContent>
                  {quizzes.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        Aucun quiz disponible pour ce cours.
                      </p>
                      <p className="text-xs text-slate-500">
                        Créez-en via l'API pour tester vos connaissances.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quizzes.map((quiz, index) => (
                        <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                          <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 group-hover:text-blue-700">
                                {quiz.title}
                              </h4>
                              <Badge variant="default">Quiz #{quiz.id}</Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">
                              Quiz {index + 1} • Testez vos connaissances
                            </p>
                            <Button size="sm" variant="primary" fullWidth>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Commencer le quiz
                            </Button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}