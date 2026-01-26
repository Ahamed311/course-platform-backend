import Loading from "@/components/Loading";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="border-b bg-white px-6 py-4">
        <div className="h-6 w-48 bg-zinc-200 rounded animate-pulse"></div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10">
        <Loading message="Chargement de la page..." />
      </main>
    </div>
  );
}