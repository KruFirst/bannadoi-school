import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.staff || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newStaff = {
      id: `st-${Date.now()}`,
      name: body.name || 'ไม่ระบุชื่อ',
      position: body.position || 'ครูผู้สอน',
      department: body.department || 'กลุ่มสาระการเรียนรู้',
      academicDegree: body.academicDegree || 'ค.บ.',
      major: body.major || '',
      email: body.email || '',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isExecutive: Boolean(body.isExecutive),
    };

    if (!db.staff) db.staff = [];
    db.staff.push(newStaff);
    writeDB(db);

    return NextResponse.json({ success: true, data: newStaff }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
