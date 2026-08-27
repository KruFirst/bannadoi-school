import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Bed,
  Calendar,
  Award,
  FileText
} from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';
import VisitorCounter from '@/components/VisitorCounter';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 print:hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-md border border-slate-700 overflow-hidden">
                <img
                  src="/logo.png"
                  alt={schoolInfo.nameTh}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{schoolInfo.nameTh}</h3>
                <p className="text-xs text-slate-400">{schoolInfo.nameEn}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {schoolInfo.philosophy}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><span className="text-school-green-400 font-medium">สังกัด:</span> {schoolInfo.affiliation}</p>
              <p><span className="text-school-purple-400 font-medium">สีประจำโรงเรียน:</span> เขียว - ม่วง</p>
            </div>
          </div>

          {/* Col 2: Main Pages */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
              เมนูหลัก
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-school-green-400 transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-school-green-400 transition-colors">
                  เกี่ยวกับโรงเรียน
                </Link>
              </li>
              <li>
                <Link href="/staff" className="hover:text-school-green-400 transition-colors">
                  ทำเนียบบุคลากร
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-school-green-400 transition-colors">
                  ข่าวประชาสัมพันธ์
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-amber-300 hover:text-amber-200 transition-colors font-medium">
                  รับสมัครนักเรียนใหม่
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-school-green-400 transition-colors">
                  ติดต่อสอบถาม
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Systems */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
              บริการ & สารสนเทศ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/boarding" className="hover:text-school-green-400 transition-colors flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-school-green-400" />
                  <span>หอนอนนักเรียนพักนอน</span>
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-school-green-400 transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-school-green-400" />
                  <span>ปฏิทินการศึกษา</span>
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-school-green-400 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-school-green-400" />
                  <span>เกียรติบัตรออนไลน์</span>
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-school-green-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-school-green-400" />
                  <span>เอกสารดาวน์โหลด</span>
                </Link>
              </li>
              <li>
                <Link href="/ita" className="text-school-purple-300 hover:text-school-purple-200 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-school-purple-400" />
                  <span>ศูนย์ข้อมูลความโปร่งใส ITA / OIT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">
              ข้อมูลติดต่อ
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-school-green-400 shrink-0 mt-0.5" />
                <span>{schoolInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-school-green-400 shrink-0" />
                <span>{schoolInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-school-green-400 shrink-0" />
                <span>{schoolInfo.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-school-green-400 shrink-0" />
                <span>จันทร์ - ศุกร์ : 08.00 - 16.30 น.</span>
              </li>
            </ul>

            <div className="pt-2">
              <VisitorCounter />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2569 {schoolInfo.nameTh}. สงวนลิขสิทธิ์ตามพระราชบัญญัติลิขสิทธิ์.</p>
          <div className="flex items-center gap-4">
            <span>สพป.แม่ฮ่องสอน เขต 2</span>
            <span>•</span>
            <span className="text-slate-400">
              สพฐ. กระทรวงศึกษาธิการ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
