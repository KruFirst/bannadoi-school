'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  Volume2, 
  MessageSquare, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Users,
  Award,
  Calendar,
  Database,
  GraduationCap,
  Contact,
  KeyRound
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const adminNav = [
  { name: 'แดชบอร์ดภาพรวม', href: '/admin', icon: LayoutDashboard },
  { name: 'ระบบรับสมัครนักเรียน', href: '/admin/admissions', icon: GraduationCap },
  { name: 'ออกบัตรประจำตัวนักเรียน', href: '/admin/student-card', icon: Contact },
  { name: 'จัดการเกียรติบัตรออนไลน์', href: '/admin/certificates', icon: Award },
  { name: 'จัดการข่าวสาร & กิจกรรม', href: '/admin/news', icon: Newspaper },
  { name: 'จัดการแถบประกาศด่วน', href: '/admin/announcements', icon: Volume2 },
  { name: 'จัดการปฏิทินกิจกรรม', href: '/admin/calendar', icon: Calendar },
  { name: 'จัดการทำเนียบบุคลากร', href: '/admin/staff', icon: Users },
  { name: 'จัดการเอกสารดาวน์โหลด', href: '/admin/documents', icon: ShieldCheck },
  { name: 'กล่องข้อความ & E-Petition', href: '/admin/petitions', icon: MessageSquare },
  { name: 'ผลการประเมินความพึงพอใจ', href: '/admin/surveys', icon: Award },
  { name: 'สำรอง & กู้คืนข้อมูล', href: '/admin/backup', icon: Database },
  { name: 'ตั้งค่าบัญชี & รหัสผ่าน', href: '/admin/profile', icon: KeyRound },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, don't show admin chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row print:bg-white print:p-0 print:m-0 print:block">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 p-5 shrink-0 justify-between print:hidden">
        <div className="space-y-6">
          {/* Logo & School Name */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt={schoolInfo.nameTh}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-white truncate">{schoolInfo.nameTh}</h2>
              <span className="text-[10px] text-school-green-400 font-medium">Admin CMS v2.0</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              เมนูการจัดการ
            </p>
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-school-green-700 text-white shadow-sm font-semibold'
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>เปิดดูหน้าเว็บจริง</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 print:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt={schoolInfo.nameTh} className="w-8 h-8 object-contain bg-white rounded-lg p-0.5" />
          <span className="font-bold text-sm truncate">{schoolInfo.nameTh} CMS</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 space-y-2 border-b border-slate-800 print:hidden">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                  isActive ? 'bg-school-green-700 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <Link href="/" target="_blank" className="text-slate-400 hover:text-white">
              ดูหน้าเว็บจริง
            </Link>
            <button onClick={handleLogout} className="text-red-400">
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full print:p-0 print:m-0 print:max-w-none print:w-full print:bg-white">
        {children}
      </main>
    </div>
  );
}
