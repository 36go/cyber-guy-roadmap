import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, BookOpen, Code, Database, Shield, FileCode, FlaskConical,
  GraduationCap, ExternalLink, ChevronLeft, ChevronRight, X,
  Layers, Clock, Star, Filter,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const categoryConfig = {
  course:  { icon: BookOpen,      label: 'دورات',         color: 'bg-accent/10 text-accent border-accent/20' },
  lab:     { icon: FlaskConical,  label: 'مختبرات',       color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  database:{ icon: Database,      label: 'قواعد بيانات',  color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' },
  project: { icon: Code,          label: 'مشاريع',        color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  doc:     { icon: FileCode,      label: 'توثيق',         color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  video:   { icon: GraduationCap, label: 'فيديوهات',      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

const filterTabs = [
  { id: 'all',     icon: Layers,      label: 'الكل' },
  { id: 'course',  icon: BookOpen,    label: 'دورات' },
  { id: 'lab',     icon: FlaskConical,label: 'مختبرات' },
  { id: 'database',icon: Database,    label: 'قواعد بيانات' },
  { id: 'project', icon: Code,        label: 'مشاريع' },
  { id: 'doc',     icon: FileCode,    label: 'توثيق' },
  { id: 'video',   icon: GraduationCap,label: 'فيديوهات' },
];

const searchData = [
  // Courses (10)
  { id: 'html-intro',        title: 'مقدمة في HTML',              description: 'تعلم أساسيات لغة HTML لبناء هيكل صفحات الويب مع فهم العناصر والوسوم والدلالات الحديثة',                                                                 category: 'course', tags: ['HTML', 'Web', 'Frontend', 'مبتديء'],              url: '/courses/html-intro' },
  { id: 'css-basics',        title: 'أساسيات CSS',                description: 'تعلم تصميم وتنسيق صفحات الويب باستخدام CSS مع Flexbox و Grid والتخطيط المتجاوب والتحريك',                                                              category: 'course', tags: ['CSS', 'Styling', 'Frontend', 'Responsive'],        url: '/courses/css-basics' },
  { id: 'javascript-es6',    title: 'JavaScript ES6+',            description: 'تعلم أحدث ميزات JavaScript من ES6 إلى ES2024 مع arrow functions و promises والتطبيقات العملية',                                                          category: 'course', tags: ['JavaScript', 'ES6', 'Programming', 'Web'],         url: '/courses/javascript-es6' },
  { id: 'react-basics',      title: 'React Basics',               description: 'بناء واجهات المستخدم التفاعلية باستخدام React مع فهم المكونات والحالة والأحداث والدورة الحياتية',                                                        category: 'course', tags: ['React', 'Frontend', 'Components', 'JSX'],          url: '/courses/react-basics' },
  { id: 'nodejs-intro',      title: 'Node.js Introduction',       description: 'بناء تطبيقات الخادم باستخدام Node.js مع Express و APIs و التعامل مع الملفات وقواعد البيانات',                                                            category: 'course', tags: ['Node.js', 'Backend', 'JavaScript', 'Server'],       url: '/courses/nodejs-intro' },
  { id: 'sql-fundamentals',  title: 'SQL Fundamentals',           description: 'تعلم قواعد البيانات العلائقية واستعلامات SQL من الصفر مع إنشاء الجداول والاستعلامات المتقدمة',                                                            category: 'course', tags: ['SQL', 'Database', 'Query', 'Relational'],           url: '/courses/sql-fundamentals' },
  { id: 'python-beginners',  title: 'Python for Beginners',      description: 'برمجة بايثون من البداية مع فهم المتغيرات والدوال والكائنات وتطبيقات في تحليل البيانات والويب',                                                           category: 'course', tags: ['Python', 'Programming', 'Beginner', 'Scripting'],   url: '/courses/python-beginners' },
  { id: 'cybersecurity-101', title: 'Cybersecurity 101',          description: 'أساسيات أمن المعلومات وحماية الأنظمة من الاختراقات والتهديدات مع فهم التشفير والثغرات',                                                                 category: 'course', tags: ['Security', 'Cybersecurity', 'Ethical Hacking'],    url: '/courses/cybersecurity-101' },
  { id: 'typescript-basics', title: 'TypeScript Basics',          description: 'إضافة الأنواع القوية إلى JavaScript باستخدام TypeScript مع واجهات الأنواع والأصناف والمصفوفات',                                                         category: 'course', tags: ['TypeScript', 'Types', 'JavaScript', 'Frontend'],    url: '/courses/typescript-basics' },
  { id: 'git-github',        title: 'Git & GitHub',               description: 'إدارة إصدارات المشاريع والتعاون مع الفرق باستخدام Git و GitHub مع الفروع والدمج والطلبات',                                                              category: 'course', tags: ['Git', 'GitHub', 'Version Control', 'DevOps'],      url: '/courses/git-github' },

  // Labs (6)
  { id: 'lab-html-css',      title: 'HTML/CSS Sandbox',           description: 'اختبر أكواد HTML و CSS مباشرة في المتصفح مع معاينة حية للتغييرات فور كتابتها',                                                                        category: 'lab',    tags: ['HTML', 'CSS', 'Sandbox', 'تجربة'],               url: '/labs/html-css' },
  { id: 'lab-javascript',    title: 'JavaScript Playground',      description: 'بيئة تفاعلية لتجربة أكواد JavaScript مع مخرجات فورية و console ومكتبات متنوعة',                                                                       category: 'lab',    tags: ['JavaScript', 'Playground', 'تجربة', 'مخرجات'],     url: '/labs/javascript' },
  { id: 'lab-typescript',    title: 'TypeScript Playground',      description: 'بيئة تفاعلية لتجربة TypeScript مع تحويل فوري لـ JavaScript وفحص الأنواع',                                                                              category: 'lab',    tags: ['TypeScript', 'Playground', 'تحويل', 'أنواع'],      url: '/labs/typescript' },
  { id: 'lab-python',        title: 'Python Playground',          description: 'بيئة تفاعلية لتجربة Python مع تنفيذ فوري للكود ودعم المكتبات الشائعة',                                                                                  category: 'lab',    tags: ['Python', 'Playground', 'تجربة', 'مكتبات'],         url: '/labs/python' },
  { id: 'lab-sql',           title: 'SQL Playground',             description: 'قاعدة بيانات تجريبية لاختبار استعلامات SQL مع جداول جاهزة ونتائج فورية',                                                                                 category: 'lab',    tags: ['SQL', 'Playground', 'استعلامات', 'بيانات'],        url: '/labs/sql' },
  { id: 'lab-api',           title: 'Web API Tester',             description: 'اختبر REST APIs وحلل الاستجابات مع واجهة تفاعلية تدعم جميع طرق HTTP',                                                                                    category: 'lab',    tags: ['API', 'REST', 'HTTP', 'اختبار'],                  url: '/labs/api' },

  // Database Labs (6)
  { id: 'db-sqlite',         title: 'SQLite Basics',              description: 'تعلم أساسيات SQLite مع إنشاء وتعديل قواعد البيانات المحلية الخفيفة المناسبة للتطبيقات الصغيرة',                                                         category: 'database', tags: ['SQLite', 'Database', 'محلي', 'خفيف'],              url: '/labs/sqlite-basics' },
  { id: 'db-postgresql',     title: 'PostgreSQL Setup',           description: 'إعداد PostgreSQL وتكوينه وتثبيته مع فهم البنية المتقدمة والصلاحيات والأداء',                                                                             category: 'database', tags: ['PostgreSQL', 'Setup', 'Database', 'Server'],         url: '/labs/postgresql-setup' },
  { id: 'db-crud',           title: 'CRUD Operations',            description: 'إنشاء وقراءة وتحديث وحذف البيانات باستخدام أوامر SQL مع أمثلة عملية على كل عملية',                                                                      category: 'database', tags: ['CRUD', 'SQL', 'Database', 'Operations'],           url: '/labs/crud-operations' },
  { id: 'db-queries',        title: 'Query Practice',             description: 'تمارين عملية على استعلامات SQL من البسيط إلى المتقدم مع تحسين الأداء والفهارس',                                                                          category: 'database', tags: ['Query', 'SQL', 'تمرين', 'تحسين'],                  url: '/labs/query-practice' },
  { id: 'db-joins',          title: 'Joins Exercises',            description: 'تمارين على ربط الجداول في SQL بجميع أنواع الروابط INNER و LEFT و RIGHT و FULL مع سيناريوهات واقعية',                                                   category: 'database', tags: ['Joins', 'SQL', 'Tables', 'Relations'],             url: '/labs/joins-exercises' },
  { id: 'db-design',         title: 'Database Design',            description: 'تصميم قواعد البيانات العلائقية مع نمذجة البيانات والعلاقات والتطبيع وإنشاء المخططات',                                                                    category: 'database', tags: ['Design', 'Database', 'Modeling', 'Normalization'],   url: '/labs/database-design' },

  // Projects (6)
  { id: 'proj-todo',         title: 'Todo App',                   description: 'تطبيق إدارة المهام الكلاسيكي لتعلم أساسيات React مع إضافة وحذف وتعديل المهام',                                                                          category: 'project', tags: ['React', 'Todo', 'CRUD', 'Beginner'],               url: '/projects/todo-app' },
  { id: 'proj-rest-api',     title: 'REST API',                   description: 'بناء REST API متكامل مع Node.js و Express مع التوثيق والاختبار والمصادقة',                                                                              category: 'project', tags: ['API', 'Node.js', 'REST', 'Express'],              url: '/projects/rest-api' },
  { id: 'proj-auth',         title: 'Auth System',                description: 'نظام تسجيل دخول ومصادقة متكامل مع JWT و OAuth مع حماية المسارات وإدارة الجلسات',                                                                         category: 'project', tags: ['Auth', 'JWT', 'Security', 'Login'],               url: '/projects/auth-system' },
  { id: 'proj-chat',         title: 'Chat App',                   description: 'تطبيق دردشة فوري مع WebSockets يتيح المراسلة الفورية والمجموعات والإشعارات',                                                                              category: 'project', tags: ['Chat', 'WebSocket', 'Real-time', 'Socket.io'],     url: '/projects/chat-app' },
  { id: 'proj-task-manager', title: 'Task Manager',               description: 'مدير المهام المتقدم مع قاعدة بيانات ومستخدمين متعددين وصلاحيات وتقارير',                                                                                 category: 'project', tags: ['Manager', 'Database', 'Users', 'Dashboard'],       url: '/projects/task-manager' },
  { id: 'proj-portfolio',    title: 'Portfolio Website',          description: 'موقع شخصي لعرض المشاريع والمهارات مع تصميم متجاوب وتحسين محركات البحث',                                                                                category: 'project', tags: ['Portfolio', 'Website', 'Design', 'SEO'],           url: '/projects' },

  // Documentation (6)
  { id: 'doc-react',         title: 'React Documentation',        description: 'التوثيق الرسمي لـ React مع الشروحات والأمثلة ودليل البدء السريع ومرجع API الكامل',                                                                      category: 'doc',    tags: ['React', 'Documentation', 'Reference', 'Guide'],      url: 'https://react.dev', external: true },
  { id: 'doc-mdn',           title: 'MDN Web Docs',               description: 'المرجع الشامل لتقنيات الويب من Mozilla يغطي HTML و CSS و JavaScript و APIs المتصفح',                                                                     category: 'doc',    tags: ['MDN', 'Web', 'Reference', 'Mozilla'],               url: 'https://developer.mozilla.org', external: true },
  { id: 'doc-nodejs',        title: 'Node.js Docs',               description: 'توثيق Node.js الرسمي مع guide و API reference وأمثلة على وحدات الخادم',                                                                                 category: 'doc',    tags: ['Node.js', 'Documentation', 'API', 'Server'],         url: 'https://nodejs.org/docs/latest/api/', external: true },
  { id: 'doc-python',        title: 'Python Docs',                description: 'توثيق Python الرسمي مع البرامج التعليمية ومرجع المكتبة القياسية وأدلة التثبيت',                                                                          category: 'doc',    tags: ['Python', 'Documentation', 'Reference', 'Library'],    url: 'https://docs.python.org/3/', external: true },
  { id: 'doc-sqlite',        title: 'SQLite Docs',                description: 'توثيق SQLite الرسمي للأوامر والدوال و SQL grammar مع أمثلة وشروحات',                                                                                     category: 'doc',    tags: ['SQLite', 'Documentation', 'SQL', 'Reference'],       url: 'https://www.sqlite.org/docs.html', external: true },
  { id: 'doc-postgresql',    title: 'PostgreSQL Docs',            description: 'توثيق PostgreSQL الرسمي مع الدليل الكامل للأوامر والإعدادات والأداء والتحسين',                                                                           category: 'doc',    tags: ['PostgreSQL', 'Documentation', 'SQL', 'Guide'],       url: 'https://www.postgresql.org/docs/', external: true },

  // Video resources (6)
  { id: 'vid-fcc-html',      title: 'freeCodeCamp HTML Course',   description: 'دورة HTML الشاملة من freeCodeCamp على YouTube تغطي كل شيء من الصفر إلى الاحتراف',                                                                        category: 'video',  tags: ['HTML', 'freeCodeCamp', 'Course', 'YouTube'],       url: 'https://youtube.com/watch?v=pQN-pnXPaVg', external: true },
  { id: 'vid-js-full',       title: 'JavaScript Full Course',     description: 'دورة JavaScript الكاملة للمبتدئين والمتوسطين تغطي الأساسيات والمفاهيم المتقدمة',                                                                        category: 'video',  tags: ['JavaScript', 'Full Course', 'YouTube', 'Beginner'],  url: 'https://youtube.com/watch?v=PkZNo7MFNFg', external: true },
  { id: 'vid-react-ninja',   title: 'React Tutorial - The Net Ninja', description: 'سلسلة React التعليمية من The Net Ninja تغطي المكونات والخطافات والمفاهيم المتقدمة',                                                                    category: 'video',  tags: ['React', 'The Net Ninja', 'Tutorial', 'YouTube'],   url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d', external: true },
  { id: 'vid-node-traversy', title: 'Node.js Crash Course - Traversy Media', description: 'دورة Node.js المكثفة من Traversy Media تغطي الخادم و Express و MongoDB',                                                                      category: 'video',  tags: ['Node.js', 'Traversy Media', 'Crash Course'],        url: 'https://youtube.com/watch?v=fBNz5xF-Kx4', external: true },
  { id: 'vid-py-everyone',   title: 'Python for Everybody - freeCodeCamp', description: 'دورة Python للجميع من freeCodeCamp دورة شاملة لتعلم البرمجة بلغة بايثون',                                                                       category: 'video',  tags: ['Python', 'freeCodeCamp', 'Everyone', 'Course'],     url: 'https://youtube.com/watch?v=8DvywoWv6fI', external: true },
  { id: 'vid-sql-fcc',       title: 'SQL Course - freeCodeCamp',  description: 'دورة SQL الشاملة من freeCodeCamp تغطي قواعد البيانات والاستعلامات والتصميم',                                                                             category: 'video',  tags: ['SQL', 'freeCodeCamp', 'Database', 'Course'],        url: 'https://youtube.com/watch?v=HXV3zeQKqGY', external: true },
];

const RECENT_SEARCHES_KEY = 'bootcamp_recent_searches';
const MAX_RECENT = 8;

const ARABIC_NORMALIZE = {
  'أ': 'ا', 'إ': 'ا', 'آ': 'ا',
  'ى': 'ي', 'ة': 'ه', 'ؤ': 'و', 'ئ': 'ي',
};

function normalizeArabic(str) {
  return str
    .split('')
    .map(c => ARABIC_NORMALIZE[c] || c)
    .join('')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .toLowerCase()
    .trim();
}

function loadRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch { return []; }
}

function saveRecentSearch(query) {
  try {
    const searches = loadRecentSearches().filter(s => s !== query);
    searches.unshift(query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches.slice(0, MAX_RECENT)));
    return searches.slice(0, MAX_RECENT);
  } catch { return []; }
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

function highlightText(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  const lowerQuery = query.toLowerCase();
  return parts.map((part, i) => {
    if (part.toLowerCase() === lowerQuery) {
      return (
        <mark key={i} className="bg-accent/30 text-accent rounded-sm px-0.5">
          {part}
        </mark>
      );
    }
    return part;
  });
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    setRecentSearches(loadRecentSearches());
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0) {
      const el = document.getElementById(`search-result-${highlightedIndex}`);
      if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedIndex]);

  const filteredByQuery = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return searchData;
    const normalized = normalizeArabic(q);
    return searchData.filter(item => {
      const title = normalizeArabic(item.title);
      const desc = normalizeArabic(item.description);
      const tags = item.tags.map(t => normalizeArabic(t));
      return (
        title.includes(normalized) ||
        desc.includes(normalized) ||
        tags.some(t => t.includes(normalized))
      );
    });
  }, [searchQuery]);

  const groupedResults = useMemo(() => {
    const filtered = activeCategory === 'all'
      ? filteredByQuery
      : filteredByQuery.filter(item => item.category === activeCategory);
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    const order = ['course', 'lab', 'database', 'project', 'doc', 'video'];
    return order
      .filter(cat => groups[cat])
      .map(cat => ({ category: cat, items: groups[cat] }));
  }, [filteredByQuery, activeCategory]);

  const flatResults = useMemo(
    () => groupedResults.flatMap(g => g.items),
    [groupedResults]
  );

  const totalCount = flatResults.length;

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, []);

  const navigateToItem = useCallback((item) => {
    const query = searchQuery.trim();
    if (query) setRecentSearches(saveRecentSearch(query));
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.url);
    }
  }, [navigate, searchQuery]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < flatResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : flatResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
      if (flatResults[idx]) navigateToItem(flatResults[idx]);
    } else if (e.key === 'Escape') {
      handleClearSearch();
    }
  }, [flatResults, highlightedIndex, navigateToItem, handleClearSearch]);

  const handleRecentClick = useCallback((term) => {
    setSearchQuery(term);
    setShowRecent(false);
    setHighlightedIndex(-1);
  }, []);

  const handleClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const activeFilterIcon = filterTabs.find(t => t.id === activeCategory)?.icon || Filter;

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Search size={28} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-l from-accent via-secondary to-accent bg-clip-text text-transparent">
                  بحث
                </span>
              </h1>
              <p className="text-muted-text text-sm mt-1">
                ابحث في جميع محتويات المنصة من دورات ومختبرات ومشاريع
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search Input */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="ابحث عن دورات، مختبرات، مشاريع، دروس..."
            className="w-full pr-12 pl-12 py-4 rounded-2xl bg-dark-card border border-dark-border text-light-text text-base placeholder:text-muted-text/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-border transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Recent Searches Dropdown */}
        <AnimatePresence>
          {showRecent && !searchQuery && recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-4 rounded-xl bg-dark-card border border-dark-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-text">
                  <Clock size={14} />
                  <span>عمليات البحث الأخيرة</span>
                </div>
                <button
                  onClick={handleClearRecent}
                  className="text-xs text-muted-text hover:text-danger transition-colors"
                >
                  مسح الكل
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleRecentClick(term);
                    }}
                    className="px-3 py-1.5 text-xs rounded-full border border-dark-border text-muted-text hover:text-light-text hover:border-accent/30 hover:bg-accent/5 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Category Filters */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setHighlightedIndex(-1);
                }}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                  whitespace-nowrap transition-all duration-200 shrink-0
                  ${isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-dark-card text-muted-text border border-dark-border hover:text-light-text hover:border-accent/20'
                  }
                `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4">
        {searchQuery.trim() ? (
          <>
            {totalCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mb-6 text-sm text-muted-text"
              >
                <Filter size={14} />
                <span>
                  {totalCount === 1
                    ? 'نتيجة واحدة'
                    : `${totalCount} نتائج`}
                  {' '}
                  {activeCategory !== 'all' && (
                    <span className="text-accent">
                      في {categoryConfig[activeCategory]?.label}
                    </span>
                  )}
                </span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {totalCount > 0 ? (
                <motion.div
                  key={`${activeCategory}-${searchQuery}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  ref={resultsRef}
                >
                  {groupedResults.map((group) => {
                    const CatConfig = categoryConfig[group.category];
                    const CatIcon = CatConfig.icon;
                    return (
                      <div key={group.category} className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center">
                            <CatIcon size={16} className="text-accent" />
                          </div>
                          <h2 className="text-lg font-bold text-light-text">
                            {CatConfig.label}
                          </h2>
                          <Badge variant="default" size="sm">
                            {group.items.length}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.items.map((item, itemIdx) => {
                            const flatIdx = flatResults.indexOf(item);
                            const isHighlighted = flatIdx === highlightedIndex;
                            const ResultIcon = CatIcon;
                            const isExternal = item.external;

                            const cardContent = (
                              <Card
                                icon={ResultIcon}
                                className={`
                                  h-full transition-all duration-200
                                  ${isHighlighted
                                    ? 'ring-2 ring-accent/50 border-accent/40 shadow-lg shadow-accent/10'
                                    : ''
                                  }
                                `}
                                hover
                              >
                                <h3 className="text-light-text font-bold text-base mb-1.5">
                                  {highlightText(item.title, searchQuery)}
                                </h3>
                                <p className="text-muted-text text-sm leading-relaxed line-clamp-2 mb-3">
                                  {highlightText(item.description, searchQuery)}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="info" size="sm">
                                      {highlightText(tag, searchQuery)}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-dark-border/30">
                                  <Badge variant="accent" size="sm">
                                    {CatConfig.label}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-text">
                                    {isExternal ? (
                                      <>
                                        <span>فتح الرابط</span>
                                        <ExternalLink size={12} />
                                      </>
                                    ) : (
                                      <>
                                        <span>عرض</span>
                                        <ChevronLeft size={12} />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            );

                            if (isExternal) {
                              return (
                                <motion.div
                                  key={item.id}
                                  variants={itemVariants}
                                  id={`search-result-${flatIdx}`}
                                >
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                  >
                                    {cardContent}
                                  </a>
                                </motion.div>
                              );
                            }

                            return (
                              <motion.div
                                key={item.id}
                                variants={itemVariants}
                                id={`search-result-${flatIdx}`}
                              >
                                <Link to={item.url} className="block h-full">
                                  {cardContent}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center mx-auto mb-6">
                    <Search size={36} className="text-muted-text opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-light-text mb-2">
                    لا توجد نتائج
                  </h3>
                  <p className="text-muted-text mb-6 max-w-md mx-auto">
                    لم نجد أي نتائج تطابق بحث "{searchQuery}".
                    حاول استخدام كلمات مفتاحية مختلفة أو التأكد من الإملاء.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveCategory('all')}
                    >
                      <Layers size={14} />
                      عرض الكل
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearSearch}
                    >
                      <X size={14} />
                      مسح البحث
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Empty State - No Query */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <Search size={44} className="text-accent opacity-70" />
            </div>
            <h2 className="text-2xl font-bold text-light-text mb-3">
              ابحث في جميع محتويات المنصة
            </h2>
            <p className="text-muted-text max-w-lg mx-auto mb-8 leading-relaxed">
              يمكنك البحث عن دورات تعليمية، مختبرات تفاعلية، قواعد بيانات،
              مشاريع عملية، توثيق، ومقاطع فيديو. اكتب كلمة مفتاحية للبدء.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
              {[
                { label: 'HTML', icon: BookOpen },
                { label: 'React', icon: Code },
                { label: 'Python', icon: FileCode },
                { label: 'SQL', icon: Database },
                { label: 'Node.js', icon: FlaskConical },
                { label: 'Security', icon: Shield },
              ].map(({ label, icon: SuggestionIcon }) => (
                <button
                  key={label}
                  onClick={() => {
                    setSearchQuery(label);
                    setHighlightedIndex(-1);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-muted-text hover:text-light-text hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
                >
                  <SuggestionIcon size={16} className="shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            {recentSearches.length > 0 && (
              <div className="mt-10 max-w-lg mx-auto">
                <div className="flex items-center gap-2 justify-center mb-4 text-sm text-muted-text">
                  <Clock size={14} />
                  <span>عمليات البحث الأخيرة</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setHighlightedIndex(-1);
                      }}
                      className="px-3 py-1.5 text-xs rounded-full border border-dark-border text-muted-text hover:text-light-text hover:border-accent/30 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                  <button
                    onClick={handleClearRecent}
                    className="px-3 py-1.5 text-xs rounded-full border border-danger/20 text-danger/60 hover:text-danger hover:border-danger/40 transition-colors"
                  >
                    <X size={12} className="inline" />
                    {' '}مسح
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 text-sm text-muted-text/50">
              <p>يمكنك استخدام الأسهم للتنقل بين النتائج واضغط Enter للاختيار</p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Keyboard navigation hint when searching */}
      {searchQuery.trim() && totalCount > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 justify-center text-xs text-muted-text/50"
          >
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-[10px]">↓</kbd>
              للتنقل
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-[10px]">↵</kbd>
              للاختيار
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-[10px]">Esc</kbd>
              للمسح
            </span>
          </motion.div>
        </section>
      )}
    </div>
  );
}
