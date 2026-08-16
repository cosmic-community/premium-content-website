import { getMetafieldValue } from '@/lib/cosmic'

interface AccessLevelBadgeProps {
  accessLevel?: unknown
}

export default function AccessLevelBadge({ accessLevel }: AccessLevelBadgeProps) {
  const value = getMetafieldValue(accessLevel)

  if (!value) return null

  const isPremium = value === 'Premium'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        isPremium
          ? 'bg-amber-100 text-amber-800'
          : 'bg-sky-100 text-sky-700'
      }`}
    >
      {isPremium ? '✨ Premium' : 'Free'}
    </span>
  )
}