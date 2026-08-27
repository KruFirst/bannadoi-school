'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ShieldAlert, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Search, 
  Trash2, 
  RefreshCw, 
  CheckCircle,
  HelpCircle,
  Inbox
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  messageType: 'inquiry' | 'petition';
  message: string;
  createdAt: string;
  status: string;
}

export default function AdminPetitionsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      let serverMessages: ContactMessage[] = [];
      if (data.success && Array.isArray(data.data)) {
        serverMessages = data.data;
      }

      // Merge with any client-side backup from localStorage
      if (typeof window !== 'undefined') {
        try {
          const localSent = JSON.parse(localStorage.getItem('bannadoi_sent_contacts') || '[]');
          if (Array.isArray(localSent)) {
            const existingIds = new Set(serverMessages.map((m) => m.id));
            const newLocal = localSent.filter((item) => !existingIds.has(item.id));
            serverMessages = [...newLocal, ...serverMessages];
          }
        } catch {}
      }

      setMessages(serverMessages);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('ต้องการลบข้อความนี้ใช่หรือไม่?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      // Also remove from localStorage if present
      if (typeof window !== 'undefined') {
        try {
          const localSent = JSON.parse(localStorage.getItem('bannadoi_sent_contacts') || '[]');
          const updated = localSent.filter((item: any) => item.id !== id);
          localStorage.setItem('bannadoi_sent_contacts', JSON.stringify(updated));
        } catch {}
      }
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการลบข้อความ');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesType = filterType === 'all' || m.messageType === filterType;
    const matchesSearch =
      (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.phone || '').includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const countInquiry = messages.filter((m) => m.messageType === 'inquiry').length;
  const countPetition = messages.filter((m) => m.messageType === 'petition').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Inbox className="w-6 h-6 text-school-green-700" />
            <span>กล่องรับความคิดเห็น ข้อเสนอแนะ & เรื่องร้องเรียน (Feedback)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ศูนย์รับข้อมูลจากแบบฟอร์มหน้าเว็บไซต์ ข้อเสนอแนะทั่วไป และเรื่องร้องเรียน E-Petition ทั้งหมด {messages.length} รายการ
          </p>
        </div>

        <button
          onClick={fetchContacts}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>รีเฟรชข้อความ</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 md:p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterType === 'all' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด ({messages.length})
          </button>
          <button
            onClick={() => setFilterType('inquiry')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterType === 'inquiry' 
                ? 'bg-school-green-700 text-white shadow-xs' 
                : 'bg-emerald-50 text-school-green-800 hover:bg-emerald-100'
            }`}
          >
            ข้อเสนอแนะ & สอบถาม ({countInquiry})
          </button>
          <button
            onClick={() => setFilterType('petition')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterType === 'petition' 
                ? 'bg-school-purple-700 text-white shadow-xs' 
                : 'bg-purple-50 text-school-purple-800 hover:bg-purple-100'
            }`}
          >
            เรื่องร้องเรียน E-Petition ({countPetition})
          </button>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ, หัวข้อ หรือเบอร์โทร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-school-green-600 border-t-transparent rounded-full animate-spin" />
            <span>กำลังตรวจสอบกล่องข้อความ...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700">ไม่มีข้อความในหมวดหมู่นี้</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              เมื่อมีผู้ปกครองหรือประชาชนส่งข้อความผ่านหน้า &ldquo;ติดต่อเรา / แบบฟอร์มออนไลน์&rdquo; ข้อมูลจะปรากฏที่นี่ทันที
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Header bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      msg.messageType === 'petition'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {msg.messageType === 'petition' ? 'เรื่องร้องเรียน (E-Petition)' : 'ข้อเสนอแนะ / สอบถามทั่วไป'}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{msg.subject}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleString('th-TH')}
                  </span>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    title="ลบข้อความนี้"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
              </div>

              {/* Sender Info Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 font-bold text-slate-700">
                    <User className="w-3.5 h-3.5 text-school-green-700" />
                    <span>ผู้ส่ง: {msg.name}</span>
                  </span>

                  {msg.phone && (
                    <a 
                      href={`tel:${msg.phone}`}
                      className="flex items-center gap-1.5 hover:text-school-green-700 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{msg.phone}</span>
                    </a>
                  )}

                  {msg.email && (
                    <a 
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 hover:text-school-purple-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{msg.email}</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                  ID: {msg.id}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
