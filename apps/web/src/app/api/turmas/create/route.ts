import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: validar e persistir (Prisma)
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
