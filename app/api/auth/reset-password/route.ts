import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post(`${process.env.BASE_URL}/api/auth/reset-password/`, body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
