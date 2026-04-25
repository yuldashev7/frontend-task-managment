import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    const res = await axios.delete(
      `${process.env.BASE_URL}/api/admin/users/${id}/permanent-delete/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    console.error('BACKEND ERROR:', error.response?.data);
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
