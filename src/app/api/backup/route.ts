import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  const jsonString = JSON.stringify(db, null, 2);

  return new NextResponse(jsonString, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="bannadoi-backup-${Date.now()}.json"`,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid JSON format' }, { status: 400 });
    }

    const success = writeDB(body);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Write failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Database restored successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Restore failed' }, { status: 500 });
  }
}
