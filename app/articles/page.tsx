import { Suspense } from 'react'
import { getArticles } from '@/lib/cosmic'
import ArticleGrid from '@/components/ArticleGrid'
import ArticleFilters from '@/components/ArticleFilters'
import { ContentType, AccessLevel } from '@/types'

export const revalidate = 60

interface ArticlesPageProps {
  searchParams: Promise<{ content_type?: string; access_level?: string }>
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams

  const contentType = (params.content_type as ContentType) || undefined
  const accessLevel = (params.access_level as AccessLevel) || undefined

  const articles = await getArticles({ contentType, accessLevel })

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ink sm:text-5xl">
          All Articles
        </h1>
        <p className="mt-4 text-lg text-ink-light">
          Explore our full library of text articles and videos. Filter by type
          or access level to find exactly what you&apos;re looking for.
        </p>
      </div>

      <Suspense fallback={<div className="h-14" />}>
        <ArticleFilters
          activeContentType={contentType}
          activeAccessLevel={accessLevel}
        />
      </Suspense>

      {articles.length > 0 ? (
        <div className="mt-10">
          <ArticleGrid articles={articles} />
        </div>
      ) : (
        <div className="mt-16 text-center text-ink-light">
          <p className="text-lg">No articles match your filters.</p>
        </div>
      )}
    </div>
  )
}