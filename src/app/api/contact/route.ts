import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.contacts || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    if (!db.contacts) db.contacts = [];

    const newContact = {
      id: `cnt-${Date.now()}`,
      name: body.name || 'ไม่ระบุชื่อ',
      phone: body.phone || '',
      email: body.email || '',
      subject: body.subject || '',
      messageType: body.messageType || 'inquiry',
      message: body.message || '',
      createdAt: new Date().toISOString(),
      status: 'unread',
    };

    db.contacts.unshift(newContact);
    writeDB(db);

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
