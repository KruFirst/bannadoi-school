'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { heroSlides, schoolInfo } from '@/data/schoolData';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Clean Minimalist Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover opacity-35 scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/40" />
      </div>

      {/* Decorative Subtle Accent Line (Green-Purple) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-school-green-500 via-school-green-400 to-school-purple-500 z-10" />

      {/* Content Container */}
      <div className="relative z-10 container-custom py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-school-green-200">
            <span className="w-2 h-2 rounded-full bg-school-green-400 animate-pulse" />
            <span>{slide.subtitle}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-school-green-600 hover:bg-school-green-500 text-white text-sm font-semibold shadow-lg shadow-school-green-900/40 transition-all hover:translate-y-[-1px]"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={slide.secondaryCtaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md border border-white/20 transition-all hover:border-white/40"
            >
              <ShieldCheck className="w-4 h-4 text-school-purple-300" />
              <span>{slide.secondaryCtaText}</span>
            </Link>
          </div>

          {/* Motto quote */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400">
            <Award className="w-4 h-4 text-school-purple-400 shrink-0" />
            <span className="italic">{schoolInfo.motto}</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors"
          aria-label="ก่อนหน้า"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
          className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-colors"
          aria-label="ถัดไป"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-school-green-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`ไปยังสไลด์ที่ ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
