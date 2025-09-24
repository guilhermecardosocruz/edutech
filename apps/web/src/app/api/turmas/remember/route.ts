import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type Turma = { id: string; name: string; createdAt: string };

function readList() {
  try {
    const raw = cookies().get("turmas")?.value;
    if (!raw) return [] as Turma[];
    return JSON.parse(raw) as Turma[];
  } catch {
    return [] as Turma[];
  }
}

function writeList(list: Turma[]) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "turmas",
    value: JSON.stringify(list),
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return res;
}

export async function POST(req: Request) {
  // aceita body JSON ou querystring (?id=...&name=...)
  let id = "";
  let name = "";
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const body = await req.json();
      id = String(body?.id || "");
      name = String(body?.name || "");
    } else {
      const url = new URL(req.url);
      id = String(url.searchParams.get("id") || "");
      name = String(url.searchParams.get("name") || "");
    }
  } catch {}

  id = id.trim();
  name = (name || "Turma").trim();
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });

  const list = readList();
  const exists = list.some(t => t.id === id);
  if (!exists) list.push({ id, name, createdAt: new Date().toISOString() });

  return writeList(list);
}
