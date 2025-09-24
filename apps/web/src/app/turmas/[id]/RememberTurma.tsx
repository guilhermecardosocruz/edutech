"use client";

import { useEffect } from "react";

export default function RememberTurma({ id, name }: { id: string; name: string }) {
  useEffect(() => {
    const run = async () => {
      try {
        await fetch("/api/turmas/remember", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, name }),
          cache: "no-store",
        });
      } catch {}
    };
    run();
  }, [id, name]);

  return null;
}
