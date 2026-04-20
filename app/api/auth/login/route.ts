import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();
  const res = await axios.post(`${process.env.BASE_URL}/api/auth/login/`, body);

  const response = NextResponse.json(res.data);
  const cookieStore = await cookies();

  cookieStore.set('access_token', res.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  });

  cookieStore.set('refresh_token', res.data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
