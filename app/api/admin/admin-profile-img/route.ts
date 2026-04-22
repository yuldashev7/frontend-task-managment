import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { toast } from 'sonner';

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    const res = await axios.patch(
      `${process.env.BASE_URL}/api/auth/me`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    toast.error('Edit error:', error.response.data || error.message);
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}
