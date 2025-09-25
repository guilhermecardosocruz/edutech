import { NextResponse } from 'next/server'
import { z } from 'zod'
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

const createSchema = z.object({
  titulo: z.string().min(2),
  data: z.string().or(z.date()).transform((v) => new Date(v as any)),
  turma_id: z.string().min(1),
})

export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 204 })
  cors(res)
  return res
}

export async function GET() {
  const traceId = crypto.randomUUID()
  try {
    const data = await prisma.aula.findMany({ orderBy: { data: 'desc' } })
    const res = NextResponse.json(data, { status: 200 })
    res.headers.set('x-trace-id', traceId)
    cors(res)
    return res
  } catch (e: any) {
    const res = NextResponse.json(
      { error: 'internal_error', hint: 'db_or_env_issue', message: e?.message || 'unknown' },
      { status: 500 },
    )
    res.headers.set('x-trace-id', traceId)
    cors(res)
    return res
  }
}

export async function POST(req: Request) {
  const traceId = crypto.randomUUID()
  try {
    const body = await req.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      const r = NextResponse.json({ error: 'invalid_body', issues: parsed.error.flatten() }, { status: 400 })
      r.headers.set('x-trace-id', traceId)
      cors(r)
      return r
    }
    const aula = await prisma.aula.create({ data: parsed.data })
    const r = NextResponse.json(aula, { status: 201 })
    r.headers.set('x-trace-id', traceId)
    cors(r)
    return r
  } catch (e: any) {
    const r = NextResponse.json(
      { error: 'internal_error', hint: 'db_or_env_issue', message: e?.message || 'unknown' },
      { status: 500 },
    )
    r.headers.set('x-trace-id', traceId)
    cors(r)
    return r
  }
}
