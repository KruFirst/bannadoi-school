'use client';

import React, { useState, useRef } from 'react';
import { Upload, Check, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export default function ImageUploadField({
  label = 'รูปภาพประกอบ',
  value,
  onChange,
  required = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
      }
    } catch (err) {
      alert('อัปโหลดไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && '*'}
        </label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded font-medium ${
              mode === 'upload' ? 'bg-school-green-100 text-school-green-800' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            อัปโหลดจากเครื่อง
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded font-medium ${
              mode === 'url' ? 'bg-school-green-100 text-school-green-800' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            ระบุลิงก์ URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-200 transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-school-green-700" />
                <span>กำลังอัปโหลด...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-school-green-700" />
                <span>เลือกรูปภาพจากคอมพิวเตอร์ / มือถือ</span>
              </>
            )}
          </button>

          {value && (
            <span className="text-[11px] text-slate-500 truncate max-w-[200px]">
              {value}
            </span>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... หรือ /uploads/..."
            className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
          />
        </div>
      )}

      {/* Image Preview Thumbnail */}
      {value && (
        <div className="flex items-center gap-3 pt-1">
          <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 relative shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>พร้อมใช้งาน</span>
          </span>
        </div>
      )}
    </div>
  );
}
