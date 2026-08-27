'use client';

import React, { useState } from 'react';
import { Newspaper, Search, Filter } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import { newsItems, schoolInfo } from '@/data/schoolData';

const categories = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'academic', label: 'ข่าววิชาการ' },
  { key: 'activity', label: 'ข่าวกิจกรรม' },
  { key: 'general', label: 'ประชาสัมพันธ์ทั่วไป' },
  { key: 'ita', label: 'จัดซื้อจัดจ้าง/ITA' },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>ศูนย์ข่าวสารและการประชาสัมพันธ์</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            ข่าวสารและกิจกรรม {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ติดตามข่าวสาร ประกาศทางวิชาการ ภาพกิจกรรมนักเรียน และประกาศจัดซื้อจัดจ้าง
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาหัวข้อข่าว..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
            ไม่พบข่าวสารที่ตรงกับคำค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
