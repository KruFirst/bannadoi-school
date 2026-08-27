'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Sparkles, 
  Download, 
  GraduationCap, 
  Eye, 
  User, 
  Search,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { learningResources, LearningResource } from '@/data/learningData';
import { schoolInfo } from '@/data/schoolData';

const categories = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'local', label: 'ภูมิปัญญาท้องถิ่นปะกาเกอญอ' },
  { key: 'stem', label: 'STEM & วิทยาศาสตร์' },
  { key: 'agriculture', label: 'เกษตร & ทักษะชีวิต' },
  { key: 'language', label: 'ภาษาและการสื่อสาร' },
];

export default function LearningPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = learningResources.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>คลังสื่อและนวัตกรรมการศึกษา</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            คลังการเรียนรู้และภูมิปัญญาท้องถิ่น {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ศูนย์รวมสื่อการเรียนการสอน Active Learning, นวัตกรรมสะเต็มศึกษา (STEM) และองค์ความรู้วิถีชีวิตชาวไทยภูเขาปะกาเกอญอ
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === c.key
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="ค้นหาชื่อบทเรียน หรือผู้สอน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                    ระดับชั้น: {item.gradeLevel}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-slate-800 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-school-green-700 font-medium">
                    <User className="w-3.5 h-3.5" />
                    <span>ผู้จัดทำ: {item.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>เข้าชม {item.views} ครั้ง</span>
                </span>

                <Link
                  href="/downloads"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-school-green-50 hover:bg-school-green-100 text-school-green-800 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลดใบงาน/เอกสาร</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
