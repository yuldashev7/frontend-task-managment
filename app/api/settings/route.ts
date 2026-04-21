import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());

    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await axios.get(`${process.env.BASE_URL}/api/auth/me/`, {
      params: params,
      headers: {
        Cookie: cookieString,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      error.response.data || { message: 'Internal Server Error' },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
