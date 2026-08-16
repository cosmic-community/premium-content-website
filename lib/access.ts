import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ACCESS_COOKIE = 'lumen_premium_access'

const ACCESS_DAYS = 30
export const ACCESS_COOKIE_MAX_AGE = ACCESS_DAYS * 24 * 60 * 60

function getSigningSecret(): string {
  return (
    process.env.ACCESS_TOKEN_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    'insecure-development-secret'
  )
}

function sign(payload: string): string {
  return createHmac('sha256', getSigningSecret()).update(payload).digest('hex')
}

export function createAccessToken(sessionId: string): string {
  const expiresAt = Date.now() + ACCESS_DAYS * 24 * 60 * 60 * 1000
  const payload = `${sessionId}.${expiresAt}`
  return `${payload}.${sign(payload)}`
}

export function verifyAccessToken(token: string | undefined | null): boolean {
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 3) return false

  const sessionId = parts[0]
  const expiresAt = parts[1]
  const signature = parts[2]

  if (!sessionId || !expiresAt || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false

  const expected = sign(`${sessionId}.${expiresAt}`)
  const expectedBuffer = Buffer.from(expected, 'utf8')
  const providedBuffer = Buffer.from(signature, 'utf8')

  if (expectedBuffer.length !== providedBuffer.length) return false

  return timingSafeEqual(expectedBuffer, providedBuffer)
}

export async function hasPremiumAccess(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifyAccessToken(cookieStore.get(ACCESS_COOKIE)?.value)
}
