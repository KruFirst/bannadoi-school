import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.documents || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newDoc = {
      id: `doc-${Date.now()}`,
      title: body.title || 'เอกสารไม่มีชื่อ',
      category: body.category || 'งานบริหารทั่วไป',
      fileSize: body.fileSize || '250 KB',
      fileType: body.fileType || 'pdf',
      downloads: 0,
      updateDate: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
      url: body.url || '#',
    };

    if (!db.documents) db.documents = [];
    db.documents.unshift(newDoc);
    writeDB(db);

    return NextResponse.json({ success: true, data: newDoc }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
