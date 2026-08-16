import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="flex items-start gap-4 rounded-2xl border border-paper-dark bg-white p-6 transition hover:shadow-md"
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={author.title}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-paper-dark text-xl font-semibold text-ink">
          {author.title.charAt(0)}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Author
        </p>
        <h3 className="font-serif text-xl font-bold text-ink">{author.title}</h3>
        {bio && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-light">{bio}</p>
        )}
      </div>
    </Link>
  )
}