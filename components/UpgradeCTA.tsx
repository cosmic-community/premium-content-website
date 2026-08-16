import Link from 'next/link'

export default function UpgradeCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-10 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
        🔒
      </div>
      <h3 className="font-serif text-2xl font-bold text-ink">
        This is Premium Content
      </h3>
      <p className="mx-auto mt-3 max-w-md text-ink-light">
        Subscribe to unlock the full article, exclusive videos, and more
        premium content from our expert authors.
      </p>
      <Link
        href="/articles"
        className="mt-6 inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600"
      >
        Subscribe to Continue Reading
      </Link>
    </div>
  )
}