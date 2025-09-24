import Link from "next/link";
import { getLoggedUserName } from "@/lib/auth";

export const metadata = { title: "Painel — Edutech" };

export default async function DashboardPage() {
  const name = getLoggedUserName() ?? "Professor(a)";
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[880px]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800">
            Olá, <span className="font-bold">{name}</span>
          </h1>
          <Link href="/turmas/nova" className="btn btn-primary">
            Nova turma
          </Link>
        </div>

        <div className="card p-5 sm:p-6">
          <h2 className="text-lg font-semibold mb-2">Suas turmas</h2>
          <p className="text-sm text-neutral-600">
            Após criar uma turma, você será levado(a) para a página dela. Em seguida, ela passará a aparecer aqui quando integrarmos o banco de dados.
          </p>
        </div>
      </div>
    </main>
  );
}
