import { NextResponse } from "next/server";
import { cookies as readCookies } from "next/headers";

type Turma = { id: string; name: string; createdAt: string };

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim() || "Turma";

  const id = Math.random().toString(36).slice(2, 10);

  // carrega cookie existente
  let list: Turma[] = [];
  try {
    const raw = readCookies().get("turmas")?.value;
    if (raw) list = JSON.parse(raw);
  } catch {
    list = [];
  }

  // adiciona turma
  list.push({ id, name, createdAt: new Date().toISOString() });

  // monta o redirect
  const url = new URL(`/turmas/${id}?name=${encodeURIComponent(name)}`, request.url);
  const res = NextResponse.redirect(url, { status: 302 });

  // **seta o cookie no mesmo response** do redirect
  res.cookies.set({
    name: "turmas",
    value: JSON.stringify(list),
    httpOnly: true,
    sameSite: "lax",
    secure: true,          // em prod (Vercel) é HTTPS
    path: "/",
    maxAge: 60 * 60 * 24 * 180, // 180 dias
  });

  return res;
}
