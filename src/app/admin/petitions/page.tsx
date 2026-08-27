'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ShieldAlert, Mail, Phone, Calendar, User, Search } from 'lucide-react';

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

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredMessages = messages.filter((m) => {
    const matchesType = filterType === 'all' || m.messageType === filterType;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-600" />
          <span>กล่องข้อความติดต่อ & เรื่องร้องเรียน (E-Petition)</span>
        </h1>
        <p className="text-xs text-slate-500">
          รายการข้อความสอบถามและเรื่องร้องเรียนที่ส่งผ่านแบบฟอร์มหน้าเว็บไซต์
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด ({messages.length})
          </button>
          <button
            onClick={() => setFilterType('inquiry')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterType === 'inquiry' ? 'bg-school-green-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            สอบถามทั่วไป
          </button>
          <button
            onClick={() => setFilterType('petition')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterType === 'petition' ? 'bg-school-purple-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            เรื่องร้องเรียน E-Petition
          </button>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="ค้นหาชื่อ หรือข้อความ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
            กำลังโหลดข้อความ...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
            ไม่มีข้อความในกล่องจดหมาย
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      msg.messageType === 'petition'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {msg.messageType === 'petition' ? 'เรื่องร้องเรียน (E-Petition)' : 'ข้อความสอบถามทั่วไป'}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{msg.subject}</h3>
                </div>

                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(msg.createdAt).toLocaleString('th-TH')}
                </span>
              </div>

              {/* Message Body */}
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                {msg.message}
              </p>

              {/* Sender Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <strong>{msg.name}</strong>
                </span>
                {msg.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{msg.phone}</span>
                  </span>
                )}
                {msg.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{msg.email}</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
