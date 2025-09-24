import Link from "next/link";
import { LoginCpfField } from "@/components/LoginCpfField";
import { PasswordInput } from "@/components/PasswordInput";

export const metadata = { title: "Entrar — Edutech" };

export default function LoginPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary)]">Edutech</div>
          <p className="mt-1 text-sm text-neutral-600">Acesse sua conta</p>
        </div>

        <form action="/api/auth/login" method="post" className="card p-5 sm:p-6 space-y-4">
          <LoginCpfField />
          <PasswordInput required placeholder="Senha" />

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="remember" value="1" className="size-4 rounded border-neutral-300" />
              <span className="text-neutral-700">Manter-me conectado</span>
            </label>
            <Link href="/recover" className="text-[var(--color-secondary)] hover:underline">Esqueci minha senha</Link>
          </div>

          <button type="submit" className="btn btn-primary w-full">Entrar</button>

          <div className="text-center text-sm text-neutral-700">
            Não tem conta?{" "}
            <Link href="/register" className="font-semibold text-[var(--color-secondary)] hover:underline">
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
