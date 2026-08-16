'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ContentType, AccessLevel } from '@/types'

interface ArticleFiltersProps {
  activeContentType?: ContentType
  activeAccessLevel?: AccessLevel
}

const contentTypes: ContentType[] = ['Text Article', 'Video']
const accessLevels: AccessLevel[] = ['Free', 'Premium']

export default function ArticleFilters({
  activeContentType,
  activeAccessLevel,
}: ArticleFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateFilter(key: 'content_type' | 'access_level', value?: string) {
    const params = new URLSearchParams(searchParams.toString())

    const current = params.get(key)

    if (current === value || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  const hasActiveFilters = Boolean(activeContentType || activeAccessLevel)

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-paper-dark pb-8">
      <span className="mr-2 text-sm font-semibold text-ink">Content Type:</span>
      {contentTypes.map((type) => (
        <button
          key={type}
          onClick={() => updateFilter('content_type', type)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            activeContentType === type
              ? 'border-accent bg-accent text-white'
              : 'border-paper-dark text-ink-light hover:border-accent hover:text-accent'
          }`}
        >
          {type}
        </button>
      ))}

      <span className="ml-4 mr-2 text-sm font-semibold text-ink">Access:</span>
      {accessLevels.map((level) => (
        <button
          key={level}
          onClick={() => updateFilter('access_level', level)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            activeAccessLevel === level
              ? 'border-accent bg-accent text-white'
              : 'border-paper-dark text-ink-light hover:border-accent hover:text-accent'
          }`}
        >
          {level}
        </button>
      ))}

      {hasActiveFilters && (
        <button
          onClick={() => router.push(pathname)}
          className="ml-2 text-sm font-medium text-ink-light underline hover:text-accent"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}