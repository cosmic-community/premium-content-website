import Stripe from 'stripe'

let cachedClient: Stripe | null = null

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }

  if (!cachedClient) {
    cachedClient = new Stripe(secretKey)
  }

  return cachedClient
}

// Price shown when no STRIPE_PRICE_ID is configured (in cents).
export const FALLBACK_PRICE_CENTS = 900
export const FALLBACK_CURRENCY = 'usd'
