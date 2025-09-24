import { SuccessClient } from "./SuccessClient";

export const metadata = { title: "Recuperação enviada — Edutech" };

export default function RecoverSuccessPage() {
  return (
    <main className="container-page bg-[var(--color-primary)]">
      <div className="w-full max-w-[520px]">
        <SuccessClient />
      </div>
    </main>
  );
}
