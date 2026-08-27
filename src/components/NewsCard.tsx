import React from 'react';
import Link from 'next/link';
import { Calendar, Eye, Pin, ArrowRight } from 'lucide-react';
import { NewsItem } from '@/types';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  general: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  academic: { bg: 'bg-school-green-50', text: 'text-school-green-700', border: 'border-school-green-200' },
  activity: { bg: 'bg-school-purple-50', text: 'text-school-purple-700', border: 'border-school-purple-200' },
  ita: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const catStyle = categoryStyles[news.category] || categoryStyles.general;

  if (featured) {
    return (
      <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden card-hover grid md:grid-cols-12 gap-0 relative">
        {news.isPinned && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-school-purple-700 text-white text-xs font-semibold rounded-full shadow-md">
            <Pin className="w-3 h-3 rotate-45" />
            <span>ข่าวปักหมุด</span>
          </div>
        )}

        <div className="md:col-span-6 relative h-64 md:h-full overflow-hidden bg-slate-100">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                {news.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {news.date}
              </span>
            </div>

            <Link href={`/news/${news.id}`}>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-school-green-700 transition-colors leading-snug mb-3">
                {news.title}
              </h3>
            </Link>

            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
              {news.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {news.views} ครั้ง
            </span>

            <Link
              href={`/news/${news.id}`}
              className="inline-flex items-center gap-1.5 font-semibold text-school-green-700 hover:text-school-green-800"
            >
              <span>อ่านต่อ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden card-hover flex flex-col justify-between relative">
      {news.isPinned && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-0.5 bg-school-purple-700 text-white text-[11px] font-semibold rounded-full shadow-sm">
          <Pin className="w-3 h-3 rotate-45" />
          <span>ปักหมุด</span>
        </div>
      )}

      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
              {news.categoryLabel}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {news.date}
            </span>
          </div>

          <Link href={`/news/${news.id}`}>
            <h3 className="font-bold text-slate-800 group-hover:text-school-green-700 transition-colors line-clamp-2 mb-2 leading-snug">
              {news.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {news.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-50">
        <span className="flex items-center gap-1 text-[11px]">
          <Eye className="w-3 h-3" />
          {news.views} ครั้ง
        </span>

        <Link
          href={`/news/${news.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-school-green-700 hover:text-school-green-800"
        >
          <span>รายละเอียด</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
