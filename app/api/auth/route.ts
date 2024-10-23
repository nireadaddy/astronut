import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Add your authentication logic here
    // For example, verify user credentials from database

    // Generate JWT token
    const token = await sign({ sub: 'user_id', email });

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
