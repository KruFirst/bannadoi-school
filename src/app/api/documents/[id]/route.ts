import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    if (!db.documents) db.documents = [];

    const initialLen = db.documents.length;
    db.documents = db.documents.filter((d: any) => d.id !== params.id);

    if (db.documents.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
