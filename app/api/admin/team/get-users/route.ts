import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    const res = await axios.get(`${process.env.BASE_URL}/api/admin/users/`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
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
