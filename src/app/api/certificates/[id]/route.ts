import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    if (!db.certificates) db.certificates = [];

    const initialLen = db.certificates.length;
    db.certificates = db.certificates.filter((c: any) => c.id !== params.id);

    if (db.certificates.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
