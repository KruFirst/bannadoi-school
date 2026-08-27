'use client';

import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Save,
  Clock
} from 'lucide-react';

export default function AdminProfilePage() {
  const [currentUsername, setCurrentUsername] = useState('admin');
  const [lastUpdated, setLastUpdated] = useState('');
  
  const [form, setForm] = useState({
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/profile')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setCurrentUsername(res.data.username);
          setForm((prev) => ({ ...prev, newUsername: res.data.username }));
          if (res.data.lastUpdated) {
            const dt = new Date(res.data.lastUpdated);
            setLastUpdated(dt.toLocaleString('th-TH'));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!form.currentPassword) {
      setErrorMsg('กรุณากรอกรหัสผ่านปัจจุบันเพื่อยืนยันตัวตน');
      return;
    }

    if (form.newPassword && form.newPassword.length < 6) {
      setErrorMsg('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setErrorMsg('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newUsername: form.newUsername,
          newPassword: form.newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message || 'บันทึกข้อมูลเรียบร้อยแล้ว');
        setCurrentUsername(data.data.username);
        setForm({
          newUsername: data.data.username,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        if (data.data.lastUpdated) {
          setLastUpdated(new Date(data.data.lastUpdated).toLocaleString('th-TH'));
        }
      } else {
        setErrorMsg(data.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (err) {
      setErrorMsg('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-school-green-700" />
          <span>ตั้งค่าความปลอดภัย & เปลี่ยนรหัสผ่าน (Admin Profile)</span>
        </h1>
        <p className="text-xs text-slate-500">
          จัดการชื่อผู้ใช้และรหัสผ่านสำหรับเข้าสู่ระบบหลังบ้านของโรงเรียนบ้านนาดอย
        </p>
      </div>

      {/* Account Info Badge */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-school-purple-700 flex items-center justify-center border border-purple-100">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">บัญชีผู้ดูแลระบบปัจจุบัน:</span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                {currentUsername}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>อัปเดตล่าสุด: {lastUpdated || 'ค่าเริ่มต้นระบบ'}</span>
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-school-green-700" />
          <span>ระดับสิทธิ์สูงสุด (Super Admin)</span>
        </span>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">เปลี่ยนชื่อผู้ใช้และรหัสผ่านใหม่</h2>
          <p className="text-xs text-slate-500">
            กรอกรหัสผ่านเดิมเพื่อยืนยันตัวตนก่อนบันทึกการเปลี่ยนแปลง
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              required
              value={form.newUsername}
              onChange={(e) => setForm({ ...form, newUsername: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
              placeholder="admin"
            />
          </div>

          <div className="h-px bg-slate-100 my-2" />

          {/* Current Password Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              รหัสผ่านปัจจุบัน (Current Password) *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none pr-10"
                placeholder="กรอกรหัสผ่านปัจจุบัน เช่น admin1234"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              (ค่าเริ่มต้นของระบบคือ <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 font-mono">admin1234</code>)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                รหัสผ่านใหม่ (New Password)
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none pr-10"
                  placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                ยืนยันรหัสผ่านใหม่ (Confirm Password)
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none pr-10"
                  placeholder="พิมพ์รหัสผ่านใหม่อีกครั้ง"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>บันทึกการเปลี่ยนแปลง</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
