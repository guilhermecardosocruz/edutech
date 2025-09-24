"use client";
import { useEffect } from "react";
import Link from "next/link";

export const metadata = { title: "Sucesso — Edutech" };

export default function RegisterSuccessPage() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[520px]">
        <div className="card p-6 text-center space-y-3">
          <h1 className="text-2xl font-bold">🎉 Parabéns, você está cadastrado(a)!</h1>
          <p className="text-neutral-600">Estamos redirecionando você para o login…</p>
          <Link href="/login" className="btn btn-primary inline-block">Ir para o login agora</Link>
        </div>
      </div>
    </main>
  );
}
