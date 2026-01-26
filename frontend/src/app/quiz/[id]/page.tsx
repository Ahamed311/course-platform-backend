import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import Header from "@/components/Header";
import QuizForm from "@/components/QuizForm";
import QuizResults from "@/components/QuizResults";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quizId = Number(id);
  if (Number.isNaN(quizId)) notFound();

  const quiz = await api.quiz.one(quizId).catch(() => null);
  if (!quiz) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={quiz.title}
        subtitle={`${quiz.questions.length} questions • Quiz interactif`}
        breadcrumbs={[
          { label: "Modules", href: "/" },
          { label: "Cours", href: `/courses/${quiz.courseId}` },
          { label: quiz.title }
        ]}
      />
      
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <QuizResults quizId={quiz.id} />
          </div>
        </div>
        <QuizForm quiz={quiz} />
      </main>
    </div>
  );
}
