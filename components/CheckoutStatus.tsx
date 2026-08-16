'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Status = 'success' | 'failed' | 'incomplete'

const MESSAGES: Record<
  Status,
  { title: string; body: string; classes: string; icon: string }
> = {
  success: {
    title: 'Payment successful — you now have premium access',
    body: 'Thanks for your purchase! Every premium article and video is unlocked on this device. Enjoy reading.',
    classes: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    icon: '✓',
  },
  incomplete: {
    title: 'Your payment is still processing',
    body: 'We have not received confirmation from Stripe yet. Refresh in a moment, or check your email for a receipt.',
    classes: 'border-amber-200 bg-amber-50 text-amber-900',
    icon: '!',
  },
  failed: {
    title: 'We could not complete your purchase',
    body: 'No charge was made. Please try again, and contact us if the problem continues.',
    classes: 'border-rose-200 bg-rose-50 text-rose-900',
    icon: '×',
  },
}

function isStatus(value: string | null): value is Status {
  return value === 'success' || value === 'failed' || value === 'incomplete'
}

export default function CheckoutStatus() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const rawStatus = searchParams.get('checkout')
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    if (!isStatus(rawStatus)) return

    setStatus(rawStatus)

    // Clean the query param so a refresh or share does not re-show the banner.
    const params = new URLSearchParams(searchParams.toString())
    params.delete('checkout')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [rawStatus, pathname, router, searchParams])

  if (!status) return null

  const message = MESSAGES[status]

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
      <div
        role="status"
        aria-live="polite"
        className={`flex items-start gap-4 rounded-2xl border p-5 shadow-sm ${message.classes}`}
      >
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-base font-bold"
        >
          {message.icon}
        </span>
        <div className="flex-1">
          <p className="font-semibold">{message.title}</p>
          <p className="mt-1 text-sm opacity-90">{message.body}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus(null)}
          aria-label="Dismiss message"
          className="shrink-0 rounded-full px-2 text-xl leading-none opacity-60 transition hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  )
}
