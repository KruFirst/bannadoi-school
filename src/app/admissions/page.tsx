'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Send, 
  CheckCircle, 
  Search, 
  FileText, 
  Users, 
  Home, 
  Calendar, 
  Clock, 
  AlertCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const gradeOptions = [
  'อนุบาล 1 (อายุ 3-4 ปี)',
  'อนุบาล 2 (อายุ 4-5 ปี)',
  'อนุบาล 3 (อายุ 5-6 ปี)',
  'ประถมศึกษาปีที่ 1 (ป.1)',
  'ประถมศึกษาปีที่ 2 - 6 (ย้ายเข้า)',
  'มัธยมศึกษาปีที่ 1 (ม.1)',
  'มัธยมศึกษาปีที่ 2 - 3 (ย้ายเข้า)',
];

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    idCard: '',
    birthDate: '',
    gender: 'ชาย',
    gradeApplying: 'อนุบาล 1 (อายุ 3-4 ปี)',
    studyType: 'day', // 'day' | 'boarding'
    parentName: '',
    parentRelation: 'บิดา/มารดา',
    phone: '',
    address: 'บ้านนาดอย หมู่ 9 ต.แม่สวด อ.สบเมย จ.แม่ฮ่องสอน',
    specialNeeds: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);

  // Status Search State
  const [searchIdCard, setSearchIdCard] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSubmittedResult(data.data);
      } else {
        alert('เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาตรวจสอบข้อมูล');
      }
    } catch (err) {
      alert('ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearchStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchIdCard.trim()) return;

    setSearching(true);
    setSearchNotFound(false);
    try {
      const res = await fetch(`/api/admissions?idCard=${encodeURIComponent(searchIdCard.trim())}`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setSearchResult(data.data);
      } else {
        setSearchResult(null);
        setSearchNotFound(true);
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการค้นหา');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom max-w-4xl space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ระบบรับสมัครนักเรียนออนไลน์ (E-Admission)</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            รับสมัครนักเรียนใหม่ {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            เปิดรับสมัครระดับปฐมวัย (อนุบาล 1-3), ประถมศึกษา (ป.1-6) และมัธยมศึกษาตอนต้น (ม.1-3) ทั้งประเภทไป-กลับ และนักเรียนพักนอน (เรียนฟรี 100% ตามนโยบาย สพฐ.)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'form'
                ? 'bg-school-green-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. กรอกใบสมัครออนไลน์
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'status'
                ? 'bg-school-purple-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. ตรวจสอบสถานะการสมัคร
          </button>
        </div>

        {/* TAB 1: FORM */}
        {activeTab === 'form' && (
          <div>
            {submittedResult ? (
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-school-green-700 uppercase tracking-wider">
                    ส่งใบสมัครสำเร็จ
                  </span>
                  <h2 className="text-2xl font-bold text-slate-800">
                    เลขที่ใบสมัคร: <span className="text-school-purple-800 font-mono">{submittedResult.applicationNo}</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
                    โรงเรียนได้รับข้อมูลการสมัครของ <strong>{submittedResult.studentName}</strong> เรียบร้อยแล้ว คณะครูจะดำเนินการตรวจสอบคุณสมบัติและติดต่อกลับ
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto space-y-1 text-left">
                  <p><strong>ระดับชั้นที่สมัคร:</strong> {submittedResult.gradeApplying}</p>
                  <p><strong>ประเภทการเรียน:</strong> {submittedResult.studyType === 'boarding' ? 'นักเรียนพักนอน (หอนอน)' : 'นักเรียนไป-กลับ'}</p>
                  <p><strong>เบอร์โทรศัพท์ติดต่อ:</strong> {submittedResult.phone}</p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedResult(null);
                      setFormData({
                        studentName: '',
                        idCard: '',
                        birthDate: '',
                        gender: 'ชาย',
                        gradeApplying: 'อนุบาล 1 (อายุ 3-4 ปี)',
                        studyType: 'day',
                        parentName: '',
                        parentRelation: 'บิดา/มารดา',
                        phone: '',
                        address: 'บ้านนาดอย หมู่ 9 ต.แม่สวด อ.สบเมย จ.แม่ฮ่องสอน',
                        specialNeeds: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    กรอกใบสมัครใหม่
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('status');
                      setSearchIdCard(submittedResult.idCard);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-school-green-700 text-white text-xs font-bold shadow-md hover:bg-school-green-600"
                  >
                    ไปที่หน้าตรวจสอบสถานะ
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
                {/* 1. Level & Boarding Type */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-school-green-700" />
                    <span>1. ระดับชั้นและประเภทการเข้าเรียน</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">ระดับชั้นที่ต้องการสมัคร *</label>
                      <select
                        value={formData.gradeApplying}
                        onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      >
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">ประเภทการเข้าเรียน *</label>
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, studyType: 'day' })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            formData.studyType === 'day'
                              ? 'bg-school-green-700 text-white border-school-green-700 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          นักเรียนไป-กลับ
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, studyType: 'boarding' })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            formData.studyType === 'boarding'
                              ? 'bg-school-purple-700 text-white border-school-purple-700 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          นักเรียนพักนอน (หอนอน)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Student Info */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-school-green-700" />
                    <span>2. ข้อมูลส่วนตัวนักเรียน</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล นักเรียน *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="ด.ช. / ด.ญ. ..."
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">เลขประจำตัวประชาชน (13 หลัก) *</label>
                      <input
                        type="text"
                        required
                        maxLength={13}
                        value={formData.idCard}
                        onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                        placeholder="X-XXXX-XXXXX-XX-X"
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">วัน/เดือน/ปีเกิด *</label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">เพศ</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      >
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Parent Info */}
                <div className="space-y-4 pb-6 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-school-green-700" />
                    <span>3. ข้อมูลผู้ปกครองและการติดต่อ</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล ผู้ปกครอง *</label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="นาย/นาง/นางสาว..."
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">เบอร์โทรศัพท์ติดต่อ *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08X-XXX-XXXX"
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">ที่อยู่ตามทะเบียนบ้าน / ภูมิลำเนา *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="เช่น บ้านนาดอย หมู่ 9 หรือ บ้านสบแม่แพ ต.แม่สวด อ.สบเมย"
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-school-green-700 hover:bg-school-green-600 text-white font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันและส่งใบสมัครเรียน'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: STATUS LOOKUP */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-800">ตรวจสอบสถานะการสมัครเรียน</h2>
              <p className="text-xs text-slate-500">กรอกเลขบัตรประชาชน 13 หลักของนักเรียนเพื่อตรวจสอบสถานะ</p>

              <form onSubmit={handleSearchStatus} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={13}
                    value={searchIdCard}
                    onChange={(e) => setSearchIdCard(e.target.value)}
                    placeholder="กรอกเลขบัตรประชาชน 13 หลัก..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searching}
                  className="px-6 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
                >
                  {searching ? 'กำลังค้นหา...' : 'ค้นหาสถานะ'}
                </button>
              </form>

              {searchNotFound && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>ไม่พบข้อมูลใบสมัครที่ตรงกับเลขบัตรประชาชนนี้ กรุณาตรวจสอบความถูกต้องหรือส่งใบสมัครใหม่</span>
                </div>
              )}
            </div>

            {/* Status Results */}
            {searchResult && (
              <div className="space-y-4">
                {searchResult.map((app) => (
                  <div key={app.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400">เลขที่ใบสมัคร: {app.applicationNo}</span>
                        <h3 className="text-lg font-bold text-slate-800">{app.studentName}</h3>
                      </div>

                      <div>
                        {app.status === 'enrolled' ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            ✓ ยืนยันสิทธิ์เข้าศึกษาเรียบร้อย
                          </span>
                        ) : app.status === 'approved' ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                            ผ่านคุณสมบัติ / รอรายงานตัว
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                            รอการตรวจสอบเอกสาร
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block">ระดับชั้นที่สมัคร:</span>
                        <strong>{app.gradeApplying}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ประเภทการเรียน:</span>
                        <strong>{app.studyType === 'boarding' ? 'นักเรียนพักนอน (หอนอน)' : 'นักเรียนไป-กลับ'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">วันที่ส่งใบสมัคร:</span>
                        <span>{new Date(app.createdAt).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
