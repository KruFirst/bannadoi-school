'use client';

import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  PinOff, 
  Search, 
  ExternalLink,
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import ImageUploadField from '@/components/ImageUploadField';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  date: string;
  author: string;
  views: number;
  imageUrl: string;
  isPinned: boolean;
}

const categories = [
  { key: 'academic', label: 'ข่าววิชาการ' },
  { key: 'activity', label: 'ข่าวกิจกรรม' },
  { key: 'general', label: 'ประชาสัมพันธ์ทั่วไป' },
  { key: 'ita', label: 'จัดซื้อจัดจ้าง/ITA' },
];

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    categoryLabel: 'ประชาสัมพันธ์ทั่วไป',
    author: 'งานประชาสัมพันธ์ โรงเรียนบ้านนาดอย',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    isPinned: false,
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (article?: NewsArticle) => {
    if (article) {
      setEditingId(article.id);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        categoryLabel: article.categoryLabel,
        author: article.author,
        imageUrl: article.imageUrl,
        isPinned: article.isPinned,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'general',
        categoryLabel: 'ประชาสัมพันธ์ทั่วไป',
        author: 'งานประชาสัมพันธ์ โรงเรียนบ้านนาดอย',
        imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        isPinned: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCategoryChange = (key: string) => {
    const cat = categories.find((c) => c.key === key);
    setFormData({
      ...formData,
      category: key,
      categoryLabel: cat ? cat.label : 'ประชาสัมพันธ์ทั่วไป',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Edit existing
        const res = await fetch(`/api/news/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchNews();
        }
      } else {
        // Create new
        const res = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          fetchNews();
        }
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`คุณต้องการลบข่าว "${title}" ใช่หรือไม่?`)) {
      try {
        const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchNews();
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการลบ');
      }
    }
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-school-green-700" />
            <span>จัดการข่าวสารและกิจกรรม</span>
          </h1>
          <p className="text-xs text-slate-500">
            สร้าง แก้ไข ปักหมุด และเผยแพร่ข่าวสารประชาสัมพันธ์ของโรงเรียนบ้านนาดอย
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เขียนข่าวใหม่</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="ค้นหาหัวข้อข่าว..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">กำลังโหลดข่าวสาร...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">ไม่พบรายการข่าวสาร</div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-20 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {article.categoryLabel}
                    </span>
                    {article.isPinned && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-school-purple-100 text-school-purple-800 font-bold flex items-center gap-0.5">
                        <Pin className="w-2.5 h-2.5" />
                        ปักหมุด
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">{article.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm truncate">{article.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{article.excerpt}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href={`/news/${article.id}`}
                  target="_blank"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="ดูหน้าเว็บจริง"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleOpenModal(article)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>แก้ไข</span>
                </button>

                <button
                  onClick={() => handleDelete(article.id, article.title)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  title="ลบข่าว"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-800">
                {editingId ? 'แก้ไขข่าวประชาสัมพันธ์' : 'เขียนข่าวประชาสัมพันธ์ใหม่'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">หัวข้อข่าวสาร *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น นักเรียนโรงเรียนบ้านนาดอยได้รับรางวัล..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 focus:bg-white outline-none"
                />
              </div>

              {/* Category & Pin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">หมวดหมู่ข่าว</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-school-purple-600 focus:ring-school-purple-500"
                  />
                  <label htmlFor="isPinned" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    ปักหมุดข่าวนี้ไว้บนสุด (Featured)
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">คำโปรย / สรุปย่อ</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="สรุปเนื้อหาข่าว 1-2 ประโยคสำหรับแสดงบนการ์ดหน้าแรก..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 focus:bg-white outline-none"
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">เนื้อหาข่าวฉบับเต็ม *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="พิมพ์รายละเอียดเนื้อหาข่าวที่นี่..."
                  className="w-full px-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-green-600 focus:bg-white outline-none"
                />
              </div>

              {/* Image Upload / URL */}
              <ImageUploadField
                label="รูปภาพประกอบข่าว"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-school-green-700 hover:bg-school-green-600 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  {editingId ? 'บันทึกการแก้ไข' : 'เผยแพร่ข่าวสาร'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
