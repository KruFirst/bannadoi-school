'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Calendar, 
  User, 
  Building2, 
  CheckCircle2,
  Medal
} from 'lucide-react';
import { schoolAwards, AwardItem } from '@/data/awardsData';
import { schoolInfo } from '@/data/schoolData';

const categories = ['ทั้งหมด', 'นักเรียน', 'ครูและบุคลากร', 'สถานศึกษา'];

export default function AwardsPage() {
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

  const filtered = schoolAwards.filter((item) => {
    if (activeCategory === 'ทั้งหมด') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>ทำเนียบเกียรติยศและรางวัลดีเด่น</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            ผลงานและความภาคภูมิใจ {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            รวบรวมรางวัลเกียรติยศระดับเขตพื้นที่ ระดับจังหวัด และระดับประเทศ ของนักเรียน คณะครู และสถานศึกษา
          </p>
        </div>

        {/* Category Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">หมวดหมู่:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((award) => (
            <div
              key={award.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md flex items-center gap-1">
                      <Medal className="w-3.5 h-3.5" />
                      <span>ปี {award.year}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                      {award.level}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-amber-700 font-bold">
                    <Award className="w-4 h-4" />
                    <span>ประเภท: {award.category}</span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 leading-snug">
                    {award.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {award.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-start gap-2">
                      <User className="w-3.5 h-3.5 text-school-green-700 shrink-0 mt-0.5" />
                      <span><strong>ผู้รับรางวัล:</strong> {award.recipient}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-400">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span>หน่วยงานที่มอบ: {award.issuer}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
