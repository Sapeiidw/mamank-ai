import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Read the current session in Server Components, Route Handlers, and Server Actions.
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
