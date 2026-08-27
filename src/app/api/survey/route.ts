import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db: any = readDB();
  return NextResponse.json({ success: true, data: db.surveys || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db: any = readDB();

    const newSurvey = {
      id: `sv-${Date.now()}`,
      role: body.role || 'ผู้ปกครอง', // ผู้ปกครอง / นักเรียน / ประชาชน
      academicScore: Number(body.academicScore) || 5,
      facilityScore: Number(body.facilityScore) || 5,
      boardingScore: Number(body.boardingScore) || 5,
      transparencyScore: Number(body.transparencyScore) || 5,
      overallScore: Number(body.overallScore) || 5,
      comment: body.comment || '',
      createdAt: new Date().toISOString(),
    };

    if (!db.surveys) db.surveys = [];
    db.surveys.unshift(newSurvey);
    writeDB(db);

    return NextResponse.json({ success: true, data: newSurvey }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
