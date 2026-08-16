// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getMetafieldValue } from '@/lib/cosmic'
import { hasPremiumAccess } from '@/lib/access'
import ContentTypeBadge from '@/components/ContentTypeBadge'
import AccessLevelBadge from '@/components/AccessLevelBadge'
import VideoEmbed from '@/components/VideoEmbed'
import UpgradeCTA from '@/components/UpgradeCTA'
import AuthorCard from '@/components/AuthorCard'
import Markdown from '@/components/Markdown'

export const dynamic = 'force-dynamic'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const accessLevel = getMetafieldValue(article.metadata?.access_level)
  const contentType = getMetafieldValue(article.metadata?.content_type)
  const isPremium = accessLevel === 'Premium'
  const isVideo = contentType === 'Video'

  const unlocked = isPremium ? await hasPremiumAccess() : true
  const locked = isPremium && !unlocked

  const author = article.metadata?.author
  const featuredImage = article.metadata?.featured_image
  const publishedDate = getMetafieldValue(article.metadata?.published_date)
  const videoDuration = getMetafieldValue(article.metadata?.video_duration)
  const summary = getMetafieldValue(article.metadata?.summary)
  const videoUrl = getMetafieldValue(article.metadata?.video_url)

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: article.id, object_type: 'articles' })}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <ContentTypeBadge contentType={article.metadata?.content_type} />
        <AccessLevelBadge accessLevel={article.metadata?.access_level} />
        {isVideo && videoDuration && (
          <span className="text-sm font-medium text-ink-light">
            {videoDuration}
          </span>
        )}
      </div>

      <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
        {article.title}
      </h1>

      {summary && (
        <p className="mt-6 text-xl leading-relaxed text-ink-light">{summary}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-paper-dark py-6">
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-center gap-3 hover:opacity-80"
          >
            {author.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.title}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper-dark text-lg font-semibold text-ink">
                {author.title.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-ink">{author.title}</p>
              <p className="text-sm text-ink-light">Author</p>
            </div>
          </Link>
        )}
        {publishedDate && (
          <p className="text-sm text-ink-light">
            {new Date(publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={article.title}
          width={800}
          height={450}
          className="mt-10 w-full rounded-2xl object-cover shadow-lg"
        />
      )}

      <div className="mt-10">
        {locked ? (
          <UpgradeCTA returnPath={`/articles/${slug}`} />
        ) : (
          <>
            {isVideo && videoUrl && (
              <div className="mb-10">
                <VideoEmbed url={videoUrl} />
              </div>
            )}
            {article.metadata?.body ? (
              <Markdown content={article.metadata.body} />
            ) : !isVideo ? (
              <p className="text-ink-light">Full content coming soon.</p>
            ) : null}
          </>
        )}
      </div>

      {author && (
        <div className="mt-16 border-t border-paper-dark pt-10">
          <AuthorCard author={author} />
        </div>
      )}
    </article>
  )
}
