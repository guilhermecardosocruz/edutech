import Link from "next/link";
import { CpfInput } from "@/components/CpfInput";

export const metadata = { title: "Cadastre-se — Edutech" };

export default function RegisterPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[520px]">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary)]">Edutech</div>
          <p className="text-sm text-neutral-600 text-center">Crie sua conta de gestor(a) ou professor(a)</p>
        </div>

        <form action="/api/auth/register" method="post" className="card p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="sr-only">Nome completo</label>
              <input id="name" name="name" required autoComplete="name" placeholder="Nome completo" className="input" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cpf" className="sr-only">CPF</label>
              <CpfInput required />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="E-mail" className="input" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="sr-only">Senha</label>
              <input id="password" name="password" type="password" required autoComplete="new-password" minLength={8}
                     placeholder="Senha (mín. 8 caracteres)" className="input" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirm" className="sr-only">Confirmar senha</label>
              <input id="confirm" name="confirm" type="password" required minLength={8}
                     placeholder="Confirmar senha" className="input" />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="role" className="sr-only">Perfil</label>
              <select id="role" name="role" required className="input">
                <option value="">Selecione o perfil</option>
                <option value="professor">Professor(a)</option>
                <option value="gestor">Gestor(a)</option>
              </select>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-neutral-700">
            <input type="checkbox" name="terms" required className="mt-1 size-4 rounded border-neutral-300" />
            <span>
              Li e concordo com os <Link href="/legal/termos" className="underline hover:no-underline">Termos</Link> e a{" "}
              <Link href="/legal/privacidade" className="underline hover:no-underline">Política de Privacidade</Link>.
            </span>
          </label>

          <button type="submit" className="btn btn-primary w-full">Criar conta</button>

          <div className="text-center text-sm text-neutral-700">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-[var(--color-secondary)] hover:underline">Entrar</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
