'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Newspaper, 
  ShieldCheck, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  X,
  Maximize2,
  Calendar
} from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import QuickLinks from '@/components/QuickLinks';
import StatCounter from '@/components/StatCounter';
import NewsCard from '@/components/NewsCard';
import { schoolInfo, newsItems as initialNews } from '@/data/schoolData';
import { NewsItem } from '@/types';

const categories: { key: string; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'academic', label: 'ข่าววิชาการ' },
  { key: 'activity', label: 'ข่าวกิจกรรม' },
  { key: 'general', label: 'ประชาสัมพันธ์ทั่วไป' },
  { key: 'ita', label: 'จัดซื้อจัดจ้าง/ITA' },
];

const galleryImages = [
  {
    title: 'การจัดการเรียนรู้ Active Learning ในห้องเรียน',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    caption: 'นักเรียนร่วมกิจกรรมกลุ่มฝึกทักษะการคิดวิเคราะห์',
  },
  {
    title: 'ห้องปฏิบัติการคอมพิวเตอร์และ STEM Education',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    caption: 'การเรียนรู้เทคโนโลยีดิจิทัลสำหรับเยาวชนในพื้นที่สูง',
  },
  {
    title: 'การแข่งขันหุ่นยนต์และนวัตกรรมสิ่งแวดล้อม',
    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    caption: 'ผลงานโครงงานวิทยาศาสตร์และสิ่งแวดล้อมดีเด่น',
  },
  {
    title: 'ภูมิทัศน์ธรรมชาติและสิ่งแวดล้อมสีเขียว',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    caption: 'บรรยากาศร่มรื่นของโรงเรียนบ้านนาดอย ท่ามกลางขุนเขา',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [allNews, setAllNews] = useState<NewsItem[]>(initialNews);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data.length > 0) {
          setAllNews(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredNews = activeCategory === 'all'
    ? allNews
    : allNews.filter((item) => item.category === activeCategory);

  const featuredNews = allNews.find((item) => item.isPinned) || allNews[0] || initialNews[0];
  const otherNews = filteredNews.filter((item) => item.id !== featuredNews?.id);

  return (
    <div>
      {/* 1. Hero Banner Slider */}
      <HeroBanner />

      {/* 2. Key Stats Strip (160 นักเรียน, 69 นักเรียนพักนอน) */}
      <StatCounter />

      {/* 3. Quick Links Section */}
      <QuickLinks />

      {/* 4. Latest News & Announcements Section */}
      <section className="py-16 bg-[#fcfdfd]">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-school-green-700 mb-1">
                <Newspaper className="w-4 h-4" />
                <span>ข่าวสารและการสื่อสาร</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                ข่าวสารและกิจกรรมล่าสุด
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.key
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured News */}
          {activeCategory === 'all' && featuredNews && (
            <div className="mb-8">
              <NewsCard news={featuredNews} featured={true} />
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'all' ? otherNews : filteredNews).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-800 bg-white text-slate-700 hover:text-slate-900 text-sm font-semibold transition-all hover:shadow-sm"
            >
              <span>ดูข่าวสารและกิจกรรมทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Director's Message & Core Values */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Director Photo & Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-school-green-100">
                  <img
                    src={schoolInfo.director.imageUrl}
                    alt={schoolInfo.director.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 p-3 bg-school-purple-700 text-white rounded-2xl shadow-lg">
                  <Quote className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800">{schoolInfo.director.name}</h3>
              <p className="text-xs text-school-green-700 font-semibold mb-1">{schoolInfo.director.position}</p>
              <p className="text-xs text-slate-400">{schoolInfo.director.degree}</p>
            </div>

            {/* Message & School Core Identity */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>สารจากผู้อำนวยการสถานศึกษา</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-snug">
                  มุ่งมั่นยกระดับคุณภาพผู้เรียนสู่มาตรฐานสากล บนฐานคุณธรรม
                </h2>
              </div>

              <blockquote className="text-slate-600 text-sm md:text-base leading-relaxed italic border-l-2 border-school-purple-400 pl-4 py-1">
                &ldquo;{schoolInfo.director.message}&rdquo;
              </blockquote>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-school-green-600 shrink-0" />
                    <span>วิชาการเข้มแข็ง</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    จัดการเรียนรู้ Active Learning และ STEM เน้นการคิดวิเคราะห์
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-school-purple-600 shrink-0" />
                    <span>คุณธรรมนำใจ</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    ปลูกฝังวินัย จิตสาธารณะ และความกตัญญูกตเวที
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-school-green-600 shrink-0" />
                    <span>โปร่งใส ตรวจสอบได้</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    บริหารจัดการตามเกณฑ์ประเมินคุณธรรมและความโปร่งใส (ITA)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Special Callout for ITA / OIT (สพฐ. Compliance) */}
      <section className="py-12 bg-gradient-to-r from-school-purple-900 via-slate-900 to-school-green-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-school-purple-300 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-school-green-200 mb-1">
                <span>เกณฑ์มาตรฐาน สพป.แม่ฮ่องสอน เขต 2 / สพฐ. 2569</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                การเปิดเผยข้อมูลสาธารณะและความโปร่งใส (ITA / OIT)
              </h3>
              <p className="text-xs text-slate-300 font-light mt-1">
                ตรวจสอบข้อมูลการบริหารงาน แผนปฏิบัติการประจำปี การจัดซื้อจัดจ้าง และมาตรการป้องกันการทุจริต O1 - O43
              </p>
            </div>
          </div>

          <Link
            href="/ita"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs md:text-sm font-bold shadow-lg transition-all hover:scale-105"
          >
            <span>เข้าสู่ศูนย์ข้อมูล ITA/OIT</span>
            <ArrowRight className="w-4 h-4 text-school-purple-700" />
          </Link>
        </div>
      </section>

      {/* 7. Gallery Highlights with Interactive Lightbox */}
      <section className="py-16 bg-[#fcfdfd]">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-school-green-700 mb-1">
                บรรยากาศการเรียนรู้
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                ภาพกิจกรรมโรงเรียนบ้านนาดอย (คลิกเพื่อดูภาพขยาย)
              </h2>
            </div>
            <Link
              href="/news?category=activity"
              className="text-xs font-semibold text-school-green-700 hover:text-school-green-800 flex items-center gap-1"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative group rounded-2xl overflow-hidden h-44 md:h-52 bg-slate-100 shadow-sm cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white text-xs font-medium">
                  <div className="self-end p-1.5 rounded-lg bg-black/40 backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].url}
              alt={galleryImages[lightboxIndex].title}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain border border-white/10"
            />
            <div className="text-white space-y-1">
              <h3 className="text-lg font-bold">{galleryImages[lightboxIndex].title}</h3>
              <p className="text-xs text-slate-300">{galleryImages[lightboxIndex].caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
