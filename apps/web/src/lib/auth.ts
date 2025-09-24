import { cookies } from "next/headers";

export function getLoggedUserName(): string | null {
  const c = cookies().get("edutech_name")?.value;
  if (!c) return null;
  try {
    // pode ser um nome puro (string) ou JSON com {name}
    const parsed = JSON.parse(c);
    if (typeof parsed === "string") return parsed;
    if (parsed && typeof parsed.name === "string") return parsed.name;
    return String(c);
  } catch {
    return c;
  }
}
