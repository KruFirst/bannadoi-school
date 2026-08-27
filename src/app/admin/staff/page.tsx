'use client';

import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Edit3, Search, X, Check, GraduationCap } from 'lucide-react';
import { departments } from '@/data/schoolData';
import ImageUploadField from '@/components/ImageUploadField';

interface StaffItem {
  id: string;
  name: string;
  position: string;
  department: string;
  academicDegree: string;
  major?: string;
  email?: string;
  imageUrl: string;
  isExecutive?: boolean;
}

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
    academicDegree: 'ค.บ.',
    major: '',
    email: '',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isExecutive: false,
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff');
      const data = await res.json();
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenModal = (staff?: StaffItem) => {
    if (staff) {
      setEditingId(staff.id);
      setFormData({
        name: staff.name,
        position: staff.position,
        department: staff.department,
        academicDegree: staff.academicDegree,
        major: staff.major || '',
        email: staff.email || '',
        imageUrl: staff.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isExecutive: Boolean(staff.isExecutive),
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        position: 'ครู คศ.1',
        department: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
        academicDegree: 'ค.บ.',
        major: '',
        email: '',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isExecutive: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`/api/staff/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchStaff();
        }
      } else {
        const res = await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchStaff();
        }
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลบุคลากร');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`คุณต้องการลบข้อมูล "${name}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchStaff();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-school-green-700" />
            <span>จัดการทำเนียบบุคลากร ({staffList.length} ท่าน)</span>
          </h1>
          <p className="text-xs text-slate-500">
            เพิ่ม แก้ไข และปรับปรุงข้อมูลคณะผู้บริหารและคุณครูโรงเรียนบ้านนาดอย
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มบุคลากรใหม่</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหาชื่อ, ตำแหน่ง, หรือกลุ่มสาระ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Staff Grid List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบบุคลากรที่ค้นหา</div>
        ) : (
          filteredStaff.map((staff) => (
            <div key={staff.id} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                  <img src={staff.imageUrl} alt={staff.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{staff.name}</h3>
                    {staff.isExecutive && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                        ผู้บริหาร
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-school-green-700 font-medium">{staff.position}</p>
                  <p className="text-[11px] text-slate-400">{staff.department} • {staff.academicDegree} {staff.major && `(${staff.major})`}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenModal(staff)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  title="แก้ไข"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(staff.id, staff.name)}
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
              <h2 className="font-bold text-base text-slate-800">
                {editingId ? 'แก้ไขข้อมูลบุคลากร' : 'เพิ่มบุคลากรใหม่'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">ชื่อ - นามสกุล *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น นาย/นาง/นางสาว..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">ตำแหน่ง / วิทยฐานะ *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="เช่น ครู คศ.2 (ครูประจำชั้น ม.1)"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">วุฒิการศึกษา</label>
                  <input
                    type="text"
                    value={formData.academicDegree}
                    onChange={(e) => setFormData({ ...formData, academicDegree: e.target.value })}
                    placeholder="เช่น ค.บ. / ศษ.ม."
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">วิชาเอก</label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    placeholder="เช่น วิทยาศาสตร์ / ภาษาไทย"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">กลุ่มงาน / กลุ่มสาระ</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  >
                    {departments.filter(d => d !== 'ทั้งหมด').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUploadField
                label="รูปถ่ายบุคลากร"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isExecutive"
                  checked={formData.isExecutive}
                  onChange={(e) => setFormData({ ...formData, isExecutive: e.target.checked })}
                  className="w-4 h-4 rounded text-school-purple-600 focus:ring-school-purple-500"
                />
                <label htmlFor="isExecutive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  เป็นผู้บริหารสถานศึกษา (Executive Board)
                </label>
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
                  className="px-6 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
