'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldAlert,
  Globe
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    messageType: 'inquiry', // inquiry or petition
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Save client-side backup
        if (typeof window !== 'undefined') {
          try {
            const existing = JSON.parse(localStorage.getItem('bannadoi_sent_contacts') || '[]');
            existing.unshift(result.data || { ...formData, id: `local-${Date.now()}`, createdAt: new Date().toISOString() });
            localStorage.setItem('bannadoi_sent_contacts', JSON.stringify(existing));
          } catch {}
        }
        setSubmitted(true);
      } else {
        setSubmitError(result.error || 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('การเชื่อมต่อขัดข้อง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5" />
            <span>ช่องทางการติดต่อและรับฟังความคิดเห็น</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            ติดต่อ {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ท่านสามารถติดต่อสอบถามข้อมูล แนะนำบริการ หรือส่งเรื่องร้องเรียนผ่านช่องทางออนไลน์ได้ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-800">ข้อมูลสถานที่ติดต่อ</h2>

              <ul className="space-y-4 text-xs md:text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-school-green-50 text-school-green-700 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-semibold mb-0.5">ที่ตั้งสถานศึกษา</strong>
                    <span>{schoolInfo.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-school-green-50 text-school-green-700 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-semibold mb-0.5">หมายเลขโทรศัพท์</strong>
                    <span>{schoolInfo.phone}</span>
                    <span className="block text-slate-400 text-xs mt-0.5">โทรสาร: {schoolInfo.fax}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-school-green-50 text-school-green-700 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-semibold mb-0.5">ไปรษณีย์อิเล็กทรอนิกส์ (อีเมล)</strong>
                    <span>{schoolInfo.email}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-school-purple-50 text-school-purple-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-semibold mb-0.5">เวลาทำการ</strong>
                    <span>วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.30 น.</span>
                    <span className="block text-slate-400 text-xs mt-0.5">(เว้นวันหยุดราชการและวันหยุดนักขัตฤกษ์)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* E-Petition / ITA Notice */}
            <div className="bg-gradient-to-br from-school-purple-50 to-slate-50 p-6 rounded-3xl border border-school-purple-100 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-school-purple-700 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">ศูนย์รับข้อร้องเรียน (E-Petition)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ข้อมูลของผู้ร้องเรียนจะถูกเก็บเป็นความลับตามมาตรการคุ้มครองผู้ร้องเรียนและการรักษาความปลอดภัยของข้อมูลส่วนบุคคล
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">ส่งข้อความเรียบร้อยแล้ว</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    ขอบคุณสำหรับการติดต่อ เจ้าหน้าที่ฝ่ายธุรการและสารบรรณจะดำเนินการตรวจสอบและตอบกลับโดยเร็วที่สุด
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    ส่งข้อความอื่นเพิ่มเติม
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">แบบฟอร์มส่งข้อความออนไลน์</h2>
                    <p className="text-xs text-slate-500">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความสะดวกรวดเร็วในการประสานงาน</p>
                  </div>

                  {/* Message Type */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">ประเภทเรื่อง</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, messageType: 'inquiry' })}
                        className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.messageType === 'inquiry'
                            ? 'bg-school-green-50 border-school-green-600 text-school-green-800 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        สอบถามข้อมูลทั่วไป / ข้อเสนอแนะ
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, messageType: 'petition' })}
                        className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.messageType === 'petition'
                            ? 'bg-school-purple-50 border-school-purple-600 text-school-purple-800 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        เรื่องร้องเรียน / ร้องทุกข์ (E-Petition)
                      </button>
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล *</label>
                      <input
                        type="text"
                        required
                        placeholder="ระบุชื่อและนามสกุล"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">เบอร์โทรศัพท์ติดต่อ *</label>
                      <input
                        type="tel"
                        required
                        placeholder="08X-XXX-XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">อีเมล</label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">หัวข้อเรื่อง *</label>
                      <input
                        type="text"
                        required
                        placeholder="ระบุหัวข้อเรื่อง"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">รายละเอียดข้อความ *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="กรุณาระบุรายละเอียดที่ต้องการติดต่อหรือแจ้งเรื่อง..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ส่งข้อมูล</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section with Real Google Maps Display */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-school-green-700" />
              <h2 className="text-lg font-bold text-slate-800">แผนที่การเดินทาง (Google Maps)</h2>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('โรงเรียนบ้านนาดอย ตำบลแม่สวด อำเภอสบเมย จังหวัดแม่ฮ่องสอน')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-school-green-50 text-school-green-800 text-xs font-bold rounded-xl hover:bg-school-green-100 transition-colors shrink-0"
            >
              <span>เปิดระบบนำทาง GPS ใน Google Maps</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="w-full h-96 md:h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
            <iframe
              title="แผนที่โรงเรียนบ้านนาดอย"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B8%AD%E0%B8%A2+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%AA%E0%B8%A7%E0%B8%94+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B8%AA%E0%B8%9A%E0%B9%80%E0%B8%A1%E0%B8%A2+%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%AE%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%AD%E0%B8%99&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-school-green-700 shrink-0" />
              <span><strong>พิกัดที่ตั้ง:</strong> {schoolInfo.address}</span>
            </p>
            <span className="text-slate-400">บริการ 2 หมู่บ้าน (บ้านนาดอย และ บ้านสบแม่แพ)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
