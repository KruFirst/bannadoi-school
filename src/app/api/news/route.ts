import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json({ success: true, data: db.news });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newArticle = {
      id: Date.now().toString(),
      title: body.title || 'ไม่มีหัวข้อ',
      excerpt: body.excerpt || '',
      content: body.content || '',
      category: body.category || 'general',
      categoryLabel: body.categoryLabel || 'ประชาสัมพันธ์ทั่วไป',
      date: body.date || new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: body.author || 'ผู้ดูแลระบบ',
      views: 0,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      isPinned: Boolean(body.isPinned),
    };

    db.news.unshift(newArticle);
    writeDB(db);

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
