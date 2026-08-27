export interface CertificateRecord {
  id: string;
  code: string; // เช่น BND-2569-001
  recipientName: string;
  role: 'นักเรียน' | 'ครู/บุคลากร' | 'บุคคลภายนอก';
  gradeLevel?: string;
  activityName: string;
  achievement: string; // เช่น รางวัลชนะเลิศอันดับ 1 / ผ่านการอบรม
  issueDate: string;
  directorName: string;
  directorPosition: string;
}

export const sampleCertificates: CertificateRecord[] = [
  {
    id: 'cert-1',
    code: 'BND-2569-001',
    recipientName: 'เด็กชายธนกฤต มณีวรรณ',
    role: 'นักเรียน',
    gradeLevel: 'มัธยมศึกษาปีที่ 3/1',
    activityName: 'การแข่งขันโครงงานวิทยาศาสตร์และสิ่งแวดล้อม ระดับเขตพื้นที่การศึกษา',
    achievement: 'รางวัลชนะเลิศอันดับ 1 (เหรียญทอง)',
    issueDate: '24 สิงหาคม 2569',
    directorName: 'นายจิรพัส ปันดิษ',
    directorPosition: 'ผู้อำนวยการโรงเรียนบ้านนาดอย',
  },
  {
    id: 'cert-2',
    code: 'BND-2569-002',
    recipientName: 'เด็กหญิงพิมพ์มาดา สุวรรณโชติ',
    role: 'นักเรียน',
    gradeLevel: 'มัธยมศึกษาปีที่ 3/1',
    activityName: 'การแข่งขันโครงงานวิทยาศาสตร์และสิ่งแวดล้อม ระดับเขตพื้นที่การศึกษา',
    achievement: 'รางวัลชนะเลิศอันดับ 1 (เหรียญทอง)',
    issueDate: '24 สิงหาคม 2569',
    directorName: 'นายจิรพัส ปันดิษ',
    directorPosition: 'ผู้อำนวยการโรงเรียนบ้านนาดอย',
  },
  {
    id: 'cert-3',
    code: 'BND-2569-003',
    recipientName: 'นางสาวอุษา คงเดิม',
    role: 'ครู/บุคลากร',
    gradeLevel: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์ฯ',
    activityName: 'ครูผู้ฝึกสอนนักเรียนได้รับรางวัลชนะเลิศ การแข่งขันโครงงานวิทยาศาสตร์และสิ่งแวดล้อม',
    achievement: 'ครูผู้ฝึกสอนยอดเยี่ยม',
    issueDate: '24 สิงหาคม 2569',
    directorName: 'นายจิรพัส ปันดิษ',
    directorPosition: 'ผู้อำนวยการโรงเรียนบ้านนาดอย',
  },
];
