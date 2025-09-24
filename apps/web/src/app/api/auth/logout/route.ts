import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  cookies().set({
    name: "session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, { status: 302 });
}
