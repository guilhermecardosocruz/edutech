import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const jar = cookies();
  const all = jar.getAll().map(c => ({
    name: c.name, value: c.value, httpOnly: c.httpOnly, sameSite: c.sameSite,
    secure: c.secure, path: c.path, expires: c.expires
  }));
  return NextResponse.json({ cookies: all });
}
