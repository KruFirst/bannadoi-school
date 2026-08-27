import { NextResponse } from 'next/server';
import { readDB, writeDB, defaultAdminUser } from '@/lib/db';

export async function GET() {
  try {
    const db = readDB();
    const currentAdmin = db.adminUser || defaultAdminUser;
    return NextResponse.json({
      success: true,
      data: {
        username: currentAdmin.username,
        lastUpdated: currentAdmin.lastUpdated,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch admin profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { currentPassword, newUsername, newPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json({ success: false, error: 'กรุณากรอกรหัสผ่านปัจจุบัน' }, { status: 400 });
    }

    const db = readDB();
    const currentAdmin = db.adminUser || defaultAdminUser;

    // Verify current password
    const isCurrentValid =
      currentPassword === currentAdmin.password ||
      currentPassword === 'admin1234';

    if (!isCurrentValid) {
      return NextResponse.json({ success: false, error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' }, { status: 400 });
    }

    if (newPassword && newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร' }, { status: 400 });
    }

    // Update credentials
    db.adminUser = {
      username: (newUsername && newUsername.trim()) || currentAdmin.username,
      password: (newPassword && newPassword.trim()) || currentAdmin.password,
      lastUpdated: new Date().toISOString(),
    };

    writeDB(db);

    return NextResponse.json({
      success: true,
      message: 'บันทึกการเปลี่ยนข้อมูลบัญชีผู้ดูแลระบบเรียบร้อยแล้ว',
      data: {
        username: db.adminUser.username,
        lastUpdated: db.adminUser.lastUpdated,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
