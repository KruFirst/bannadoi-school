import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.events || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const categoryMap: Record<string, string> = {
      academic: 'วิชาการ & เปิดเทอม',
      exam: 'การสอบและวัดผล',
      activity: 'กิจกรรมโรงเรียน',
      holiday: 'วันหยุดราชการ/ภาคเรียน',
    };

    const newEvent = {
      id: `ev-${Date.now()}`,
      title: body.title || 'กิจกรรมไม่มีชื่อ',
      date: body.date || new Date().toISOString().split('T')[0],
      endDate: body.endDate || '',
      time: body.time || '',
      category: body.category || 'academic',
      categoryLabel: categoryMap[body.category] || 'กิจกรรม',
      description: body.description || '',
      location: body.location || '',
    };

    if (!db.events) db.events = [];
    db.events.push(newEvent);
    // Sort by date
    db.events.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    writeDB(db);

    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
