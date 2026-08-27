'use client';

import React, { useState } from 'react';
import { FileText, Download, Search, FileSpreadsheet, Folder, Calendar } from 'lucide-react';
import { downloadableDocs, schoolInfo } from '@/data/schoolData';

const categories = ['ทั้งหมด', 'งานทะเบียนและวัดผล', 'งานกิจการนักเรียน', 'คู่มือและระเบียบการ', 'งานบริหารทั่วไป', 'งานวิชาการ'];

export default function DownloadsPage() {
  const [selectedCat, setSelectedCat] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = downloadableDocs.filter((doc) => {
    const matchesCat = selectedCat === 'ทั้งหมด' || doc.category === selectedCat;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <Folder className="w-3.5 h-3.5" />
            <span>ศูนย์บริการเอกสารและแบบฟอร์ม</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            เอกสารดาวน์โหลด {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ดาวน์โหลดแบบคำร้อง คู่มือนักเรียน เอกสารงานทะเบียน และแบบฟอร์มราชการ
          </p>
        </div>

        {/* Filter and Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCat === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อเอกสาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Documents Table / Card List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
          {filteredDocs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              ไม่พบเอกสารที่ตรงกับคำค้นหา
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    doc.fileType === 'pdf' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-sm md:text-base">
                      {doc.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium">
                        {doc.category}
                      </span>
                      <span>ขนาด: {doc.fileSize}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        ปรับปรุง: {doc.updateDate}
                      </span>
                      <span>ดาวน์โหลดแล้ว {doc.downloads} ครั้ง</span>
                    </div>
                  </div>
                </div>

                <a
                  href={doc.url}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-school-green-700 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลดไฟล์</span>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
