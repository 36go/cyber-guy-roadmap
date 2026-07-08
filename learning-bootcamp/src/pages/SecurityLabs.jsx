import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Globe, Bug, Search, Lock, KeyRound, Radio, Cloud,
  Smartphone, Binary, FileCheck, ArrowLeft, ShieldCheck, Target,
  Eye, Activity, AlertTriangle, CheckCircle, BookOpen,
  ListChecks, SlidersHorizontal, Filter, Zap,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { securityCategories, totalLabsCount } from '../data/securityLabsData';

const iconMap = {
  Shield, Globe, Bug, Search, Lock, KeyRound, Radio,
  Cloud, Smartphone, Binary, FileCheck,
};

const difficultyConfig = {
  مبتديء: { variant: 'success', label: 'مبتديء' },
  متوسط: { variant: 'warning', label: 'متوسط' },
  متقدم: { variant: 'danger', label: 'متقدم' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export default function SecurityLabs() {
  const { theme } = useApp();
  const [filterDifficulty, setFilterDifficulty] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  const completedLabs = 7;
  const overallProgress = Math.round((completedLabs / totalLabsCount) * 100);

  const filteredCategories = useMemo(() => {
    let result = [...securityCategories];
    if (filterDifficulty) {
      result = result.filter((c) => c.difficulty === filterDifficulty);
    }
    if (sortBy === 'labs-asc') {
      result.sort((a, b) => a.labs.length - b.labs.length);
    } else if (sortBy === 'labs-desc') {
      result.sort((a, b) => b.labs.length - a.labs.length);
    } else if (sortBy === 'difficulty') {
      const order = { مبتديء: 1, متوسط: 2, متقدم: 3 };
      result.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
    }
    return result;
  }, [filterDifficulty, sortBy]);

  return (
    <div className="min-h-screen pb-24" dir="rtl">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-text hover:text-accent text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              العودة للرئيسية
            </Link>

            <div className="flex items-center gap-5 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary p-[2px] shrink-0">
                <div className="w-full h-full rounded-2xl bg-dark-bg flex items-center justify-center">
                  <ShieldCheck size={32} className="text-accent" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-l from-accent via-secondary to-accent bg-clip-text text-transparent">
                    الأمن السيبراني والدفاع الرقمي
                  </span>
                </h1>
                <p className="text-muted-text text-sm mt-1.5">
                  مختبرات تفاعلية في الأمن السيبراني — من أمن الشبكات إلى تحليل البرمجيات الخبيثة
                </p>
              </div>
            </div>

            <p className="text-muted-text leading-relaxed max-w-4xl text-sm/relaxed">
              اكتسب المهارات العملية في مجال الأمن السيبراني من خلال مختبرات تفاعلية
              تحاكي سيناريوهات حقيقية. كل قسم يحتوي على مجموعة من التمارين والتحديات
              المصممة لتطوير قدراتك في الدفاع الرقمي واختبار الاختراق الأخلاقي.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass rounded-2xl border border-dark-border p-5 md:p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent font-mono">{totalLabsCount}</div>
              <div className="text-xs text-muted-text mt-1">إجمالي المختبرات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary font-mono">{completedLabs}</div>
              <div className="text-xs text-muted-text mt-1">مختبرات مكتملة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 font-mono">
                {securityCategories.length}
              </div>
              <div className="text-xs text-muted-text mt-1">تصنيفات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-400 font-mono">{overallProgress}%</div>
              <div className="text-xs text-muted-text mt-1">التقدم العام</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-text mb-1.5">
              <span>التقدم العام</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-dark-bg border border-dark-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-l from-accent to-secondary"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Dashboard Link + Filters ── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-text">
              <Filter size={14} />
              <span>تصفية:</span>
            </div>
            {['الكل', 'مبتديء', 'متوسط', 'متقدم'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterDifficulty(level === 'الكل' ? null : level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  (level === 'الكل' && !filterDifficulty) || filterDifficulty === level
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-dark-card border border-dark-border text-muted-text hover:border-accent/20 hover:text-light-text'
                }`}
              >
                {level}
              </button>
            ))}

            <div className="w-px h-6 bg-dark-border mx-1 hidden md:block" />

            <div className="flex items-center gap-2 text-sm text-muted-text">
              <SlidersHorizontal size={14} />
              <span>ترتيب:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-card border border-dark-border rounded-lg px-3 py-1.5 text-xs text-light-text focus:outline-none focus:border-accent/30 cursor-pointer appearance-none"
            >
              <option value="default">افتراضي</option>
              <option value="labs-asc">المختبرات (الأقل أولاً)</option>
              <option value="labs-desc">المختبرات (الأكثر أولاً)</option>
              <option value="difficulty">الصعوبة</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Activity}
            href="/security-dashboard"
          >
            لوحة المراقبة
          </Button>
        </div>
      </section>

      {/* ── Category Cards Grid ── */}
      <section className="max-w-6xl mx-auto px-4">
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search size={48} className="text-muted-text mx-auto mb-4 opacity-50" />
            <p className="text-muted-text text-lg">لا توجد تصنيفات تطابق الفلتر المحدد</p>
            <button
              onClick={() => { setFilterDifficulty(null); setSortBy('default'); }}
              className="text-accent text-sm mt-2 hover:underline"
            >
              إعادة تعيين الفلتر
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCategories.map((category, i) => {
              const IconComponent = iconMap[category.icon] || Shield;
              const diff = difficultyConfig[category.difficulty] || difficultyConfig['متوسط'];

              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link to={`/security-labs/${category.id}`} className="block h-full group">
                    <Card className="h-full relative overflow-hidden" hover>
                      {/* Gradient accent stripe */}
                      <div
                        className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${category.color} rounded-r-lg`}
                      />

                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-[2px] shrink-0 shadow-lg`}
                        >
                          <div className="w-full h-full rounded-[10px] bg-dark-card flex items-center justify-center">
                            <IconComponent size={22} className="text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-light-text truncate">
                            {category.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={diff.variant} size="sm">
                              <span className="flex items-center gap-1">
                                <Zap size={10} />
                                {diff.label}
                              </span>
                            </Badge>
                            <Badge variant="default" size="sm">
                              <span className="flex items-center gap-1">
                                <BookOpen size={10} />
                                {category.labs.length} مختبر
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-text leading-relaxed mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Labs preview */}
                      <div className="space-y-1.5 mb-3">
                        {category.labs.slice(0, 3).map((lab, j) => (
                          <div
                            key={lab.id}
                            className="flex items-center gap-2 text-xs text-muted-text group-hover:text-light-text/80 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                            <span className="truncate">{lab.title}</span>
                            <span className="text-[10px] text-muted-text/60 mr-auto shrink-0" dir="ltr">
                              {lab.duration}
                            </span>
                          </div>
                        ))}
                        {category.labs.length > 3 && (
                          <div className="text-[11px] text-accent/80 mr-3.5">
                            + {category.labs.length - 3} مختبرات أخرى
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="mt-2 pt-3 border-t border-dark-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-accent group-hover:underline underline-offset-2 transition-all font-medium">
                            استعرض المختبرات
                          </span>
                          <ArrowLeft
                            size={14}
                            className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl border border-dark-border p-6 md:p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target size={24} className="text-accent" />
            <h2 className="text-xl md:text-2xl font-bold text-light-text">
              جاهز لبدء التحدي؟
            </h2>
          </div>
          <p className="text-muted-text text-sm max-w-2xl mx-auto mb-6">
            اختر أحد التصنيفات أعلاه وابدأ رحلتك في عالم الأمن السيبراني.
            كل مختبر يقدم تجربة عملية مع خطوات واضحة وتقييم فوري.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="md" icon={Shield} href="/security-dashboard">
              لوحة المراقبة الأمنية
            </Button>
            <Button variant="outline" size="md" icon={ListChecks} href="/ctf-tracker">
              متتبع CTF
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
