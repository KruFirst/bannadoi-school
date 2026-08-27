import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  Award, 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  School,
  GraduationCap,
  Users,
  MapPin,
  Bed,
  Globe
} from 'lucide-react';
import { schoolInfo, schoolBoardMembers, studentClassrooms } from '@/data/schoolData';

export const metadata = {
  title: `เกี่ยวกับโรงเรียน | ${schoolInfo.nameTh}`,
  description: `ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และโครงสร้างการบริหารของ${schoolInfo.nameTh} สพป.แม่ฮ่องสอน เขต 2`,
};

export default function AboutPage() {
  return (
    <div className="bg-[#fcfdfd] py-12 md:py-16">
      <div className="container-custom space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold">
            <School className="w-3.5 h-3.5" />
            <span>ข้อมูลพื้นฐานสถานศึกษา • รหัส {schoolInfo.schoolCode}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            เกี่ยวกับ {schoolInfo.nameTh}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {schoolInfo.affiliation} • จัดการศึกษาตั้งแต่ระดับปฐมวัยถึงมัธยมศึกษาปีที่ 3 พร้อมบริการดูแลนักเรียนพักนอนในพื้นที่สูง
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-school-green-50 rounded-bl-full -z-0 opacity-70" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-school-green-600 text-white flex items-center justify-center shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">วิสัยทัศน์ (Vision)</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                &ldquo;โรงเรียนบ้านนาดอย มุ่งจัดการศึกษาให้ผู้เรียนมีคุณภาพตามมาตรฐานสากล มีทักษะการคิดวิเคราะห์ นวัตกรรม และเทคโนโลยีดิจิทัล ดำรงตนอย่างมีคุณธรรม จริยธรรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง บนพื้นฐานสิ่งแวดล้อมที่ยั่งยืน ภายในปี 2570&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-school-green-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>เป้าหมายการพัฒนาคุณภาพการศึกษา สพป.แม่ฮ่องสอน เขต 2</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-school-purple-50 rounded-bl-full -z-0 opacity-70" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-school-purple-600 text-white flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">พันธกิจ (Mission)</h2>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-school-purple-600 mt-2 shrink-0" />
                  <span>จัดการเรียนรู้เชิงรุก (Active Learning) ที่สอดคล้องกับบริบทชุมชนและวัฒนธรรมท้องถิ่น</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-school-purple-600 mt-2 shrink-0" />
                  <span>ส่งเสริมทักษะวิชาการ เทคโนโลยีดิจิทัล และทักษะอาชีพแก่ผู้เรียนในพื้นที่สูง</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-school-purple-600 mt-2 shrink-0" />
                  <span>จัดสวัสดิการและการดูแลสุขอนามัย ความปลอดภัยแก่นักเรียนพักนอนอย่างทั่วถึง</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-school-purple-600 mt-2 shrink-0" />
                  <span>พัฒนาครูและบุคลากรทางการศึกษาให้มีความเชี่ยวชาญทางวิชาชีพตามเกณฑ์มาตรฐาน</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-school-purple-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>พันธกิจ 4 ด้านหลักเพื่อการพัฒนาที่ยั่งยืน</span>
            </div>
          </div>
        </div>

        {/* History / Background */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">ประวัติความเป็นมาของสถานศึกษา</h2>
              <p className="text-xs text-slate-400">ก่อตั้งเมื่อวันที่ {schoolInfo.establishedDate}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-light">
            <p>
              <strong>{schoolInfo.nameTh}</strong> ตั้งอยู่เลขที่ 311 หมู่ที่ 9 บ้านนาดอย ตำบลแม่สวด อำเภอสบเมย จังหวัดแม่ฮ่องสอน ก่อตั้งเมื่อวันที่ <strong>12 พฤษภาคม 2526</strong> โดยใช้ชื่อแรกตั้งว่า <em>&ldquo;โรงเรียนบ้านแม่สวด สาขาห้วยมะน้ำ&rdquo;</em> ในปีแรกของการจัดการศึกษาทางโรงเรียนได้ใช้สถานที่ของโบสถ์ศาสนาคริสต์เป็นที่จัดการเรียนการสอน ครูคนแรกชื่อ <strong>นายสังวาลย์ ศิลาชาญ</strong> ตำแหน่งครูใหญ่โรงเรียนบ้านแม่ต๊อบเหนือ มารักษาการในตำแหน่งครูใหญ่ ตามคำสั่งที่ ศธ 1450.05/512 ลงวันที่ 29 เมษายน 2526
            </p>
            <p>
              ต่อมาได้เปลี่ยนชื่อเป็น <strong>&ldquo;โรงเรียนบ้านนาดอย&rdquo;</strong> มีเขตพื้นที่บริการ 2 หมู่บ้าน ได้แก่ <strong>บ้านนาดอย</strong> และ <strong>บ้านสบแม่แพ</strong> สภาพภูมิศาสตร์พื้นที่ส่วนใหญ่เป็นทิวเขาสูงสลับซับซ้อนและยังคงเป็นป่าไม้ตามธรรมชาติที่อุดมสมบูรณ์กว่าร้อยละ 80 ของพื้นที่ทั้งหมด ชุมชนส่วนใหญ่เป็นชาวไทยภูเขาเผ่าปะกาเกอญอ (กะเหรี่ยง) นับถือศาสนาคริสต์ มีสภาพวิถีชีวิตเรียบง่าย พึ่งพาอาศัยกัน ประกอบอาชีพทำนาและทำสวนถั่วเหลือง
            </p>
            <p>
              ปัจจุบัน {schoolInfo.nameTh} เปิดสอนตั้งแต่ระดับชั้นอนุบาล 1 ถึง ชั้นมัธยมศึกษาปีที่ 3 มีนักเรียนทั้งหมด 160 คน และเป็นโรงเรียนที่ให้บริการ <strong>บ้านพักนักเรียน/หอนอน สำหรับนักเรียนพักนอน จำนวน 69 คน</strong> ภายใต้การบริหารงานของ <strong>นายจิรพัส ปันดิษ</strong> ผู้อำนวยการโรงเรียน
            </p>
          </div>
        </div>

        {/* Identity & Symbols (Green - Purple) */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-school-purple-700 text-xs font-semibold mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>เอกลักษณ์และอัตลักษณ์สถานศึกษา</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">สีและสัญลักษณ์ประจำโรงเรียน</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-school-green-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="font-bold text-sm">เขียว</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">สีเขียว (Emerald Green)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  หมายถึง ความอุดมสมบูรณ์ของผืนป่าธรรมชาติ ความเจริญงอกงาม และจิตสำนึกในการอนุรักษ์สิ่งแวดล้อม
                </p>
              </div>
            </div>

            {/* Purple */}
            <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-school-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="font-bold text-sm">ม่วง</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">สีม่วง (Royal Violet)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  หมายถึง ความสง่างาม สติปัญญา ความคิดสร้างสรรค์ และความมุ่งมั่นในการเรียนรู้
                </p>
              </div>
            </div>
          </div>

          {/* Motto & Philosophy */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ปรัชญาของโรงเรียน</span>
              <p className="font-bold text-slate-800 text-base mt-0.5">{schoolInfo.philosophy}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">คำขวัญประจำโรงเรียน</span>
              <p className="font-bold text-school-purple-800 text-base mt-0.5">{schoolInfo.motto}</p>
            </div>
          </div>
        </div>

        {/* Student Statistics & Classroom Table */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-green-50 text-school-green-700 text-xs font-semibold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>ข้อมูลจำนวนนักเรียน ปีการศึกษา 2569</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">ชั้นเรียนและครูประจำชั้น</h2>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-slate-600">
              <Bed className="w-4 h-4 text-school-purple-600" />
              <span>นักเรียนพักนอนทั้งหมด <strong>{schoolInfo.stats.boarders}</strong> คน</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">ระดับชั้น</th>
                  <th className="p-3.5 text-center">ชาย</th>
                  <th className="p-3.5 text-center">หญิง</th>
                  <th className="p-3.5 text-center font-bold">รวม (คน)</th>
                  <th className="p-3.5">ครูประจำชั้น</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {studentClassrooms.map((cls) => (
                  <tr key={cls.grade} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-medium text-slate-800">{cls.grade}</td>
                    <td className="p-3.5 text-center">{cls.male}</td>
                    <td className="p-3.5 text-center">{cls.female}</td>
                    <td className="p-3.5 text-center font-bold text-school-green-700">{cls.total}</td>
                    <td className="p-3.5 text-slate-700">{cls.teacher}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100/70 font-bold text-slate-800">
                  <td className="p-3.5">รวมทั้งสิ้น</td>
                  <td className="p-3.5 text-center">77</td>
                  <td className="p-3.5 text-center">83</td>
                  <td className="p-3.5 text-center text-school-green-800 font-extrabold">{schoolInfo.stats.students}</td>
                  <td className="p-3.5 text-slate-500">ข้อมูล ณ 10 มิถุนายน 2569</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* School Board (คณะกรรมการสถานศึกษาขั้นพื้นฐาน) */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-school-purple-700 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>การบริหารงานแบบมีส่วนร่วม</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">คณะกรรมการสถานศึกษาขั้นพื้นฐาน</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schoolBoardMembers.map((member, index) => (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 card-hover transition-all space-y-1"
              >
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-school-purple-700 border border-slate-200 inline-block mb-1">
                  ลำดับที่ {index + 1}
                </span>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-school-green-700">{member.position}</p>
                <p className="text-xs text-slate-400">{member.roleDescription}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Interactive Google Map */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-school-green-700 text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>ที่ตั้งและเขตพื้นที่บริการ</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">แผนที่ที่ตั้งโรงเรียน (Google Maps)</h2>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('โรงเรียนบ้านนาดอย ตำบลแม่สวด อำเภอสบเมย จังหวัดแม่ฮ่องสอน')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-school-green-50 text-school-green-800 text-xs font-bold rounded-xl hover:bg-school-green-100 transition-colors shrink-0"
            >
              <span>เปิดระบบนำทาง GPS ใน Google Maps</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 md:h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <iframe
              title="แผนที่โรงเรียนบ้านนาดอย"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B2%E0%B8%94%E0%B8%AD%E0%B8%A2+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%AA%E0%B8%A7%E0%B8%94+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B8%AA%E0%B8%9A%E0%B9%80%E0%B8%A1%E0%B8%A2+%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%AE%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%AD%E0%B8%99&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          <p className="text-xs text-slate-500">
            <strong>ที่อยู่:</strong> {schoolInfo.address} • บริการชุมชน 2 หมู่บ้าน (บ้านนาดอย และ บ้านสบแม่แพ)
          </p>
        </div>
      </div>
    </div>
  );
}
