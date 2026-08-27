import React from 'react';
import { Users, GraduationCap, School, Bed } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const stats = [
  {
    label: 'นักเรียนทั้งหมด',
    value: `${schoolInfo.stats.students}`,
    unit: 'คน',
    icon: GraduationCap,
    color: 'text-school-green-600 bg-school-green-50',
  },
  {
    label: 'นักเรียนพักนอน (หอนอน)',
    value: `${schoolInfo.stats.boarders}`,
    unit: 'คน',
    icon: Bed,
    color: 'text-school-purple-600 bg-school-purple-50',
  },
  {
    label: 'ครูและบุคลากร',
    value: `${schoolInfo.stats.teachers}`,
    unit: 'คน',
    icon: Users,
    color: 'text-school-green-600 bg-school-green-50',
  },
  {
    label: 'ระดับชั้นที่เปิดสอน (อ.1-ม.3)',
    value: `${schoolInfo.stats.classrooms}`,
    unit: 'ห้อง',
    icon: School,
    color: 'text-school-purple-600 bg-school-purple-50',
  },
];

export default function StatCounter() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200/60">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center text-center card-hover"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
