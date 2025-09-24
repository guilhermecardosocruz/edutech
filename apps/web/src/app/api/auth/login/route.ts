import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData();
  const cpf = String(form.get("cpf") || "");
  const remember = String(form.get("remember") || "");
  const name = "Professor(a)"; // TODO: buscar do banco após autenticar

  // Em produção: validar credenciais e carregar usuário real.
  const payload = JSON.stringify({ name, cpf });

  const c = cookies();
  const options: Parameters<typeof c.set>[2] = {
    httpOnly: true,
    sameSite: "lax",
    secure: true,     // Vercel => HTTPS
    path: "/",
  };
  if (remember === "1") {
    options.maxAge = 60 * 60 * 24 * 30; // 30 dias
  }
  c.set("edutech_name", payload, options);

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
