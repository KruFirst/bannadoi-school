'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  Newspaper, 
  Users, 
  FileText, 
  ShieldCheck, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { newsItems, staffMembers, downloadableDocs, itaData } from '@/data/schoolData';
import { schoolEvents } from '@/data/calendarData';

export default function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const q = query.trim().toLowerCase();

  const matchedNews = q
    ? newsItems.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchedStaff = q
    ? staffMembers.filter((s) => s.name.toLowerCase().includes(q) || s.position.toLowerCase().includes(q) || (s.major && s.major.toLowerCase().includes(q))).slice(0, 3)
    : [];

  const matchedDocs = q
    ? downloadableDocs.filter((d) => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchedITA = q
    ? itaData.flatMap(s => s.items).filter(i => i.code.toLowerCase().includes(q) || i.title.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchedEvents = q
    ? schoolEvents.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const hasResults = matchedNews.length > 0 || matchedStaff.length > 0 || matchedDocs.length > 0 || matchedITA.length > 0 || matchedEvents.length > 0;

  return (
    <>
      {/* Floating Quick Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-slate-700 text-xs font-semibold shadow-lg border border-slate-200 hover:border-slate-300 transition-all hover:scale-105"
        title="ค้นหาด่วนในเว็บไซต์ (Ctrl + K)"
      >
        <Search className="w-3.5 h-3.5 text-school-green-700" />
        <span className="hidden sm:inline">ค้นหา</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 rounded border border-slate-200 text-slate-400">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-school-green-700 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาข่าว, ครู, เอกสาร, ปฏิทิน หรือ ITA O1-O43..."
                className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Container */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 text-xs">
              {!q && (
                <div className="text-center py-8 text-slate-400 space-y-1">
                  <p className="font-medium text-slate-600">พิมพ์คำค้นหาเพื่อค้นหาข้อมูลทั่วทั้งเว็บไซต์</p>
                  <p className="text-[11px]">เช่น &ldquo;ปฏิทิน&rdquo;, &ldquo;วิทยาศาสตร์&rdquo;, &ldquo;ปพ.1&rdquo;, &ldquo;O1&rdquo;, &ldquo;นายจิรพัส&rdquo;</p>
                </div>
              )}

              {q && !hasResults && (
                <div className="text-center py-8 text-slate-400">
                  ไม่พบข้อมูลที่ตรงกับ &ldquo;{query}&rdquo;
                </div>
              )}

              {/* Matched News */}
              {matchedNews.length > 0 && (
                <div className="space-y-2 pt-2 first:pt-0">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-school-green-700" />
                    <span>ข่าวสารและกิจกรรม</span>
                  </span>
                  {matchedNews.map((n) => (
                    <Link
                      key={n.id}
                      href={`/news/${n.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{n.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{n.excerpt}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Matched Staff */}
              {matchedStaff.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-school-green-700" />
                    <span>คณะครูและบุคลากร</span>
                  </span>
                  {matchedStaff.map((s) => (
                    <Link
                      key={s.id}
                      href="/staff"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{s.name}</h4>
                        <p className="text-[11px] text-slate-400">{s.position} • {s.department}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Matched Documents */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-school-purple-700" />
                    <span>เอกสารดาวน์โหลด</span>
                  </span>
                  {matchedDocs.map((d) => (
                    <Link
                      key={d.id}
                      href="/downloads"
                      onClick={() => setIsOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="font-bold text-slate-800 text-xs">{d.title}</h4>
                      <p className="text-[11px] text-slate-400">{d.category} ({d.fileSize})</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* Matched ITA */}
              {matchedITA.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-school-purple-700" />
                    <span>มาตรฐานความโปร่งใส ITA / OIT</span>
                  </span>
                  {matchedITA.map((i) => (
                    <Link
                      key={i.code}
                      href="/ita"
                      onClick={() => setIsOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-school-purple-700 mr-1.5">[{i.code}]</span>
                      <span className="font-semibold text-slate-800">{i.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Matched Events */}
              {matchedEvents.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>ปฏิทินกิจกรรม</span>
                  </span>
                  {matchedEvents.map((ev) => (
                    <Link
                      key={ev.id}
                      href="/calendar"
                      onClick={() => setIsOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <h4 className="font-bold text-slate-800 text-xs">{ev.title}</h4>
                      <p className="text-[11px] text-slate-400">{ev.date} • {ev.categoryLabel}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
