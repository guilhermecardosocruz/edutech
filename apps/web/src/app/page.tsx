export const dynamic = 'force-dynamic'
export const revalidate = 0

type Aula = { id: string; titulo: string; data: string; turma_id: string }

async function getAulas(): Promise<Aula[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/aulas`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function Home() {
  const aulas = await getAulas()
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Aulas</h1>
        <a href="/aulas/nova" className="px-3 py-2 rounded bg-[#0A66FF] text-white">Nova aula</a>
      </header>
      {aulas.length === 0 ? (
        <p className="text-gray-600">Nenhuma aula cadastrada.</p>
      ) : (
        <ul className="space-y-2">
          {aulas.map((a) => (
            <li key={a.id} className="border rounded p-3">
              <div className="font-medium">{a.titulo}</div>
              <div className="text-sm text-gray-700">{new Date(a.data).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Turma: {a.turma_id}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
