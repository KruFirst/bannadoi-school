import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    const initialLen = db.announcements.length;
    db.announcements = db.announcements.filter((a: any) => a.id !== params.id);

    if (db.announcements.length === initialLen) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
