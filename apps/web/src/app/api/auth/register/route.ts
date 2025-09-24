import { NextResponse } from "next/server";

function onlyDigits(v: string) { return v.replace(/\D+/g, ""); }

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const cpfRaw = String(form.get("cpf") || "");
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const confirm = String(form.get("confirm") || "");
  const role = String(form.get("role") || "");
  const terms = form.get("terms");

  const cpf = onlyDigits(cpfRaw);

  if (!name || !email || cpf.length !== 11 || !password || password !== confirm || !terms) {
    return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
  }
  if (!["professor", "gestor"].includes(role)) {
    return NextResponse.json({ ok: false, error: "Perfil inválido" }, { status: 400 });
  }

  // TODO: hash da senha + prisma.user.create({ data: { name, email, cpf, role, passwordHash } })
  return NextResponse.redirect(new URL("/login?registered=1", req.url));
}
