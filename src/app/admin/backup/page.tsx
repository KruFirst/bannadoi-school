'use client';

import React, { useState, useRef } from 'react';
import { Database, Download, Upload, ShieldCheck, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminBackupPage() {
  const [restoring, setRestoring] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadBackup = () => {
    window.location.href = '/api/backup';
  };

  const handleFileRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('คำเตือน: การกู้คืนข้อมูลจะเขียนทับข้อมูลปัจจุบันด้วยข้อมูลจากไฟล์สำรอง คุณแน่ใจหรือไม่?')) {
      return;
    }

    setRestoring(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const res = await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (res.ok) {
        setSuccessMsg('กู้คืนฐานข้อมูลสำเร็จเรียบร้อยแล้ว!');
      } else {
        setErrorMsg('เกิดข้อผิดพลาดในการกู้คืนข้อมูล');
      }
    } catch (err) {
      setErrorMsg('ไฟล์ JSON ไม่ถูกต้อง หรือเสียหาย');
    } finally {
      setRestoring(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Database className="w-6 h-6 text-school-green-700" />
          <span>สำรองและกู้คืนฐานข้อมูล (Backup & Restore)</span>
        </h1>
        <p className="text-xs text-slate-500">
          ดาวน์โหลดไฟล์สำรองข้อมูลเว็บไซต์ทั้งหมดเก็บไว้ หรือกู้คืนข้อมูลกลับมาเมื่อต้องการ
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 text-red-800 text-xs font-semibold flex items-center gap-2 border border-red-200">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Download Backup */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-school-green-50 text-school-green-700 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">1. ดาวน์โหลดไฟล์สำรองข้อมูล (Backup)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              บันทึกข้อมูลข่าวสาร, ประกาศด่วน, ทำเนียบครู 20 ท่าน, ปฏิทินการศึกษา, เอกสารดาวน์โหลด, และเกียรติบัตร ทั้งหมดเป็นไฟล์ <strong>.json</strong> เก็บไว้ในเครื่องคอมพิวเตอร์ของคุณ
            </p>
          </div>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-3 px-6 rounded-2xl bg-school-green-700 hover:bg-school-green-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลดไฟล์สำรองข้อมูล (Backup Now)</span>
          </button>
        </div>

        {/* 2. Restore Backup */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-school-purple-700 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">2. กู้คืนข้อมูลจากไฟล์ (Restore)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              เลือกไฟล์สำรองข้อมูล <strong>.json</strong> ที่เคยดาวน์โหลดไว้ เพื่อนำข้อมูลทั้งหมดกลับคืนสู่ระบบเว็บไซต์
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileRestore}
              accept=".json"
              className="hidden"
            />
            <button
              disabled={restoring}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-6 rounded-2xl bg-school-purple-700 hover:bg-school-purple-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{restoring ? 'กำลังกู้คืนข้อมูล...' : 'เลือกไฟล์ JSON เพื่อกู้คืน'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Info Note */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-school-green-700 shrink-0" />
        <span>
          <strong>คำแนะนำด้านความปลอดภัย:</strong> แนะนำให้ผู้ดูแลระบบดาวน์โหลดไฟล์สำรองข้อมูลเก็บไว้อย่างน้อยเดือนละ 1 ครั้ง หรือทุกครั้งหลังมีการอัปเดตข้อมูลจำนวนมาก
        </span>
      </div>
    </div>
  );
}
