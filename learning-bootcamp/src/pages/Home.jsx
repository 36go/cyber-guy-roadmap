import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Award, BookOpen, Code, FlaskConical, GraduationCap, Database, Target, TrendingUp, Layers, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const sectionSpacing = 'py-16 md:py-24';

const quickStartCards = [
  { title: 'ابدأ من هنا', description: 'خارطة الطريق الكاملة لمدة 30 يوماً', icon: BookOpen, to: '/roadmap', color: 'from-accent to-secondary' },
  { title: 'المختبرات التفاعلية', description: 'جرب الكود مباشرة في المتصفح', icon: FlaskConical, to: '/labs', color: 'from-emerald-500 to-teal-600' },
  { title: 'مختبر قواعد البيانات', description: 'SQLite, PostgreSQL, CRUD, Joins', icon: Database, to: '/database-lab', color: 'from-blue-600 to-indigo-700' },
  { title: 'الاختبارات', description: 'اختبر معلوماتك بالمستويات الثلاثة', icon: GraduationCap, to: '/quizzes', color: 'from-purple-600 to-pink-600' },
  { title: 'المشاريع التطبيقية', description: 'ابنِ مشاريع حقيقية تبني ملف أعمالك', icon: Code, to: '/projects', color: 'from-amber-500 to-orange-600' },
  { title: 'الجدول اليومي', description: 'خطة يومية منظمة لمدة 30 يوماً', icon: Clock, to: '/schedule', color: 'from-rose-500 to-red-600' },
];

const learningTracks = [
  {
    title: 'تطوير الواجهات (Frontend)',
    description: 'HTML, CSS, JavaScript, React, TypeScript, وبناء واجهات تفاعلية حديثة',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    to: '/paths/frontend',
    icon: Code,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  {
    title: 'تطوير الخلفي (Backend)',
    description: 'Node.js, Express, APIs, قواعد البيانات, SQL, MongoDB, والمصادقة',
    skills: ['Node.js', 'SQL', 'MongoDB', 'Express'],
    to: '/paths/backend',
    icon: Database,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  {
    title: 'الأمن السيبراني',
    description: 'OWASP Top 10, اختبار الاختراق, XSS, SQLi, وأمن التطبيقات',
    skills: ['OWASP', 'Pen Testing', 'XSS', 'SQLi'],
    to: '/paths/security',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  {
    title: 'بايثون (Python)',
    description: 'أساسيات Python, أتمتة, تحليل بيانات, باك اند, وأمن',
    skills: ['Python', 'Automation', 'Data', 'Security'],
    to: '/paths/python',
    icon: FileCode,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
];

function Shield({ size, className }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}

function FileCode({ size, className }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}

export default function Home() {
  const { progress, completionPercentage } = useApp();
  const percent = completionPercentage();

  return (
    <main>
      {/* Hero Section - Learning Focused */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-dark-bg pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-primary/40" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 217, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm mb-6">
              <GraduationCap size={16} />
              <span>منصة تعلم تفاعلية - 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gradient">أتقن البرمجة</span>
              <br />
              <span className="text-gradient">بالممارسة والتطبيق</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-text mb-10 font-light">
              من الصفر إلى مطور ويب متكامل في 30 يوماً - مختبرات تفاعلية، اختبارات، مشاريع حقيقية
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-dark-border/50"
              >
                <Target size={20} className="text-accent shrink-0" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-light-text">30</span>
                  <span className="text-sm text-muted-text">يوماً</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.55, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-dark-border/50"
              >
                <Layers size={20} className="text-accent shrink-0" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-light-text">4</span>
                  <span className="text-sm text-muted-text">مسارات</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-dark-border/50"
              >
                <FlaskConical size={20} className="text-accent shrink-0" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-light-text">6</span>
                  <span className="text-sm text-muted-text">مختبرات</span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-dark-bg font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105"
              >
                ابدأ رحلتك الآن
                <ArrowLeft size={22} />
              </Link>
              <Link
                to="/labs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-accent/30 text-accent font-bold text-lg hover:bg-accent/10 transition-all duration-300"
              >
                جرب المختبرات
                <FlaskConical size={22} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            مسارات <span className="text-gradient">التعلم</span>
          </h2>
          <p className="text-muted-text text-lg">اختر مسارك وابدأ رحلة التعلم</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningTracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={track.to} className="block h-full">
                  <div className={`h-full p-6 rounded-2xl ${track.bg} border ${track.border} card-hover group`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${track.bg} border ${track.border} flex items-center justify-center`}>
                        <Icon size={24} className={track.color} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-light-text group-hover:text-accent transition-colors">{track.title}</h3>
                        <p className="text-sm text-muted-text mt-1">{track.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg bg-dark-bg/50 border border-dark-border/30 text-xs text-muted-text">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Start Cards */}
      <section className={`max-w-6xl mx-auto px-4 ${sectionSpacing}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ابدأ <span className="text-gradient">التعلم</span>
          </h2>
          <p className="text-muted-text text-lg">كل ما تحتاجه في مكان واحد</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={card.to} className="block h-full">
                  <div className="h-full p-6 rounded-2xl bg-dark-card border border-dark-border card-hover group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-light-text group-hover:text-accent transition-colors mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-text">{card.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Progress Overview */}
      {percent > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 to-secondary/5 p-8 md:p-12"
          >
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#1E293B" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="url(#homeGrad)" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(percent / 100) * 314.16} 314.16`}
                    className="transition-all duration-700"
                  />
                  <defs>
                    <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D9FF" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-light-text">{percent}%</span>
                </div>
              </div>
              <div className="text-center md:text-right flex-1">
                <h3 className="text-2xl font-bold text-light-text mb-2">واصل التقدم!</h3>
                <p className="text-muted-text">
                  أكملت {progress.completedDays.length} يوم من 30 يوماً
                  {progress.completedProjects.length > 0 && `، ${progress.completedProjects.length} مشاريع`}
                  {progress.completedCertifications.length > 0 && `، ${progress.completedCertifications.length} شهادات`}
                </p>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-dark-bg font-bold text-sm hover:bg-accent/90 transition-all shrink-0"
              >
                عرض التفاصيل
                <ArrowLeft size={18} />
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </main>
  );
}
