"use client";
import * as React from "react";
import { CpfInput } from "./CpfInput";

const KEY = "edutech_last_cpf";

export function LoginCpfField() {
  const [rememberCpf, setRememberCpf] = React.useState(true);
  const [initial, setInitial] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) || undefined;
      setInitial(saved || undefined);
    } catch {}
  }, []);

  return (
    <div className="space-y-2">
      <CpfInput required defaultValue={initial} onValue={(digits) => {
        try {
          if (rememberCpf) {
            localStorage.setItem(KEY, digits);
          }
        } catch {}
      }} />
      <label className="inline-flex items-center gap-2 text-xs text-neutral-700">
        <input
          type="checkbox"
          checked={rememberCpf}
          onChange={(e) => setRememberCpf(e.target.checked)}
          className="size-4 rounded border-neutral-300"
        />
        Salvar CPF neste dispositivo
      </label>
    </div>
  );
}
