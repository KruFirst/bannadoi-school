'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect directly to Admin CMS Dashboard without requiring login
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
      <span>กำลังเข้าสู่ระบบจัดการเว็บไซต์ (Admin CMS)...</span>
    </div>
  );
}
