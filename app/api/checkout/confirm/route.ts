import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import {
  ACCESS_COOKIE,
  ACCESS_COOKIE_MAX_AGE,
  createAccessToken,
} from '@/lib/access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function safePath(value: string | null, fallback: string): string {
  if (value && value.startsWith('/') && !value.startsWith('//')) {
    return value
  }
  return fallback
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin
  const sessionId = request.nextUrl.searchParams.get('session_id')
  const redirectPath = safePath(
    request.nextUrl.searchParams.get('redirect'),
    '/articles'
  )

  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(
      new URL(`${redirectPath}?checkout=failed`, origin)
    )
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const paid =
      session.payment_status === 'paid' ||
      session.payment_status === 'no_payment_required' ||
      session.status === 'complete'

    if (!paid) {
      return NextResponse.redirect(
        new URL(`${redirectPath}?checkout=incomplete`, origin)
      )
    }

    const response = NextResponse.redirect(
      new URL(`${redirectPath}?checkout=success`, origin)
    )

    response.cookies.set(ACCESS_COOKIE, createAccessToken(session.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ACCESS_COOKIE_MAX_AGE,
    })

    return response
  } catch (error) {
    console.error('Failed to confirm Stripe Checkout session:', error)
    return NextResponse.redirect(
      new URL(`${redirectPath}?checkout=failed`, origin)
    )
  }
}
