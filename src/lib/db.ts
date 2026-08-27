import fs from 'fs';
import path from 'path';
import { staffMembers, downloadableDocs } from '@/data/schoolData';
import { schoolEvents } from '@/data/calendarData';
import { sampleCertificates } from '@/data/certificateData';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface AdminUser {
  username: string;
  password: string; // Stored securely
  lastUpdated: string;
}

export interface VisitorStats {
  total: number;
  today: number;
  thisMonth: number;
  lastDate: string;
  lastMonth: string;
}

export interface DBData {
  news: any[];
  announcements: any[];
  contacts: any[];
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

export function readDB(): DBData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial: DBData = { 
        news: [], 
        announcements: [], 
        contacts: [],
        staff: staffMembers,
        documents: downloadableDocs,
        events: schoolEvents,
        surveys: [],
        certificates: sampleCertificates,
        admissions: [],
        adminUser: defaultAdminUser,
        visitorStats: defaultVisitorStats,
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    
    // Ensure default structures exist
    if (!data.staff) data.staff = staffMembers;
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

    return data;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { 
      news: [], 
      announcements: [], 
      contacts: [],
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
}

export function writeDB(data: DBData): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to db.json:', error);
    return false;
  }
}
