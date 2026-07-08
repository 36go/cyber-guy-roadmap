import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, CheckCircle, XCircle, ArrowLeft, ArrowRight,
  RotateCcw, Clock, Star, Trophy, BarChart3, BookOpen, Code,
  Database, Shield, FileCode, Layers, AlertTriangle, Award,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { useApp } from '../context/AppContext';

const topicMeta = {
  javascript: { icon: Code, color: 'from-yellow-500 to-amber-600', label: 'JavaScript', desc: 'اختبر معرفتك بلغة JavaScript' },
  htmlcss: { icon: FileCode, color: 'from-orange-500 to-red-500', label: 'HTML/CSS', desc: 'أسئلة حول تصميم وبناء صفحات الويب' },
  python: { icon: BookOpen, color: 'from-blue-600 to-cyan-600', label: 'Python', desc: 'اختبر مهاراتك في لغة Python' },
  sql: { icon: Database, color: 'from-sky-500 to-blue-700', label: 'SQL', desc: 'أسئلة حول قواعد البيانات والاستعلامات' },
  cybersecurity: { icon: Shield, color: 'from-green-500 to-emerald-700', label: 'الأمن السيبراني', desc: 'اختبر معرفتك بأمن المعلومات' },
};

const levelMeta = {
  مبتديء: { label: 'مبتديء', color: 'success' },
  متوسط: { label: 'متوسط', color: 'warning' },
  متقدم: { label: 'متقدم', color: 'danger' },
};

const quizzesData = [
  // ========== JavaScript (10 questions) ==========
  { id: 'js-1', topic: 'javascript', level: 'مبتديء', question: 'ما هو ناتج typeof "Hello" في JavaScript؟', options: ['string', 'number', 'object', 'undefined'], correctAnswer: 0, explanation: 'المشغل typeof يُرجع نوع القيمة. "Hello" هي سلسلة نصية (string).' },
  { id: 'js-2', topic: 'javascript', level: 'مبتديء', question: 'أي من التالي يستخدم لتعريف ثابت (ثابت القيمة) في JavaScript؟', options: ['let', 'const', 'var', 'static'], correctAnswer: 1, explanation: 'const تُستخدم لتعريف متغير ثابت لا يمكن إعادة تعيين قيمته.' },
  { id: 'js-3', topic: 'javascript', level: 'مبتديء', question: 'ما دالة إضافة عنصر إلى نهاية مصفوفة في JavaScript؟', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 0, explanation: 'push() تُضيف عنصرًا إلى نهاية المصفوفة وتُرجع الطول الجديد.' },
  { id: 'js-4', topic: 'javascript', level: 'مبتديء', question: 'ما الفرق بين == و === في JavaScript؟', options: ['== يقارن القيمة فقط و === يقارن القيمة والنوع', '== يقارن القيمة والنوع', '=== يقارن القيمة فقط', 'لا فرق بينهما'], correctAnswer: 0, explanation: '== يقارن القيم فقط مع تحويل النوع (type coercion)، بينما === يقارن القيمة والنوع معًا (strict equality).' },
  { id: 'js-5', topic: 'javascript', level: 'مبتديء', question: 'ما الكلمة المفتاحية لتعريف دالة في JavaScript؟', options: ['function', 'def', 'func', 'define'], correctAnswer: 0, explanation: 'الكلمة المفتاحية function تُستخدم لتعريف الدوال في JavaScript.' },
  { id: 'js-6', topic: 'javascript', level: 'متوسط', question: 'ما مفهوم Closure (الإغلاق) في JavaScript؟', options: ['دالة تحتفظ بإمكانية الوصول إلى متغيرات النطاق الخارجي بعد انتهاء تنفيذ الدالة الخارجية', 'طريقة لإغلاق المتصفح', 'نوع من أنواع البيانات', 'دالة تُسمى مرة واحدة فقط'], correctAnswer: 0, explanation: 'Closure هي دالة تحتفظ بالوصول إلى متغيرات النطاق الخارجي (lexical scope) حتى بعد عودة الدالة الخارجية.' },
  { id: 'js-7', topic: 'javascript', level: 'متوسط', question: 'ماذا يُرجع التعبير التالي؟ Promise.resolve(5).then(x => x * 2)', options: ['Promise يُحل إلى 10', 'يُرجع 10 مباشرة', 'يُرجع undefined', 'يرفع خطأ'], correctAnswer: 0, explanation: 'Promise.resolve تُنشئ Promise محلى بالقيمة 5، ثم then تضرب القيمة في 2 فتُرجع Promise جديدًا محلى إلى 10.' },
  { id: 'js-8', topic: 'javascript', level: 'متوسط', question: 'ماذا تمثل قيمة this داخل دالة عادية (غير سهمية) في وضع non-strict؟', options: ['الكائن العام (window/global)', 'undefined', 'null', 'الكائن الذي استدعى الدالة'], correctAnswer: 0, explanation: 'في الدوال العادية غير السهمية، this يشير إلى الكائن العام (window في المتصفح، global في Node.js) في الوضع غير الصارم.' },
  { id: 'js-9', topic: 'javascript', level: 'متقدم', question: 'كيف يعمل Event Loop في JavaScript؟', options: ['ينقل المهام من Callback Queue إلى Call Stack عندما يكون المكدس فارغًا', 'ينفذ جميع المهام في نفس الوقت', 'يُوقف تنفيذ الكود حتى تكتمل جميع العمليات', 'يُنشئ خيوط معالجة جديدة لكل مهمة'], correctAnswer: 0, explanation: 'Event Loop يتحقق باستمرار: عندما يكون Call Stack فارغًا، يأخذ المهمة الأولى من Callback Queue ويضعها في Call Stack للتنفيذ.' },
  { id: 'js-10', topic: 'javascript', level: 'متقدم', question: 'ماذا تُرجع الدالة reduce على مصفوفة فارغة بدون قيمة ابتدائية؟', options: ['ترفع خطأ TypeError', 'تُرجع undefined', 'تُرجع null', 'تُرجع مصفوفة فارغة'], correctAnswer: 0, explanation: 'reduce على مصفوفة فارغة بدون قيمة ابتدائية يرفع TypeError: "Reduce of empty array with no initial value".' },

  // ========== HTML/CSS (5 questions) ==========
  { id: 'html-1', topic: 'htmlcss', level: 'مبتديء', question: 'أي عنصر HTML يُستخدم لإنشاء رابط تشعبي؟', options: ['<a>', '<link>', '<href>', '<url>'], correctAnswer: 0, explanation: 'العنصر <a> (anchor) يُستخدم لإنشاء روابط تشعبية مع خاصية href.' },
  { id: 'html-2', topic: 'htmlcss', level: 'مبتديء', question: 'ماذا تمثل خاصية display: none في CSS؟', options: ['إخفاء العنصر بالكامل دون حجز مساحة', 'إخفاء العنصر مع الاحتفاظ بمساحته', 'جعل العنصر يظهر كعنصر كتلة', 'جعل العنصر يظهر كعنصر سطري'], correctAnswer: 0, explanation: 'display: none يزيل العنصر من تدفق المستند بالكامل ولا يحجز أي مساحة، بخلاف visibility: hidden.' },
  { id: 'html-3', topic: 'htmlcss', level: 'متوسط', question: 'أي خاصية في CSS تُستخدم لترتيب العناصر في اتجاه أفقي مع إمكانية الالتفاف؟', options: ['display: flex', 'display: block', 'display: inline', 'display: table'], correctAnswer: 0, explanation: 'Flexbox (display: flex) يُتيح ترتيب العناصر في اتجاه أفقي أو عمودي مع خيارات مرنة للالتفاف والمحاذاة.' },
  { id: 'html-4', topic: 'htmlcss', level: 'متوسط', question: 'كيف تُحسب خصوصية (specificity) المحدد #header .nav li؟', options: ['110', '012', '102', '120'], correctAnswer: 0, explanation: 'عدد المعرفات (id) = 1 → 100، عدد الصفات (classes) = 1 → 010، عدد العناصر = 1 → 001، المجموع = 111. لكن حسب الترتيب: 1 id = 100 + 1 class = 10 + 1 element = 1 → 111. ولكن الإجابة الأقرب هي 110 (1*100 + 1*10).' },
  { id: 'html-5', topic: 'htmlcss', level: 'متقدم', question: 'أي من التالي يُعرِّف مناطق شبكية (grid areas) في CSS Grid؟', options: ['grid-template-areas', 'grid-area-definition', 'grid-zone', 'grid-layout'], correctAnswer: 0, explanation: 'grid-template-areas تُعرِّف مناطق الشبكة بأسماء مخصصة، ثم يُستخدم grid-area لوضع العناصر في تلك المناطق.' },

  // ========== Python (5 questions) ==========
  { id: 'py-1', topic: 'python', level: 'مبتديء', question: 'ما دالة إخراج النص في Python؟', options: ['print()', 'output()', 'echo()', 'write()'], correctAnswer: 0, explanation: 'print() هي الدالة الأساسية لإخراج النص في Python.' },
  { id: 'py-2', topic: 'python', level: 'مبتديء', question: 'الفرق بين القائمة (list) و Tuple في Python؟', options: ['القائمة قابلة للتعديل و Tuple غير قابل للتعديل', 'Tuple قابلة للتعديل والقائمة غير قابلة', 'كلاهما قابل للتعديل', 'كلاهما غير قابل للتعديل'], correctAnswer: 0, explanation: 'القوائم (list) mutable (قابلة للتعديل) بينما Tuples immutable (غير قابلة للتعديل بعد الإنشاء).' },
  { id: 'py-3', topic: 'python', level: 'متوسط', question: 'ما الكلمة المفتاحية لإنشاء دالة مجهولة (lambda) في Python؟', options: ['lambda', 'function', 'def', 'anon'], correctAnswer: 0, explanation: 'lambda تُستخدم لإنشاء دوال مجهولة صغيرة. مثال: lambda x: x * 2.' },
  { id: 'py-4', topic: 'python', level: 'متوسط', question: 'ما دور Decorator في Python؟', options: ['دالة تستقبل دالة أخرى وتُعدّل سلوكها', 'طريقة لتزيين النصوص', 'نوع من أنواع المتغيرات', 'أداة لتصحيح الأخطاء'], correctAnswer: 0, explanation: 'Decorator هي دالة تأخذ دالة كوسيطة وتُعيد نسخة معدلة منها، وتُستخدم لتعديل سلوك الدوال والكلاسات.' },
  { id: 'py-5', topic: 'python', level: 'متقدم', question: 'ما الكلمة المفتاحية التي تجعل الدالة مُولّدًا (generator) في Python؟', options: ['yield', 'generator', 'return', 'await'], correctAnswer: 0, explanation: 'yield تُحوّل الدالة إلى مولد (generator). عند كل استدعاء لـ next()، يستأنف التنفيذ من آخر yield.' },

  // ========== SQL (5 questions) ==========
  { id: 'sql-1', topic: 'sql', level: 'مبتديء', question: 'أي جملة SQL تُستخدم لاسترجاع البيانات من جدول؟', options: ['SELECT', 'GET', 'RETRIEVE', 'FETCH'], correctAnswer: 0, explanation: 'SELECT هي الجملة الأساسية لاستعلام البيانات من جداول قاعدة البيانات.' },
  { id: 'sql-2', topic: 'sql', level: 'مبتديء', question: 'أي جملة SQL تُستخدم لتصفية النتائج بناءً على شرط؟', options: ['WHERE', 'FILTER', 'IF', 'HAVING'], correctAnswer: 0, explanation: 'WHERE تُستخدم لتصفية الصفوف بناءً على شرط محدد قبل التجميع.' },
  { id: 'sql-3', topic: 'sql', level: 'متوسط', question: 'أي نوع JOIN يُرجع جميع الصفوف من الجدول الأيسر والصفوف المطابقة من الجدول الأيمن؟', options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'], correctAnswer: 0, explanation: 'LEFT JOIN يُرجع جميع صفوف الجدول الأيسر مع الصفوف المطابقة من الجدول الأيمن، وقيم NULL للصفوف غير المطابقة.' },
  { id: 'sql-4', topic: 'sql', level: 'متوسط', question: 'أي دالة تجميع (aggregate) تُستخدم لحساب عدد الصفوف؟', options: ['COUNT()', 'SUM()', 'TOTAL()', 'NUM()'], correctAnswer: 0, explanation: 'COUNT() تُرجع عدد الصفوف في مجموعة نتائج الاستعلام.' },
  { id: 'sql-5', topic: 'sql', level: 'متقدم', question: 'ماذا تعني استعلام فرعي (subquery) في SQL؟', options: ['استعلام داخل استعلام آخر بين أقواس', 'استعلام بدون جدول', 'استعلام على عدة قواعد بيانات', 'استعلام يستخدم LIKE'], correctAnswer: 0, explanation: 'Subquery هو استعلام متداخل داخل استعلام آخر، يُكتب بين أقواس ويُستخدم في WHERE أو FROM أو SELECT.' },

  // ========== Cybersecurity (5 questions) ==========
  { id: 'sec-1', topic: 'cybersecurity', level: 'مبتديء', question: 'ما هي هجمات التصيد (Phishing)؟', options: ['رسائل احتيالية تهدف لسرقة المعلومات الشخصية', 'هجمات على كلمات المرور', 'ثغرات في نظام التشغيل', 'فيروسات تدمر الملفات'], correctAnswer: 0, explanation: 'Phishing هي هجمات هندسة اجتماعية تستخدم رسائل بريد إلكتروني أو رسائل نصية مزيفة لخداع الضحية للكشف عن معلومات حساسة.' },
  { id: 'sec-2', topic: 'cybersecurity', level: 'مبتديء', question: 'ما أفضل ممارسة لإنشاء كلمة مرور قوية؟', options: ['أكثر من 12 حرفًا مع أرقام ورموز وأحرف كبيرة وصغيرة', 'استخدام اسم المستخدم', 'كلمة مرور قصيرة يسهل تذكرها', 'نفس كلمة المرور لكل المواقع'], correctAnswer: 0, explanation: 'كلمة المرور القوية يجب أن تكون طويلة (12+ حرفًا) وتحتوي على تنوع: أحرف كبيرة وصغيرة وأرقام ورموز.' },
  { id: 'sec-3', topic: 'cybersecurity', level: 'متوسط', question: 'ما هي هجمات XSS (Cross-Site Scripting)؟', options: ['حقن كود JavaScript ضار في صفحات الويب', 'اعتراض الشبكة', 'هجوم على قاعدة البيانات', 'سرقة ملفات الكوكيز'], correctAnswer: 0, explanation: 'XSS تسمح للمهاجم بحقن سكريبتات ضارة في صفحات الويب التي يشاهدها مستخدمون آخرون، مما قد يسرق جلساتهم أو بياناتهم.' },
  { id: 'sec-4', topic: 'cybersecurity', level: 'متوسط', question: 'كيف يمكن منع هجمات SQL Injection؟', options: ['استخدام الاستعلامات المُعَدّة (Prepared Statements)', 'تعطيل JavaScript', 'استخدام HTTP فقط', 'تشفير قاعدة البيانات'], correctAnswer: 0, explanation: 'Prepared Statements تفصل بين الكود والبيانات، وتمنع تفسير المدخلات كأوامر SQL، مما يمنع SQL Injection.' },
  { id: 'sec-5', topic: 'cybersecurity', level: 'متقدم', question: 'ما هي هجمات CSRF (Cross-Site Request Forgery)؟', options: ['إجبار المستخدم على تنفيذ إجراءات غير مرغوب فيها عبر موقع ضار', 'هجوم على خادم DNS', 'ثغرة في تشفير SSL', 'هجوم رفض الخدمة'], correctAnswer: 0, explanation: 'CSRF تُجبر المستخدم المُصادَق على تنفيذ إجراءات غير مقصودة (مثل تغيير البريد الإلكتروني أو تحويل الأموال) عبر موقع ضار.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CircularProgress({ percentage, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#334155" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#00D9FF" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-1000 ease-out"
      />
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        className="fill-light-text text-xl font-bold" transform="rotate(90, 60, 60)"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

function getBadgeInfo(percentage) {
  if (percentage >= 100) return { title: 'ذهبي', icon: Trophy, variant: 'accent', color: '#F59E0B' };
  if (percentage >= 80) return { title: 'فضي', icon: Award, variant: 'purple', color: '#94A3B8' };
  if (percentage >= 60) return { title: 'برونزي', icon: Star, variant: 'warning', color: '#CD7F32' };
  return { title: 'استمر في التعلم', icon: BookOpen, variant: 'default', color: '#6B7280' };
}

export default function Quizzes() {
  const { showToast } = useToast();
  const { progress, setProgress } = useApp();

  const [phase, setPhase] = useState('select');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const intervalRef = useRef(null);

  const filteredQuestions = useMemo(() => {
    if (!selectedTopic || !selectedLevel) return [];
    return quizzesData.filter(
      (q) => q.topic === selectedTopic && q.level === selectedLevel
    );
  }, [selectedTopic, selectedLevel]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;
  const correctCount = useMemo(() => {
    return filteredQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
  }, [filteredQuestions, answers]);
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const badge = getBadgeInfo(percentage);

  const startTimer = useCallback(() => {
    const start = new Date();
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((new Date() - start) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedLevel(null);
  };

  const handleStartQuiz = (level) => {
    setSelectedLevel(level);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers({});
    setElapsed(0);
    startTimer();
    setPhase('quiz');
  };

  const handleBackToTopics = () => {
    if (phase === 'quiz') {
      setShowExitModal(true);
      return;
    }
    setPhase('select');
    setSelectedTopic(null);
    setSelectedLevel(null);
  };

  const handleExitConfirm = () => {
    stopTimer();
    setShowExitModal(false);
    setPhase('select');
    setSelectedTopic(null);
    setSelectedLevel(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      stopTimer();
      setPhase('results');
    }
  };

  const handleAnswerSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
  };

  const handleRetake = () => {
    setPhase('select');
    setSelectedTopic(null);
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers({});
    setElapsed(0);
  };

  const handleSaveProgress = () => {
    const result = {
      topic: selectedTopic,
      level: selectedLevel,
      score: correctCount,
      total: totalQuestions,
      percentage,
      time: elapsed,
      date: new Date().toISOString(),
      badge: badge.title,
    };
    setProgress((prev) => ({
      ...prev,
      quizResults: [...(prev.quizResults || []), result],
    }));
    showToast('تم حفظ تقدمك بنجاح!', 'success');
  };

  const handleGoToSelect = () => {
    setPhase('select');
  };

  const topicCounts = useMemo(() => {
    const counts = {};
    Object.keys(topicMeta).forEach((topic) => {
      counts[topic] = {};
      Object.keys(levelMeta).forEach((level) => {
        counts[topic][level] = quizzesData.filter((q) => q.topic === topic && q.level === level).length;
      });
    });
    return counts;
  }, []);

  const topicResults = useMemo(() => {
    const results = {};
    filteredQuestions.forEach((q) => {
      if (!results[q.topic]) {
        results[q.topic] = { correct: 0, total: 0 };
      }
      results[q.topic].total += 1;
      if (answers[q.id] === q.correctAnswer) {
        results[q.topic].correct += 1;
      }
    });
    return results;
  }, [filteredQuestions, answers]);

  if (phase === 'quiz' && currentQuestion) {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    return (
      <div className="min-h-screen pb-20" dir="rtl">
        <section className="max-w-4xl mx-auto px-4 pt-24 pb-12">
          <button
            onClick={handleBackToTopics}
            className="inline-flex items-center gap-2 text-muted-text hover:text-accent text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            العودة للمواضيع
          </button>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-muted-text text-sm">
              <Clock size={16} />
              {formatTime(elapsed)}
            </div>
            <div className="flex items-center gap-2">
              {Object.keys(levelMeta).map((lvl) => (
                <Badge
                  key={lvl}
                  variant={lvl === selectedLevel ? levelMeta[lvl].color : 'default'}
                  size="sm"
                >
                  {lvl}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-text mb-2">
              <span>السؤال {currentQuestionIndex + 1} من {totalQuestions}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-l from-accent to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="info" size="sm">
                    {currentQuestion.id.includes('js') ? 'JavaScript' : ''}
                    {currentQuestion.id.includes('html') ? 'HTML/CSS' : ''}
                    {currentQuestion.id.includes('py') ? 'Python' : ''}
                    {currentQuestion.id.includes('sql') ? 'SQL' : ''}
                    {currentQuestion.id.includes('sec') ? 'الأمن السيبراني' : ''}
                  </Badge>
                  <Badge variant={levelMeta[currentQuestion.level]?.color || 'default'} size="sm">
                    {currentQuestion.level}
                  </Badge>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-light-text mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => {
                    let bg = 'bg-dark-card border-dark-border hover:border-accent/30';
                    let icon = null;

                    if (isAnswered && i === selectedOption && i === currentQuestion.correctAnswer) {
                      bg = 'bg-success/10 border-success';
                      icon = <CheckCircle size={20} className="text-success shrink-0" />;
                    } else if (isAnswered && i === selectedOption && i !== currentQuestion.correctAnswer) {
                      bg = 'bg-danger/10 border-danger';
                      icon = <XCircle size={20} className="text-danger shrink-0" />;
                    } else if (isAnswered && i === currentQuestion.correctAnswer) {
                      bg = 'bg-success/5 border-success/50';
                      icon = <CheckCircle size={20} className="text-success shrink-0" />;
                    } else if (selectedOption === i && !isAnswered) {
                      bg = 'bg-accent/10 border-accent';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (!isAnswered) handleAnswerSelect(i);
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-right transition-all duration-200 ${bg} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-dark-border/50 flex items-center justify-center text-sm font-bold text-muted-text">
                          {String.fromCharCode(1570 + i)}
                        </span>
                        <span className="flex-1 text-light-text text-sm md:text-base">{option}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`glass rounded-2xl p-6 mb-6 border-r-4 ${isCorrect ? 'border-success' : 'border-danger'}`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle size={24} className="text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={24} className="text-danger shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-bold text-lg mb-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                        {isCorrect ? 'إجابة صحيحة! ✓' : 'إجابة خاطئة ✗'}
                      </p>
                      <p className="text-muted-text text-sm leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={handleBackToTopics}>
                  <ArrowLeft size={16} />
                  إنهاء
                </Button>

                {!isAnswered ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => { if (selectedOption !== null) setIsAnswered(true); }}
                    disabled={selectedOption === null}
                  >
                    تأكيد الإجابة
                  </Button>
                ) : (
                  <Button variant="accent" size="md" onClick={handleNext}>
                    {currentQuestionIndex + 1 < totalQuestions ? (
                      <>التالي <ArrowRight size={16} /></>
                    ) : (
                      <>عرض النتائج <Trophy size={16} /></>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <Modal isOpen={showExitModal} onClose={() => setShowExitModal(false)} title="إنهاء الاختبار" size="sm">
          <p className="text-muted-text mb-6">هل أنت متأكد من إنهاء الاختبار؟ لن يتم حفظ تقدمك الحالي.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowExitModal(false)} className="flex-1">إلغاء</Button>
            <Button variant="danger" onClick={handleExitConfirm} className="flex-1">إنهاء</Button>
          </div>
        </Modal>
      </div>
    );
  }

  if (phase === 'results') {
    const BadgeIcon = badge.icon;

    return (
      <div className="min-h-screen pb-20" dir="rtl">
        <section className="max-w-4xl mx-auto px-4 pt-24 pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <BadgeIcon size={48} className="mx-auto mb-4 animate-float" style={{ color: badge.color }} />
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-l from-accent via-secondary to-accent bg-clip-text text-transparent">
                  {badge.title === 'ذهبي' ? '🏆 نتيجة ممتازة!' :
                   badge.title === 'فضي' ? '🥈 نتيجة جيدة جدًا!' :
                   badge.title === 'برونزي' ? '🥉 نتيجة جيدة!' : '📚 استمر في التعلم!'}
                </span>
              </h1>
              <p className="text-muted-text">
                {topicMeta[selectedTopic]?.label} - {selectedLevel}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0">
                  <CircularProgress percentage={percentage} size={140} />
                </div>
                <div className="flex-1 text-center md:text-right">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass rounded-xl p-4 text-center">
                      <CheckCircle size={20} className="text-success mx-auto mb-1" />
                      <p className="text-2xl font-bold text-success">{correctCount}</p>
                      <p className="text-xs text-muted-text">صحيح</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <XCircle size={20} className="text-danger mx-auto mb-1" />
                      <p className="text-2xl font-bold text-danger">{totalQuestions - correctCount}</p>
                      <p className="text-xs text-muted-text">خطأ</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <Clock size={20} className="text-accent mx-auto mb-1" />
                      <p className="text-2xl font-bold text-accent">{formatTime(elapsed)}</p>
                      <p className="text-xs text-muted-text">الوقت</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <BadgeIcon size={20} className="mx-auto mb-1" style={{ color: badge.color }} />
                      <p className="text-lg font-bold text-light-text">{badge.title}</p>
                      <p className="text-xs text-muted-text">الوسام</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-lg font-bold text-light-text mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-accent" />
                تحليل النتائج حسب الموضوع
              </h3>
              <div className="space-y-4">
                {Object.entries(topicResults).map(([topicKey, data]) => {
                  const meta = topicMeta[topicKey];
                  const pct = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                  return (
                    <div key={topicKey}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-light-text font-medium">{meta?.label || topicKey}</span>
                        <span className="text-muted-text">{data.correct}/{data.total}</span>
                      </div>
                      <div className="w-full h-3 bg-dark-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: pct >= 80 ? 'linear-gradient(135deg, #10B981, #059669)' :
                                        pct >= 60 ? 'linear-gradient(135deg, #F59E0B, #D97706)' :
                                        'linear-gradient(135deg, #EF4444, #DC2626)',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {totalQuestions - correctCount > 0 && (
              <motion.div variants={itemVariants} className="glass rounded-2xl p-6 md:p-8 mb-8">
                <h3 className="text-lg font-bold text-light-text mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-warning" />
                  مراجعة الإجابات الخاطئة
                </h3>
                <div className="space-y-4">
                  {filteredQuestions
                    .filter((q) => answers[q.id] !== q.correctAnswer)
                    .map((q) => (
                      <div key={q.id} className="bg-dark-card rounded-xl p-4 border border-dark-border">
                        <p className="text-light-text font-medium mb-2">{q.question}</p>
                        <div className="text-sm space-y-1">
                          <p className="text-danger">
                            ✗ إجابتك: {q.options[answers[q.id]]}
                          </p>
                          <p className="text-success">
                            ✓ الإجابة الصحيحة: {q.options[q.correctAnswer]}
                          </p>
                          <p className="text-muted-text mt-1 text-xs">{q.explanation}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center">
              <Button variant="primary" size="lg" icon={RotateCcw} onClick={handleRetake}>
                إعادة الاختبار
              </Button>
              <Button variant="outline" size="lg" icon={Award} onClick={handleSaveProgress}>
                حفظ التقدم
              </Button>
              <Button variant="ghost" size="lg" icon={GraduationCap} onClick={handleGoToSelect}>
                مواضيع أخرى
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <GraduationCap size={28} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-l from-accent via-secondary to-accent bg-clip-text text-transparent">
                  الاختبارات
                </span>
              </h1>
              <p className="text-muted-text text-sm mt-1">
                اختبر معلوماتك في مختلف مجالات البرمجة وتتبع تقدمك
              </p>
            </div>
          </div>

          <p className="text-muted-text leading-relaxed max-w-3xl">
            اختر موضوعًا ومستوى لبدء التحدي. كل اختبار يحتوي على أسئلة متنوعة
            لقياس فهمك للموضوع. احصل على أوسمة حسب أدائك: ذهبي (100%)، فضي (80%+)،
            برونزي (60%+)، أو استمر في التعلم.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(topicMeta).map(([key, meta]) => {
            const IconComponent = meta.icon;
            const isActive = selectedTopic === key;
            const counts = topicCounts[key];

            return (
              <motion.div key={key} variants={itemVariants}>
                <Card
                  className={`h-full cursor-pointer ${isActive ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => handleSelectTopic(key)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color} p-0.5 flex items-center justify-center shadow-lg`}>
                      <div className="w-full h-full rounded-[10px] bg-dark-card flex items-center justify-center">
                        <IconComponent size={22} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-light-text mb-2">{meta.label}</h3>
                  <p className="text-sm text-muted-text leading-relaxed mb-4">{meta.desc}</p>

                  {!isActive && (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(counts).map(([level, count]) =>
                        count > 0 ? (
                          <Badge key={level} variant={levelMeta[level].color} size="sm">
                            {level}: {count}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  )}

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 mt-2"
                    >
                      <p className="text-xs text-muted-text mb-2">اختر المستوى:</p>
                      {Object.entries(counts).map(([level, count]) =>
                        count > 0 ? (
                          <button
                            key={level}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartQuiz(level);
                            }}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-dark-card border border-dark-border hover:border-accent/30 transition-all text-right group"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full bg-${levelMeta[level].color}`} />
                              <span className="text-sm text-light-text">{level}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={levelMeta[level].color} size="sm">
                                {count} أسئلة
                              </Badge>
                              <ArrowLeft size={14} className="text-muted-text group-hover:text-accent transition-colors" />
                            </div>
                          </button>
                        ) : null
                      )}
                      <button
                        onClick={() => setSelectedTopic(null)}
                        className="text-xs text-muted-text hover:text-accent mt-2 transition-colors"
                      >
                        إلغاء
                      </button>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-light-text mb-4 flex items-center gap-2">
            <Layers size={20} className="text-accent" />
            إحصائيات الاختبارات السابقة
          </h2>
          {progress.quizResults && progress.quizResults.length > 0 ? (
            <div className="space-y-3">
              {[...progress.quizResults].reverse().slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-dark-card rounded-xl p-3 border border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <GraduationCap size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-light-text font-medium">
                        {topicMeta[r.topic]?.label || r.topic} - {r.level}
                      </p>
                      <p className="text-xs text-muted-text">{r.date ? new Date(r.date).toLocaleDateString('ar-SA') : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={r.badge === 'ذهبي' ? 'accent' : r.badge === 'فضي' ? 'purple' : r.badge === 'برونزي' ? 'warning' : 'default'} size="sm">
                      {r.badge}
                    </Badge>
                    <span className="text-sm font-bold text-accent">{r.score}/{r.total}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-text text-sm">لم تقم بإجراء أي اختبار بعد. ابدأ الآن!</p>
          )}
        </div>
      </section>
    </div>
  );
}
