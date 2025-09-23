import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Entrar — Edutech" };

export default function LoginPage() {
  return (
    <main className="min-h-[100svh] bg-[var(--color-primary)] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Link href="/" className="select-none">
            <div className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary)]">Edutech</div>
          </Link>
          <p className="text-sm text-neutral-600 text-center">
            Acesse sua conta de gestor(a) ou professor(a)
          </p>
        </div>

        <form
          action="/api/auth/login"
          method="post"
          className="rounded-2xl bg-white shadow p-5 sm:p-6 space-y-4 border border-neutral-100"
        >
          <div className="space-y-1.5">
            <label htmlFor="cpf" className="block text-sm font-medium text-neutral-800">CPF</label>
            <input
              id="cpf" name="cpf" inputMode="numeric" pattern="\d{11}" placeholder="Somente números" required
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-800">Senha</label>
            <input
              id="password" name="password" type="password" autoComplete="current-password" required
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)]"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" name="remember" className="size-4 rounded border-neutral-300" />
              Manter conectado
            </label>
            <Link href="/(auth)/forgot" className="text-sm font-medium text-[var(--color-secondary)] hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2.5 font-semibold text-white bg-[var(--color-secondary)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
          >
            Entrar
          </button>

          <div className="text-center text-sm text-neutral-700">
            Não tem conta?{" "}
            <Link href="/(auth)/register" className="font-semibold text-[var(--color-secondary)] hover:underline">
              Cadastre-se
            </Link>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Ao continuar, você concorda com nossos{" "}
          <Link href="/legal/termos" className="underline hover:no-underline">Termos</Link> e{" "}
          <Link href="/legal/privacidade" className="underline hover:no-underline">Privacidade</Link>.
        </p>
      </div>
    </main>
  );
}
