'use client'
import { useState } from 'react'

export default function NovaAulaPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      titulo: String(form.get('titulo') || ''),
      data: String(form.get('data') || ''),
      turma_id: String(form.get('turma_id') || ''),
    }
    try {
      const res = await fetch('/api/aulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Falha ao criar aula')
      window.location.href = '/'
    } catch (err: any) {
      setMsg(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Nova aula</h1>
      <form onSubmit={onSubmit} className="space-y-4" aria-describedby="form-status">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium">Título</label>
          <input id="titulo" name="titulo" required className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="data" className="block text-sm font-medium">Data</label>
          <input id="data" name="data" type="datetime-local" required className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="turma_id" className="block text-sm font-medium">Turma</label>
          <input id="turma_id" name="turma_id" placeholder="ID da turma" required className="mt-1 w-full border rounded p-2" />
        </div>
        <button disabled={loading} className="w-full rounded bg-[#0A66FF] text-white py-2 font-medium disabled:opacity-60">
          {loading ? 'Criando...' : 'Criar aula'}
        </button>
        <p id="form-status" aria-live="polite" className="text-sm text-gray-700">{msg}</p>
      </form>
    </main>
  )
}
