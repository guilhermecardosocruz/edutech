import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim();
  if (!email) {
    return NextResponse.redirect(new URL("/recover?error=email", req.url));
  }
  // TODO: gerar token de reset e enviar e-mail.
  return NextResponse.redirect(new URL("/recover/sucesso", req.url));
}
