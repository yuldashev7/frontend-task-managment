import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BASE_URL;

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  const res = await fetch(`${BACKEND_URL}/api/auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-type': 'appication/json',
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  });
  const data = res.json();

  const response = NextResponse.json(data, { status: res.status });

  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  return response;
}
