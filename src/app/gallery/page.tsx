'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Calendar, 
  X, 
  ZoomIn, 
  Filter
} from 'lucide-react';
import { galleryPhotos, GalleryPhoto } from '@/data/galleryData';
import { schoolInfo } from '@/data/schoolData';

const categories = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'academic', label: 'กิจกรรมวิชาการ' },
  { key: 'student-life', label: 'กิจกรรมพัฒนาผู้เรียน' },
  { key: 'culture', label: 'ประเพณีและวัฒนธรรม' },
  { key: 'boarding', label: 'ชีวิตหอนอน' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filtered = galleryPhotos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>คลังภาพกิจกรรมและบรรยากาศสถานศึกษา</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            แกลเลอรีภาพกิจกรรม {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ประมวลภาพความประทับใจ กิจกรรมวิชาการ การพัฒนาทักษะชีวิต และวิถีความเป็นอยู่ของนักเรียนพักนอน
          </p>
        </div>

        {/* Categories Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">หมวดหมู่:</span>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === c.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden card-hover cursor-pointer"
            >
              <div className="h-60 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                    {photo.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-school-green-700 transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4"
            >
              <div className="relative h-96 w-full bg-slate-900">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 pt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-school-green-100 text-school-green-800 text-[11px] font-bold">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">{selectedPhoto.date}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-800">{selectedPhoto.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
