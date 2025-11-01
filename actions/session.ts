"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const SECRET = process.env.JWT_SECRET || "your-secret-key";

type SessionPayload = {
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export async function encrypt(payload: Record<string, unknown>) {
  return jwt.sign(payload, SECRET, { algorithm: "HS256", expiresIn: "1h" });
}

export async function decrypt(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw error;
  }
}

export async function createSession(payload: Record<string, unknown>) {
  const token = await encrypt(payload);

  const cookieStore = await cookies();
  cookieStore.set("session", token, { maxAge: 60 * 60, httpOnly: true });

  return token;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0), httpOnly: true });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  try {
    const decoded = (await decrypt(session)) as SessionPayload;
    return decoded;
  } catch {
    await deleteSession();
    return null;
  }
}
