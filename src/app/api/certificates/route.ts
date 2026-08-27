import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const db = readDB();
  const certs = db.certificates || [];

  if (code) {
    const found = certs.find((c: any) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: found });
  }

  return NextResponse.json({ success: true, data: certs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const certCount = (db.certificates ? db.certificates.length : 0) + 1;
    const generatedCode = body.code || `BND-2569-${String(certCount).padStart(3, '0')}`;

    const newCert = {
      id: `cert-${Date.now()}`,
      code: generatedCode,
      recipientName: body.recipientName || 'ไม่ระบุชื่อ',
      role: body.role || 'นักเรียน',
      gradeLevel: body.gradeLevel || '',
      activityName: body.activityName || 'กิจกรรมโรงเรียน',
      achievement: body.achievement || 'ผ่านการประเมิน',
      issueDate: body.issueDate || '26 สิงหาคม 2569',
      directorName: 'นายจิรพัส ปันดิษ',
      directorPosition: 'ผู้อำนวยการโรงเรียนบ้านนาดอย',
    };

    if (!db.certificates) db.certificates = [];
    db.certificates.unshift(newCert);
    writeDB(db);

    return NextResponse.json({ success: true, data: newCert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
