import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, CheckCircle, Target, Trophy, BookOpen,
  Code, FlaskConical, GraduationCap, Database, TrendingUp,
  Flame, Layers, Zap, Activity, Star, ArrowLeft
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useApp } from '../context/AppContext';
import scheduleData from '../data/scheduleData';
import roadmapData from '../data/roadmapData';

const weekLabels = ['الأسبوع ١', 'الأسبوع ٢', 'الأسبوع ٣', 'الأسبوع ٤'];

function StatCard({ icon, label, value, subtitle, color, delay }) {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center`}>
            <Icon size={20} className={color.text} />
          </div>
        </div>
        <p className="text-2xl md:text-3xl font-bold tabular-nums text-light-text">{value}</p>
        <p className="text-muted-text text-xs mt-1">{label}</p>
        {subtitle && <p className="text-muted-text text-xs">{subtitle}</p>}
      </Card>
    </motion.div>
  );
}

function WeeklyProgress({ weeklyCompletion }) {
  return (
    <Card title="التقدم الأسبوعي" icon={Layers}>
      <div className="space-y-4 mt-4">
        {weeklyCompletion.map((w, i) => (
          <div key={w.week}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-light-text font-medium">{weekLabels[i]}</span>
              <span className="text-xs text-muted-text font-medium">{w.done}/{w.total} يوم</span>
            </div>
            <div className="h-2.5 rounded-full bg-dark-border overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #00D9FF, #7C3AED)`,
                  opacity: 0.4 + (w.percent / 100) * 0.6,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${w.percent}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LearningStats({ progress }) {
  const stats = [
    { icon: Calendar, label: 'الأيام المكتملة', value: progress.completedDays.length, color: { bg: 'bg-accent/10', text: 'text-accent' } },
    { icon: CheckCircle, label: 'المهام المنجزة', value: progress.completedTasks.length, color: { bg: 'bg-success/10', text: 'text-success' } },
    { icon: Code, label: 'المشاريع المكتملة', value: progress.completedProjects.length, color: { bg: 'bg-secondary/10', text: 'text-secondary' } },
    { icon: Trophy, label: 'الشهادات', value: progress.completedCertifications.length, color: { bg: 'bg-warning/10', text: 'text-warning' } },
    { icon: Flame, label: 'أيام الاستمرار', value: progress.streak, color: { bg: 'bg-danger/10', text: 'text-danger' } },
    { icon: BookOpen, label: 'الملاحظات', value: Object.keys(progress.notes).length, color: { bg: 'bg-primary-light/10', text: 'text-primary-light' } },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={0.1 + i * 0.05} />
      ))}
    </div>
  );
}

function ResourceProgress({ progress }) {
  const bookmarkedCount = progress.bookmarkedResources.length;
  const allResources = 100;

  return (
    <Card title="الموارد التعليمية" icon={BookOpen}>
      <div className="space-y-3 mt-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
          <span className="text-sm text-muted-text">الموارد المحفوظة</span>
          <span className="text-sm font-bold text-light-text font-mono">{bookmarkedCount}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
          <span className="text-sm text-muted-text">إجمالي الموارد</span>
          <span className="text-sm font-bold text-light-text font-mono">{allResources}+</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
          <span className="text-sm text-muted-text">المختبرات التفاعلية</span>
          <span className="text-sm font-bold text-light-text font-mono">6</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
          <span className="text-sm text-muted-text">الاختبارات</span>
          <span className="text-sm font-bold text-light-text font-mono">12</span>
        </div>
      </div>
    </Card>
  );
}

function QuickLinks() {
  const links = [
    { label: 'المختبرات التفاعلية', to: '/labs', icon: FlaskConical, color: 'from-emerald-600 to-emerald-800' },
    { label: 'مختبر قواعد البيانات', to: '/database-lab', icon: Database, color: 'from-blue-600 to-blue-800' },
    { label: 'الاختبارات', to: '/quizzes', icon: GraduationCap, color: 'from-purple-600 to-purple-800' },
    { label: 'المشاريع', to: '/projects', icon: Code, color: 'from-amber-600 to-amber-800' },
  ];

  return (
    <div className="space-y-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link key={link.to} to={link.to}>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-card border border-dark-border hover:border-accent/30 transition-all group cursor-pointer">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-light-text group-hover:text-accent transition-colors">{link.label}</p>
              </div>
              <ArrowLeft size={14} className="text-muted-text group-hover:text-accent" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function SkillsOverview() {
  const skills = [
    { name: 'JavaScript / TypeScript', level: 0 },
    { name: 'React / Frontend', level: 0 },
    { name: 'Node.js / Backend', level: 0 },
    { name: 'SQL / Databases', level: 0 },
    { name: 'Cybersecurity', level: 0 },
    { name: 'Python', level: 0 },
  ];

  return (
    <Card title="مستوى المهارات" icon={Target}>
      <div className="text-center py-6">
        <TrendingUp size={40} className="text-muted-text/30 mx-auto mb-3" />
        <p className="text-sm text-muted-text">ابدأ التعلم لتتبع تقدم مهاراتك</p>
        <p className="text-xs text-muted-text mt-1">كلما أكملت المزيد من الدروس، سترتفع مستوياتك</p>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { progress, completionPercentage } = useApp();
  const percent = completionPercentage();

  const { days } = scheduleData;
  const completedDays = progress.completedDays;

  const weeklyCompletion = useMemo(() => {
    return [1, 2, 3, 4].map((w) => {
      const weekDays = days.filter((d) => d.week === w);
      const done = weekDays.filter((d) => completedDays.includes(d.day)).length;
      return { week: w, total: weekDays.length, done, percent: Math.round((done / weekDays.length) * 100) };
    });
  }, [days, completedDays]);

  return (
    <div className="min-h-screen pb-20">
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">لوحة التقدم</h1>
              <p className="text-muted-text text-sm">تابع رحلة التعلم الخاصة بك</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-card border border-dark-border">
                <Calendar size={18} className="text-accent" />
                <span className="text-sm text-muted-text">
                  {completedDays.length}/30 يوم
                </span>
              </div>
              <div className="w-24 h-2.5 rounded-full bg-dark-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-accent"
                />
              </div>
              <span className="text-sm font-bold text-accent font-mono">{percent}%</span>
            </div>
          </div>

          <LearningStats progress={progress} />
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <WeeklyProgress weeklyCompletion={weeklyCompletion} />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <QuickLinks />
            <ResourceProgress progress={progress} />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SkillsOverview />
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card title="إنجازات سريعة" icon={Zap}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{completedDays.length}</p>
                <p className="text-xs text-muted-text">أيام مكتملة</p>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{progress.completedTasks.length}</p>
                <p className="text-xs text-muted-text">مهام منجزة</p>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{progress.completedProjects.length}</p>
                <p className="text-xs text-muted-text">مشاريع مكتملة</p>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{progress.completedCertifications.length}</p>
                <p className="text-xs text-muted-text">شهادات</p>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{Object.keys(progress.notes).length}</p>
                <p className="text-xs text-muted-text">ملاحظات</p>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-light-text font-mono">{progress.bookmarkedResources.length}</p>
                <p className="text-xs text-muted-text">موارد محفوظة</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
