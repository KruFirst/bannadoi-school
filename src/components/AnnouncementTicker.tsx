'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, ChevronRight, X } from 'lucide-react';
import { announcements as initialAnnouncements } from '@/data/schoolData';
import { Announcement } from '@/types';

export default function AnnouncementTicker() {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => {});
  }, []);

  if (!isVisible || items.length === 0) return null;

  const current = items[currentIndex] || items[0];

  return (
    <div className="bg-gradient-to-r from-school-green-800 via-school-green-700 to-school-purple-800 text-white text-xs md:text-sm py-2 px-4 shadow-sm print:hidden">
      <div className="container-custom flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium shrink-0">
            <Volume2 className="w-3.5 h-3.5 text-school-green-100" />
            <span className="hidden sm:inline text-white">ประกาศด่วน</span>
          </span>

          <div className="truncate font-light text-slate-100">
            {current.link ? (
              <Link href={current.link} className="hover:underline flex items-center gap-1 truncate">
                <span>{current.title}</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
              </Link>
            ) : (
              <span>{current.title}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[11px] text-white/70">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                }`}
                title={`ประกาศที่ ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded transition text-white/80 hover:text-white ml-2"
            title="ปิดแถบประกาศ"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
