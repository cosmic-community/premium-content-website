// app/articles/[slug]/loading.tsx
export default function ArticleLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <div className="mb-6 h-6 w-32 animate-pulse rounded bg-paper-dark" />
      <div className="h-12 w-full animate-pulse rounded bg-paper-dark" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-paper-dark" />
      <div className="mt-10 h-96 w-full animate-pulse rounded-2xl bg-paper-dark" />
    </div>
  )
}