import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const revalidate = 60

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ink sm:text-5xl">
          Our Authors
        </h1>
        <p className="mt-4 text-lg text-ink-light">
          Meet the writers and creators behind our premium content.
        </p>
      </div>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) =>
            author && author.id ? (
              <AuthorCard key={author.id} author={author} />
            ) : null
          )}
        </div>
      ) : (
        <p className="text-ink-light">No authors found.</p>
      )}
    </div>
  )
}