import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const db = readDB();
    if (!db.staff) db.staff = [];

    const index = db.staff.findIndex((s: any) => s.id === params.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Staff not found' }, { status: 404 });
    }

    db.staff[index] = {
      ...db.staff[index],
      ...body,
      id: params.id,
    };

    writeDB(db);
    return NextResponse.json({ success: true, data: db.staff[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    if (!db.staff) db.staff = [];

    const initialLen = db.staff.length;
    db.staff = db.staff.filter((s: any) => s.id !== params.id);

    if (db.staff.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Staff not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
