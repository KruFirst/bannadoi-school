'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown,
  ShieldCheck,
  GraduationCap,
  Bed,
  Calendar,
  Contact,
  BookOpen,
  Award,
  Trophy,
  ClipboardList,
  FileText,
  Lock,
  Utensils,
  Image as ImageIcon
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const primaryNav = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'เกี่ยวกับเรา', href: '/about' },
  { name: 'บุคลากร', href: '/staff' },
  { name: 'ข่าวสาร', href: '/news' },
  { name: 'รับสมัครนักเรียน', href: '/admissions', isHighlight: true },
  { name: 'ITA / OIT', href: '/ita', isBadge: true },
];

const serviceLinks = [
  { name: 'หอนอนนักเรียนพักนอน', href: '/boarding', icon: Bed, desc: 'การดูแลชีวิตความเป็นอยู่ 69 คน' },
  { name: 'อาหารกลางวัน & โภชนาการ', href: '/canteen', icon: Utensils, desc: 'เมนูอาหาร 3 มื้อและผลผลิตเกษตร' },
  { name: 'แกลเลอรีภาพกิจกรรม', href: '/gallery', icon: ImageIcon, desc: 'ประมวลภาพกิจกรรมโรงเรียน' },
  { name: 'ปฏิทินการศึกษา', href: '/calendar', icon: Calendar, desc: 'ตารางสอบ วันเปิด-ปิดเทอม 2569' },
  { name: 'คลังสื่อและนวัตกรรม', href: '/learning', icon: BookOpen, desc: 'ภูมิปัญญาปะกาเกอญอ & STEM' },
  { name: 'ตรวจสอบเกียรติบัตร', href: '/certificates', icon: Award, desc: 'ตรวจสอบรหัสวุฒิบัตรออนไลน์' },
  { name: 'ทำเนียบรางวัลดีเด่น', href: '/awards', icon: Trophy, desc: 'รางวัลระดับเขตและจังหวัด' },
  { name: 'เอกสารดาวน์โหลด', href: '/downloads', icon: FileText, desc: 'แบบคำร้องและแบบฟอร์ม' },
  { name: 'แบบประเมินความพึงพอใจ', href: '/survey', icon: ClipboardList, desc: 'แบบสำรวจความคิดเห็น' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/90 transition-all print:hidden">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-2xs border border-slate-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/logo.png"
                alt={schoolInfo.nameTh}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base md:text-lg text-slate-800 tracking-tight group-hover:text-school-green-700 transition-colors">
                  {schoolInfo.nameTh}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light hidden sm:block">
                สพป. แม่ฮ่องสอน เขต 2
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              if (item.isBadge) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 mx-0.5 ${
                      isActive
                        ? 'bg-school-purple-700 text-white shadow-xs'
                        : 'bg-school-purple-50 text-school-purple-700 hover:bg-school-purple-100 border border-school-purple-200/70'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              if (item.isHighlight) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 mx-0.5 ${
                      isActive
                        ? 'bg-school-green-800 text-white shadow-xs'
                        : 'bg-emerald-50 text-school-green-800 hover:bg-emerald-100 border border-emerald-200/80'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-xs md:text-[13px] font-medium transition-all relative ${
                    isActive
                      ? 'text-school-green-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-school-green-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Dropdown: บริการอื่นๆ (Other Services) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 py-2 text-xs md:text-[13px] font-medium transition-all inline-flex items-center gap-1 rounded-xl hover:bg-slate-50 ${
                  isDropdownOpen ? 'text-school-green-800 font-bold bg-slate-50' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>บริการอื่นๆ</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-school-green-700' : 'text-slate-400'}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-xl border border-slate-100 p-2 space-y-1 animate-in fade-in-50 zoom-in-95 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      ระบบบริการและสารสนเทศ
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto">
                    {serviceLinks.map((s) => {
                      const IconComp = s.icon;
                      const isServiceActive = pathname === s.href;
                      return (
                        <Link
                          key={s.name}
                          href={s.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-2xl transition-colors ${
                            isServiceActive
                              ? 'bg-school-green-50 text-school-green-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                            isServiceActive ? 'bg-school-green-200/80 text-school-green-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 leading-tight">{s.name}</h4>
                            <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{s.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`px-3 py-2 text-xs md:text-[13px] font-medium transition-all ${
                pathname === '/contact' ? 'text-school-green-800 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ติดต่อเรา
            </Link>
          </nav>

          {/* Desktop Admin Direct Access Button */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-school-purple-700 bg-purple-50 hover:bg-school-purple-700 hover:text-white rounded-xl border border-purple-200 transition-all shadow-2xs"
            >
              <Lock className="w-3 h-3" />
              <span>จัดการระบบ (Admin)</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="เมนูหลัก"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          {primaryNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  item.isBadge
                    ? isActive
                      ? 'bg-school-purple-700 text-white font-bold'
                      : 'bg-school-purple-50 text-school-purple-700'
                    : item.isHighlight
                    ? isActive
                      ? 'bg-school-green-700 text-white font-bold'
                      : 'bg-emerald-50 text-school-green-800'
                    : isActive
                    ? 'bg-school-green-50 text-school-green-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.name}</span>
                {item.isBadge && <ShieldCheck className="w-3.5 h-3.5 opacity-70" />}
                {item.isHighlight && <GraduationCap className="w-3.5 h-3.5 opacity-70" />}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 px-3 uppercase tracking-wider block mb-1">
              บริการอื่นๆ
            </span>
            <div className="space-y-1">
              {serviceLinks.map((s) => {
                const IconComp = s.icon;
                const isServiceActive = pathname === s.href;
                return (
                  <Link
                    key={s.name}
                    href={s.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                      isServiceActive
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <span>{s.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <span>ติดต่อเรา</span>
          </Link>
          
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs text-school-purple-800 bg-purple-50 hover:bg-school-purple-700 hover:text-white rounded-xl font-bold transition-all border border-purple-200"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>เข้าสู่ระบบแก้ไขหน้าเว็บ (Admin CMS)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
