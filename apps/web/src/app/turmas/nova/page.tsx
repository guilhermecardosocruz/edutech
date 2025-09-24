export const metadata = { title: "Nova Turma — Edutech" };

export default function NovaTurmaPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[720px]">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-4">Criar nova turma</h1>

        <form action="/api/turmas/create" method="post" className="card p-5 sm:p-6 space-y-4">
          <label className="block text-sm font-medium text-neutral-800">
            Nome da turma
            <input
              type="text"
              name="name"            // <- obrigatório
              required
              placeholder="Ex.: 6º Ano A"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="px-3 py-1.5 rounded-md bg-[var(--color-secondary)] text-white text-sm hover:opacity-90"
          >
            Criar turma
          </button>
        </form>
      </div>
    </main>
  );
}
