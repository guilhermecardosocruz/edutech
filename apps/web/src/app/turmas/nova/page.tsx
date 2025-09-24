import Link from "next/link";

export const metadata = { title: "Nova turma — Edutech" };

export default function NovaTurmaPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[720px]">
        <div className="card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Criar nova turma</h1>
            <Link className="text-sm text-[var(--color-secondary)] hover:underline" href="/dashboard">Voltar</Link>
          </div>

          <form action="/api/turmas/create" method="post" className="space-y-3">
            <input name="name" required placeholder="Nome da turma (ex.: 6º Ano A)" className="input" />
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>

          <p className="text-xs text-neutral-500">*Tela placeholder — integraremos ao Prisma depois.</p>
        </div>
      </div>
    </main>
  );
}
