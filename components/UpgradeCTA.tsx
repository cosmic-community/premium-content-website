'use client'

import { useState } from 'react'

interface UpgradeCTAProps {
  returnPath?: string
}

export default function UpgradeCTA({ returnPath = '/articles' }: UpgradeCTAProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubscribe() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnPath }),
      })

      const data = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null

      if (!response.ok || !data?.url) {
        setError(data?.error || 'Unable to start checkout. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Unable to start checkout. Please try again.')
      setLoading(false)
    }
  }

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
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className="mt-6 inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Redirecting to checkout…' : 'Subscribe to Continue Reading'}
      </button>
      {error && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="mt-4 text-xs text-ink-light">
        Secure checkout powered by Stripe.
      </p>
    </div>
  )
}
