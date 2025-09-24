import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type Turma = { id: string; name: string; createdAt: string };

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim() || "Turma";

  // id simples (cuid-like)
  const id = Math.random().toString(36).slice(2, 10);

  // carrega cookie existente
  const jar = cookies();
  let list: Turma[] = [];
  try {
    const raw = jar.get("turmas")?.value;
    if (raw) list = JSON.parse(raw);
  } catch {
    list = [];
  }

  // adiciona turma
  list.push({ id, name, createdAt: new Date().toISOString() });

  // persiste por 180 dias
  jar.set({
    name: "turmas",
    value: JSON.stringify(list),
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });

  // redireciona para página da turma
  const url = new URL(`/turmas/${id}?name=${encodeURIComponent(name)}`, request.url);
  return NextResponse.redirect(url, { status: 302 });
}
