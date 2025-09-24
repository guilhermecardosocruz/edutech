import { NextResponse } from "next/server";

function slugify(input: string) {
  return input
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remover acentos
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  if (!name) {
    return NextResponse.redirect(new URL("/turmas/nova?error=nome", req.url));
  }
  const slugBase = slugify(name);
  const id = `${slugBase}-${Date.now().toString(36)}`; // id único simples
  // TODO: persistir no banco (id, name)
  return NextResponse.redirect(new URL(`/turmas/${encodeURIComponent(id)}?name=${encodeURIComponent(name)}`, req.url));
}
