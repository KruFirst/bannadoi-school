'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Search, Trash2, CheckCircle2, Clock, UserCheck, Phone, Home, Filter } from 'lucide-react';

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'day' | 'boarding'

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admissions');
      const data = await res.json();
      if (data.success) {
        setAdmissions(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchAdmissions();
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการปรับสถานะ');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`คุณต้องการลบใบสมัครของ "${name}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchAdmissions();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  const filtered = admissions.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idCard.includes(searchTerm) ||
      item.applicationNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.studyType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-school-green-700" />
            <span>จัดการระบบรับสมัครนักเรียน ({admissions.length} รายการ)</span>
          </h1>
          <p className="text-xs text-slate-500">
            ตรวจสอบข้อมูลผู้สมัคร, ตรวจสอบคุณสมบัติ, และอนุมัติสิทธิ์เข้าศึกษา
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            ทั้งหมด ({admissions.length})
          </button>
          <button
            onClick={() => setFilterType('boarding')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'boarding' ? 'bg-school-purple-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            นักเรียนพักนอน ({admissions.filter((a) => a.studyType === 'boarding').length})
          </button>
          <button
            onClick={() => setFilterType('day')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'day' ? 'bg-school-green-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            ไป-กลับ ({admissions.filter((a) => a.studyType === 'day').length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหาชื่อนักเรียน, เลขบัตรประชาชน 13 หลัก, หรือเลขที่ใบสมัคร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Applicants List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลดข้อมูล...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบรายการใบสมัคร</div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="p-5 md:p-6 space-y-3 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {item.applicationNo}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">{item.studentName}</h3>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.studyType === 'boarding'
                      ? 'bg-purple-100 text-school-purple-800'
                      : 'bg-emerald-100 text-school-green-800'
                  }`}>
                    {item.studyType === 'boarding' ? '🏡 พักนอน' : '🚶 ไป-กลับ'}
                  </span>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none ${
                      item.status === 'enrolled'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : item.status === 'approved'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    <option value="pending">⏳ รอตรวจสอบ</option>
                    <option value="approved">✓ ผ่านคุณสมบัติ</option>
                    <option value="enrolled">🎓 ยืนยันสิทธิ์เข้าศึกษา</option>
                  </select>

                  <button
                    onClick={() => handleDelete(item.id, item.studentName)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    title="ลบใบสมัคร"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detail Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-500 pt-1">
                <p><strong>ระดับชั้น:</strong> {item.gradeApplying}</p>
                <p><strong>เลขบัตร ปชช:</strong> <span className="font-mono">{item.idCard}</span></p>
                <p><strong>ผู้ปกครอง:</strong> {item.parentName} ({item.phone})</p>
                <p><strong>ที่อยู่:</strong> {item.address}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
