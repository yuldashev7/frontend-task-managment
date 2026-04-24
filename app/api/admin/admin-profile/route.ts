import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await axios.patch(
      `${process.env.BASE_URL}/api/auth/me/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    console.log('Edit error:', error.response.data || error.message);
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}
