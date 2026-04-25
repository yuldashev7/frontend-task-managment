import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    const res = await axios.post(
      `${process.env.BASE_URL}/api/admin/users/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: 'Server bilan ulanishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
