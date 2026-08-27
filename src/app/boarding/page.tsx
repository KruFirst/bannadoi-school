'use client';

import React from 'react';
import { 
  Home, 
  Heart, 
  ShieldCheck, 
  Utensils, 
  Clock, 
  Users, 
  Sparkles, 
  Sun, 
  Moon, 
  CheckCircle2,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const dailySchedule = [
  { time: '05:30 - 06:30 น.', activity: 'ตื่นนอน เก็บที่นอน ทำความสะอาดสุขอนามัยส่วนตัวและบริเวณหอนอน', icon: Sun },
  { time: '06:30 - 07:30 น.', activity: 'รับประทานอาหารเช้าที่มีคุณค่าทางโภชนาการครบ 5 หมู่', icon: Utensils },
  { time: '07:30 - 08:00 น.', activity: 'เดินทางเข้าสู่โรงเรียน เตรียมความพร้อมเข้าแถวเคารพธงชาติ', icon: Users },
  { time: '08:30 - 15:30 น.', activity: 'การจัดการเรียนการสอนตามหลักสูตรแกนกลางและการศึกษาขั้นพื้นฐาน', icon: Sparkles },
  { time: '15:30 - 17:00 น.', activity: 'กิจกรรมพัฒนาผู้เรียน การเกษตรเพื่ออาหารกลางวัน เล่นกีฬา ออกกำลังกาย', icon: Heart },
  { time: '17:00 - 18:30 น.', activity: 'อาบน้ำ ชำระร่างกาย และรับประทานอาหารเย็นร่วมกัน', icon: Utensils },
  { time: '18:30 - 20:30 น.', activity: 'ชั่วโมงทบทวนบทเรียน ทำการบ้าน และฝึกทักษะการอ่านเขียน', icon: Clock },
  { time: '20:30 - 21:00 น.', activity: 'กิจกรรมสวดมนต์ แผ่เมตตา อบรมคุณธรรมก่อนนอน โดยครูเวรประจำวัน', icon: Moon },
  { time: '21:00 น.', activity: 'ปิดไฟเข้านอน พักผ่อนเพื่อเตรียมพร้อมสำหรับการเรียนรู้ในวันรุ่งขึ้น', icon: Moon },
];

const carePillars = [
  {
    title: 'โภชนาการครบถ้วนและปลอดภัย',
    desc: 'อาหาร 3 มื้อสดสะอาด ปรุงถูกสุขอนามัย โดยใช้วัตถุดิบปลอดภัยและผลผลิตจากแปลงเกษตรอินทรีย์ของโรงเรียน',
    icon: Utensils,
    color: 'text-school-green-700 bg-school-green-50',
  },
  {
    title: 'ความปลอดภัยและอบอุ่นดุจครอบครัว',
    desc: 'มีครูเวรดูแลประจำหอนอน 24 ชั่วโมง แยกอาคารหอนอนชายและหอนอนหญิง พร้อมระบบไฟส่องสว่างและกล้องวงจรปิด',
    icon: ShieldCheck,
    color: 'text-school-purple-700 bg-school-purple-50',
  },
  {
    title: 'พัฒนาทักษะชีวิตและการพึ่งตนเอง',
    desc: 'ฝึกการดูแลความสะอาดส่วนตัว ความมีวินัย การอยู่ร่วมกันในสังคม และการอนุรักษ์วัฒนธรรมปะกาเกอญอ',
    icon: Heart,
    color: 'text-amber-700 bg-amber-50',
  },
  {
    title: 'การส่งเสริมการเรียนรู้ยามค่ำคืน',
    desc: 'มีครูพี่เลี้ยงคอยให้คำแนะนำการบ้าน เสริมทักษะภาษาไทยและคณิตศาสตร์สำหรับนักเรียนกลุ่มเป้าหมาย',
    icon: Sparkles,
    color: 'text-emerald-700 bg-emerald-50',
  },
];

export default function BoardingPage() {
  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-12">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-school-green-800 via-slate-900 to-school-purple-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-school-green-200 text-xs font-semibold">
              <Home className="w-3.5 h-3.5" />
              <span>การดูแลนักเรียนพักนอน (Boarding Care)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              บ้านหลังที่สองของเด็กดอย <br />
              <span className="text-school-green-300">ดูแลด้วยรักและอบอุ่น 69 ชีวิต</span>
            </h1>

            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
              โรงเรียนบ้านนาดอยจัดบริการหอนอนสำหรับนักเรียนที่มีภูมิลำเนาในพื้นที่ห่างไกลและการเดินทางยากลำบากใน 2 หมู่บ้านบริการ (บ้านนาดอย และ บ้านสบแม่แพ) เพื่อสร้างโอกาสทางการศึกษาที่เท่าเทียมและมีคุณภาพ
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>นักเรียนพักนอน 69 คน</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span>แยกหอนอนชาย - หอนอนหญิง</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>ครูเวรดูแลตลอด 24 ชม.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Care Pillars */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-school-green-700 uppercase tracking-wider">
              มาตรฐานการดูแล
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              4 มิติการพัฒนาคุณภาพชีวิตนักเรียนพักนอน
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm card-hover space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-slate-800">{pillar.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-school-green-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>มาตรฐาน สพฐ.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Schedule Timeline */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-school-purple-700 mb-1">
                <Clock className="w-4 h-4" />
                <span>กิจวัตรประจำวัน (Daily Routine)</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                ตารางเวลาการใช้ชีวิตในหอนอนนักเรียน
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              จันทร์ - ศุกร์ ตลอดภาคเรียน
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailySchedule.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-50 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-school-purple-800 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                      {item.time}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {item.activity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support Section */}
        <div className="bg-gradient-to-r from-school-green-50 via-purple-50 to-white p-8 rounded-3xl border border-school-green-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              ร่วมสนับสนุนกองทุนอาหารและทุนการศึกษานักเรียนพักนอน
            </h3>
            <p className="text-xs text-slate-600">
              ติดต่อสอบถามข้อมูลเพิ่มเติม หรือแจ้งความประสงค์บริจาคสิ่งของเครื่องใช้จำเป็นสำหรับนักเรียนพักนอน
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>ติดต่อฝ่ายดูแลนักเรียนพักนอน</span>
          </a>
        </div>
      </div>
    </div>
  );
}
