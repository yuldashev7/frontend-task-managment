import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL!;

type RouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

type RefreshResponse = {
  accessToken?: string;
  refreshToken?: string;
};

async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshResponse | null> {
  const res = await fetch(`${BASE_URL}/api/auth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

function buildTargetUrl(request: NextRequest, slug: string[]) {
  const search = request.nextUrl.search;
  return `${BASE_URL}/api/${slug.join('/')}/${search}`;
}

async function forwardRequest(
  request: NextRequest,
  targetUrl: string,
  accessToken?: string
) {
  const headers = new Headers();

  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.text();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: 'no-store',
  });

  return { response, body, headers };
}

async function handler(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const targetUrl = buildTargetUrl(request, slug);

  let accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const initial = await forwardRequest(request, targetUrl, accessToken);
  let backendRes = initial.response;

  if (backendRes.status === 401 && refreshToken) {
    const refreshed = await refreshAccessToken(refreshToken);

    if (refreshed?.accessToken) {
      accessToken = refreshed.accessToken;

      const retryHeaders = new Headers(initial.headers);
      retryHeaders.set('Authorization', `Bearer ${accessToken}`);

      backendRes = await fetch(targetUrl, {
        method: request.method,
        headers: retryHeaders,
        body: initial.body,
        cache: 'no-store',
      });

      const responseBody = await backendRes.text();
      const response = new NextResponse(responseBody, {
        status: backendRes.status,
      });

      const responseContentType = backendRes.headers.get('content-type');
      if (responseContentType) {
        response.headers.set('Content-Type', responseContentType);
      }

      response.cookies.set('access_token', refreshed.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      });

      if (refreshed.refreshToken) {
        response.cookies.set('refresh_token', refreshed.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      return response;
    }
  }

  const responseBody = await backendRes.text();
  const response = new NextResponse(responseBody, {
    status: backendRes.status,
  });

  const responseContentType = backendRes.headers.get('content-type');
  if (responseContentType) {
    response.headers.set('Content-Type', responseContentType);
  }

  return response;
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handler(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handler(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handler(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return handler(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return handler(request, context);
}
