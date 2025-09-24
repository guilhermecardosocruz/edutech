import { SuccessClient } from "./SuccessClient";

export const metadata = { title: "Sucesso — Edutech" };

export default function RegisterSuccessPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[520px]">
        <SuccessClient />
      </div>
    </main>
  );
}
