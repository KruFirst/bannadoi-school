import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const db = readDB();
    if (!db.events) db.events = [];

    const index = db.events.findIndex((e: any) => e.id === params.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    const categoryMap: Record<string, string> = {
      academic: 'วิชาการ & เปิดเทอม',
      exam: 'การสอบและวัดผล',
      activity: 'กิจกรรมโรงเรียน',
      holiday: 'วันหยุดราชการ/ภาคเรียน',
    };

    db.events[index] = {
      ...db.events[index],
      ...body,
      categoryLabel: categoryMap[body.category] || db.events[index].categoryLabel,
      id: params.id,
    };

    db.events.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    writeDB(db);

    return NextResponse.json({ success: true, data: db.events[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    if (!db.events) db.events = [];

    const initialLen = db.events.length;
    db.events = db.events.filter((e: any) => e.id !== params.id);

    if (db.events.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
