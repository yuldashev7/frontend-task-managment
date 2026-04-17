import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function INTERCEPTOR_METHOD(req: NextRequest) {
  const cookieStore = await cookies();
  let accesToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  const { pathname, search } = new URL(req.url);
  const targerUrl = `${process.env.BASE_URL}${pathname.replace('/api/proxy', '')}${search}`;

  try {
    const response = await axios({
      method: req.method,
      url: targerUrl,
      data: req.method !== 'GET' ? await req.json().catch(() => {}) : undefined,
      headers: { Authorization: `Bearer ${accesToken}` },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error.response.status === 401 && refreshToken) {
      try {
        const refreshRes = await axios.post(
          `${process.env.BASE_URL}/api/auth/refresh/`,
          { refreshToken }
        );
        const newToken = refreshRes.data;

        const res = NextResponse.json({ message: 'Refreshed' });

        const retryResponse = await axios({
          method: req.method,
          url: targerUrl,
          headers: { Authorization: `${newToken.accesToken}` },
        });

        const finalRes = NextResponse.json(retryResponse.data);
        finalRes.cookies.set('access_token', newToken.accesToken, {
          httpOnly: true,
          sameSite: 'lax',
        });
        return finalRes;
      } catch (error) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
      }
    }
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}

export {
  INTERCEPTOR_METHOD as GET,
  INTERCEPTOR_METHOD as POST,
  INTERCEPTOR_METHOD as PUT,
  INTERCEPTOR_METHOD as DELETE,
};
