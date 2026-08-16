import Link from 'next/link'
import { Article } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import ContentTypeBadge from '@/components/ContentTypeBadge'
import AccessLevelBadge from '@/components/AccessLevelBadge'

interface HeroProps {
  article: Article
}

export default function Hero({ article }: HeroProps) {
  const featuredImage = article.metadata?.featured_image
  const summary = getMetafieldValue(article.metadata?.summary)
  const author = article.metadata?.author

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={article.title}
            width={1000}
            height={600}
            className="h-full w-full object-cover opacity-40"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink via-ink-light to-accent-dark opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <ContentTypeBadge contentType={article.metadata?.content_type} />
          <AccessLevelBadge accessLevel={article.metadata?.access_level} />
        </div>

        <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-6xl">
          {article.title}
        </h1>

        {summary && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            {summary}
          </p>
        )}

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href={`/articles/${article.slug}`}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-ink shadow-lg transition hover:bg-white/90"
          >
            Read Now
          </Link>
          {author && (
            <span className="text-sm text-white/70">By {author.title}</span>
          )}
        </div>
      </div>
    </section>
  )
}