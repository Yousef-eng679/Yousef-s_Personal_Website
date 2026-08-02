import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // AUTH-01: Protect /ctrl-y0us3f routes
  if (request.nextUrl.pathname.startsWith('/ctrl-y0us3f') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth-y0us3f';
    return NextResponse.redirect(url);
  }

  // AUTH-05: Redirect authenticated user from /auth-y0us3f to /ctrl-y0us3f
  if (request.nextUrl.pathname === '/auth-y0us3f' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/ctrl-y0us3f';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
