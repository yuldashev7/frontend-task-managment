import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL!;

type RouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

type RefreshResponse = {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
};

function getAccessToken(payload: RefreshResponse) {
  return payload.accessToken ?? payload.access_token;
}

function getRefreshToken(payload: RefreshResponse) {
  return payload.refreshToken ?? payload.refresh_token;
}

async function tryRefresh(
  refreshToken: string,
  field: 'refreshToken' | 'refresh'
): Promise<RefreshResponse | null> {
  const res = await fetch(`${BASE_URL}/api/auth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [field]: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshResponse | null> {
  const firstAttempt = await tryRefresh(refreshToken, 'refreshToken');

  if (firstAttempt && getAccessToken(firstAttempt)) {
    return firstAttempt;
  }

  return tryRefresh(refreshToken, 'refresh');
}

function buildTargetUrl(request: NextRequest, slug: string[]) {
  const search = request.nextUrl.search;
  return `${BASE_URL}/api/${slug.join('/')}/${search}`;
}

function copyResponseHeaders(source: Response, target: NextResponse) {
  const contentType = source.headers.get('content-type');
  if (contentType) {
    target.headers.set('Content-Type', contentType);
  }
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

  headers.set('Accept', request.headers.get('accept') ?? 'application/json');

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : new Uint8Array(await request.arrayBuffer());

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
    const nextAccessToken = refreshed ? getAccessToken(refreshed) : undefined;
    const nextRefreshToken = refreshed ? getRefreshToken(refreshed) : undefined;

    if (nextAccessToken) {
      accessToken = nextAccessToken;

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

      copyResponseHeaders(backendRes, response);

      response.cookies.set('access_token', nextAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      });

      if (nextRefreshToken) {
        response.cookies.set('refresh_token', nextRefreshToken, {
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

  copyResponseHeaders(backendRes, response);

  if (backendRes.status === 401) {
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
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
