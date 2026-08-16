import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper-dark bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📰</span>
          <span className="font-serif text-xl font-bold text-ink">Lumen</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="hidden text-sm font-medium text-ink-light hover:text-accent sm:block"
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-sm font-medium text-ink-light hover:text-accent"
          >
            Articles
          </Link>
          <Link
            href="/authors"
            className="text-sm font-medium text-ink-light hover:text-accent"
          >
            Authors
          </Link>
          <Link
            href="/articles?access_level=Premium"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ink-light"
          >
            Go Premium
          </Link>
        </nav>
      </div>
    </header>
  )
}