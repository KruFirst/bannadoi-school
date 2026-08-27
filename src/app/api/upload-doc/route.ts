import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure documents directory exists
    const docsDir = path.join(process.cwd(), 'public', 'documents');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Sanitize filename and create unique timestamped name
    const ext = path.extname(file.name) || '.pdf';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9ก-๙_-]/g, '_');
    const fileName = `${cleanName}-${Date.now()}${ext}`;
    const filePath = path.join(docsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/documents/${fileName}`;
    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      fileSize: fileSizeFormatted,
      fileType: ext.replace('.', '').toLowerCase(),
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json({ success: false, error: 'Document upload failed' }, { status: 500 });
  }
}
