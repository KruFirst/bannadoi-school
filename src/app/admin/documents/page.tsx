'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileText, Plus, Trash2, Search, X, Check, Download, Upload, Loader2 } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'xlsx';
  downloads: number;
  updateDate: string;
  url: string;
}

const docCategories = [
  'งานทะเบียนและวัดผล',
  'งานกิจการนักเรียน',
  'คู่มือและระเบียบการ',
  'งานบริหารทั่วไป',
  'งานวิชาการ',
];

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'งานทะเบียนและวัดผล',
    fileSize: '250 KB',
    fileType: 'pdf' as 'pdf' | 'docx' | 'xlsx',
    url: '#',
  });

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      if (data.success) {
        setDocs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload-doc', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
          fileSize: data.fileSize,
          fileType: data.fileType as any,
          url: data.url,
        }));
      } else {
        alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
      }
    } catch (err) {
      alert('อัปโหลดไฟล์ล้มเหลว กรุณาลองใหม่');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: '',
          category: 'งานทะเบียนและวัดผล',
          fileSize: '250 KB',
          fileType: 'pdf',
          url: '#',
        });
        fetchDocs();
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการเพิ่มเอกสาร');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`คุณต้องการลบเอกสาร "${title}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchDocs();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบเอกสาร');
      }
    }
  };

  const filteredDocs = docs.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-school-purple-700" />
            <span>จัดการเอกสารและแบบฟอร์มดาวน์โหลด ({docs.length} ฉบับ)</span>
          </h1>
          <p className="text-xs text-slate-500">
            เพิ่มแบบคำร้อง คู่มือ และเอกสารราชการเพื่อให้ผู้ปกครองและนักเรียนดาวน์โหลด
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มเอกสารใหม่</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหาชื่อเอกสาร หรือหมวดหมู่..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลด...</div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบรายการเอกสาร</div>
        ) : (
          filteredDocs.map((doc) => (
            <div key={doc.id} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  doc.fileType === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{doc.category}</span>
                    <span>ขนาด: {doc.fileSize}</span>
                    <span>ดาวน์โหลด {doc.downloads} ครั้ง</span>
                    {doc.url && doc.url !== '#' && (
                      <a href={doc.url} target="_blank" className="text-school-green-700 hover:underline">
                        ดูไฟล์
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(doc.id, doc.title)}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                title="ลบเอกสาร"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-base text-slate-800">เพิ่มเอกสารดาวน์โหลดใหม่</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Direct File Picker */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                <span className="text-xs font-bold text-school-purple-900 block">
                  อัปโหลดไฟล์เอกสารจากคอมพิวเตอร์ (PDF / Word)
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.doc,.xlsx,.xls"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingDoc}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-school-purple-800 text-xs font-bold flex items-center justify-center gap-2 border border-purple-200 shadow-2xs transition-colors"
                >
                  {uploadingDoc ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-school-purple-700" />
                      <span>กำลังอัปโหลดไฟล์...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-school-purple-700" />
                      <span>คลิกเพื่อเลือกไฟล์ (PDF / DOCX)</span>
                    </>
                  )}
                </button>
                {formData.url && formData.url !== '#' && (
                  <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>อัปโหลดแล้ว: {formData.url}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">ชื่อเอกสาร / แบบฟอร์ม *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น แบบคำร้องขอใบรับรอง ปพ.1..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">หมวดหมู่งาน</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none"
                >
                  {docCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">ประเภทไฟล์</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value as any })}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none"
                  >
                    <option value="pdf">PDF Document (.pdf)</option>
                    <option value="docx">Word Document (.docx)</option>
                    <option value="xlsx">Excel Sheet (.xlsx)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">ขนาดไฟล์</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="เช่น 245 KB"
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-purple-600 outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-school-purple-700 hover:bg-school-purple-600 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  บันทึกเอกสาร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
