export interface AwardItem {
  id: string;
  year: string;
  title: string;
  level: 'ระดับเขตพื้นที่' | 'ระดับจังหวัด' | 'ระดับภาค/ประเทศ';
  category: 'นักเรียน' | 'ครูและบุคลากร' | 'สถานศึกษา';
  recipient: string;
  issuer: string;
  description: string;
  imageUrl: string;
}

export const schoolAwards: AwardItem[] = [
  {
    id: 'aw-1',
    year: '2569',
    title: 'รางวัลชนะเลิศอันดับ 1 การแข่งขันโครงงานวิทยาศาสตร์และสิ่งแวดล้อม',
    level: 'ระดับเขตพื้นที่',
    category: 'นักเรียน',
    recipient: 'เด็กชายธนกฤต มณีวรรณ, เด็กหญิงพิมพ์มาดา สุวรรณโชติ (ครูที่ปรึกษา: ครูอุษา คงเดิม, ครูสรรเสริญ ศรีชัย)',
    issuer: 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษาแม่ฮ่องสอน เขต 2',
    description: 'ผลงานโครงงานระบบพลังงานสะอาดและระบบน้ำเพื่อแปลงเกษตรอินทรีย์บนพื้นที่สูง',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'aw-2',
    year: '2568',
    title: 'รางวัลสถานศึกษาต้นแบบการจัดการเรียนรู้เชิงรุก (Active Learning) บนพื้นที่สูง',
    level: 'ระดับจังหวัด',
    category: 'สถานศึกษา',
    recipient: 'โรงเรียนบ้านนาดอย นำโดย ผอ. จิรพัส ปันดิษ',
    issuer: 'สำนักงานศึกษาธิการจังหวัดแม่ฮ่องสอน',
    description: 'การจัดการเรียนรู้บูรณาการภูมิปัญญาท้องถิ่นปะกาเกอญอและทักษะอาชีพเพื่อการพึ่งตนเอง',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'aw-3',
    year: '2568',
    title: 'รางวัลครูผู้สอนดีเด่น กลุ่มสาระการเรียนรู้ภาษาไทย',
    level: 'ระดับเขตพื้นที่',
    category: 'ครูและบุคลากร',
    recipient: 'นายณรงค์ศักดิ์ ดีเพียร (ครู คศ.2)',
    issuer: 'สพป.แม่ฮ่องสอน เขต 2',
    description: 'นวัตกรรมแบบฝึกทักษะการอ่านออกเขียนได้สำหรับนักเรียนชาวไทยภูเขาพหุภาษา',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'aw-4',
    year: '2567',
    title: 'รางวัลสถานศึกษาปลอดภัยระดับดีเด่น (Safety Center)',
    level: 'ระดับภาค/ประเทศ',
    category: 'สถานศึกษา',
    recipient: 'โรงเรียนบ้านนาดอย (หอนอนนักเรียนพักนอน)',
    issuer: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
    description: 'มาตรฐานความปลอดภัยในการดูแลสุขอนามัยและชีวิตความเป็นอยู่ของนักเรียนพักนอน',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
  },
];
