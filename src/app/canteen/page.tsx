'use client';

import React, { useState } from 'react';
import { 
  Utensils, 
  Apple, 
  Sparkles, 
  Sun, 
  Sunrise, 
  Moon, 
  CheckCircle2, 
  Heart, 
  Sprout,
  ShieldCheck
} from 'lucide-react';
import { weeklyMeals, DailyMeal } from '@/data/canteenData';
import { schoolInfo } from '@/data/schoolData';

export default function CanteenPage() {
  const [selectedDay, setSelectedDay] = useState(weeklyMeals[2].day); // Default วันพุธ

  const currentMeal = weeklyMeals.find((m) => m.day === selectedDay) || weeklyMeals[0];

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5" />
            <span>โภชนาการและอาหารสุขอนามัย (School Nutrition)</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            รายการอาหารประจำสัปดาห์ {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ตารางอาหารกลางวันสำหรับนักเรียนทุกคน และอาหาร 3 มื้อสำหรับนักเรียนพักนอน 69 คน ปรุงสดใหม่ สะอาด ถูกหลักโภชนาการ พร้อมผลผลิตเกษตรอินทรีย์ของโรงเรียน
          </p>
        </div>

        {/* Day Selector */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          {weeklyMeals.map((meal) => (
            <button
              key={meal.day}
              onClick={() => setSelectedDay(meal.day)}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center ${
                selectedDay === meal.day
                  ? 'bg-school-green-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div>{meal.day}</div>
              <div className={`text-[10px] font-normal mt-0.5 ${selectedDay === meal.day ? 'text-emerald-100' : 'text-slate-400'}`}>
                {meal.date}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Breakfast (หอนอน) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sunrise className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-800">มื้อเช้า (06.30 - 07.30)</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-school-purple-800">
                นักเรียนพักนอน
              </span>
            </div>

            <div className="space-y-2 py-2">
              <p className="font-bold text-slate-900 text-base leading-snug">
                {currentMeal.breakfast}
              </p>
              <p className="text-xs text-slate-500">
                พร้อมนมจืดโรงเรียนเสริมสร้างแคลเซียม
              </p>
            </div>
          </div>

          {/* Lunch (นักเรียนทุกคน) */}
          <div className="bg-white rounded-3xl border-2 border-school-green-600 shadow-md p-6 md:p-8 space-y-4 relative overflow-hidden bg-gradient-to-b from-emerald-50/30 via-white to-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-school-green-600" />
                <h3 className="font-bold text-base text-slate-800">มื้อกลางวัน (11.30 - 12.30)</h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-school-green-100 text-school-green-800">
                นักเรียนทุกคน (160 คน)
              </span>
            </div>

            <div className="space-y-3 py-2">
              <p className="font-bold text-slate-900 text-lg leading-snug text-school-green-900">
                {currentMeal.lunch}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-xl">
                <Apple className="w-4 h-4 text-amber-600" />
                <span>ผลไม้/ของหวาน: {currentMeal.dessertOrFruit}</span>
              </div>
            </div>
          </div>

          {/* Dinner (หอนอน) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-base text-slate-800">มื้อเย็น (17.30 - 18.30)</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-school-purple-800">
                นักเรียนพักนอน
              </span>
            </div>

            <div className="space-y-2 py-2">
              <p className="font-bold text-slate-900 text-base leading-snug">
                {currentMeal.dinner}
              </p>
              <p className="text-xs text-slate-500">
                อาหารอุ่นร้อนครบ 5 หมู่เพื่อการพักผ่อนที่มีคุณภาพ
              </p>
            </div>
          </div>
        </div>

        {/* Nutrition Highlights & Garden Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-school-green-800 font-bold text-sm">
              <Heart className="w-4 h-4" />
              <span>คุณค่าทางโภชนาการเด่นประจำวัน</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentMeal.nutritionHighlight}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-200/80 space-y-2">
            <div className="flex items-center gap-2 text-school-purple-800 font-bold text-sm">
              <Sprout className="w-4 h-4" />
              <span>แหล่งวัตถุดิบและผลผลิตเกษตรอินทรีย์</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentMeal.source}
            </p>
          </div>
        </div>

        {/* Standards Card */}
        <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-school-green-700 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-800">มาตรฐานสุขาภิบาลอาหารและโภชนาการ สพฐ.</h4>
              <p className="text-slate-500">ผ่านการตรวจสุขาภิบาลโรงอาหาร ปรุงสุก สะอาด ปลอดสารกันเสีย และใช้น้ำดื่มระบบกรอง RO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
