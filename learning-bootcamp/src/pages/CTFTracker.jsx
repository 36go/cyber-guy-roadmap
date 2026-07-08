import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flag, Search, Filter, Plus, Star, Clock, Trophy,
  Award, Target, BarChart3, PieChart, Hash, X,
  CheckCircle, Circle, Edit2, Trash2, Save, BookOpen,
  Globe, Shield, Code, Lock, Zap, Users, TrendingUp,
  Medal, ArrowUp, Check, ChevronDown
} from 'lucide-react';
import {
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import { useToast } from '../components/common/Toast';

const categories = [
  { id: 'all', label: 'الكل', icon: Filter },
  { id: 'web', label: 'ويب', icon: Globe },
  { id: 'crypto', label: 'تشفير', icon: Lock },
  { id: 'forensics', label: 'تحليل', icon: Search },
  { id: 'binary', label: 'ثنائي', icon: Code },
  { id: 'misc', label: 'متنوع', icon: Zap },
];

const categoryColors = {
  web: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  crypto: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  forensics: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  binary: 'text-red-400 bg-red-500/10 border-red-500/30',
  misc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
};

const platforms = ['TryHackMe', 'PortSwigger', 'HackTheBox', 'CTFlearn', 'CryptoHack', 'Other'];

const statusConfig = {
  not_started: { label: 'لم يبدأ', color: 'text-muted-text bg-dark-border/30 border-dark-border/50', icon: Circle },
  in_progress: { label: 'قيد التنفيذ', color: 'text-warning bg-warning/10 border-warning/30', icon: Clock },
  solved: { label: 'تم الحل', color: 'text-success bg-success/10 border-success/30', icon: CheckCircle },
};

const PIECHART_COLORS = ['#00D9FF', '#7C3AED', '#10B981', '#F59E0B', '#EF4444'];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-dark-border bg-dark-card p-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-light-text">{value}</p>
        <p className="text-xs text-muted-text">{label}</p>
      </div>
    </motion.div>
  );
}

function ChallengeCard({ challenge, onEdit, onDelete, onSolve }) {
  const StatusIcon = statusConfig[challenge.status]?.icon || Circle;
  const statusInfo = statusConfig[challenge.status] || statusConfig.not_started;
  const catColor = categoryColors[challenge.category] || categoryColors.misc;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-xl border border-dark-border bg-dark-card p-5 card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-light-text font-bold">{challenge.name}</h3>
          <p className="text-xs text-muted-text mt-0.5">{challenge.platform}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${catColor}`}>
          {categories.find(c => c.id === challenge.category)?.label || challenge.category}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={12}
              className={i < challenge.difficulty ? 'text-amber-400 fill-amber-400' : 'text-dark-border'}
            />
          ))}
        </div>
        <span className="text-xs text-muted-text">{challenge.points} نقطة</span>
        {challenge.timeSpent > 0 && (
          <span className="text-xs text-muted-text flex items-center gap-1">
            <Clock size={10} />
            {challenge.timeSpent} سا
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusInfo.color}`}>
          <StatusIcon size={10} />
          {statusInfo.label}
        </span>
      </div>

      {challenge.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.map((tag, i) => (
            <Badge key={i} variant="default" size="sm">{tag}</Badge>
          ))}
        </div>
      )}

      {challenge.description && (
        <p className="text-xs text-muted-text mb-4 line-clamp-2">{challenge.description}</p>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-dark-border/30">
        {challenge.status !== 'solved' ? (
          <Button variant="primary" size="sm" icon={CheckCircle} onClick={() => onSolve(challenge)}>
            تسجيل الحل
          </Button>
        ) : (
          <Badge variant="success" size="sm">
            <Check size={10} className="ml-1" />
            تم الحل
          </Badge>
        )}
        <Button variant="ghost" size="sm" icon={Edit2} onClick={() => onEdit(challenge)}>
          تعديل
        </Button>
        <Button variant="ghost" size="sm" icon={Trash2} onClick={() => onDelete(challenge.id)}>
          حذف
        </Button>
      </div>
    </motion.div>
  );
}

function AddChallengeModal({ isOpen, onClose, onSave, editChallenge }) {
  const [form, setForm] = useState({
    name: '',
    platform: 'TryHackMe',
    category: 'web',
    difficulty: 1,
    points: 0,
    status: 'not_started',
    description: '',
    tags: '',
  });

  useEffect(() => {
    if (editChallenge) {
      setForm({
        name: editChallenge.name || '',
        platform: editChallenge.platform || 'TryHackMe',
        category: editChallenge.category || 'web',
        difficulty: editChallenge.difficulty || 1,
        points: editChallenge.points || 0,
        status: editChallenge.status || 'not_started',
        description: editChallenge.description || '',
        tags: editChallenge.tags?.join(', ') || '',
      });
    } else {
      setForm({ name: '', platform: 'TryHackMe', category: 'web', difficulty: 1, points: 0, status: 'not_started', description: '', tags: '' });
    }
  }, [editChallenge, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editChallenge ? 'تعديل التحدي' : 'إضافة تحدي جديد'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">الاسم</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="اسم التحدي"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-light-text font-medium mb-1.5">المنصة</label>
            <select
              value={form.platform}
              onChange={e => setForm({ ...form, platform: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-light-text font-medium mb-1.5">التصنيف</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            >
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-light-text font-medium mb-1.5">الصعوبة (1-5)</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, difficulty: n })}
                  className="p-1.5"
                >
                  <Star
                    size={18}
                    className={n <= form.difficulty ? 'text-amber-400 fill-amber-400' : 'text-dark-border'}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-light-text font-medium mb-1.5">النقاط</label>
            <input
              type="number"
              value={form.points}
              onChange={e => setForm({ ...form, points: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-light-text font-medium mb-1.5">الحالة</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            >
              <option value="not_started">لم يبدأ</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="solved">تم الحل</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">الوصف</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none"
            placeholder="وصف التحدي..."
          />
        </div>

        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">الوسوم (مفصولة بفواصل)</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="sql-injection, xss, rce"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="primary" size="md" icon={Save} type="submit">
            {editChallenge ? 'حفظ التعديلات' : 'إضافة التحدي'}
          </Button>
          <Button variant="outline" size="md" onClick={onClose}>إلغاء</Button>
        </div>
      </form>
    </Modal>
  );
}

function SolveModal({ isOpen, onClose, challenge, onSolve }) {
  const [form, setForm] = useState({ timeSpent: '', writeup: '', solvedDate: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (challenge) {
      setForm({ timeSpent: '', writeup: '', solvedDate: new Date().toISOString().split('T')[0] });
    }
  }, [challenge, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSolve(challenge.id, {
      timeSpent: parseInt(form.timeSpent) || 0,
      writeup: form.writeup,
      solvedDate: form.solvedDate,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`تسجيل حل: ${challenge?.name || ''}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">الوقت المستغرق (بالساعات)</label>
          <input
            type="number"
            value={form.timeSpent}
            onChange={e => setForm({ ...form, timeSpent: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="مثال: 3"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">تاريخ الحل</label>
          <input
            type="date"
            value={form.solvedDate}
            onChange={e => setForm({ ...form, solvedDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-light-text font-medium mb-1.5">الـ Writeup</label>
          <textarea
            value={form.writeup}
            onChange={e => setForm({ ...form, writeup: e.target.value })}
            rows={5}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none"
            placeholder="اكتب شرح طريقة الحل..."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="primary" size="md" icon={CheckCircle} type="submit">تأكيد الحل</Button>
          <Button variant="outline" size="md" onClick={onClose}>إلغاء</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function CTFTracker() {
  const { showToast } = useToast();
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editChallenge, setEditChallenge] = useState(null);
  const [solveChallenge, setSolveChallenge] = useState(null);

  const fetchChallenges = async () => {
    try {
      const res = await fetch('/api/ctf');
      const data = await res.json();
      setChallenges(data);
    } catch {
      setChallenges([]);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/ctf/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    } catch {
      setLeaderboard([]);
    }
  };

  useEffect(() => {
    Promise.all([fetchChallenges(), fetchLeaderboard()]).finally(() => setLoading(false));
  }, []);

  const filteredChallenges = useMemo(() => {
    let list = challenges;
    if (activeCategory !== 'all') {
      list = list.filter(c => c.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.platform?.toLowerCase().includes(q) ||
        c.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [challenges, activeCategory, searchQuery]);

  const stats = useMemo(() => {
    const totalPoints = challenges.reduce((sum, c) => sum + (c.status === 'solved' ? (c.points || 0) : 0), 0);
    const solved = challenges.filter(c => c.status === 'solved').length;
    const active = challenges.filter(c => c.status === 'in_progress').length;
    const topRank = leaderboard.find((_, i) => i === 0);
    return { totalPoints, solved, active, topRank: topRank?.points || 0 };
  }, [challenges, leaderboard]);

  const pieData = useMemo(() => {
    const counts = {};
    challenges.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: categories.find(c => c.id === name)?.label || name,
      value,
    }));
  }, [challenges]);

  const barData = useMemo(() => {
    const points = {};
    challenges.filter(c => c.status === 'solved').forEach(c => {
      points[c.platform] = (points[c.platform] || 0) + (c.points || 0);
    });
    return Object.entries(points).map(([name, value]) => ({ name, value }));
  }, [challenges]);

  const handleSave = async (formData) => {
    try {
      if (editChallenge) {
        await fetch(`/api/ctf/${editChallenge.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        showToast('تم تحديث التحدي', 'success');
      } else {
        await fetch('/api/ctf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        showToast('تم إضافة التحدي', 'success');
      }
      setShowAddModal(false);
      setEditChallenge(null);
      fetchChallenges();
    } catch {
      showToast('فشل في حفظ التحدي', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/ctf/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...challenges.find(c => c.id === id), deleted: true }) });
      showToast('تم حذف التحدي', 'success');
      fetchChallenges();
    } catch {
      showToast('فشل في حذف التحدي', 'error');
    }
  };

  const handleSolve = async (id, solveData) => {
    try {
      const challenge = challenges.find(c => c.id === id);
      await fetch(`/api/ctf/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...challenge, ...solveData, status: 'solved' }),
      });
      showToast('تم تسجيل الحل!', 'success');
      setSolveChallenge(null);
      fetchChallenges();
      fetchLeaderboard();
    } catch {
      showToast('فشل في تسجيل الحل', 'error');
    }
  };

  if (loading) return <Loading type="full" text="جارٍ تحميل تحديات CTF..." />;

  return (
    <div className="min-h-screen pb-20">
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Flag size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">تحديات CTF</h1>
              <p className="text-muted-text text-sm mt-1">تتبع تقدمك في مسابقات الأمن السيبراني</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Trophy} label="إجمالي النقاط" value={stats.totalPoints} color="bg-gradient-to-br from-amber-500 to-amber-700" />
          <StatCard icon={CheckCircle} label="التحديات المنجزة" value={stats.solved} color="bg-gradient-to-br from-emerald-500 to-emerald-700" />
          <StatCard icon={Clock} label="التحديات النشطة" value={stats.active} color="bg-gradient-to-br from-blue-500 to-blue-700" />
          <StatCard icon={TrendingUp} label="أقوى تصنيف" value={stats.topRank} color="bg-gradient-to-br from-purple-500 to-purple-700" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-accent/10 text-accent border border-accent/30 shadow-lg shadow-accent/10'
                      : 'text-muted-text border border-dark-border/50 hover:border-accent/20 hover:text-light-text bg-dark-card/50'
                  }`}
                >
                  <CatIcon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
          <Button variant="primary" size="md" icon={Plus} onClick={() => { setEditChallenge(null); setShowAddModal(true); }}>
            إضافة تحدي
          </Button>
        </div>

        <div className="relative mb-6">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-12 py-3 rounded-xl bg-dark-card border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="ابحث عن تحدي..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-muted-text hover:text-light-text"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onEdit={(c) => { setEditChallenge(c); setShowAddModal(true); }}
                onDelete={handleDelete}
                onSolve={(c) => setSolveChallenge(c)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredChallenges.length === 0 && (
          <div className="text-center py-20">
            <Flag size={48} className="text-muted-text mx-auto mb-4 opacity-50" />
            <p className="text-muted-text">لا توجد تحديات</p>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center gap-3">
            <Trophy className="text-warning" size={24} />
            لوحة المتصدرين
          </h2>
          <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-right px-5 py-3 text-xs text-muted-text font-medium">الرتبة</th>
                    <th className="text-right px-5 py-3 text-xs text-muted-text font-medium">الاسم</th>
                    <th className="text-right px-5 py-3 text-xs text-muted-text font-medium">النقاط</th>
                    <th className="text-right px-5 py-3 text-xs text-muted-text font-medium">التحديات المنجزة</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, i) => {
                    const isTop3 = i < 3;
                    const trophyIcons = [<Trophy key="1" size={16} className="text-amber-400" />, <Medal key="2" size={16} className="text-gray-300" />, <Medal key="3" size={16} className="text-amber-700" />];
                    return (
                      <tr key={entry.id || i} className={`border-b border-dark-border/50 hover:bg-dark-border/20 transition-colors ${i === 0 ? 'bg-amber-500/5' : ''}`}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {isTop3 && trophyIcons[i]}
                            <span className={`text-sm font-bold ${isTop3 ? 'text-light-text' : 'text-muted-text'}`}>
                              {i + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-light-text font-medium">{entry.name || entry.username}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-accent font-bold">{entry.points}</span>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant="success" size="sm">{entry.solvedChallenges || entry.solved}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {leaderboard.length === 0 && (
              <div className="text-center py-12">
                <Users size={36} className="text-muted-text mx-auto mb-3 opacity-50" />
                <p className="text-muted-text text-sm">لا يوجد متصدرين بعد</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-light-text mb-6 flex items-center gap-3">
            <BarChart3 className="text-accent" size={24} />
            إحصائيات CTF
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-dark-border bg-dark-card p-6">
              <h3 className="text-sm font-bold text-light-text mb-4 flex items-center gap-2">
                <PieChart size={16} className="text-accent" />
                التحديات حسب التصنيف
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIECHART_COLORS[i % PIECHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        color: '#F1F5F9',
                        fontSize: '13px',
                      }}
                    />
                    <Legend
                      formatter={(value) => <span style={{ color: '#94A3B8', fontSize: '12px' }}>{value}</span>}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] flex items-center justify-center">
                  <p className="text-muted-text text-sm">لا توجد بيانات</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-dark-border bg-dark-card p-6">
              <h3 className="text-sm font-bold text-light-text mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-accent" />
                النقاط حسب المنصة
              </h3>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
                    <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
                    <Tooltip
                      contentStyle={{
                        background: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        color: '#F1F5F9',
                        fontSize: '13px',
                      }}
                    />
                    <Bar dataKey="value" fill="#00D9FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] flex items-center justify-center">
                  <p className="text-muted-text text-sm">لا توجد بيانات</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <AddChallengeModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditChallenge(null); }}
        onSave={handleSave}
        editChallenge={editChallenge}
      />

      <SolveModal
        isOpen={!!solveChallenge}
        onClose={() => setSolveChallenge(null)}
        challenge={solveChallenge}
        onSolve={handleSolve}
      />
    </div>
  );
}
