import Link from 'next/link'
import { Article } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import ContentTypeBadge from '@/components/ContentTypeBadge'
import AccessLevelBadge from '@/components/AccessLevelBadge'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const featuredImage = article.metadata?.featured_image
  const summary = getMetafieldValue(article.metadata?.summary)
  const author = article.metadata?.author
  const videoDuration = getMetafieldValue(article.metadata?.video_duration)
  const isVideo = getMetafieldValue(article.metadata?.content_type) === 'Video'

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-paper-dark bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-dark">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={article.title}
            width={400}
            height={250}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            {isVideo ? '🎬' : '📰'}
          </div>
        )}
        {isVideo && videoDuration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
            {videoDuration}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <ContentTypeBadge contentType={article.metadata?.content_type} />
          <AccessLevelBadge accessLevel={article.metadata?.access_level} />
        </div>

        <h3 className="font-serif text-xl font-bold leading-snug text-ink group-hover:text-accent">
          {article.title}
        </h3>

        {summary && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-light">{summary}</p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4 text-sm text-ink-light">
          {author && <span>{author.title}</span>}
        </div>
      </div>
    </Link>
  )
}