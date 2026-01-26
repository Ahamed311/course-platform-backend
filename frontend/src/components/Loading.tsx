export default function Loading({ message = "Chargement..." }: { message?: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600"></div>
        <p className="text-zinc-600">{message}</p>
      </div>
    </div>
  );
}