import { Card, Button } from '@edu/ui'
import { currencyBRL } from '@edu/utils'

const turmas = [
  { id: 't1', nome: 'Turma 6º A', planos: 12 },
  { id: 't2', nome: 'Turma 7º B', planos: 9 }
]

export default function Page() {
  return (
    <main className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard do Professor</h1>
      <section className="grid sm:grid-cols-2 gap-4">
        {turmas.map(t => (
          <Card key={t.id} className="p-4">
            <p className="text-xl font-semibold">{t.nome}</p>
            <p className="text-sm text-gray-600">Planos publicados: {t.planos}</p>
            <div className="mt-3 flex gap-2">
              <Button>Ver planos</Button>
              <Button variant="ghost">Criar plano</Button>
            </div>
          </Card>
        ))}
      </section>
      <p className="text-sm text-gray-500">Exemplo: {currencyBRL(5000)} para referência.</p>
    </main>
  )
}
