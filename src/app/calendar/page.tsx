'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Filter,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { schoolEvents as initialEvents, CalendarEvent } from '@/data/calendarData';
import { schoolInfo } from '@/data/schoolData';

const categories = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'academic', label: 'วิชาการ & เปิดเทอม' },
  { key: 'exam', label: 'ตารางสอบ' },
  { key: 'activity', label: 'กิจกรรมโรงเรียน' },
  { key: 'holiday', label: 'วันหยุด' },
];

const categoryColors: Record<string, { badge: string; border: string }> = {
  academic: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', border: 'border-l-emerald-600' },
  exam: { badge: 'bg-amber-50 text-amber-800 border-amber-200', border: 'border-l-amber-600' },
  activity: { badge: 'bg-purple-50 text-purple-800 border-purple-200', border: 'border-l-purple-600' },
  holiday: { badge: 'bg-rose-50 text-rose-800 border-rose-200', border: 'border-l-rose-600' },
};

export default function CalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  useEffect(() => {
    fetch('/api/calendar')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setEvents(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredEvents = events.filter((ev) => {
    if (selectedCategory === 'all') return true;
    return ev.category === selectedCategory;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>ปฏิทินการศึกษาประจำปี 2569</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            ปฏิทินกิจกรรม {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            กำหนดการเปิด-ปิดภาคเรียน กำหนดการสอบวัดผล และกิจกรรมสำคัญตลอดปีการศึกษา 2569
          </p>
        </div>

        {/* Category Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">หมวดหมู่:</span>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const colors = categoryColors[event.category] || categoryColors.academic;
            const parsedDate = new Date(event.date);
            const day = parsedDate.getDate();
            const monthTh = parsedDate.toLocaleDateString('th-TH', { month: 'short' });
            const yearTh = parsedDate.getFullYear() + 543;

            return (
              <div
                key={event.id}
                className={`bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-hover flex gap-5 border-l-4 ${colors.border}`}
              >
                {/* Date Box */}
                <div className="w-16 h-20 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">{monthTh}</span>
                  <span className="text-2xl font-black text-slate-800 leading-none my-0.5">{day}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{yearTh}</span>
                </div>

                {/* Event Details */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${colors.badge}`}>
                      {event.categoryLabel}
                    </span>
                    {event.time && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 text-base leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {event.description}
                  </p>

                  {event.location && (
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-school-green-600" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
