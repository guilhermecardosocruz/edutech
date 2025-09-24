import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = { title: "Dashboard — Edutech" };
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type Turma = { id: string; name: string; createdAt: string };

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
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[960px] space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800">Olá, Professor(a)</h1>
          <Link
            href="/turmas/nova"
            className="px-3 py-1.5 rounded-md bg-[var(--color-secondary)] text-white text-sm hover:opacity-90"
          >
            Nova turma
          </Link>
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">Suas turmas</h2>

          {turmas.length === 0 ? (
            <div className="card p-6">
              <p className="text-neutral-700">
                Após criar uma turma, você será levado(a) para a página dela. Em seguida, ela passará a aparecer aqui.
              </p>
            </div>
          ) : (
            <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {turmas.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/turmas/${t.id}?name=${encodeURIComponent(t.name)}`}
                    className="block rounded-xl border border-neutral-200 bg-white p-4 hover:shadow-sm transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-neutral-900">{t.name}</div>
                      <span className="text-xs text-neutral-500">#{t.id}</span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">
                      Criada em {new Date(t.createdAt).toLocaleString("pt-BR")}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                        Chamada
                      </span>
                      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
                        Conteúdos
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
