import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page">
      <div className="card p-6 max-w-md text-center space-y-3">
        <h1 className="text-2xl font-bold">Página não encontrada</h1>
        <p className="text-neutral-600">Verifique a URL ou volte ao início.</p>
        <Link href="/login" className="btn btn-primary inline-block">Ir para o login</Link>
      </div>
    </main>
  );
}
