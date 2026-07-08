import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FlaskConical, Code, FileCode, Database, Monitor, Terminal,
  ExternalLink, ArrowLeft, Search, Clock, Star,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const labsData = [
  {
    id: 'html-css',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    title: 'HTML/CSS Sandbox',
    description: 'اختبر أكواد HTML و CSS مباشرة في المتصفح مع معاينة حية',
    features: ['محرر HTML', 'محرر CSS', 'معاينة حية', 'تصدير الكود'],
    topics: ['HTML', 'CSS', 'Responsive', 'Flexbox', 'Grid'],
    difficulty: 'مبتديء',
    estimatedTime: 'مستمر',
  },
  {
    id: 'javascript',
    icon: FileCode,
    color: 'from-yellow-500 to-amber-600',
    title: 'JavaScript Playground',
    description: 'بيئة تفاعلية لتجربة أكواد JavaScript مع مخرجات فورية',
    features: ['محرر JS', 'Console', 'مخرجات فورية', 'مكتبات'],
    topics: ['JavaScript', 'ES6+', 'DOM', 'Promises', 'Async'],
    difficulty: 'مبتديء',
    estimatedTime: 'مستمر',
  },
  {
    id: 'typescript',
    icon: Terminal,
    color: 'from-blue-500 to-indigo-600',
    title: 'TypeScript Playground',
    description: 'بيئة تفاعلية لتجربة TypeScript مع تحويل فوري لـ JavaScript',
    features: ['محرر TS', 'تحويل لـ JS', 'فحص الأنواع', 'مخرجات فورية'],
    topics: ['TypeScript', 'Types', 'Interfaces', 'Generics', 'Classes'],
    difficulty: 'متوسط',
    estimatedTime: 'مستمر',
  },
  {
    id: 'python',
    icon: Terminal,
    color: 'from-blue-600 to-cyan-600',
    title: 'Python Playground',
    description: 'بيئة تفاعلية لتجربة Python مع تنفيذ فوري للكود',
    features: ['محرر Python', 'تنفيذ فوري', 'مخرجات', 'مكتبات'],
    topics: ['Python', 'Functions', 'Classes', 'Data Structures', 'Algorithms'],
    difficulty: 'مبتديء',
    estimatedTime: 'مستمر',
  },
  {
    id: 'sql',
    icon: Database,
    color: 'from-sky-500 to-blue-700',
    title: 'SQL Playground',
    description: 'بيئة تفاعلية لتجربة استعلامات SQL مع جداول تجريبية',
    features: ['محرر SQL', 'جداول تجريبية', 'نتائج فورية', 'تحليل الاستعلامات'],
    topics: ['SQL', 'SELECT', 'JOIN', 'GROUP BY', 'Indexes'],
    difficulty: 'متوسط',
    estimatedTime: 'مستمر',
  },
  {
    id: 'api',
    icon: Monitor,
    color: 'from-green-500 to-emerald-700',
    title: 'Web API Tester',
    description: 'اختبر REST APIs وحلل الاستجابات مع واجهة تفاعلية',
    features: ['HTTP Methods', 'Headers', 'Body', 'Response Viewer'],
    topics: ['REST', 'APIs', 'JSON', 'HTTP', 'Authentication'],
    difficulty: 'متوسط',
    estimatedTime: 'مستمر',
  },
];

export default function Labs() {
  const { theme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLabs = useMemo(() => {
    if (!searchQuery.trim()) return labsData;
    const q = searchQuery.toLowerCase();
    return labsData.filter(
      (lab) =>
        lab.title.toLowerCase().includes(q) ||
        lab.topics.some((t) => t.toLowerCase().includes(q)) ||
        lab.description.includes(q) ||
        lab.difficulty.includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-12">
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

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <FlaskConical size={28} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-l from-accent via-secondary to-accent bg-clip-text text-transparent">
                  المختبرات التفاعلية
                </span>
              </h1>
              <p className="text-muted-text text-sm mt-1">
                بيئات تفاعلية لتجربة وتطبيق ما تتعلمه مباشرة في المتصفح
              </p>
            </div>
          </div>

          <p className="text-muted-text leading-relaxed max-w-3xl">
            المختبرات التفاعلية توفر لك بيئة آمنة ومتكاملة لتجربة الأكواد
            واختبار المفاهيم البرمجية بدون الحاجة لإعداد بيئة تطوير محلية.
            كل مختبر يدعم مجموعة من الأدوات والمكتبات لتساعدك على التعلم بالتطبيق العملي.
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="relative max-w-md">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المختبرات..."
            className="w-full pr-12 pl-4 py-3 rounded-xl bg-dark-card border border-dark-border text-light-text text-sm placeholder:text-muted-text focus:outline-none focus:border-accent/30 transition-colors"
          />
        </div>
      </section>

      {/* Labs Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab, i) => {
            const IconComponent = lab.icon;
            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link to={`/labs/${lab.id}`} className="block h-full">
                  <Card className="h-full group" hover>
                    {/* Icon with gradient */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lab.color} p-0.5 flex items-center justify-center shadow-lg`}
                      >
                        <div className="w-full h-full rounded-[10px] bg-dark-card flex items-center justify-center">
                          <IconComponent size={22} className="text-white" />
                        </div>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-muted-text opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-light-text mb-2">{lab.title}</h3>

                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="warning" size="sm">
                        <span className="flex items-center gap-1">
                          <Star size={10} />
                          {lab.difficulty}
                        </span>
                      </Badge>
                      <Badge variant="default" size="sm">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {lab.estimatedTime}
                        </span>
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-text leading-relaxed mb-4 line-clamp-2">
                      {lab.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {lab.features.map((feat, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-muted-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5">
                      {lab.topics.map((topic, j) => (
                        <Badge key={j} variant="info" size="sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-3 border-t border-dark-border/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={ArrowLeft}
                        className="w-full justify-center"
                      >
                        فتح المختبر
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredLabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FlaskConical size={48} className="text-muted-text mx-auto mb-4 opacity-50" />
            <p className="text-muted-text">لا توجد مختبرات تطابق بحثك</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-accent text-sm mt-2 hover:underline"
            >
              مسح البحث
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
