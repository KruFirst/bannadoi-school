'use client';

import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Radio } from 'lucide-react';

interface VisitorData {
  total: number;
  today: number;
  thisMonth: number;
  onlineNow: number;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorData>({
    total: 12450,
    today: 184,
    thisMonth: 3820,
    onlineNow: 5,
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('bannadoi_visited_session');

    if (!hasVisited) {
      // First visit in this browser session: increment
      fetch('/api/analytics/visitor', { method: 'POST' })
        .then((res) => res.json())
        .then((res) => {
          if (res.success && res.data) {
            setStats(res.data);
            sessionStorage.setItem('bannadoi_visited_session', 'true');
          }
        })
        .catch(() => {});
    } else {
      // Already visited in this session: just read
      fetch('/api/analytics/visitor')
        .then((res) => res.json())
        .then((res) => {
          if (res.success && res.data) {
            setStats(res.data);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
          <Eye className="w-3.5 h-3.5 text-school-green-400" />
          <span>สถิติผู้เข้าชมเว็บไซต์ (SAR/ITA)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ออนไลน์ {stats.onlineNow} คน</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
          <span className="text-[10px] text-slate-400 block">วันนี้</span>
          <span className="font-bold text-white font-mono text-xs">{stats.today.toLocaleString()}</span>
        </div>
        <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
          <span className="text-[10px] text-slate-400 block">เดือนนี้</span>
          <span className="font-bold text-school-green-300 font-mono text-xs">{stats.thisMonth.toLocaleString()}</span>
        </div>
        <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
          <span className="text-[10px] text-slate-400 block">ทั้งหมด</span>
          <span className="font-bold text-amber-300 font-mono text-xs">{stats.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
