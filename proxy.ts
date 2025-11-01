import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

// Protected routes
const protectedRoutes = ["/cart", "/wishlist", "/checkout", "/profile"];
const authPages = ["/login"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value;
  const res = NextResponse.next();

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  if (isAuthPage && token) {
    try {
      jwt.verify(token, SECRET);
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    } catch {}
  }

  if (!isProtected) return res;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded?.exp) throw new Error("Invalid token");

    const timeLeft = decoded.exp * 1000 - Date.now();

    if (timeLeft <= 0) {
      const loginUrl = new URL("/login", req.url);
      const expiredRes = NextResponse.redirect(loginUrl);
      expiredRes.cookies.delete("session");
      return expiredRes;
    }

    if (timeLeft < 5 * 60 * 1000) {
      const newToken = jwt.sign(
        {
          userId: decoded.userId,
          email: decoded.email,
          name: decoded.name,
        },
        SECRET,
        { expiresIn: "1h" }
      );

      res.cookies.set("session", newToken, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });
      console.log("Session refreshed in middleware");
    }

    return res;
  } catch (error) {
    console.log("Auth error:", (error as Error).message);
    const loginUrl = new URL("/login", req.url);
    res.cookies.delete("session");
    return NextResponse.redirect(loginUrl);
  }
}

// Apply middleware to all routes except static files & public assets
/*
 * Match all request paths except for:
 * 1. /_next (Next.js internals)
 * 2. /api/public (public API routes)
 * 3. /login and /register (auth pages)
 * 4. /favicon.ico, /images, etc.
 */
export const config = {
  matcher: ["/((?!_next|api/public|favicon.ico|images|static).*)"],
};
