import Link from "next/link";
import { cookies } from "next/headers";

type Turma = { id: string; name: string; createdAt: string };

export const metadata = { title: "Dashboard — Edutech" };

export default async function DashboardPage() {
  const jar = cookies();
  let turmas: Turma[] = [];
  try {
    const raw = jar.get("turmas")?.value;
    if (raw) turmas = JSON.parse(raw);
  } catch {
    turmas = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800">Minhas turmas</h1>
        <Link
          href="/turmas/nova"
          className="px-3 py-1.5 rounded-md bg-[var(--color-secondary)] text-white text-sm hover:opacity-90"
        >
          + Nova turma
        </Link>
      </div>

      {turmas.length === 0 ? (
        <div className="card p-6">
          <p className="text-neutral-700">Você ainda não criou turmas.</p>
          <Link href="/turmas/nova" className="inline-block mt-3 text-[var(--color-secondary)] hover:underline">
            Criar a primeira turma →
          </Link>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {turmas.map((t) => (
            <li key={t.id}>
              <Link
                href={`/turmas/${t.id}?name=${encodeURIComponent(t.name)}`}
                className="block rounded-lg border border-neutral-200 bg-white p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-neutral-900">{t.name}</h2>
                  <span className="text-xs text-neutral-500">#{t.id}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  Criada em {new Date(t.createdAt).toLocaleString("pt-BR")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
