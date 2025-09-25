import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@edu/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', ORIGIN)
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{11}$/),
  password: z.string().min(6),
})

const buckets = new Map<string, { count: number; ts: number }>()
function rateLimit(ip: string, limit = 60, windowMs = 60_000) {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || now - b.ts > windowMs) {
    buckets.set(ip, { count: 1, ts: now })
    return true
  }
  if (b.count >= limit) return false
  b.count++
  return true
}

export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 204 })
  cors(res)
  return res
}

export async function POST(req: Request) {
  const traceId = crypto.randomUUID()
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown'
  if (!rateLimit(ip)) {
    const rl = NextResponse.json({ error: 'rate_limited' }, { status: 429 })
    rl.headers.set('x-trace-id', traceId)
    cors(rl)
    return rl
  }

  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      const res = NextResponse.json({ error: 'invalid_body', issues: parsed.error.format() }, { status: 400 })
      res.headers.set('x-trace-id', traceId)
      cors(res)
      return res
    }
    const { name, email, cpf, password } = parsed.data
    const password_hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email: email.toLowerCase(), cpf, password_hash, role: 'STUDENT' },
    })

    const res = NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 })
    res.cookies.set('uid', user.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    res.headers.set('x-trace-id', traceId)
    cors(res)
    return res
  } catch {
    const res = NextResponse.json({ error: 'internal_error' }, { status: 500 })
    res.headers.set('x-trace-id', traceId)
    cors(res)
    return res
  }
}
