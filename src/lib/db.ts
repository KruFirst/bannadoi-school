import fs from 'fs';
import path from 'path';
import os from 'os';
import { staffMembers, downloadableDocs } from '@/data/schoolData';
import { schoolEvents } from '@/data/calendarData';
import { sampleCertificates } from '@/data/certificateData';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');
const TMP_DB_PATH = path.join(os.tmpdir(), 'bannadoi_school_db.json');

// In-memory fallback for serverless environments (e.g. Vercel)
let inMemoryDB: DBData | null = null;

export interface AdminUser {
  username: string;
  password: string;
  lastUpdated: string;
}

export interface VisitorStats {
  total: number;
  today: number;
  thisMonth: number;
  lastDate: string;
  lastMonth: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  messageType: 'inquiry' | 'petition';
  message: string;
  createdAt: string;
  status: string;
}

export interface DBData {
  news: any[];
  announcements: any[];
  contacts: ContactMessage[];
  staff: any[];
  documents: any[];
  events: any[];
  surveys: any[];
  certificates: any[];
  admissions: any[];
  adminUser?: AdminUser;
  visitorStats?: VisitorStats;
}

export const defaultVisitorStats: VisitorStats = {
  total: 12450,
  today: 184,
  thisMonth: 3820,
  lastDate: new Date().toISOString().split('T')[0],
  lastMonth: new Date().toISOString().slice(0, 7),
};

export const defaultAdminUser: AdminUser = {
  username: 'admin',
  password: 'admin1234',
  lastUpdated: new Date().toISOString(),
};

function getInitialDB(): DBData {
  return {
    news: [],
    announcements: [],
    contacts: [
      {
        id: 'cnt-init-1',
        name: 'นายสมศักดิ์ สุขใจ',
        phone: '081-234-5678',
        email: 'somsak@example.com',
        subject: 'สอบถามข้อมูลการรับนักเรียนพักนอน 2569',
        messageType: 'inquiry',
        message: 'ต้องการทราบระเบียบการนำบุตรหลานเข้าพักนอนในหอนอนโรงเรียนบ้านนาดอย มีอุปกรณ์ใดที่ต้องเตรียมมาบ้างครับ',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'unread',
      },
      {
        id: 'cnt-init-2',
        name: 'ผู้ปกครองนักเรียน ม.1',
        phone: '',
        email: '',
        subject: 'ข้อเสนอแนะเรื่องเวลาเดินรถรับส่งนักเรียน',
        messageType: 'inquiry',
        message: 'ขอชื่นชมคณะครูที่ดูแลเด็กๆ เป็นอย่างดี อยากเสนอแนะให้ปรับเวลารถรับส่งช่วงเย็นให้เร็วขึ้น 15 นาทีในช่วงฤดูฝนครับ',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        status: 'unread',
      }
    ],
    staff: staffMembers,
    documents: downloadableDocs,
    events: schoolEvents,
    surveys: [],
    certificates: sampleCertificates,
    admissions: [],
    adminUser: defaultAdminUser,
    visitorStats: defaultVisitorStats,
  };
}

export function readDB(): DBData {
  // 1. If we already have memory cache in this process, use it
  if (inMemoryDB) {
    return inMemoryDB;
  }

  // 2. Try reading from TMP_DB_PATH if exists (for serverless persistence across warm lambdas)
  if (fs.existsSync(TMP_DB_PATH)) {
    try {
      const raw = fs.readFileSync(TMP_DB_PATH, 'utf8');
      const data = JSON.parse(raw);
      inMemoryDB = normalizeDB(data);
      return inMemoryDB;
    } catch {}
  }

  // 3. Try reading from project repo src/data/db.json
  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      const data = JSON.parse(raw);
      inMemoryDB = normalizeDB(data);
      return inMemoryDB;
    } catch (error) {
      console.error('Error parsing db.json:', error);
    }
  }

  // 4. Default fallback
  inMemoryDB = getInitialDB();
  return inMemoryDB;
}

function normalizeDB(data: any): DBData {
  if (!data.staff || data.staff.length === 0) data.staff = staffMembers;
  if (!data.documents) data.documents = downloadableDocs;
  if (!data.events) data.events = schoolEvents;
  if (!data.certificates) data.certificates = sampleCertificates;
  if (!data.admissions) data.admissions = [];
  if (!data.surveys) data.surveys = [];
  if (!data.contacts) data.contacts = [];
  if (!data.announcements) data.announcements = [];
  if (!data.news) data.news = [];
  if (!data.adminUser) data.adminUser = defaultAdminUser;
  if (!data.visitorStats) data.visitorStats = defaultVisitorStats;
  return data as DBData;
}

export function writeDB(data: DBData): boolean {
  // Always update in-memory instance first
  inMemoryDB = normalizeDB(data);

  let success = false;

  // Try writing to primary DB_PATH (local filesystem)
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(inMemoryDB, null, 2), 'utf8');
    success = true;
  } catch (err) {
    // On Vercel / serverless, DB_PATH is read-only
  }

  // Also write to OS tmpdir for serverless persistence
  try {
    fs.writeFileSync(TMP_DB_PATH, JSON.stringify(inMemoryDB, null, 2), 'utf8');
    success = true;
  } catch (err) {
    // Memory cache still retains the state
  }

  return success || inMemoryDB !== null;
}
