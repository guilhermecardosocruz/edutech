import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData();
  const cpf = String(form.get("cpf") || "");
  const name = "Professor(a)"; // placeholder; depois puxamos do banco
  const remember = form.get("remember");

  // Em produção, valide credenciais, gere sessão/jwt etc.
  const val = JSON.stringify({ name, cpf });
  const oneDay = 24 * 60 * 60;
  const maxAge = remember ? 30 * oneDay : oneDay;

  cookies().set("edutech_name", val, {
    httpOnly: false, // (depois vamos mover para httpOnly + sessão server-side)
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge,
  });

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
