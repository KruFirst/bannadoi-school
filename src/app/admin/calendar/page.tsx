'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  Clock, 
  MapPin, 
  Filter 
} from 'lucide-react';
import { CalendarEvent } from '@/data/calendarData';

const categories = [
  { key: 'academic', label: 'วิชาการ & เปิดเทอม' },
  { key: 'exam', label: 'การสอบและวัดผล' },
  { key: 'activity', label: 'กิจกรรมโรงเรียน' },
  { key: 'holiday', label: 'วันหยุดราชการ/ภาคเรียน' },
];

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    endDate: '',
    time: '',
    category: 'academic' as 'academic' | 'activity' | 'holiday' | 'exam',
    description: '',
    location: '',
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calendar');
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (ev?: CalendarEvent) => {
    if (ev) {
      setEditingId(ev.id);
      setFormData({
        title: ev.title,
        date: ev.date,
        endDate: ev.endDate || '',
        time: ev.time || '',
        category: ev.category,
        description: ev.description,
        location: ev.location || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        endDate: '',
        time: '08:30 - 15:30 น.',
        category: 'academic',
        description: '',
        location: 'โรงเรียนบ้านนาดอย',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`/api/calendar/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchEvents();
        }
      } else {
        const res = await fetch('/api/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchEvents();
        }
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกกิจกรรม');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`คุณต้องการลบกิจกรรม "${title}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/calendar/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchEvents();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบกิจกรรม');
      }
    }
  };

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-school-green-700" />
            <span>จัดการปฏิทินกิจกรรมการศึกษา ({events.length} รายการ)</span>
          </h1>
          <p className="text-xs text-slate-500">
            เพิ่ม แก้ไข และกำหนดวันสำคัญในปฏิทินการศึกษาประจำปี 2569
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มกิจกรรมใหม่</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหากิจกรรม หรือรายละเอียด..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Events List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบกิจกรรม</div>
        ) : (
          filteredEvents.map((ev) => (
            <div key={ev.id} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {new Date(ev.date).toLocaleDateString('th-TH', { month: 'short' })}
                  </span>
                  <span className="text-lg font-bold text-slate-800 leading-none">
                    {new Date(ev.date).getDate()}
                  </span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {ev.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">{ev.date} {ev.endDate && `ถึง ${ev.endDate}`}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm truncate">{ev.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{ev.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenModal(ev)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  title="แก้ไข"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ev.id, ev.title)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                  title="ลบ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-base text-slate-800">
                {editingId ? 'แก้ไขกิจกรรมในปฏิทิน' : 'เพิ่มกิจกรรมใหม่'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">ชื่อกิจกรรม / กำหนดการ *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น การสอบกลางภาคเรียนที่ 1 / พิธีไหว้ครู..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">วันที่เริ่มต้น *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">วันที่สิ้นสุด (ถ้ามี)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">หมวดหมู่กิจกรรม</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">เวลา (เช่น 08:30 - 12:00 น.)</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="08:30 - 15:30 น."
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">สถานที่</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="เช่น หอประชุมโรงเรียนบ้านนาดอย"
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">รายละเอียดเพิ่มเติม</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="รายละเอียดกำหนดการและกลุ่มเป้าหมาย..."
                  className="w-full p-4 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  บันทึกกิจกรรม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
