'use client';

import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  Send, 
  Award, 
  Sparkles,
  Heart
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const questions = [
  { key: 'academicScore', label: '1. ด้านความสวยงาม ความทันสมัย และความสะดวกในการค้นหาข้อมูลบนเว็บไซต์' },
  { key: 'facilityScore', label: '2. ด้านความถูกต้อง ครบถ้วน และความเป็นปัจจุบันของข้อมูลข่าวสาร' },
  { key: 'boardingScore', label: '3. ด้านความรวดเร็วในการเปิดหน้าเว็บและการแสดงผลบนโทรศัพท์มือถือ' },
  { key: 'transparencyScore', label: '4. ด้านระบบบริการออนไลน์ (สมัครเรียน, ตรวจสอบเกียรติบัตร, หอนอน, อาหาร)' },
  { key: 'overallScore', label: '5. ความพึงพอใจในภาพรวมต่อการใช้งานเว็บไซต์โรงเรียนบ้านนาดอย' },
];

export default function SurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: 'ผู้ปกครองนักเรียน',
    academicScore: 5,
    facilityScore: 5,
    boardingScore: 5,
    transparencyScore: 5,
    overallScore: 5,
    comment: '',
  });

  const handleScoreChange = (key: string, score: number) => {
    setFormData((prev) => ({ ...prev, [key]: score }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (typeof window !== 'undefined') {
        try {
          const existing = JSON.parse(localStorage.getItem('bannadoi_sent_surveys') || '[]');
          existing.unshift({ ...formData, id: `local-sv-${Date.now()}`, createdAt: new Date().toISOString() });
          localStorage.setItem('bannadoi_sent_surveys', JSON.stringify(existing));
        } catch {}
      }

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#fcfdfd] py-20">
        <div className="container-custom max-w-xl text-center space-y-6 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-school-green-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">ขอบพระคุณสำหรับข้อเสนอแนะ</h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            โรงเรียนบ้านนาดอยได้รับข้อมูลการประเมินความพึงพอใจการใช้งานเว็บไซต์ของท่านเรียบร้อยแล้ว ทุกข้อเสนอแนะจะถูกนำไปใช้พัฒนา ปรับปรุง และยกระดับการให้บริการทางดิจิทัลให้ดียิ่งขึ้น
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-md transition-colors"
          >
            กลับสู่หน้าหลัก
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom max-w-3xl space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>แบบประเมินความพึงพอใจการใช้งานเว็บไซต์</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            แบบประเมินความพึงพอใจการใช้งานเว็บไซต์สถานศึกษา {schoolInfo.nameTh}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            จัดทำขึ้นเพื่อรับฟังความคิดเห็นจากผู้ปกครอง นักเรียน และประชาชน สำหรับนำไปใช้เป็นข้อมูลพัฒนาและรายงานการประเมิน ITA / SAR ประจำปี 2569
          </p>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          {/* User Role */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              สถานะของผู้ตอบแบบประเมิน *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['ผู้ปกครองนักเรียน', 'นักเรียน', 'ศิษย์เก่า', 'ประชาชน/ชุมชน'].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setFormData({ ...formData, role: r })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                    formData.role === r
                      ? 'bg-school-purple-700 text-white border-school-purple-700 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Questions */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>ระดับความพึงพอใจ (5 = มากที่สุด, 1 = น้อยที่สุด)</span>
            </h3>

            {questions.map((q) => {
              const currentScore = (formData as any)[q.key];
              return (
                <div key={q.key} className="space-y-2.5 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                  <p className="text-xs md:text-sm font-semibold text-slate-800">{q.label}</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        type="button"
                        key={score}
                        onClick={() => handleScoreChange(q.key, score)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          currentScore === score
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs scale-105'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {score} ดาว
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              ข้อเสนอแนะเพิ่มเติมเพื่อการพัฒนาโรงเรียน
            </label>
            <textarea
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="สิ่งที่ท่านอยากให้โรงเรียนปรับปรุง หรือข้อชื่นชม..."
              className="w-full p-4 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-school-green-700 hover:bg-school-green-600 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'กำลังส่งข้อมูล...' : 'ส่งแบบประเมินความพึงพอใจ'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
