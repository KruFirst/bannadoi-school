'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Type, RotateCcw, Sparkles } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('contrast-125', 'brightness-95');
    } else {
      document.body.classList.remove('contrast-125', 'brightness-95');
    }
  }, [highContrast]);

  const handleReset = () => {
    setFontSize('normal');
    setHighContrast(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-white/20 transition-all hover:scale-105"
        title="เครื่องมือช่วยเหลือการเข้าถึง (Accessibility Tool)"
      >
        <Eye className="w-4 h-4 text-school-green-400" />
        <span className="hidden sm:inline">การเข้าถึง</span>
      </button>

      {/* Tool Panel Popup */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-4 animate-in slide-in-from-bottom-3 duration-200 text-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold flex items-center gap-1.5 text-slate-800">
              <Type className="w-4 h-4 text-school-purple-600" />
              <span>ปรับขนาดตัวอักษร</span>
            </span>
            <button
              onClick={handleReset}
              className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
              title="คืนค่าเดิม"
            >
              <RotateCcw className="w-3 h-3" />
              <span>รีเซ็ต</span>
            </button>
          </div>

          {/* Font Size Buttons */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setFontSize('normal')}
              className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                fontSize === 'normal'
                  ? 'bg-school-green-50 border-school-green-600 text-school-green-800 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ก (ปกติ)
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                fontSize === 'large'
                  ? 'bg-school-green-50 border-school-green-600 text-school-green-800 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ก+ (ใหญ่)
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`py-1.5 rounded-lg text-base font-bold border transition-colors ${
                fontSize === 'xlarge'
                  ? 'bg-school-green-50 border-school-green-600 text-school-green-800 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ก++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">โหมดเพิ่มความคมชัด</span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                highContrast ? 'bg-school-purple-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  highContrast ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
