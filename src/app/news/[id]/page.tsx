import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Eye, 
  User, 
  ArrowLeft, 
  FolderOpen
} from 'lucide-react';
import { newsItems, schoolInfo } from '@/data/schoolData';
import ShareButton from '@/components/ShareButton';

export function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id,
  }));
}

export default function SingleNewsPage({ params }: { params: { id: string } }) {
  const news = newsItems.find((item) => item.id === params.id);

  if (!news) {
    notFound();
  }

  const relatedNews = newsItems.filter((item) => item.id !== news.id).slice(0, 2);

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom max-w-4xl space-y-8">
        {/* Breadcrumb & Back Link */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 font-medium hover:text-school-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่ศูนย์ข่าวสาร</span>
          </Link>

          <div className="flex items-center gap-2">
            <span>หน้าแรก</span>
            <span>/</span>
            <span>ข่าวสาร</span>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{news.title}</span>
          </div>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm space-y-8">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-school-green-50 text-school-green-700 border border-school-green-200 text-xs font-semibold rounded-full">
                {news.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {news.date}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {news.views} ครั้ง
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 leading-snug">
              {news.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>เผยแพร่โดย: <strong className="text-slate-700">{news.author}</strong></span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 aspect-video bg-slate-100">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed text-slate-700 space-y-4 whitespace-pre-line">
            {news.content}
          </div>

          {/* Share & Category Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-school-green-700" />
              <span>หมวดหมู่: <strong>{news.categoryLabel}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <ShareButton title={news.title} />
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="font-bold text-lg text-slate-800">ข่าวสารอื่นๆ ที่น่าสนใจ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 card-hover flex gap-4 items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] text-school-green-700 font-medium mb-1">{item.categoryLabel}</p>
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
