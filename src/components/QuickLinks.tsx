'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Database, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  MessageSquare,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { quickLinks } from '@/data/schoolData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Database,
  BookOpen,
  ShieldCheck,
  FileText,
  MessageSquare,
  Calendar,
};

export default function QuickLinks() {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-school-green-700 mb-1">
              ระบบบริการออนไลน์
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              ลิงก์ด่วนและระบบสารสนเทศ (Quick Services)
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            เข้าถึงระบบงานวิชาการ ระบบสารสนเทศทางการศึกษา และบริการข้อมูลสาธารณะ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item, index) => {
            const Icon = iconMap[item.iconName] || BookOpen;
            const isPurple = index % 2 === 1;

            const Content = (
              <div className="group h-full p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 card-hover flex flex-col justify-between relative overflow-hidden">
                {/* Subtle colored accent on hover */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isPurple ? 'bg-school-purple-600' : 'bg-school-green-600'
                  }`} 
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isPurple 
                          ? 'bg-school-purple-50 text-school-purple-700 group-hover:bg-school-purple-600 group-hover:text-white' 
                          : 'bg-school-green-50 text-school-green-700 group-hover:bg-school-green-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-slate-800 group-hover:text-school-green-800 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>{item.isExternal ? 'ระบบภายนอก' : 'บริการภายในโรงเรียน'}</span>
                  <span className="text-school-green-700 group-hover:underline">เข้าสู่ระบบ →</span>
                </div>
              </div>
            );

            return item.isExternal ? (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {Content}
              </a>
            ) : (
              <Link key={item.title} href={item.url} className="block h-full">
                {Content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
