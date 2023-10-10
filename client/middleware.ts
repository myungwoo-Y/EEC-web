import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import configMap from './lib/configMap';

function isAllowedRequest(request: NextRequest) {
  if (request.method !== 'GET') {
    return true;
  }

  const path = request.nextUrl.pathname;

  if (path === '/' || path.includes('/login') || path.includes('/signup')) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  if (isAllowedRequest(request)) {
    return NextResponse.next();
  }

  const jwtToken = request.cookies.get('token')?.value;

  if (!jwtToken) {
    return NextResponse.redirect(configMap.loginUrl);
  }

  try {
    const res = await fetch(configMap.serverUrl + '/auth', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await res.json();

    if (!data?.userId) {
      return NextResponse.redirect(configMap.loginUrl);
    }
  } catch (e) {
    console.log(e);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
