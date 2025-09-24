import React from "react";
import Link from "next/link";

export const metadata = { title: "Edutech" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[var(--color-primary)] text-neutral-900">
        <header className="w-full border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-[960px] px-4 h-14 flex items-center justify-between">
            <Link href="/dashboard" className="font-semibold tracking-wide">
              Edutech
            </Link>

            {/* Menu minimalista: só o Sair */}
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md border border-neutral-300 text-sm hover:bg-neutral-50 active:bg-neutral-100"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto max-w-[960px] px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
