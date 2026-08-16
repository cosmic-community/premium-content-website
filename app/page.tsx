import Link from 'next/link'
import { getArticles } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ArticleGrid from '@/components/ArticleGrid'

export const revalidate = 60

export default async function HomePage() {
  const articles = await getArticles()

  const featured = articles[0]
  const rest = articles.slice(1, 7)
  const videos = articles
    .filter((a) => a.metadata?.content_type === 'Video')
    .slice(0, 3)

  return (
    <div>
      {featured && <Hero article={featured} />}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-ink-light">
              Fresh perspectives, delivered regularly.
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-semibold text-accent hover:text-accent-dark sm:block"
          >
            View all articles →
          </Link>
        </div>

        {rest.length > 0 ? (
          <ArticleGrid articles={rest} />
        ) : (
          <p className="text-ink-light">
            No articles published yet. Check back soon.
          </p>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/articles" className="text-sm font-semibold text-accent">
            View all articles →
          </Link>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="bg-paper-dark py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
                  Featured Videos
                </h2>
                <p className="mt-2 text-ink-light">
                  Watch, learn, and explore in-depth video content.
                </p>
              </div>
              <Link
                href="/articles?content_type=Video"
                className="hidden text-sm font-semibold text-accent hover:text-accent-dark sm:block"
              >
                View all videos →
              </Link>
            </div>
            <ArticleGrid articles={videos} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
          Unlock Premium Content
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-light">
          Subscribe for full access to premium articles, in-depth videos, and
          exclusive insights from our expert authors.
        </p>
        <Link
          href="/articles"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-dark"
        >
          Browse All Content
        </Link>
      </section>
    </div>
  )
}