"use client";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.error(error);
  return (
    <html>
      <body>
        <main className="container-page">
          <div className="card p-6 max-w-md text-center space-y-3">
            <h1 className="text-2xl font-bold">Ocorreu um erro</h1>
            <p className="text-neutral-600">Tente novamente em instantes.</p>
          </div>
        </main>
      </body>
    </html>
  );
}
