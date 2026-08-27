'use client';

import React, { useState } from 'react';
import { Users, Search, GraduationCap, School, BookOpen } from 'lucide-react';
import { staffMembers, departments, schoolInfo } from '@/data/schoolData';

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ทั้งหมด');

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesDept = selectedDept === 'ทั้งหมด' || staff.department === selectedDept;
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staff.major && staff.major.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const executives = filteredStaff.filter((s) => s.isExecutive);
  const teachers = filteredStaff.filter((s) => !s.isExecutive);

  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>ทำเนียบข้าราชการครูและบุคลากรทางการศึกษา (จำนวน {staffMembers.length} ท่าน)</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            บุคลากร {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {schoolInfo.affiliation}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ, ตำแหน่ง, หรือวิชาเอก..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 focus:bg-white transition-all"
            />
          </div>

          {/* Department Filter Select */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-slate-500 shrink-0 hidden sm:inline">กลุ่มงาน:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full md:w-auto px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-school-green-600 text-slate-700 font-medium"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Executives Section */}
        {executives.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <GraduationCap className="w-5 h-5 text-school-purple-700" />
              <h2 className="text-xl font-bold text-slate-800">ผู้บริหารสถานศึกษา</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-md">
              {executives.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-white rounded-2xl border border-purple-100 p-6 card-hover flex flex-col items-center text-center shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-school-purple-600 to-school-green-600" />
                  
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 shadow-md border-2 border-white ring-2 ring-purple-100">
                    <img
                      src={staff.imageUrl}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800 text-lg mb-1">{staff.name}</h3>
                  <p className="text-xs font-semibold text-school-purple-700 mb-1">{staff.position}</p>
                  <p className="text-xs text-slate-500 mb-2">วุฒิ {staff.academicDegree} ({staff.major})</p>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-school-purple-700 border border-purple-200">
                    {staff.department}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Teachers & Staff Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-school-green-700" />
              <h2 className="text-xl font-bold text-slate-800">คณะครูและบุคลากรทางการศึกษา</h2>
            </div>
            <span className="text-xs text-slate-400">แสดงผล {teachers.length} ท่าน</span>
          </div>

          {teachers.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
              ไม่พบข้อมูลบุคลากรที่ตรงกับคำค้นหา
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {teachers.map((staff, idx) => (
                <div
                  key={staff.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 card-hover flex flex-col items-center text-center shadow-sm"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 shadow-sm border border-slate-100 bg-slate-100">
                    <img
                      src={staff.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm mb-1">{staff.name}</h3>
                  <p className="text-xs text-school-green-700 font-semibold mb-1 line-clamp-2">{staff.position}</p>
                  
                  <div className="mt-auto pt-3 border-t border-slate-100 w-full space-y-1 text-[11px] text-slate-500">
                    <p className="truncate"><span className="text-slate-400">กลุ่ม:</span> {staff.department}</p>
                    {staff.major && (
                      <p className="truncate"><span className="text-slate-400">วุฒิ/วิชาเอก:</span> {staff.academicDegree} {staff.major}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
