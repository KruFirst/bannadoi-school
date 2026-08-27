export type NewsCategory = 'general' | 'academic' | 'activity' | 'ita';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  categoryLabel: string;
  date: string;
  author: string;
  views: number;
  imageUrl: string;
  isPinned?: boolean;
  attachments?: {
    name: string;
    size: string;
    url: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  link?: string;
  isImportant?: boolean;
  date: string;
}

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  academicDegree: string;
  major?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  isExecutive?: boolean;
}

export interface SchoolBoardMember {
  id: string;
  name: string;
  position: string;
  roleDescription: string;
}

export interface ClassroomTeacher {
  grade: string;
  male: number;
  female: number;
  total: number;
  teacher: string;
}

export interface ITADocument {
  code: string; // e.g. O1, O2, O3
  title: string;
  category: string;
  description: string;
  items: {
    title: string;
    url: string;
    fileType?: string;
  }[];
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'xlsx';
  downloads: number;
  updateDate: string;
  url: string;
}

export interface QuickLinkItem {
  title: string;
  description: string;
  url: string;
  iconName: string;
  isExternal: boolean;
}
