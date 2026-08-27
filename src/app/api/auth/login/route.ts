import { NextResponse } from 'next/server';
import { readDB, defaultAdminUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const db = readDB();
    const currentAdmin = db.adminUser || defaultAdminUser;

    // Check credentials against database
    const isValid =
      (username === currentAdmin.username && password === currentAdmin.password) ||
      (username === 'admin' && password === 'admin1234'); // Fallback master admin

    if (isValid) {
      const response = NextResponse.json({
        success: true,
        user: { name: currentAdmin.username, role: 'super_admin' },
      });

      // Set cookie for session
      response.cookies.set('bannadoi_admin_session', 'authenticated_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
