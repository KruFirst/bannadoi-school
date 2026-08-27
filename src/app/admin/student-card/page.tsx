'use client';

import React, { useState, useRef } from 'react';
import { 
  Contact, 
  Printer, 
  QrCode, 
  GraduationCap, 
  Upload, 
  Loader2, 
  Check, 
  Phone,
  Scissors
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

export default function AdminStudentCardPage() {
  const [cardData, setCardData] = useState({
    studentName: 'เด็กชายธนกฤต มณีวรรณ',
    studentId: '10795-001',
    nationalId: '1-5814-00123-45-6',
    grade: 'มัธยมศึกษาปีที่ 3/1',
    bloodType: 'O',
    studyType: 'พักนอน (หอนอน)',
    emergencyPhone: '081-951-2345',
    validUntil: '31 มีนาคม 2570',
    photoUrl: '',
  });

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setCardData((prev) => ({ ...prev, photoUrl: data.url }));
      } else {
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
      }
    } catch (err) {
      alert('อัปโหลดไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-0 print:p-0 print:m-0">
      {/* Strict Print CSS for exact 1-page output without blank extra page */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: 100vh !important;
            overflow: hidden !important;
          }
          header, footer, nav, aside, .print\\:hidden {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            visibility: hidden !important;
          }
          .print-card-wrapper {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 8mm !important;
            padding-top: 15mm !important;
            padding-bottom: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 190mm !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .id-card-box {
            width: 85.6mm !important;
            height: 53.98mm !important;
            min-width: 85.6mm !important;
            max-width: 85.6mm !important;
            box-shadow: none !important;
            border: 1px solid #94a3b8 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Header (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Contact className="w-6 h-6 text-school-green-700" />
            <span>ระบบออกและพิมพ์บัตรประจำตัวนักเรียน (Admin Only)</span>
          </h1>
          <p className="text-xs text-slate-500">
            กรอกข้อมูลนักเรียน อัปโหลดรูปถ่าย และสั่งพิมพ์เฉพาะตัวบัตรนักเรียนลงบนกระดาษ A4 หน้าเดียว
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>สั่งพิมพ์บัตรนักเรียน (Print Card)</span>
        </button>
      </div>

      {/* Form Controls (Hidden when printing) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 print:hidden">
        <h2 className="text-base font-bold text-slate-800">1. ระบุข้อมูลนักเรียนและอัปโหลดรูปถ่าย</h2>

        {/* Photo Upload Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center relative">
              {cardData.photoUrl ? (
                <img src={cardData.photoUrl} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <GraduationCap className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">รูปถ่ายหน้าตรงนักเรียน</span>
              <p className="text-[11px] text-slate-500">รองรับไฟล์ JPG, PNG (ขนาด 1.5 นิ้ว หรือถ่ายจากมือถือ)</p>
              {cardData.photoUrl && (
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                  <Check className="w-3 h-3" />
                  <span>อัปโหลดรูปถ่ายเรียบร้อยแล้ว</span>
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              disabled={uploadingPhoto}
              onClick={() => photoInputRef.current?.click()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              {uploadingPhoto ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังอัปโหลด...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>เลือกรูปถ่ายจากเครื่อง</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล นักเรียน *</label>
            <input
              type="text"
              value={cardData.studentName}
              onChange={(e) => setCardData({ ...cardData, studentName: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">เลขประจำตัวนักเรียน *</label>
            <input
              type="text"
              value={cardData.studentId}
              onChange={(e) => setCardData({ ...cardData, studentId: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">ชั้นเรียน *</label>
            <input
              type="text"
              value={cardData.grade}
              onChange={(e) => setCardData({ ...cardData, grade: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">ประเภทการเรียน</label>
            <select
              value={cardData.studyType}
              onChange={(e) => setCardData({ ...cardData, studyType: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            >
              <option value="พักนอน (หอนอน)">พักนอน (หอนอน)</option>
              <option value="นักเรียนไป-กลับ">นักเรียนไป-กลับ</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">หมู่โลหิต (Blood Type)</label>
            <input
              type="text"
              value={cardData.bloodType}
              onChange={(e) => setCardData({ ...cardData, bloodType: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">เบอร์โทรศัพท์ฉุกเฉิน</label>
            <input
              type="text"
              value={cardData.emergencyPhone}
              onChange={(e) => setCardData({ ...cardData, emergencyPhone: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Card Display Area (Print Output) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 print:border-none print:p-0 print:shadow-none print:m-0 print:space-y-0">
        <div className="flex items-center justify-between print:hidden">
          <h2 className="text-base font-bold text-slate-800">2. ตัวอย่างบัตรประจำตัวนักเรียน (พร้อมสั่งพิมพ์)</h2>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Scissors className="w-3.5 h-3.5" />
            <span>ขนาดมาตรฐาน ISO/IEC 7810 ID-1 (85.6mm × 54mm)</span>
          </span>
        </div>
        
        {/* PRINT CARD WRAPPER */}
        <div className="print-card-wrapper flex flex-col md:flex-row items-center justify-center gap-6 py-4">
          {/* Card Front */}
          <div className="id-card-box w-[320px] h-[202px] rounded-2xl bg-white shadow-xl border border-slate-300 overflow-hidden relative flex flex-col justify-between p-3.5 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 shrink-0">
            {/* Top Bar */}
            <div className="flex items-center gap-2.5 border-b border-emerald-600/30 pb-1.5">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow-xs" />
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800 text-[11px] truncate">{schoolInfo.nameTh}</h3>
                <p className="text-[8px] text-slate-500 truncate">STUDENT IDENTIFICATION CARD</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-2.5 items-center py-1">
              {/* Photo Box */}
              <div className="w-[72px] h-[86px] rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center text-slate-400 relative">
                {cardData.photoUrl ? (
                  <img src={cardData.photoUrl} alt={cardData.studentName} className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="w-7 h-7 text-slate-400" />
                )}
              </div>

              {/* Student Details */}
              <div className="space-y-0.5 text-[9px] text-slate-700 min-w-0 flex-1">
                <p className="font-bold text-[11px] text-school-green-900 truncate">{cardData.studentName}</p>
                <p><strong>รหัส:</strong> <span className="font-mono">{cardData.studentId}</span></p>
                <p><strong>ชั้น:</strong> {cardData.grade}</p>
                <p><strong>ประเภท:</strong> <span className="text-school-purple-700 font-semibold">{cardData.studyType}</span></p>
                <p><strong>กรุ๊ปเลือด:</strong> {cardData.bloodType}</p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-[7.5px] text-slate-400 border-t border-slate-200 pt-1">
              <span>สพป.แม่ฮ่องสอน เขต 2</span>
              <span>หมดอายุ: {cardData.validUntil}</span>
            </div>
          </div>

          {/* Card Back */}
          <div className="id-card-box w-[320px] h-[202px] rounded-2xl bg-white shadow-xl border border-slate-300 overflow-hidden relative flex flex-col justify-between p-3.5 bg-gradient-to-br from-slate-50 via-white to-purple-50/40 shrink-0">
            <div className="space-y-1">
              <h4 className="text-[9.5px] font-bold text-slate-800">เงื่อนไขการใช้บัตร</h4>
              <ul className="text-[7.5px] text-slate-500 list-disc list-inside space-y-0.5 leading-tight">
                <li>บัตรนี้เป็นกรรมสิทธิ์ของ{schoolInfo.nameTh}</li>
                <li>นักเรียนต้องพกบัตรติดตัวตลอดเวลาขณะอยู่ในสถานศึกษา</li>
                <li>หากเก็บบัตรนี้ได้ กรุณาส่งคืน{schoolInfo.nameTh}</li>
              </ul>
            </div>

            {/* Emergency & QR */}
            <div className="flex items-center justify-between gap-2 py-0.5">
              <div className="text-[8.5px] text-slate-600 space-y-0.5">
                <p className="flex items-center gap-1 font-semibold text-red-600">
                  <Phone className="w-2.5 h-2.5" />
                  <span>ฉุกเฉิน: {cardData.emergencyPhone}</span>
                </p>
                <p className="text-[7.5px] text-slate-400">โทรศัพท์โรงเรียน: {schoolInfo.phone}</p>
              </div>

              <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center">
                <QrCode className="w-9 h-9 text-slate-700" />
              </div>
            </div>

            {/* Signature */}
            <div className="text-right border-t border-slate-200 pt-1">
              <p className="text-[8px] font-serif italic text-slate-400">จิรพัส ปันดิษ</p>
              <p className="text-[7.5px] font-bold text-slate-700">(นายจิรพัส ปันดิษ) ผู้อำนวยการโรงเรียน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
