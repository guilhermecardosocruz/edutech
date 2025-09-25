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
  aula_id: z.string().min(1),
  user_id: z.string().min(1),
  status: z.enum(['PRESENTE', 'AUSENTE', 'JUSTIFICADO']),
  obs: z.string().max(280).optional(),
})

export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 204 })
  cors(res)
  return res
}

export async function GET() {
  const traceId = crypto.randomUUID()
  const res = NextResponse.json(
    await prisma.presenca.findMany({ orderBy: { created_at: 'desc' } }),
    { status: 200 }
  )
  res.headers.set('x-trace-id', traceId)
  cors(res)
  return res
}

export async function POST(req: Request) {
  const traceId = crypto.randomUUID()
  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    const r = NextResponse.json({ error: 'invalid_body', issues: parsed.error.flatten() }, { status: 400 })
    r.headers.set('x-trace-id', traceId)
    cors(r)
    return r
  }
  const { aula_id, user_id, status, obs } = parsed.data
  const presenca = await prisma.presenca.upsert({
    where: { aula_id_user_id: { aula_id, user_id } },
    create: { aula_id, user_id, status, obs },
    update: { status, obs },
  })
  const r = NextResponse.json(presenca, { status: 201 })
  r.headers.set('x-trace-id', traceId)
  cors(r)
  return r
}
