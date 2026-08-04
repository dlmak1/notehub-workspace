import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const sessionResponse = await checkSession();
        const setCookie = sessionResponse.headers["set-cookie"];

        if (setCookie) {
          const response = isPublicRoute
            ? NextResponse.redirect(new URL("/", request.url))
            : NextResponse.next();

          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);
            if (parsed?.value) {
              response.cookies.set(parsed.name, parsed.value, {
                path: parsed.path,
                maxAge: parsed.maxAge,
                httpOnly: parsed.httpOnly,
                secure: parsed.secure,
                sameSite: parsed.sameSite as
                  "lax" | "strict" | "none" | undefined,
              });
            }
          }

          return response;
        }

        if (sessionResponse.data?.success) {
          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url));
          }
          return NextResponse.next();
        }
      } catch {
        // session refresh failed — treat as unauthenticated
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
