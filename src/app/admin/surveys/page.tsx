'use client';

import React, { useState, useEffect } from 'react';
import { Star, Award, MessageSquare, Calendar, User, CheckCircle } from 'lucide-react';

interface SurveyItem {
  id: string;
  role: string;
  academicScore: number;
  facilityScore: number;
  boardingScore: number;
  transparencyScore: number;
  overallScore: number;
  comment?: string;
  createdAt: string;
}

export default function AdminSurveysPage() {
  const [surveys, setSurveys] = useState<SurveyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/survey');
      const data = await res.json();
      let serverSurveys: SurveyItem[] = [];
      if (data.success && Array.isArray(data.data)) {
        serverSurveys = data.data;
      }

      // Merge with any client-side backup from localStorage
      if (typeof window !== 'undefined') {
        try {
          const localSent = JSON.parse(localStorage.getItem('bannadoi_sent_surveys') || '[]');
          if (Array.isArray(localSent)) {
            const existingIds = new Set(serverSurveys.map((s) => s.id));
            const newLocal = localSent.filter((item) => !existingIds.has(item.id));
            serverSurveys = [...newLocal, ...serverSurveys];
          }
        } catch {}
      }

      setSurveys(serverSurveys);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const total = surveys.length;
  const avgOverall = total > 0
    ? (surveys.reduce((acc, s) => acc + s.overallScore, 0) / total).toFixed(2)
    : '5.00';
  const avgAcademic = total > 0
    ? (surveys.reduce((acc, s) => acc + s.academicScore, 0) / total).toFixed(2)
    : '5.00';
  const avgBoarding = total > 0
    ? (surveys.reduce((acc, s) => acc + s.boardingScore, 0) / total).toFixed(2)
    : '5.00';
  const avgFacility = total > 0
    ? (surveys.reduce((acc, s) => acc + s.facilityScore, 0) / total).toFixed(2)
    : '5.00';
  const avgTransparency = total > 0
    ? (surveys.reduce((acc, s) => acc + s.transparencyScore, 0) / total).toFixed(2)
    : '5.00';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>ผลการประเมินความพึงพอใจการใช้งานเว็บไซต์</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            รายงานผลคะแนนความพึงพอใจและข้อเสนอแนะเพื่อการรายงาน SAR & การประเมิน ITA ({total} ชุด)
          </p>
        </div>

        <button
          onClick={fetchSurveys}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition-all disabled:opacity-50"
        >
          <span>รีเฟรชข้อมูล</span>
        </button>
      </div>

      {/* Summary Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">ภาพรวมเว็บไซต์</span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-amber-600">
            <span>{avgOverall}</span>
            <span className="text-xs text-slate-400">/ 5.00</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">ค้นหาง่าย & สวยงาม</span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-emerald-600">
            <span>{avgAcademic}</span>
            <span className="text-xs text-slate-400">/ 5.00</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">ความเร็วบนมือถือ</span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-purple-600">
            <span>{avgBoarding}</span>
            <span className="text-xs text-slate-400">/ 5.00</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">ความครบถ้วนข้อมูล</span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-blue-600">
            <span>{avgFacility}</span>
            <span className="text-xs text-slate-400">/ 5.00</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">บริการออนไลน์</span>
          <div className="flex items-baseline gap-1 text-2xl font-bold text-slate-700">
            <span>{avgTransparency}</span>
            <span className="text-xs text-slate-400">/ 5.00</span>
          </div>
        </div>
      </div>

      {/* Individual Submissions */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div className="p-4 md:p-5 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
            ความคิดเห็นและแบบประเมินรายบุคคล
          </h3>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : surveys.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ยังไม่มีข้อมูลการประเมิน</div>
        ) : (
          surveys.map((s) => (
            <div key={s.id} className="p-5 space-y-3 hover:bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {s.role}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(s.createdAt).toLocaleDateString('th-TH')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>คะแนนภาพรวม: {s.overallScore} / 5</span>
                </div>
              </div>

              {s.comment && (
                <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                  &ldquo;{s.comment}&rdquo;
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                <span>วิชาการ: {s.academicScore}</span>
                <span>หอนอน: {s.boardingScore}</span>
                <span>สถานที่: {s.facilityScore}</span>
                <span>ความโปร่งใส: {s.transparencyScore}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
