# 🚀 คู่มือการนำเว็บไซต์โรงเรียนบ้านนาดอยขึ้นออนไลน์จริงสู่สาธารณะ (Free Deployment Guide)

เว็บไซต์ของ **โรงเรียนบ้านนาดอย** พัฒนาด้วย Next.js 14 และ Tailwind CSS ซึ่งพร้อมสำหรับนำขึ้นออนไลน์สู่สาธารณะบนระบบคลาวด์ได้ฟรี 100% โดยไม่มีค่าใช้จ่ายรายเดือน

---

## 🌟 วิธีที่ 1: เผยแพร่ผ่าน Vercel (แนะนำ - ฟรี 100% เร็วและเสถียรที่สุด)

Vercel เป็นผู้สร้าง Next.js ให้บริการโฮสติ้งฟรีระดับโลก (Free Tier) ที่รองรับทั้ง HTTPS/SSL อัตโนมัติ, CDN ความเร็วสูงทั่วโลก และเชื่อมต่อโดเมนของโรงเรียนได้ทันที

### ขั้นตอนการดำเนินการ:
1. **สร้างบัญชี GitHub และ Vercel:**
   - สมัครบัญชีฟรีที่ [github.com](https://github.com)
   - สมัครบัญชีฟรีที่ [vercel.com](https://vercel.com) (เข้าสู่ระบบด้วยบัญชี GitHub)
2. **อัปโหลดโฟลเดอร์โครงการขึ้น GitHub:**
   - ใช้โปรแกรม [GitHub Desktop](https://desktop.github.com/) หรือคำสั่ง Git:
   ```bash
   git init
   git add .
   git commit -m "Deploy Ban Na Doi School Website"
   git branch -M main
   git remote add origin https://github.com/your-username/bannadoi-school.git
   git push -u origin main
   ```
3. **เชื่อมต่อและ Deploy บน Vercel:**
   - เข้าไปที่หน้าแดชบอร์ดของ Vercel แล้วคลิก **"Add New..."** -> **"Project"**
   - เลือกคลังโค้ด `bannadoi-school` จาก GitHub
   - กดปุ่ม **"Deploy"**
   - ภายในเวลาไม่เกิน 1-2 นาที คุณจะได้ URL สาธารณะ เช่น `https://bannadoi-school.vercel.app` ที่สามารถเปิดดูได้จากทุกที่ทั่วโลกทันที!

4. **การผูกโดเมนทางการของโรงเรียน (เช่น `bannadoi.ac.th` หรือ `bannadoi.go.th`):**
   - ในหน้าตั้งค่าโปรเจกต์ของ Vercel ไปที่เมนู **Settings** -> **Domains**
   - พิมพ์ชื่อโดเมนของโรงเรียน เช่น `www.bannadoi.ac.th`
   - ระบบจะให้ค่า CNAME หรือ A Record สำหรับนำไปกรอกในระบบจัดการ DNS ของผู้ให้บริการโดเมน (เช่น THNIC / Cloudflare)
   - ระบบจะออกใบรับรองความปลอดภัย SSL (HTTPS) ให้ฟรีอัตโนมัติ

---

## 💻 วิธีที่ 2: รันเป็นเว็บเซิร์ฟเวอร์ภายในสถานศึกษา (Local School Server)

หากต้องการเปิดใช้งานภายในเครือข่ายโรงเรียน หรือติดตั้งบนเครื่องคอมพิวเตอร์แม่ข่ายของโรงเรียน:
1. ติดตั้ง [Node.js LTS](https://nodejs.org/)
2. เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วพิมพ์คำสั่ง:
   ```bash
   npm run build
   npm run start
   ```
3. เว็บไซต์จะทำงานที่พอร์ต 3000 (เช่น `http://192.168.1.xxx:3000` ภายในวง LAN ของโรงเรียน)

---

## 🔐 บัญชีเข้าสู่ระบบผู้ดูแลระบบ (Admin CMS)
- **URL:** `/admin`
- **Username:** `admin`
- **Password:** `admin1234`
