import { NextResponse } from 'next/server';
import { readDB, writeDB, ContactMessage } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.contacts || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    if (!db.contacts) db.contacts = [];

    const newContact: ContactMessage = {
      id: `cnt-${Date.now()}`,
      name: body.name ? String(body.name).trim() : 'ผู้ใช้งานทั่วไป',
      phone: body.phone ? String(body.phone).trim() : '',
      email: body.email ? String(body.email).trim() : '',
      subject: body.subject ? String(body.subject).trim() : 'ไม่มีหัวข้อ',
      messageType: body.messageType === 'petition' ? 'petition' : 'inquiry',
      message: body.message ? String(body.message).trim() : '',
      createdAt: new Date().toISOString(),
      status: 'unread',
    };

    // Insert at beginning
    db.contacts.unshift(newContact);
    writeDB(db);

    return NextResponse.json({ 
      success: true, 
      message: 'บันทึกข้อความเรียบร้อยแล้ว',
      data: newContact 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in contact POST API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }

    const db = readDB();
    if (db.contacts) {
      db.contacts = db.contacts.filter((c) => c.id !== id);
      writeDB(db);
    }

    return NextResponse.json({ success: true, message: 'ลบข้อความเรียบร้อยแล้ว' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
