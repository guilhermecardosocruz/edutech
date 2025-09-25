import { NextResponse } from 'next/server'
import { prisma } from '@edu/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const traceId = crypto.randomUUID()
  try {
    const ping = await prisma.$queryRawUnsafe('SELECT 1 as ok')
    const res = NextResponse.json(
      {
        ok: true,
        db: 'reachable',
        ping,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasShadowUrl: !!process.env.SHADOW_DATABASE_URL,
      },
      { status: 200 },
    )
    res.headers.set('x-trace-id', traceId)
    return res
  } catch (e: any) {
    const res = NextResponse.json(
      {
        ok: false,
        db: 'unreachable',
        error: e?.message || String(e),
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasShadowUrl: !!process.env.SHADOW_DATABASE_URL,
      },
      { status: 500 },
    )
    res.headers.set('x-trace-id', traceId)
    return res
  }
}
