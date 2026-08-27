export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time?: string;
  category: 'academic' | 'activity' | 'holiday' | 'exam';
  categoryLabel: string;
  description: string;
  location?: string;
}

export const schoolEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'วันเฉลิมพระชนมพรรษา (วันหยุดราชการ)',
    date: '2026-07-28',
    category: 'holiday',
    categoryLabel: 'วันหยุดราชการ',
    description: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว',
  },
  {
    id: 'ev-2',
    title: 'การประชุมผู้ปกครองนักเรียนและดูแลนักเรียนพักนอน ภาคเรียนที่ 1/2569',
    date: '2026-08-30',
    time: '08:30 - 12:00 น.',
    category: 'activity',
    categoryLabel: 'กิจกรรมโรงเรียน',
    description: 'การประชุมผู้ปกครอง ชี้แจงนโยบายความปลอดภัย และพบครูประจำชั้น ณ หอประชุมใหญ่',
    location: 'หอประชุมโรงเรียนบ้านนาดอย',
  },
  {
    id: 'ev-3',
    title: 'การสอบประเมินผลกลางภาคเรียนที่ 1 (Midterm Exam)',
    date: '2026-09-15',
    endDate: '2026-09-17',
    category: 'exam',
    categoryLabel: 'การสอบและวัดผล',
    description: 'การสอบวัดผลกลางภาคเรียนที่ 1 ปีการศึกษา 2569 ระดับชั้น ป.1 - ม.3',
  },
  {
    id: 'ev-4',
    title: 'กิจกรรมสัปดาห์วันวิทยาศาสตร์และนวัตกรรมชุมชน',
    date: '2026-08-19',
    category: 'academic',
    categoryLabel: 'วิชาการ',
    description: 'นิทรรศการโครงงานสะเต็มศึกษาและการอนุรักษ์สิ่งแวดล้อมสีเขียว',
  },
  {
    id: 'ev-5',
    title: 'การสอบปลายภาคเรียนที่ 1 ประจำปีการศึกษา 2569',
    date: '2026-10-06',
    endDate: '2026-10-09',
    category: 'exam',
    categoryLabel: 'การสอบและวัดผล',
    description: 'การสอบวัดผลสัมฤทธิ์ปลายภาคเรียนที่ 1',
  },
  {
    id: 'ev-6',
    title: 'วันปิดภาคเรียนที่ 1 ปีการศึกษา 2569',
    date: '2026-10-12',
    category: 'holiday',
    categoryLabel: 'วันหยุดภาคเรียน',
    description: 'ปิดภาคเรียนที่ 1 (12 - 31 ตุลาคม 2569)',
  },
  {
    id: 'ev-7',
    title: 'วันเปิดภาคเรียนที่ 2 ประจำปีการศึกษา 2569',
    date: '2026-11-02',
    category: 'academic',
    categoryLabel: 'วิชาการ',
    description: 'เปิดทำการเรียนการสอนภาคเรียนที่ 2/2569',
  },
  {
    id: 'ev-8',
    title: 'กิจกรรมค่ายคุณธรรม จริยธรรม และพัฒนาทักษะชีวิต',
    date: '2026-12-18',
    endDate: '2026-12-19',
    category: 'activity',
    categoryLabel: 'กิจกรรมโรงเรียน',
    description: 'กิจกรรมเข้าค่ายคุณธรรมและบำเพ็ญประโยชน์เพื่อชุมชนบ้านนาดอยและบ้านสบแม่แพ',
  },
];
