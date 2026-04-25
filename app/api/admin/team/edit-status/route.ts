import axios from 'axios';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    const res = await axios.patch(
      `${process.env.BASE_URL}/api/admin/users/${body.id}/`,
      {
        is_active: body.is_active,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
