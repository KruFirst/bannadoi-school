'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Search, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { itaData, schoolInfo } from '@/data/schoolData';

export default function ITAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'หมวดที่ 1: โครงสร้างและการบริหารงาน (O1 - O10)': true,
    'หมวดที่ 2: การจัดซื้อจัดจ้างและการบริหารงบประมาณ (O11 - O20)': true,
    'หมวดที่ 3: การบริหารและพัฒนาทรัพยากรบุคคล (O21 - O27)': true,
    'หมวดที่ 4: การส่งเสริมความโปร่งใสและการป้องกันการทุจริต (O28 - O43)': true,
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-12">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-school-purple-900 via-slate-900 to-school-green-900 rounded-3xl p-8 md:p-12 text-white shadow-lg space-y-4 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-school-purple-200">
              <Award className="w-3.5 h-3.5" />
              <span>การประเมินคุณธรรมและความโปร่งใสภาครัฐ (ITA / OIT) 2569</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              ศูนย์ข้อมูลความโปร่งใสและการเปิดเผยข้อมูลสาธารณะ
            </h1>

            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              {schoolInfo.nameTh} ดำเนินการเปิดเผยข้อมูลตามเกณฑ์การประเมิน ITA ประจำปีงบประมาณ พ.ศ. 2569 ตามมาตรฐานสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) และสำนักงาน ป.ป.ช.
            </p>
          </div>

          <div className="absolute right-6 -bottom-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหารหัสตัวชี้วัด เช่น O1, O11 หรือคำค้นหาเกี่ยวกับแผนงาน จัดซื้อจัดจ้าง..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-purple-600 focus:bg-white transition-all"
            />
          </div>

          <button
            onClick={() => {
              const allOpen = Object.keys(openCategories).reduce((acc, k) => ({ ...acc, [k]: true }), {});
              setOpenCategories(allOpen);
            }}
            className="text-xs font-semibold text-school-purple-700 hover:text-school-purple-900 shrink-0 px-3 py-2"
          >
            ขยายทั้งหมด
          </button>
        </div>

        {/* Categories Accordions */}
        <div className="space-y-8">
          {itaData.map((section) => {
            const filteredItems = section.items.filter(
              (item) =>
                item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredItems.length === 0) return null;

            const isOpen = openCategories[section.category];

            return (
              <div
                key={section.category}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                {/* Category Header Bar */}
                <button
                  onClick={() => toggleCategory(section.category)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors border-b border-slate-100"
                >
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-school-purple-700 shrink-0" />
                      <span>{section.category}</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-light mt-0.5">
                      {section.description}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Items Grid */}
                {isOpen && (
                  <div className="p-6 divide-y divide-slate-100">
                    {(searchTerm ? filteredItems : section.items).map((item) => (
                      <div
                        key={item.code}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-xl transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-school-purple-100 text-school-purple-800 font-bold text-xs">
                              {item.code}
                            </span>
                            <h3 className="font-bold text-slate-800 text-sm md:text-base">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 font-light">
                            {item.description}
                          </p>
                        </div>

                        {/* File Links */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {item.items.map((file, idx) => (
                            <a
                              key={idx}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-school-purple-50 text-slate-700 hover:text-school-purple-700 border border-slate-200 hover:border-school-purple-200 transition-all shadow-2xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-school-purple-600" />
                              <span className="truncate max-w-[200px]">{file.title}</span>
                              <Download className="w-3 h-3 opacity-60" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
