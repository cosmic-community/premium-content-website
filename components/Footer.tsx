import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-paper-dark bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <span className="font-serif text-lg font-bold text-ink">Lumen</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="text-sm text-ink-light hover:text-accent">
              Home
            </Link>
            <Link
              href="/articles"
              className="text-sm text-ink-light hover:text-accent"
            >
              Articles
            </Link>
            <Link
              href="/authors"
              className="text-sm text-ink-light hover:text-accent"
            >
              Authors
            </Link>
          </nav>

          <p className="text-sm text-ink-light">
            © {new Date().getFullYear()} Lumen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}