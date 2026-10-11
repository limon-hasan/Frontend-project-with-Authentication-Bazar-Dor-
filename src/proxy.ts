import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        const signinUrl = new URL('/signin', request.url);
        signinUrl.searchParams.set('error', 'login_required');
        signinUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile",
        "/profile/:path*",
        "/product/:path*",
        "/category/:path*",
    ],
}