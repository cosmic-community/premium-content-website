import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl">📭</p>
      <h1 className="mt-6 font-serif text-3xl font-bold text-ink">
        Page Not Found
      </h1>
      <p className="mt-3 text-ink-light">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Back to Homepage
      </Link>
    </div>
  )
}