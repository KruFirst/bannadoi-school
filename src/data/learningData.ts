export interface LearningResource {
  id: string;
  title: string;
  category: 'local' | 'stem' | 'language' | 'agriculture';
  categoryLabel: string;
  gradeLevel: string;
  instructor: string;
  description: string;
  coverImage: string;
  downloadUrl?: string;
  views: number;
}

export const learningResources: LearningResource[] = [
  {
    id: 'lr-1',
    title: 'ภาษาและภูมิปัญญาท้องถิ่นปะกาเกอญอ (Pga k\'nyau Heritage)',
    category: 'local',
    categoryLabel: 'ภูมิปัญญาท้องถิ่นและสิ่งแวดล้อม',
    gradeLevel: 'ป.1 - ม.3',
    instructor: 'ครูณรงค์ศักดิ์ ดีเพียร และปราชญ์ชุมชน',
    description: 'การเรียนรู้คำศัพท์พื้นฐาน วิถีชีวิต ภูมิปัญญาการทอผ้า และการจัดการทรัพยากรป่าต้นน้ำตามวิถีชาวไทยภูเขา',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads',
    views: 380,
  },
  {
    id: 'lr-2',
    title: 'โครงงานสะเต็มศึกษา (STEM): พลังงานสะอาดเพื่อพื้นที่สูง',
    category: 'stem',
    categoryLabel: 'วิทยาศาสตร์และเทคโนโลยี (STEM)',
    gradeLevel: 'มัธยมศึกษาตอนต้น (ม.1 - ม.3)',
    instructor: 'ครูอุษา คงเดิม และ ครูสรรเสริญ ศรีชัย',
    description: 'การออกแบบระบบสูบน้ำพลังงานแสงอาทิตย์และระบบชลประทานหยดเพื่อแปลงเกษตรอินทรีย์ของโรงเรียน',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads',
    views: 520,
  },
  {
    id: 'lr-3',
    title: 'เกษตรอินทรีย์และอาหารปลอดภัยสำหรับนักเรียนพักนอน',
    category: 'agriculture',
    categoryLabel: 'การงานอาชีพและทักษะชีวิต',
    gradeLevel: 'ประถมศึกษาและมัธยมศึกษา',
    instructor: 'คุณครูนายนิรันดร์ ประเสริฐรัตนา',
    description: 'ทักษะการปลูกพืชผักสวนครัว การเพาะเห็ดนางฟ้า และการเลี้ยงไก่ไข่เพื่อสนับสนุนโครงการอาหารกลางวันและเรือนนอน',
    coverImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads',
    views: 290,
  },
  {
    id: 'lr-4',
    title: 'ทักษะภาษาไทยเพื่อการสื่อสารสำหรับผู้เรียนพหุภาษา',
    category: 'language',
    categoryLabel: 'ภาษาและการสื่อสาร',
    gradeLevel: 'ปฐมวัย - ป.3',
    instructor: 'ครูนันทนา ทวีความเจริญ และ ครูพิชญา บุญยวง',
    description: 'แบบฝึกทักษะการแจกลูกสะกดคำ กิจกรรมการอ่านนิทานสองภาษา เพื่อพัฒนาความคล่องแคล่วในการใช้ภาษาไทย',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads',
    views: 410,
  },
];
