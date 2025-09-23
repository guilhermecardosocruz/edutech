import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const cpf = String(form.get("cpf") || "");
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const confirm = String(form.get("confirm") || "");
  const role = String(form.get("role") || "");
  const terms = form.get("terms");

  // validações mínimas (lado do servidor)
  if (!name || !email || !cpf.match(/^\d{11}$/) || !password || password !== confirm || !terms) {
    return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
  }
  if (!["professor", "gestor"].includes(role)) {
    return NextResponse.json({ ok: false, error: "Perfil inválido" }, { status: 400 });
  }

  // TODO: inserir usuário no DB (Prisma) + hash de senha (bcrypt)
  // const user = await prisma.user.create({ data: {...} });

  // por enquanto: redireciona pro login com flag
  return NextResponse.redirect(new URL("/(auth)/login?registered=1", req.url));
}
