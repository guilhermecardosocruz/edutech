import Link from "next/link";

export const metadata = { title: "Recuperar senha — Edutech" };

export default function RecoverPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary)]">Edutech</div>
          <p className="mt-1 text-sm text-neutral-600">Informe seu e-mail para recuperar o acesso</p>
        </div>

        <form action="/api/auth/recover" method="post" className="card p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="sr-only">E-mail</label>
            <input id="email" name="email" type="email" required autoComplete="email"
                   placeholder="Seu e-mail" className="input" />
          </div>

          <button type="submit" className="btn btn-primary w-full">Enviar link de recuperação</button>

          <div className="text-center text-sm text-neutral-700">
            Lembrou a senha?{" "}
            <Link href="/login" className="font-semibold text-[var(--color-secondary)] hover:underline">
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
