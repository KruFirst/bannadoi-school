'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, Contact, ShieldCheck, ArrowRight } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

export default function StudentCardRedirectPage() {
  return (
    <div className="bg-[#fcfdfd] py-16 md:py-24">
      <div className="container-custom max-w-lg text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-purple-50 text-school-purple-700 flex items-center justify-center mx-auto shadow-xs border border-purple-100">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            <Contact className="w-3.5 h-3.5" />
            <span>ระบบงานเฉพาะผู้ดูแลระบบและคณะครู</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            ระบบออกบัตรประจำตัวนักเรียน
          </h1>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            ระบบสร้างและพิมพ์บัตรประจำตัวนักเรียนดิจิทัลจำกัดสิทธิ์การใช้งานเฉพาะคุณครูและผู้ดูแลระบบ (Admin Only) กรุณาเข้าสู่ระบบหลังบ้านเพื่อดำเนินการ
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            กลับสู่หน้าแรก
          </Link>
          <Link
            href="/admin/student-card"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>เข้าสู่ระบบหลังบ้าน (Admin CMS)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
