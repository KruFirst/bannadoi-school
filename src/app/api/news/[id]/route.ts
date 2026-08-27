import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const db = readDB();
  const item = db.news.find((n: any) => n.id === params.id);

  if (!item) {
    return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const db = readDB();
    const index = db.news.findIndex((n: any) => n.id === params.id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }

    db.news[index] = {
      ...db.news[index],
      ...body,
      id: params.id, // preserve ID
    };

    writeDB(db);
    return NextResponse.json({ success: true, data: db.news[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = readDB();
    const initialLen = db.news.length;
    db.news = db.news.filter((n: any) => n.id !== params.id);

    if (db.news.length === initialLen) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }

    writeDB(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
