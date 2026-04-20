import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'sonner';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post(
      `${process.env.BASE_URL}/api/auth/forgot-password/`,
      body
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    toast.error('Forgot password error:', error.response.data || error.message);

    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}
