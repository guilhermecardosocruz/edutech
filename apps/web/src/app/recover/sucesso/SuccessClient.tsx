"use client";
import { useEffect } from "react";
import Link from "next/link";

export function SuccessClient() {
  useEffect(() => {
    const t = setTimeout(() => { window.location.href = "/login"; }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="card p-6 text-center space-y-3">
      <h1 className="text-2xl font-bold">📧 Verifique seu e-mail</h1>
      <p className="text-neutral-600">Enviamos instruções para recuperar sua senha. Redirecionando para o login…</p>
      <Link href="/login" className="btn btn-primary inline-block">Ir para o login agora</Link>
    </div>
  );
}
