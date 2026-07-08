import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Code2, BriefcaseBusiness, FileText, Search,
  ChevronDown, ChevronUp, ExternalLink, Check, Target,
  DollarSign, MessageCircle, Code, BookOpen, Users,
  Monitor, Globe
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import quickRefData from '../data/quickRefData';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const jobPlatforms = [
  { name: 'LinkedIn', logo: BriefcaseBusiness, description: 'أكبر شبكة مهنية للتوظيف', url: 'https://linkedin.com', color: 'text-accent' },
  { name: 'Indeed', logo: Search, description: 'منصة البحث عن الوظائف الأكثر شمولاً', url: 'https://indeed.com', color: 'text-primary-light' },
  { name: 'RemoteOK', logo: Globe, description: 'وظائف عن بعد في شركات عالمية', url: 'https://remoteok.com', color: 'text-success' },
  { name: 'We Work Remotely', logo: Monitor, description: 'أكبر مجتمع للوظائف عن بعد', url: 'https://weworkremotely.com', color: 'text-secondary' },
  { name: 'Stack Overflow Jobs', logo: Code, description: 'وظائف تقنية مع تقييم الشركات', url: 'https://stackoverflow.com/jobs', color: 'text-warning' },
  { name: 'AngelList', logo: Users, description: 'وظائف في الشركات الناشئة', url: 'https://angel.co', color: 'text-danger' },
];

const interviewTopics = [
  {
    title: 'أسئلة المقابلات التقنية',
    icon: Code,
    content: [
      'اشرح الفرق بين REST و GraphQL',
      'ما هي الـ Event Loop في JavaScript؟',
      'اشرح مفهوم Virtual DOM في React',
      'ما هي الـ Closure في JavaScript؟',
      'الفرق بين SQL و NoSQL',
    ],
  },
  {
    title: 'نظام التصميم (System Design)',
    icon: Monitor,
    content: [
      'صمم نظام URL Shortener (مثل bit.ly)',
      'صمم نظام Chat فوري',
      'صمم نظام توصية (Recommendation System)',
      'اشرح كيف تصمّم قاعدة بيانات لـ Twitter',
      'ما هي الـ CDN وكيف تعمل؟',
    ],
  },
  {
    title: 'تحديات البرمجة',
    icon: Code,
    content: [
      'اعكس سلسلة نصية بدون دوال جاهزة',
      'ابحث عن أول عنصر مكرر في مصفوفة',
      'نفّذ دالة Fibonacci مع Memoization',
      'أوجد أطول كلمة في جملة',
      'تحقق من صحة أقواس التعبير الرياضي',
    ],
  },
  {
    title: 'الأسئلة السلوكية',
    icon: MessageCircle,
    content: [
      'أخبرني عن مشروع صعوبة قمت به',
      'كيف تتعامل مع اختلاف الآراء في الفريق؟',
      'صف موقف فشلت فيه وماذا تعلمت',
      'لماذا تريد العمل في هذه الشركة؟',
      'أين ترى نفسك بعد 5 سنوات؟',
    ],
  },
];

const salaryData = [
  {
    title: 'رواتب المبتدئين',
    icon: DollarSign,
    items: [
      'Junior Frontend Developer: $40k–$70k',
      'Junior Backend Developer: $45k–$75k',
      'Junior Cybersecurity Analyst: $50k–$80k',
      'Full Stack Developer (Junior): $50k–$80k',
    ],
  },
  {
    title: 'نصائح التفاوض',
    icon: MessageCircle,
    items: [
      'ابحث عن متوسط الراتب في منطقتك قبل المقابلة',
      'لا تذكر رقمك أولاً - دعهم يبدأون',
      'فكّر في الحزمة الكاملة (تأمين، إجازات، خيارات أسهم)',
      'اطلب 10-20% أكثر من الرقم الذي ترضى به',
    ],
  },
  {
    title: 'خيارات العمل عن بعد',
    icon: Globe,
    items: [
      'وظائف عن بعد بالكامل (Remote First)',
      'وظائف هجينة (Hybrid) - يومين في المكتب',
      'العمل الحر (Freelance) عبر Upwork و Fiverr',
      'العمل لشركات أجنبية من بلدك (Remote)',
    ],
  },
];

const iconMap = {
  certificate: Award,
  projects: Briefcase,
  git: Code2,
  article: FileText,
  linkedin: BriefcaseBusiness,
  network: Users,
};

function Award(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export default function JobPrep() {
  const [openInterview, setOpenInterview] = useState(null);
  const [checklist, setChecklist] = useState(quickRefData.successMetrics.map(() => false));

  const toggleChecklist = (idx) => {
    setChecklist(prev => prev.map((v, i) => i === idx ? !v : v));
  };

  const progressCount = checklist.filter(Boolean).length;
  const progressPercent = Math.round((progressCount / checklist.length) * 100);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          الاستعداد الوظيفي وبناء الملف الشخصي
        </h1>
        <p className="text-muted-text text-lg">
          جهز نفسك لسوق العمل بخطوات عملية وملموسة
        </p>
      </motion.div>

      {/* Portfolio Checklist */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Target className="text-accent" size={28} />
          قائمة الإنجازات الوظيفية
        </h2>
        <div className="glass rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-light-text font-bold">التقدم الكلي</p>
            <Badge variant="accent" size="lg">{progressCount} من {checklist.length}</Badge>
          </div>
          <div className="w-full bg-dark-border rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-accent rounded-full"
            />
          </div>
          <div className="space-y-3">
            {quickRefData.successMetrics.map((metric, idx) => {
              const Icon = iconMap[metric.icon] || Target;
              return (
                <label
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl border border-dark-border bg-dark-card cursor-pointer hover:border-accent/30 transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={checklist[idx]}
                    onChange={() => toggleChecklist(idx)}
                    className="w-5 h-5 rounded border-dark-border bg-dark-card accent-accent"
                  />
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${checklist[idx] ? 'text-light-text' : 'text-muted-text'}`}>
                      {metric.metric}
                    </p>
                    <p className={`text-xs ${checklist[idx] ? 'text-success' : 'text-muted-text'}`}>
                      الهدف: {metric.target}
                    </p>
                  </div>
                  {checklist[idx] && <Check size={18} className="text-success" />}
                </label>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* GitHub Profile */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Code2 className="text-light-text" size={28} />
          إعداد ملف GitHub الاحترافي
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <ul className="space-y-3">
              {[
                'استخدم صورة شخصية احترافية',
                'اكتب Bio مختصرة عن مجالك',
                'ثبّت المساهمات اليومية (Contributions)',
                'ارفع 5+ مشاريع كاملة',
                'اكتب README ممتاز لكل مشروع',
                'استخدم GitHub Pages لموقعك الشخصي',
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check size={16} className="text-success mt-1 shrink-0" />
                  <span className="text-muted-text text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-light-text text-sm font-bold mb-3">نموذج README</p>
            <pre className="bg-dark-bg rounded-lg p-4 text-xs text-muted-text overflow-x-auto" dir="ltr">
              <code>{`# مشروعي

تقنيات: React • Node.js • MongoDB

## وصف
تطبيق ويب لإدارة المهام

## المميزات
- إضافة/حذف/تعديل المهام
- حفظ تلقائي في قاعدة البيانات
- واجهة مستخدم تفاعلية

## التشغيل
npm install
npm run dev

## الرابط
[معاينة مباشرة](https://myapp.vercel.app)`}</code>
            </pre>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" icon={ExternalLink} href="https://github.com">
            زيارة GitHub
          </Button>
        </div>
      </motion.section>

      {/* LinkedIn Profile */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <BriefcaseBusiness className="text-accent" size={28} />
          تحسين ملف LinkedIn
        </h2>
        <div className="glass rounded-xl p-6">
          <ul className="space-y-4 mb-6">
            {[
              'أضف صورة احترافية وخلفية مناسبة',
              'اكتب Headline قوي يصف مجالك',
              'أضف قسم Summary يلخص رحلتك',
              'اسأل زملاء العمل لتزكية مهاراتك (Recommendations)',
              'انشر محتوى تقني أسبوعياً',
              'تواصل مع مطورين في الشركات المستهدفة',
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check size={16} className="text-success mt-1 shrink-0" />
                <span className="text-muted-text text-sm">{tip}</span>
              </li>
            ))}
          </ul>
          <div className="bg-dark-border/20 rounded-lg p-4">
            <p className="text-accent text-sm font-bold mb-2">نماذج Headline:</p>
            {[
              'Frontend Developer | React | JavaScript | بناء تطبيقات ويب تفاعلية',
              'Backend Developer | Node.js | MongoDB | REST APIs',
              'Cybersecurity Analyst | OWASP | Kali Linux | Bug Bounty Hunter',
              'Full Stack Developer | MERN Stack | AWS | Docker',
            ].map((h, idx) => (
              <p key={idx} className="text-muted-text text-xs mb-1 px-2 py-1 rounded bg-dark-border/30">• {h}</p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Resume Builder */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <FileText className="text-warning" size={28} />
          بناء السيرة الذاتية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <Code size={20} className="text-accent" />
            </div>
            <h3 className="text-light-text font-bold mb-3">المهارات حسب المسار</h3>
            <div className="space-y-3">
              <div>
                <p className="text-accent text-xs font-bold mb-1">Frontend</p>
                <p className="text-muted-text text-xs">React, JavaScript, HTML, CSS, Tailwind, REST APIs</p>
              </div>
              <div>
                <p className="text-secondary text-xs font-bold mb-1">Backend</p>
                <p className="text-muted-text text-xs">Node.js, Express, MongoDB, SQL, Git, Docker</p>
              </div>
              <div>
                <p className="text-success text-xs font-bold mb-1">Security</p>
                <p className="text-muted-text text-xs">OWASP Top 10, Burp Suite, Nmap, Wireshark, Linux</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-3">
              <Briefcase size={20} className="text-success" />
            </div>
            <h3 className="text-light-text font-bold mb-3">وصف المشاريع</h3>
            <div className="space-y-2">
              {[
                'نظام إدارة مهام: React + Local Storage + CSS',
                'نظام مصادقة: Node.js + MongoDB + JWT + React',
                'تصميم قاعدة بيانات SQL مع استعلامات متقدمة',
                'اختبار اختراق لتطبيق DVWA مع توثيق الثغرات',
              ].map((proj, idx) => (
                <p key={idx} className="text-muted-text text-xs border-r-2 border-accent/30 pr-2">
                  {proj}
                </p>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mb-3">
              <Award size={20} className="text-warning" />
            </div>
            <h3 className="text-light-text font-bold mb-3">تنسيق الشهادات</h3>
            <div className="space-y-2 text-xs text-muted-text">
              {[
                'MongoDB M001 - MongoDB University (2024)',
                'Google Cybersecurity - Coursera (2024)',
                'Meta React - Coursera (2024)',
                'OWASP Top 10 - OWASP (2024)',
              ].map((cert, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <Check size={12} className="text-success mt-0.5 shrink-0" />
                  <span>{cert}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Job Search Resources */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Search className="text-primary-light" size={28} />
          منصات البحث عن وظائف
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobPlatforms.map((platform, idx) => {
            const Icon = platform.logo;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-xl border border-dark-border bg-dark-card p-5 card-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-dark-border/30 flex items-center justify-center">
                    <Icon size={20} className={platform.color} />
                  </div>
                  <div>
                    <h3 className="text-light-text font-bold text-sm">{platform.name}</h3>
                    <p className="text-muted-text text-xs">{platform.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" icon={ExternalLink} href={platform.url}>
                  زيارة
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Interview Preparation */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <MessageCircle className="text-secondary" size={28} />
          التحضير للمقابلات
        </h2>
        <div className="space-y-4">
          {interviewTopics.map((topic, idx) => {
            const isOpen = openInterview === idx;
            const Icon = topic.icon;
            return (
              <motion.div
                key={idx}
                layout
                className="rounded-xl border border-dark-border bg-dark-card overflow-hidden"
              >
                <button
                  className="w-full p-5 flex items-center justify-between text-right"
                  onClick={() => setOpenInterview(isOpen ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="text-light-text font-bold">{topic.title}</h3>
                  </div>
                  {isOpen ? <ChevronUp className="text-accent" size={20} /> : <ChevronDown className="text-muted-text" size={20} />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 space-y-2">
                        {topic.content.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-border/20 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                              <span className="text-accent text-xs font-bold">{i + 1}</span>
                            </div>
                            <span className="text-muted-text text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Salary Guide */}
      <motion.section {...fadeInUp} className="mb-16">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <DollarSign className="text-success" size={28} />
          دليل الرواتب
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {salaryData.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-xl border border-dark-border bg-dark-card p-5 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon size={20} className="text-success" />
                  </div>
                  <h3 className="text-light-text font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-text">
                      <div className="w-1.5 h-1.5 rounded-full bg-success/50 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </main>
  );
}
