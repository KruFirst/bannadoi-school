'use client';

import React, { useState, useEffect } from 'react';
import { Award, Plus, Trash2, Search, X, Check, Printer, ExternalLink } from 'lucide-react';
import { CertificateRecord } from '@/data/certificateData';

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    recipientName: '',
    role: 'นักเรียน' as 'นักเรียน' | 'ครู/บุคลากร' | 'บุคคลภายนอก',
    gradeLevel: 'มัธยมศึกษาปีที่ 3',
    activityName: '',
    achievement: 'รางวัลชนะเลิศอันดับ 1',
    issueDate: '26 สิงหาคม 2569',
  });

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/certificates');
      const data = await res.json();
      if (data.success) {
        setCerts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          code: '',
          recipientName: '',
          role: 'นักเรียน',
          gradeLevel: 'มัธยมศึกษาปีที่ 3',
          activityName: '',
          achievement: 'รางวัลชนะเลิศอันดับ 1',
          issueDate: '26 สิงหาคม 2569',
        });
        fetchCerts();
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการออกเกียรติบัตร');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`คุณต้องการลบเกียรติบัตรของ "${name}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchCerts();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  const filteredCerts = certs.filter((c) =>
    c.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.activityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>จัดการเกียรติบัตรดิจิทัล ({certs.length} ฉบับ)</span>
          </h1>
          <p className="text-xs text-slate-500">
            ออกเกียรติบัตรนักเรียนและครู พร้อมรหัสตรวจสอบความถูกต้องออนไลน์
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>ออกเกียรติบัตรใหม่</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหาชื่อผู้รับ, รหัสเกียรติบัตร, หรือชื่อกิจกรรม..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : filteredCerts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบข้อมูลเกียรติบัตร</div>
        ) : (
          filteredCerts.map((c) => (
            <div key={c.id} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {c.code}
                  </span>
                  <span className="text-xs text-slate-400">{c.issueDate}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {c.role}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{c.recipientName} {c.gradeLevel && `(${c.gradeLevel})`}</h3>
                <p className="text-xs text-slate-500">{c.activityName} • <strong className="text-school-green-700">{c.achievement}</strong></p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`/certificates`}
                  target="_blank"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  title="ดูหน้าตรวจสอบเกียรติบัตร"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleDelete(c.id, c.recipientName)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                  title="ลบ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-base text-slate-800">ออกเกียรติบัตรดิจิทัลใหม่</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล ผู้รับเกียรติบัตร *</label>
                <input
                  type="text"
                  required
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  placeholder="เช่น เด็กชายสมศักดิ์ รักเรียน..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">สถานะผู้รับ</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="นักเรียน">นักเรียน</option>
                    <option value="ครู/บุคลากร">ครู/บุคลากร</option>
                    <option value="บุคคลภายนอก">บุคคลภายนอก</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">ชั้นเรียน / แผนก</label>
                  <input
                    type="text"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    placeholder="เช่น มัธยมศึกษาปีที่ 3/1"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">ชื่อกิจกรรม / การแข่งขัน *</label>
                <input
                  type="text"
                  required
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                  placeholder="เช่น การแข่งขันโครงงานวิทยาศาสตร์ ประจำปีการศึกษา 2569"
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">ผลงาน / รางวัลที่ได้รับ *</label>
                  <input
                    type="text"
                    required
                    value={formData.achievement}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                    placeholder="เช่น รางวัลชนะเลิศอันดับ 1"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">วันที่ออกเกียรติบัตร</label>
                  <input
                    type="text"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    placeholder="เช่น 26 สิงหาคม 2569"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  ออกเกียรติบัตร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
