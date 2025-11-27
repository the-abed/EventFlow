import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";


export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}
