'use client';

import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  CheckCircle, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { sampleCertificates, CertificateRecord } from '@/data/certificateData';
import { schoolInfo } from '@/data/schoolData';

export default function CertificatesPage() {
  const [searchCode, setSearchCode] = useState('');
  const [cert, setCert] = useState<CertificateRecord | null>(sampleCertificates[0]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/certificates?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();
      if (data.success && data.data) {
        setCert(data.data);
      } else {
        setCert(null);
        setErrorMsg('ไม่พบข้อมูลเกียรติบัตรที่ตรงกับรหัสนี้ กรุณาตรวจสอบความถูกต้อง');
      }
    } catch (err) {
      setErrorMsg('เกิดข้อผิดพลาดในการตรวจสอบรหัส');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-10">
        {/* Header (Hidden when printing) */}
        <div className="max-w-2xl space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-purple-50 text-school-purple-700 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>ระบบตรวจสอบและพิมพ์เกียรติบัตรออนไลน์</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            ตรวจสอบวุฒิบัตรและเกียรติบัตรดิจิทัล
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            กรอกรหัสอ้างอิงบนเกียรติบัตร (เช่น BND-2569-001) เพื่อยืนยันความถูกต้องและพิมพ์เกียรติบัตรฉบับจริง
          </p>
        </div>

        {/* Search Bar (Hidden when printing) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm max-w-2xl space-y-4 print:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="กรอกรหัสเกียรติบัตร เช่น BND-2569-001..."
                className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
            >
              {loading ? 'กำลังตรวจ...' : 'ตรวจสอบ'}
            </button>
          </form>

          {/* Quick Samples */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>ตัวอย่างรหัส:</span>
            {['BND-2569-001', 'BND-2569-002', 'BND-2569-003'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchCode(code);
                  const found = sampleCertificates.find((c) => c.code === code);
                  if (found) setCert(found);
                }}
                className="text-school-purple-700 hover:underline font-mono text-[11px]"
              >
                {code}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Certificate Display & Print View */}
        {cert && (
          <div className="space-y-6">
            <div className="flex items-center justify-between print:hidden max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle className="w-4 h-4" />
                <span>เกียรติบัตรถูกต้องและผ่านการรับรองจากสถานศึกษา (รหัส: {cert.code})</span>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์เกียรติบัตรฉบับนี้</span>
              </button>
            </div>

            {/* Certificate Paper Canvas */}
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-3xl shadow-xl border-8 border-amber-600/30 ring-1 ring-amber-500/50 relative overflow-hidden text-center space-y-8 bg-[radial-gradient(#fdfbf7_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600" />

              {/* Logo & School Header */}
              <div className="space-y-3">
                <img
                  src="/logo.png"
                  alt={schoolInfo.nameTh}
                  className="w-20 h-20 mx-auto object-contain drop-shadow-sm"
                />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                    {schoolInfo.nameTh}
                  </h2>
                  <p className="text-xs text-slate-500">{schoolInfo.affiliation}</p>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="space-y-2">
                <div className="inline-block border-b-2 border-amber-500 pb-1 px-6">
                  <h3 className="text-2xl md:text-3xl font-black text-amber-800 tracking-wide">
                    เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า
                  </h3>
                </div>
              </div>

              {/* Recipient Name */}
              <div className="py-2">
                <p className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-school-green-900">
                  {cert.recipientName}
                </p>
                {cert.gradeLevel && (
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {cert.gradeLevel}
                  </p>
                )}
              </div>

              {/* Achievement & Description */}
              <div className="max-w-2xl mx-auto space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
                <p>ได้เข้าร่วมและสร้างชื่อเสียงใน</p>
                <p className="font-bold text-base text-slate-900">{cert.activityName}</p>
                <p className="inline-block bg-amber-50 text-amber-900 px-4 py-1.5 rounded-full font-bold text-xs border border-amber-200">
                  {cert.achievement}
                </p>
                <p className="text-xs text-slate-500 pt-2">
                  ขอให้มีความเจริญก้าวหน้า มีความสุข และรักษาเกียรติประวัตินี้สืบไป
                </p>
              </div>

              {/* Issue Date & Signature */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 border-t border-amber-100 text-xs">
                <div className="text-left space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                    VERIFIED CODE:
                  </span>
                  <span className="font-mono font-bold text-school-purple-800 text-sm">{cert.code}</span>
                  <p className="text-[11px] text-slate-400">ออกให้ ณ วันที่ {cert.issueDate}</p>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-32 h-10 border-b border-slate-300 mx-auto flex items-end justify-center pb-1">
                    <span className="italic font-serif text-slate-400 text-sm">จิรพัส ปันดิษ</span>
                  </div>
                  <p className="font-bold text-slate-800 text-xs">({cert.directorName})</p>
                  <p className="text-[11px] text-slate-500">{cert.directorPosition}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
