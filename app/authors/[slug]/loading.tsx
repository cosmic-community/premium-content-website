// app/authors/[slug]/loading.tsx
export default function AuthorLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="flex items-center gap-6 border-b border-paper-dark pb-12">
        <div className="h-32 w-32 animate-pulse rounded-full bg-paper-dark" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-32 animate-pulse rounded bg-paper-dark" />
          <div className="h-10 w-64 animate-pulse rounded bg-paper-dark" />
        </div>
      </div>
    </div>
  )
}