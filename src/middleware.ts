import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const sessionToken =
        request.cookies.get("better-auth.session_token")?.value ||
        request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
        const signInUrl = new URL("/signin", request.url);

        signInUrl.searchParams.set("error", "unauthorized");
        signInUrl.searchParams.set("redirect", request.nextUrl.pathname);

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/product/:path*",
        "/category/:path*",
    ],
};