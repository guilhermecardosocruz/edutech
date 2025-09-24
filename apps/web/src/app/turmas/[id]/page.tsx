import Link from "next/link";
import RememberTurma from "./RememberTurma";

export const metadata = { title: "Turma — Edutech" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function TurmaPage({ params, searchParams }: { params: { id: string }, searchParams: { name?: string }}) {
  const { id } = params;
  const name = searchParams?.name || "Turma";
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <RememberTurma id={id} name={name} />

      <div className="w-full max-w-[880px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800">
            {name}
            <span className="ml-2 text-xs text-neutral-500">({id})</span>
          </h1>
          <Link href="/dashboard" className="text-sm text-[var(--color-secondary)] hover:underline">Voltar ao painel</Link>
        </div>

        <div className="card p-5 sm:p-6">
          <p className="text-sm text-neutral-600 mb-2">Página da turma criada com sucesso.</p>
          <ul className="list-disc pl-5 text-sm text-neutral-700">
            <li>Em breve: chamadas, conteúdos, relatórios.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
