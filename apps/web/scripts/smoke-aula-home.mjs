const BASE = process.env.BASE || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
const hdr = { 'content-type': 'application/json' }
const now = new Date()
const pad = (n)=>String(n).padStart(2,'0')
const isoLocal = (d)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`

async function main() {
  console.log('BASE =', BASE)
  for (const p of ['/api/turmas','/api/aulas','/api/chamadas']) {
    const r = await fetch(BASE + p, { cache: 'no-store' })
    console.log(p, r.status)
    if (!r.ok) throw new Error(`Falha ${p} -> ${r.status}`)
  }
  const turmaNome = `Smoke Turma ${Date.now()}`
  let r = await fetch(BASE + '/api/turmas', {
    method: 'POST', headers: hdr,
    body: JSON.stringify({ nome: turmaNome, ano: new Date().getFullYear(), turno: 'manha' })
  })
  if (r.status !== 201) throw new Error(`POST /api/turmas ${r.status}`)
  const turma = await r.json()
  const titulo = `Smoke Aula ${Date.now()}`
  r = await fetch(BASE + '/api/aulas', {
    method: 'POST', headers: hdr,
    body: JSON.stringify({ titulo, data: isoLocal(now), turma_id: turma.id })
  })
  if (r.status !== 201) throw new Error(`POST /api/aulas ${r.status}`)
  const home = await fetch(BASE + '/', { cache: 'no-store' })
  const html = await home.text()
  if (!html.includes(titulo)) throw new Error('Home não refletiu a aula criada')
  console.log('SMOKE PASS')
}
main().catch((e)=>{ console.error('SMOKE FAIL', e.message || e); process.exit(1) })
