import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const db = readDB();
    if (!db.admissions) db.admissions = [];

    const index = db.admissions.findIndex((a: any) => a.id === params.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    db.admissions[index] = {
      ...db.admissions[index],
      ...body,
      id: params.id,
    };

    writeDB(db);
    return NextResponse.json({ success: true, data: db.admissions[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    if (!db.admissions) db.admissions = [];

    const initialLen = db.admissions.length;
    db.admissions = db.admissions.filter((a: any) => a.id !== params.id);

    if (db.admissions.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
