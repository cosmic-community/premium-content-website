// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getArticlesByAuthor, getMetafieldValue } from '@/lib/cosmic'
import ArticleGrid from '@/components/ArticleGrid'

export const revalidate = 60

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const articles = await getArticlesByAuthor(author.id)
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: author.id, object_type: 'authors' })}
      />

      <div className="flex flex-col items-center gap-6 border-b border-paper-dark pb-12 text-center sm:flex-row sm:text-left">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.title}
            width={128}
            height={128}
            className="h-32 w-32 flex-shrink-0 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-paper-dark text-4xl font-semibold text-ink">
            {author.title.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Author
          </p>
          <h1 className="font-serif text-4xl font-bold text-ink">
            {author.title}
          </h1>
          {bio && (
            <p className="mt-4 max-w-2xl text-lg text-ink-light">{bio}</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 font-serif text-2xl font-bold text-ink">
          Published Articles
        </h2>
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} />
        ) : (
          <p className="text-ink-light">No articles published yet.</p>
        )}
      </div>
    </div>
  )
}