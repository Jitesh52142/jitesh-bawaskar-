import { NextResponse } from 'next/server';
import { comparePassword, generateToken, hashPassword } from '@/lib/auth';

// Hardcoded admin credentials (for demo without MongoDB)
const ADMIN_EMAIL = 'jiteshbawaskar05@gmail.com';
const ADMIN_PASSWORD = 'Jitesh001@';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    // Simple authentication without database
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create admin object
    const admin = {
      id: '1',
      email: ADMIN_EMAIL,
      name: 'Jitesh Bawaskar',
    };
    
    // Generate JWT token
    const token = generateToken(admin.id);
    
    // Set cookie
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

