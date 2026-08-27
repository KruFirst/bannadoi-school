'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Plus, Trash2, Link as LinkIcon, Check, AlertCircle } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  link?: string;
  isImportant?: boolean;
  date: string;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      if (data.success) {
        setAnnouncements(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          link: newLink,
          isImportant,
        }),
      });

      if (res.ok) {
        setNewTitle('');
        setNewLink('');
        setIsImportant(false);
        fetchAnnouncements();
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกประกาศ');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('คุณต้องการลบข้อความประกาศนี้ใช่หรือไม่?')) {
      try {
        const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchAnnouncements();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-school-purple-700" />
          <span>จัดการแถบประกาศด่วน (Announcement Ticker)</span>
        </h1>
        <p className="text-xs text-slate-500">
          ข้อความประกาศที่จะแสดงผลบนแถบสีด้านบนสุดของทุกหน้าในเว็บไซต์
        </p>
      </div>

      {/* Create New Announcement Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <Plus className="w-4 h-4 text-school-green-700" />
          <span>เพิ่มข้อความประกาศด่วนใหม่</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">ข้อความประกาศ *</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="เช่น 📢 แจ้งกำหนดการเปิดภาคเรียน หรือ ประกาศผลสอบ..."
              className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">ลิงก์ปลายทาง (ถ้ามี)</label>
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="/news/1 หรือ https://..."
                className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 focus:bg-white outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isImportant"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="w-4 h-4 rounded text-school-purple-600 focus:ring-school-purple-500"
              />
              <label htmlFor="isImportant" className="text-xs font-semibold text-slate-700 cursor-pointer">
                เน้นเป็นประกาศสำคัญ (Important)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-semibold shadow-md transition-colors"
          >
            บันทึกและขึ้นแถบประกาศ
          </button>
        </form>
      </div>

      {/* Active Announcements List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div className="p-4 md:p-5 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
            รายการประกาศที่กำลังแสดงผล ({announcements.length} รายการ)
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">ไม่มีประกาศที่แสดงผลอยู่</div>
        ) : (
          announcements.map((item) => (
            <div key={item.id} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.isImportant && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                      ด่วนมาก
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
                <p className="font-medium text-slate-800 text-xs md:text-sm">{item.title}</p>
                {item.link && (
                  <p className="text-[11px] text-school-green-700 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" />
                    <span>{item.link}</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors shrink-0"
                title="ลบประกาศนี้"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
