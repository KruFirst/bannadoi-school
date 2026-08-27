# เว็บไซต์โรงเรียนบ้านนาดอย (Ban Na Doi School Website)

เว็บไซต์สถานศึกษาแบบครบวงจร ออกแบบสไตล์ **Minimalist Modern** โทนสีประจำโรงเรียน **เขียว-ม่วง** สำหรับโรงเรียนในสังกัดสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) พัฒนาด้วยเทคโนโลยีฟรี 100% (Open-Source & Free-tier Friendly)

---

## 🎨 จุดเด่นและการออกแบบ
- **สไตล์ Minimalist:** สะอาดตา ทันสมัย อ่านง่าย ใช้งานสะดวกทั้งบนสมาร์ตโฟน แท็บเล็ต และคอมพิวเตอร์
- **อัตลักษณ์ เขียว-ม่วง:** ใช้โทนสี Emerald Green (`#047857`) และ Royal Violet (`#7e22ce`) สื่อถึงความอุดมสมบูรณ์และความมีสติปัญญา
- **มาตรฐาน สพฐ. & ITA/OIT:** มีหน้าศูนย์ข้อมูลความโปร่งใสรองรับเกณฑ์การประเมิน ITA O1 - O43
- **ระบบบริการออนไลน์:** ทางลัดเข้าระบบ SGS, SchoolMIS, DEEP, ศูนย์ดาวน์โหลดเอกสาร และฟอร์มรับเรื่องร้องเรียน (E-Petition)

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + Google Fonts (Prompt & Sarabun)
- **Icons:** Lucide React
- **Hosting รองรับแบบฟรี:** Vercel, Cloudflare Pages, Netlify หรือ GitHub Pages

---

## 📂 โครงสร้างโฟลเดอร์

```
├── src/
│   ├── app/                    # หน้าเว็บไซต์หลัก (App Router)
│   │   ├── about/              # ข้อมูลเกี่ยวกับโรงเรียน ประวัติ วิสัยทัศน์
│   │   ├── staff/              # ทำเนียบผู้บริหารและคณะครู พร้อมระบบค้นหา
│   │   ├── news/               # ศูนย์ข่าวสาร กิจกรรม และจัดซื้อจัดจ้าง
│   │   │   └── [id]/           # หน้ารายละเอียดข่าวแต่ละบทความ
│   │   ├── ita/                # ศูนย์ข้อมูลความโปร่งใส ITA/OIT 2569 (สพฐ.)
│   │   ├── downloads/          # คลังเอกสารและแบบฟอร์มดาวน์โหลด
│   │   ├── contact/            # ช่องทางติดต่อและแบบฟอร์ม E-Petition
│   │   ├── layout.tsx          # เลย์เอาต์หลักพร้อม Navbar & Footer
│   │   ├── page.tsx            # หน้าแรก (Hero, ข่าว, สาร ผอ., สถิติ)
│   │   └── globals.css         # CSS หลักและ Custom Theme
│   ├── components/             # คอมโพเนนต์ UI
│   │   ├── AnnouncementTicker.tsx # แถบประกาศด่วนด้านบนสุด
│   │   ├── Navbar.tsx          # แถบเมนูนำทางหลัก
│   │   ├── HeroBanner.tsx      # สไลเดอร์แบนเนอร์หน้าแรก
│   │   ├── QuickLinks.tsx      # ลิงก์ด่วนระบบ SGS / ITA / เอกสาร
│   │   ├── NewsCard.tsx        # การ์ดแสดงข่าวสาร
│   │   ├── StatCounter.tsx     # แถบสถิติโรงเรียน
│   │   └── Footer.tsx          # ส่วนท้ายเว็บพร้อมข้อมูลติดต่อ
│   ├── data/
│   │   └── schoolData.ts       # ไฟล์ข้อมูลจำลองของโรงเรียนบ้านนาดอย
│   └── types/
│       └── index.ts            # TypeScript Data Types
```

---

## 🛠️ วิธีการรันโปรเจกต์ในเครื่อง (Local Development)

1. ติดตั้ง Dependencies:
```bash
npm install
```

2. เริ่มต้น Development Server:
```bash
npm run dev
```

3. เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

---

## ☁️ วิธีการขึ้นระบบจริงแบบฟรี 100% (Free Deployment)

1. **ผ่าน Vercel (แนะนำ - ฟรีและเร็วที่สุด):**
   - นำโค้ดขึ้น GitHub Repository
   - เชื่อมต่อบัญชี GitHub กับ [Vercel.com](https://vercel.com) (ฟรี)
   - กด Import โปรเจกต์ จะได้ URL ใช้งานได้ทันทีพร้อม HTTPS อัตโนมัติ (เช่น `bannadoi-school.vercel.app`)

2. **เชื่อมต่อโดเมน `.ac.th` ของโรงเรียน:**
   - สามารถผูก Custom Domain ของโรงเรียนบน Vercel Settings ได้ฟรี
