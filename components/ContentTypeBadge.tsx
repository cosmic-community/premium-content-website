import { getMetafieldValue } from '@/lib/cosmic'

interface ContentTypeBadgeProps {
  contentType?: unknown
}

export default function ContentTypeBadge({ contentType }: ContentTypeBadgeProps) {
  const value = getMetafieldValue(contentType)

  if (!value) return null

  const isVideo = value === 'Video'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isVideo
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-emerald-100 text-emerald-700'
      }`}
    >
      {isVideo ? '▶ Video' : '📄 Article'}
    </span>
  )
}