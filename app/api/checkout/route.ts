import { NextRequest, NextResponse } from 'next/server'
import {
  FALLBACK_CURRENCY,
  FALLBACK_PRICE_CENTS,
  getStripe,
} from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function safePath(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
    return value
  }
  return fallback
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Checkout is not configured yet.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json().catch(() => ({}))
    const returnPath = safePath(
      (body as { returnPath?: unknown })?.returnPath,
      '/articles'
    )
    const origin = request.nextUrl.origin
    const stripe = getStripe()

    const priceId = process.env.STRIPE_PRICE_ID
    const configuredMode = process.env.STRIPE_CHECKOUT_MODE
    const mode: 'payment' | 'subscription' = priceId
      ? configuredMode === 'payment'
        ? 'payment'
        : 'subscription'
      : 'payment'

    const session = await stripe.checkout.sessions.create({
      mode,
      allow_promotion_codes: true,
      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: FALLBACK_CURRENCY,
                unit_amount: FALLBACK_PRICE_CENTS,
                product_data: {
                  name: 'Premium Access',
                  description:
                    'Unlock every premium article and video on the site.',
                },
              },
            },
      ],
      success_url: `${origin}/api/checkout/confirm?session_id={CHECKOUT_SESSION_ID}&redirect=${encodeURIComponent(returnPath)}`,
      cancel_url: `${origin}${returnPath}?checkout=cancelled`,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Failed to create Stripe Checkout session:', error)
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
