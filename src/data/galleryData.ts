export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'academic' | 'student-life' | 'culture' | 'boarding';
  categoryLabel: string;
  date: string;
  imageUrl: string;
  description: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'กิจกรรมค่ายวิทยาศาสตร์และสะเต็มศึกษาบนพื้นที่สูง',
    category: 'academic',
    categoryLabel: 'กิจกรรมวิชาการ',
    date: '20 ส.ค. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    description: 'นักเรียนระดับชั้นมัธยมศึกษาตอนต้นร่วมทดลองระบบสูบน้ำพลังงานแสงอาทิตย์',
  },
  {
    id: 'gal-2',
    title: 'พิธีไหว้ครูและมอบทุนการศึกษา ประจำปีการศึกษา 2569',
    category: 'culture',
    categoryLabel: 'ประเพณีและวัฒนธรรม',
    date: '15 มิ.ย. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'นักเรียนทุกระดับชั้นร่วมแสดงความกตัญญูกตเวทิตาต่อคุณครูโรงเรียนบ้านนาดอย',
  },
  {
    id: 'gal-3',
    title: 'กิจกรรมปลูกป่าต้นน้ำและอนุรักษ์ธรรมชาติชุมชนปะกาเกอญอ',
    category: 'culture',
    categoryLabel: 'ประเพณีและวัฒนธรรม',
    date: '28 ก.ค. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    description: 'คณะครู นักเรียน และผู้นำชุมชนบ้านนาดอยร่วมปลูกกล้าไม้พื้นเมืองรักษาป่าต้นน้ำ',
  },
  {
    id: 'gal-4',
    title: 'การตรวจสุขภาพและฟันประจำปี สำหรับนักเรียนพักนอน',
    category: 'boarding',
    categoryLabel: 'ชีวิตหอนอน',
    date: '10 ส.ค. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    description: 'เจ้าหน้าที่สาธารณสุขตรวจสุขภาพทั่วไปและทันตกรรมแก่นักเรียนพักนอน 69 คน',
  },
  {
    id: 'gal-5',
    title: 'กิจกรรมส่งเสริมทักษะอาชีพ: การเลี้ยงไก่ไข่และเพาะเห็ดนางฟ้า',
    category: 'student-life',
    categoryLabel: 'กิจกรรมพัฒนาผู้เรียน',
    date: '05 ส.ค. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    description: 'นักเรียนเก็บผลผลิตไข่ไก่อินทรีย์ส่งโรงอาหารกลางวันและเรือนนอน',
  },
  {
    id: 'gal-6',
    title: 'กิจกรรมกีฬาภายในและส่งเสริมสุขภาพนักเรียน',
    category: 'student-life',
    categoryLabel: 'กิจกรรมพัฒนาผู้เรียน',
    date: '18 ก.ค. 2569',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    description: 'การแข่งขันกีฬาพื้นบ้านและฟุตซอลกระชับความสามัคคีระหว่างชั้นเรียน',
  },
];
