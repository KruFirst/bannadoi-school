import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idCard = searchParams.get('idCard');
  const db = readDB();
  const list = db.admissions || [];

  if (idCard) {
    const found = list.filter((item: any) => item.idCard.replace(/\s|-/g, '') === idCard.trim().replace(/\s|-/g, ''));
    return NextResponse.json({ success: true, data: found });
  }

  return NextResponse.json({ success: true, data: list });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const applicationNo = `ADM-2569-${String((db.admissions?.length || 0) + 1).padStart(4, '0')}`;

    const newApplication = {
      id: `adm-${Date.now()}`,
      applicationNo,
      studentName: body.studentName || 'ไม่ระบุชื่อ',
      idCard: body.idCard || '',
      birthDate: body.birthDate || '',
      gender: body.gender || 'ชาย',
      gradeApplying: body.gradeApplying || 'อนุบาล 1',
      studyType: body.studyType || 'day', // 'day' (ไป-กลับ) | 'boarding' (พักนอน)
      parentName: body.parentName || '',
      parentRelation: body.parentRelation || 'บิดา/มารดา',
      phone: body.phone || '',
      address: body.address || 'บ้านนาดอย ต.แม่สวด อ.สบเมย จ.แม่ฮ่องสอน',
      specialNeeds: body.specialNeeds || '',
      documentsAttached: body.documentsAttached || [],
      status: 'pending', // 'pending' (รอตรวจสอบ) | 'approved' (ผ่านคุณสมบัติ) | 'enrolled' (ยืนยันสิทธิ์เข้าเรียน) | 'rejected'
      createdAt: new Date().toISOString(),
    };

    if (!db.admissions) db.admissions = [];
    db.admissions.unshift(newApplication);
    writeDB(db);

    return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
  } catch (error) {
    console.error('Admission submit error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
