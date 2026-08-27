import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.announcements });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: body.title,
      link: body.link || '',
      isImportant: Boolean(body.isImportant),
      date: body.date || new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    db.announcements.unshift(newAnnouncement);
    writeDB(db);

    return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
