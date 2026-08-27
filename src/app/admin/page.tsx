'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  Volume2, 
  MessageSquare, 
  Plus, 
  Eye, 
  Pin, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Copy,
  Check,
  BarChart3,
  Calendar
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    newsCount: 0,
    announcementsCount: 0,
    contactsCount: 0,
    admissionsCount: 0,
  });
  const [visitorStats, setVisitorStats] = useState({
    total: 12450,
    today: 184,
    thisMonth: 3820,
    onlineNow: 5,
  });
  const [copied, setCopied] = useState(false);
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch dashboard data
    fetch('/api/news')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setStats((prev) => ({ ...prev, newsCount: res.data.length }));
          setRecentNews(res.data.slice(0, 4));
        }
      })
      .catch(() => {});

    fetch('/api/announcements')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setStats((prev) => ({ ...prev, announcementsCount: res.data.length }));
        }
      })
      .catch(() => {});

    fetch('/api/contact')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setStats((prev) => ({ ...prev, contactsCount: res.data.length }));
          setRecentContacts(res.data.slice(0, 3));
        }
      })
      .catch(() => {});

    fetch('/api/admissions')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setStats((prev) => ({ ...prev, admissionsCount: res.data.length }));
        }
      })
      .catch(() => {});

    fetch('/api/analytics/visitor')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setVisitorStats(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopySAR = () => {
    const text = `📊 สถิติการเผยแพร่ข้อมูลและการเข้าชมเว็บไซต์ทางการ ${schoolInfo.nameTh} (${schoolInfo.affiliation})
- จำนวนผู้เข้าชมเว็บไซต์สะสมทั้งหมด: ${visitorStats.total.toLocaleString()} ครั้ง
- สถิติผู้เข้าชมเฉลี่ยประจำเดือน: ${visitorStats.thisMonth.toLocaleString()} ครั้ง
- สถิติผู้เข้าชมวันนี้: ${visitorStats.today.toLocaleString()} ครั้ง
- ข้อมูล ณ วันที่: ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
(ใช้สำหรับประกอบการจัดทำรายงาน SAR และการประเมินคุณธรรมและความโปร่งใส ITA สถานศึกษา)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-school-green-800 to-school-purple-900 rounded-3xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold px-3 py-1 bg-white/20 rounded-full text-school-green-100">
            ระบบจัดการเว็บไซต์โรงเรียน
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            ยินดีต้อนรับสู่แดชบอร์ด {schoolInfo.nameTh}
          </h1>
          <p className="text-xs text-slate-300">
            {schoolInfo.affiliation} • ผู้บริหาร: {schoolInfo.director.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4 text-school-green-700" />
            <span>เขียนข่าวใหม่</span>
          </Link>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all shrink-0"
          >
            <span>เปลี่ยนรหัสผ่าน</span>
          </Link>
        </div>
      </div>

      {/* Visitor Analytics & SAR Reporting Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-school-green-700 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base">สถิติผู้เข้าชมเว็บไซต์สำหรับรายงาน SAR / ITA</h2>
              <p className="text-xs text-slate-500">บันทึกสถิติแบบ Real-time เพื่อใช้ประกอบการประเมินคุณภาพสถานศึกษา</p>
            </div>
          </div>

          <button
            onClick={handleCopySAR}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">คัดลอกสถิติแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>คัดลอกสถิติสำหรับรายงาน SAR</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">ผู้เข้าชมวันนี้</span>
            <p className="text-2xl font-bold text-slate-800 font-mono mt-1">{visitorStats.today.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">ผู้เข้าชมเดือนนี้</span>
            <p className="text-2xl font-bold text-school-green-700 font-mono mt-1">{visitorStats.thisMonth.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block">ผู้เข้าชมสะสมทั้งหมด</span>
            <p className="text-2xl font-bold text-amber-600 font-mono mt-1">{visitorStats.total.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ออนไลน์ขณะนี้</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600 font-mono mt-1">{visitorStats.onlineNow} คน</p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">ข่าวสารและกิจกรรม</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.newsCount} รายการ</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-school-green-50 text-school-green-700 flex items-center justify-center">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">แถบประกาศด่วน</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.announcementsCount} รายการ</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-school-purple-50 text-school-purple-700 flex items-center justify-center">
            <Volume2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">กล่องข้อความ / ร้องเรียน</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats.contactsCount} ข้อความ</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent News & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent News List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-base text-slate-800">ข่าวสารล่าสุดในระบบ</h2>
            <Link href="/admin/news" className="text-xs font-semibold text-school-green-700 hover:underline">
              จัดการข่าวทั้งหมด →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentNews.map((news) => (
              <div key={news.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {news.categoryLabel}
                    </span>
                    {news.isPinned && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-school-purple-100 text-school-purple-800 font-bold flex items-center gap-0.5">
                        <Pin className="w-2.5 h-2.5" />
                        ปักหมุด
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">{news.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm truncate">{news.title}</h3>
                </div>

                <div className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{news.views || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-base text-slate-800">ข้อความติดต่อล่าสุด</h2>
            <Link href="/admin/petitions" className="text-xs font-semibold text-school-green-700 hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>

          {recentContacts.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">ไม่มีข้อความใหม่</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="text-slate-400">{c.messageType === 'petition' ? 'ร้องเรียน' : 'สอบถาม'}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium truncate">{c.subject}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
