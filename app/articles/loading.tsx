export default function ArticlesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 h-10 w-64 animate-pulse rounded bg-paper-dark" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-paper-dark" />
        ))}
      </div>
    </div>
  )
}