import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, X, ChevronDown, ChevronUp,
  Play, RotateCcw, Copy, Lightbulb, Lock, Unlock,
  BookOpen, Code, Target, Star,
  ExternalLink, Clock, Shield,
  Key, Globe,
  Layers, Zap,
  CheckCircle, Circle, Award,
  ChevronLeft, List,
  FlaskConical,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/common/Toast';
import { securityCategories, difficultyConfigMap } from '../data/securityLabsData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

function DifficultyBadge({ difficulty }) {
  const config = difficultyConfigMap[difficulty] || difficultyConfigMap.beginner;
  return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
}

function DifficultyStars({ difficulty }) {
  const config = difficultyConfigMap[difficulty] || difficultyConfigMap.beginner;
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= config.stars ? 'text-warning fill-warning' : 'text-dark-border'}
        />
      ))}
    </div>
  );
}

function getCategoryById(id) {
  return securityCategories.find((c) => c.id === id);
}

function getLabById(categoryId, labId) {
  const category = getCategoryById(categoryId);
  if (!category) return null;
  return category.labs.find((l) => l.id === labId) || null;
}

function CodeBlock({ code, language = 'javascript' }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('تم نسخ الكود', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-dark-border bg-dark-bg">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-card/80 border-b border-dark-border">
        <span className="text-xs text-muted-text font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-text hover:text-accent transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'تم النسخ' : 'نسخ'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-light-text" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CodeEditor({ value, onChange, placeholder, readOnly = false }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      dir="ltr"
      className="w-full h-full min-h-[320px] p-5 bg-dark-bg border border-dark-border rounded-xl text-light-text font-mono text-sm resize-none focus:border-accent/50 focus:outline-none transition-colors leading-relaxed"
      style={{ direction: 'ltr', textAlign: 'left' }}
      spellCheck={false}
    />
  );
}

function OutputPanel({ outputs, expectedOutput, showComparison }) {
  const outputLines = Array.isArray(outputs) ? outputs : (outputs ? outputs.split('\n') : []);

  return (
    <div className="space-y-4">
      <div className="w-full min-h-[200px] p-5 bg-dark-bg border border-dark-border rounded-xl font-mono text-sm overflow-auto">
        {outputLines.length === 0 ? (
          <span className="text-muted-text">شغّل الكود لرؤية النتائج</span>
        ) : (
          outputLines.map((line, i) => {
            let colorClass = 'text-light-text';
            if (line.includes('خطأ') || line.includes('❌') || line.includes('🔴')) {
              colorClass = 'text-danger';
            } else if (line.includes('✅') || line.includes('🟢')) {
              colorClass = 'text-success';
            } else if (line.includes('⚠️') || line.includes('🟡')) {
              colorClass = 'text-warning';
            } else if (line.includes('💡') || line.includes('ℹ️')) {
              colorClass = 'text-accent';
            } else if (line.startsWith('>') || line.startsWith('//')) {
              colorClass = 'text-muted-text';
            }
            return (
              <div key={i} className={`py-0.5 whitespace-pre-wrap ${colorClass}`}>
                {line}
              </div>
            );
          })
        )}
      </div>

      {showComparison && expectedOutput && outputs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-dark-border bg-dark-card"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-accent" />
            <span className="text-sm font-bold text-light-text">مقارنة المخرجات المتوقعة</span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-xs text-muted-text">المخرجات الفعلية:</span>
              <pre className="mt-1 p-2 bg-dark-bg rounded-lg text-xs font-mono text-light-text" dir="ltr">
                {outputLines.join('\n') || '(فارغ)'}
              </pre>
            </div>
            <div>
              <span className="text-xs text-muted-text">المخرجات المتوقعة:</span>
              <pre className="mt-1 p-2 bg-dark-bg rounded-lg text-xs font-mono text-accent" dir="ltr">
                {expectedOutput}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ValidationCheckItem({ check, index, onCheck, result }) {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    setIsChecking(true);
    await new Promise((r) => setTimeout(r, 500));
    onCheck(index);
    setIsChecking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-xl border transition-all duration-300 ${
        result === null
          ? 'border-dark-border bg-dark-card/50'
          : result
          ? 'border-success/30 bg-success/5'
          : 'border-danger/30 bg-danger/5'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-light-text">{check.label}</span>
            {result !== null && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {result ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <X size={16} className="text-danger" />
                )}
              </motion.span>
            )}
          </div>
          <p className="text-xs text-muted-text">{check.hint}</p>
        </div>
        <Button
          variant={result !== null ? (result ? 'outline' : 'danger') : 'outline'}
          size="sm"
          icon={result !== null ? (result ? Check : X) : Target}
          onClick={handleCheck}
          loading={isChecking}
          disabled={result !== null}
        >
          {result !== null ? (result ? 'نجاح' : 'فشل') : 'تحقق'}
        </Button>
      </div>
    </motion.div>
  );
}

function HintItem({ hints, revealedIndex, onReveal }) {
  const [expanded, setExpanded] = useState(false);

  const currentHint = revealedIndex < hints.length ? hints[revealedIndex] : null;
  const allRevealed = revealedIndex >= hints.length;

  return (
    <div className="space-y-3">
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (!expanded && !allRevealed && revealedIndex === 0) {
            onReveal();
          }
        }}
        className="flex items-center gap-2 w-full p-4 rounded-xl border border-dark-border bg-dark-card/50 hover:border-accent/30 transition-all"
      >
        <Lightbulb size={18} className="text-warning shrink-0" />
        <span className="flex-1 text-sm font-medium text-light-text text-right">
          {expanded ? 'إخفاء المساعدات' : 'عرض المساعدات'}
        </span>
        <span className="text-xs text-muted-text">
          {allRevealed ? 'جميع المساعدات ظهرت' : `${revealedIndex + 1}/${hints.length}`}
        </span>
        {expanded ? <ChevronUp size={16} className="text-muted-text" /> : <ChevronDown size={16} className="text-muted-text" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            {hints.map((hint, i) => {
              const isRevealed = i <= revealedIndex;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isRevealed ? 1 : 0.5, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isRevealed
                      ? 'bg-warning/5 border-warning/20'
                      : 'bg-dark-card/30 border-dark-border opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isRevealed ? 'bg-warning/20 text-warning' : 'bg-dark-border text-muted-text'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isRevealed ? 'text-light-text' : 'text-muted-text'}`}>
                        {isRevealed ? hint : '🔒 اضغط على "كشف" لإظهار المساعدة'}
                      </p>
                      {!isRevealed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Unlock}
                          onClick={() => onReveal(i)}
                          className="mt-2"
                        >
                          كشف المساعدة
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SolutionSection({ solutionCode }) {
  const [expanded, setExpanded] = useState(false);
  const { showToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(solutionCode);
    showToast('تم نسخ الحل', 'success');
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 w-full p-4 rounded-xl border transition-all ${
          expanded
            ? 'border-accent/30 bg-accent/5'
            : 'border-dark-border bg-dark-card/50 hover:border-accent/30'
        }`}
      >
        <Lock size={18} className={expanded ? 'text-accent' : 'text-muted-text'} />
        <span className="flex-1 text-sm font-medium text-light-text text-right">
          {expanded ? 'إخفاء الحل' : 'عرض الحل النموذجي'}
        </span>
        {expanded ? <ChevronUp size={16} className="text-muted-text" /> : <ChevronDown size={16} className="text-muted-text" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-text">الحل النموذجي</span>
              <Button variant="ghost" size="sm" icon={Copy} onClick={handleCopy}>
                نسخ الحل
              </Button>
            </div>
            <CodeBlock code={solutionCode} language="javascript" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResourceCard({ resource, index }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl border border-dark-border bg-dark-card/50 hover:border-accent/30 hover:bg-accent/5 transition-all group"
    >
      <ExternalLink size={14} className="text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
      <span className="flex-1 text-sm text-light-text group-hover:text-accent transition-colors text-right">{resource.title}</span>
      <span className="text-xs text-muted-text">رابط</span>
    </motion.a>
  );
}

function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? 'bg-accent/10 text-accent border border-accent/30 shadow-sm shadow-accent/5'
          : 'text-muted-text hover:text-light-text border border-transparent hover:border-dark-border'
      }`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function TheoryTab({ section, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-dark-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 w-full p-4 bg-dark-card/50 hover:bg-dark-card transition-colors"
      >
        <BookOpen size={18} className="text-accent shrink-0" />
        <span className="flex-1 text-sm font-bold text-light-text text-right">{section.title}</span>
        {expanded ? <ChevronUp size={16} className="text-muted-text" /> : <ChevronDown size={16} className="text-muted-text" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 border-t border-dark-border space-y-4">
              <p className="text-sm text-light-text leading-relaxed whitespace-pre-line">{section.content}</p>
              {section.codeExample && (
                <CodeBlock code={section.codeExample} language="sql" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LabSidebar({ category, currentLabId, onLabClick }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-dark-border rounded-xl bg-dark-card/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 border-b border-dark-border/50"
      >
        <div className="flex items-center gap-2">
          <List size={16} className="text-accent" />
          <span className="text-sm font-bold text-light-text">مختبرات {category.title}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-text" /> : <ChevronDown size={16} className="text-muted-text" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="divide-y divide-dark-border/30"
          >
            {category.labs.map((lab) => {
              const isActive = lab.id === currentLabId;
              return (
                <button
                  key={lab.id}
                  onClick={() => onLabClick(lab.id)}
                  className={`flex items-center gap-3 w-full p-3 text-right transition-all ${
                    isActive
                      ? 'bg-accent/5 border-r-2 border-accent'
                      : 'hover:bg-dark-card'
                  }`}
                >
                  <div className={`shrink-0 w-2 h-2 rounded-full ${
                    isActive ? 'bg-accent' : 'bg-dark-border'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm block truncate ${
                      isActive ? 'text-accent font-medium' : 'text-muted-text'
                    }`}>
                      {lab.title}
                    </span>
                    <span className="text-[10px] text-muted-text">{lab.duration}</span>
                  </div>
                  <DifficultyBadge difficulty={lab.difficulty} />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryView({ onSelectCategory }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-muted-text hover:text-light-text hover:bg-dark-card transition-all border border-transparent hover:border-dark-border mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">العودة للمختبرات</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-light-text mb-2">مختبرات الأمن السيبراني</h1>
        <p className="text-muted-text text-sm leading-relaxed max-w-2xl">
          مختبرات تفاعلية لتعلم أمن المعلومات والأمن السيبراني. اختر مساراً لتبدأ التدريب العملي على الثغرات والهجمات والحماية.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Card
                hover
                className="cursor-pointer"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center`}>
                    <Icon size={28} className={category.textColor} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-light-text">{category.title}</h3>
                      <Badge variant={category.badgeVariant} size="sm">{category.labs.length} مختبرات</Badge>
                    </div>
                    <p className="text-sm text-muted-text leading-relaxed">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {category.labs.slice(0, 4).map((lab) => (
                    <div key={lab.id} className="flex items-center gap-2 p-2 rounded-lg bg-dark-bg/50 border border-dark-border/50">
                      <FlaskConical size={12} className="text-accent shrink-0" />
                      <span className="text-xs text-light-text truncate">{lab.title}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function LabListView({ category, onSelectLab, onBack }) {
  const Icon = category.icon;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-muted-text hover:text-light-text hover:bg-dark-card transition-all border border-transparent hover:border-dark-border"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">التصنيفات</span>
          </button>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className={`shrink-0 w-16 h-16 rounded-2xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center`}>
            <Icon size={32} className={category.textColor} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-light-text mb-1">{category.title}</h1>
            <p className="text-sm text-muted-text leading-relaxed max-w-xl">{category.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={category.badgeVariant} size="sm">
                {category.labs.length} مختبرات
              </Badge>
              <span className="text-xs text-muted-text">
                {category.labs.filter((l) => l.difficulty === 'beginner').length} مبتدئ
                {' | '}
                {category.labs.filter((l) => l.difficulty === 'intermediate').length} متوسط
                {' | '}
                {category.labs.filter((l) => l.difficulty === 'advanced').length} متقدم
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.labs.map((lab, i) => (
          <motion.div key={lab.id} variants={itemVariants} transition={{ delay: i * 0.05 }}>
            <Card
              hover
              className="cursor-pointer h-full"
              onClick={() => onSelectLab(lab.id)}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-light-text">{lab.title}</h3>
                  <DifficultyBadge difficulty={lab.difficulty} />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Clock size={12} className="text-muted-text" />
                  <span className="text-xs text-muted-text">{lab.duration}</span>
                </div>
              </div>

              <p className="text-sm text-muted-text leading-relaxed line-clamp-2 mb-3">{lab.description}</p>

              <div className="flex items-center gap-2">
                <DifficultyStars difficulty={lab.difficulty} />
                <span className="text-xs text-muted-text">|</span>
                <span className="text-xs text-muted-text">{lab.learningObjectives.length} أهداف</span>
                <span className="text-xs text-muted-text">|</span>
                <span className="text-xs text-muted-text">{lab.validationChecks.length} تحقق</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

let labExecutionCache = {};

function LabDetailView({ category, lab, onBackToCategory, onNavigateLab }) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('theory');
  const [userCode, setUserCode] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [validationResults, setValidationResults] = useState({});
  const [hintRevealIndex, setHintRevealIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState([]);

  useEffect(() => {
    setUserCode(lab.starterCode);
    setOutputs([]);
    setValidationResults({});
    setHintRevealIndex(-1);
    setShowSolution(false);
    setCompletedObjectives([]);
    setActiveTab('theory');
    labExecutionCache = {};
  }, [lab.id]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutputs([]);

    setTimeout(() => {
      try {
        const captured = [];
        const mockLog = (...args) => {
          captured.push(args.map((a) => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
        };
        const fn = new Function('console', userCode);
        fn({ log: mockLog, warn: mockLog, error: (...args) => captured.push(`خطأ: ${args.map(String).join(' ')}`) });

        if (captured.length === 0) {
          captured.push('(تم تنفيذ الكود بنجاح)');
        }

        setOutputs(captured);
        labExecutionCache = { outputs: captured, code: userCode };
        showToast('تم تنفيذ الكود بنجاح', 'success');
      } catch (err) {
        setOutputs([`خطأ: ${err.message}`]);
        labExecutionCache = { outputs: [`خطأ: ${err.message}`], code: userCode };
        showToast('حدث خطأ في تنفيذ الكود', 'error');
      }
      setIsRunning(false);
    }, 300);
  }, [userCode, showToast]);

  const handleValidationCheck = useCallback((index) => {
    const check = lab.validationChecks[index];
    if (!check) return;

    const codeToCheck = userCode;
    let passed = false;
    try {
      passed = check.check(codeToCheck);
    } catch {
      passed = false;
    }

    setValidationResults((prev) => ({ ...prev, [index]: passed }));

    if (passed) {
      showToast(`✅ ${check.label}: نجح`, 'success');
    } else {
      showToast(`❌ ${check.label}: لم ينجح - ${check.hint}`, 'warning');
    }
  }, [userCode, lab.validationChecks, showToast]);

  const handleRunAllValidations = useCallback(() => {
    const results = {};
    lab.validationChecks.forEach((check, index) => {
      try {
        results[index] = check.check(userCode);
      } catch {
        results[index] = false;
      }
    });
    setValidationResults(results);

    const passedCount = Object.values(results).filter(Boolean).length;
    showToast(`التحقق: ${passedCount}/${lab.validationChecks.length} نجح`, passedCount === lab.validationChecks.length ? 'success' : 'warning');
  }, [userCode, lab.validationChecks, showToast]);

  const handleRevealHint = useCallback((index) => {
    setHintRevealIndex((prev) => Math.max(prev, index));
    showToast(`تم كشف المساعدة ${index + 1}`, 'info');
  }, [showToast]);

  const handleCopyCode = useCallback((content) => {
    navigator.clipboard.writeText(content);
    showToast('تم النسخ إلى الحافظة', 'success');
  }, [showToast]);

  const handleResetCode = useCallback(() => {
    setUserCode(lab.starterCode);
    setOutputs([]);
    setValidationResults({});
    showToast('تم إعادة تعيين الكود', 'info');
  }, [lab.starterCode, showToast]);

  const toggleCompletedObjective = useCallback((index) => {
    setCompletedObjectives((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const validationPassedCount = Object.values(validationResults).filter(Boolean).length;
  const totalValidationCount = lab.validationChecks.length;
  const validationProgress = totalValidationCount > 0 ? (validationPassedCount / totalValidationCount) * 100 : 0;

  const tabs = [
    { id: 'theory', label: 'النظرية', icon: BookOpen },
    { id: 'exercise', label: 'التمرين', icon: Code },
    { id: 'validation', label: 'التحقق', icon: Target },
    { id: 'hints', label: 'مساعدات', icon: Lightbulb },
    { id: 'solution', label: 'الحل', icon: Lock },
    { id: 'resources', label: 'موارد', icon: ExternalLink },
  ];

  const labIndex = category.labs.findIndex((l) => l.id === lab.id);
  const prevLab = labIndex > 0 ? category.labs[labIndex - 1] : null;
  const nextLab = labIndex < category.labs.length - 1 ? category.labs[labIndex + 1] : null;

  return (
    <motion.div
      key={lab.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToCategory}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-muted-text hover:text-light-text hover:bg-dark-card transition-all border border-transparent hover:border-dark-border"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">{category.title}</span>
            </button>
            <ChevronLeft size={14} className="text-dark-border" />
            <span className="text-sm text-accent">{lab.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {prevLab && (
              <Button
                variant="ghost"
                size="sm"
                icon={ChevronRight}
                onClick={() => navigate(`/security-labs/${category.id}/${prevLab.id}`)}
              >
                السابق
              </Button>
            )}
            {nextLab && (
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => navigate(`/security-labs/${category.id}/${nextLab.id}`)}
              >
                التالي
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dark-border rounded-xl bg-dark-card/50 overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-light-text">{lab.title}</h1>
                    <DifficultyBadge difficulty={lab.difficulty} />
                  </div>
                  <p className="text-sm text-muted-text leading-relaxed">{lab.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-accent" />
                    <span className="text-sm text-light-text">{lab.duration}</span>
                  </div>
                  <DifficultyStars difficulty={lab.difficulty} />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-bold text-light-text mb-2 flex items-center gap-2">
                  <Target size={14} className="text-accent" />
                  أهداف التعلم
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {lab.learningObjectives.map((obj, i) => {
                    const isCompleted = completedObjectives.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleCompletedObjective(i)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-border/30 transition-colors text-right group"
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-success shrink-0" />
                        ) : (
                          <Circle size={16} className="text-muted-text shrink-0 group-hover:text-accent transition-colors" />
                        )}
                        <span className={`text-sm ${isCompleted ? 'text-success line-through opacity-70' : 'text-light-text'}`}>
                          {obj}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 border-b border-dark-border pb-3 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                icon={tab.icon}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'theory' && (
                <div className="space-y-4">
                  {lab.theory.map((section, i) => (
                    <TheoryTab key={i} section={section} index={i} />
                  ))}
                </div>
              )}

              {activeTab === 'exercise' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-sm font-medium text-light-text">محرر الأكواد</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleResetCode}>
                        إعادة تعيين
                      </Button>
                      <Button variant="ghost" size="sm" icon={Copy} onClick={() => handleCopyCode(userCode)}>
                        نسخ
                      </Button>
                      <Button variant="primary" size="sm" icon={Play} loading={isRunning} onClick={runCode}>
                        تشغيل
                      </Button>
                    </div>
                  </div>

                  <div className="min-h-[360px]">
                    <CodeEditor
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="// اكتب كودك هنا..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-light-text">المخرجات</span>
                      {outputs.length > 0 && (
                        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setOutputs([])}>
                          مسح
                        </Button>
                      )}
                    </div>
                    <OutputPanel
                      outputs={outputs}
                      expectedOutput={lab.expectedOutput}
                      showComparison={outputs.length > 0}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'validation' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-light-text">فحوصات التحقق</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden w-32 max-w-[200px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${validationProgress}%` }}
                            className="h-full bg-gradient-accent rounded-full"
                          />
                        </div>
                        <span className="text-xs text-muted-text">
                          {validationPassedCount}/{totalValidationCount}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Layers}
                      onClick={handleRunAllValidations}
                    >
                      تشغيل الكل
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {lab.validationChecks.map((check, i) => (
                      <ValidationCheckItem
                        key={check.id}
                        check={check}
                        index={i}
                        onCheck={handleValidationCheck}
                        result={validationResults[i] !== undefined ? validationResults[i] : null}
                      />
                    ))}
                  </div>

                  {validationPassedCount > 0 && validationPassedCount === totalValidationCount && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-xl bg-success/10 border border-success/30 text-center"
                    >
                      <Award size={40} className="mx-auto mb-2 text-success" />
                      <p className="text-success font-bold text-lg">ممتاز! اجتزت جميع فحوصات التحقق!</p>
                      <p className="text-success/70 text-sm mt-1">أنت مستعد للانتقال إلى التحدي التالي</p>
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'hints' && (
                <HintItem
                  hints={lab.hints}
                  revealedIndex={hintRevealIndex}
                  onReveal={handleRevealHint}
                />
              )}

              {activeTab === 'solution' && (
                <div className="space-y-6">
                  <SolutionSection solutionCode={lab.solutionCode} />
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl border border-accent/20 bg-accent/5"
                  >
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-light-text mb-1">{lab.realWorldUse.title}</h3>
                        <p className="text-sm text-muted-text leading-relaxed">{lab.realWorldUse.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  <div>
                    <h3 className="text-sm font-bold text-light-text mb-3 flex items-center gap-2">
                      <ExternalLink size={14} className="text-accent" />
                      المصادر والروابط
                    </h3>
                    <div className="space-y-2">
                      {lab.resources.map((resource, i) => (
                        <ResourceCard key={i} resource={resource} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <LabSidebar
            category={category}
            currentLabId={lab.id}
            onLabClick={(labId) => {
              navigate(`/security-labs/${category.id}/${labId}`);
            }}
          />

          <div className="border border-dark-border rounded-xl bg-dark-card/50 p-4 space-y-3">
            <h3 className="text-sm font-bold text-light-text flex items-center gap-2">
              <Zap size={14} className="text-accent" />
              تقدمك
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-text">التحقق</span>
                <span className="text-light-text">{validationPassedCount}/{totalValidationCount}</span>
              </div>
              <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${validationProgress}%` }}
                  className="h-full bg-gradient-accent rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-text">الأهداف</span>
                <span className="text-light-text">{completedObjectives.length}/{lab.learningObjectives.length}</span>
              </div>
              <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedObjectives.length / lab.learningObjectives.length) * 100}%` }}
                  className="h-full bg-gradient-accent rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SecurityLabRunner() {
  const { categoryId, labId } = useParams();
  const navigate = useNavigate();
  const { theme } = useApp();

  const hasCategory = categoryId && categoryId !== 'undefined';
  const hasLab = labId && labId !== 'undefined';
  const category = hasCategory ? getCategoryById(categoryId) : null;
  const lab = hasLab && category ? getLabById(categoryId, labId) : null;

  useEffect(() => {
    if ((categoryId && !category) || (labId && !lab)) {
      navigate('/security-labs', { replace: true });
    }
  }, [categoryId, labId, category, lab, navigate]);

  const handleSelectCategory = (id) => {
    navigate(`/security-labs/${id}`);
  };

  const handleBackToCategories = () => {
    navigate('/security-labs');
  };

  const handleSelectLab = (lId) => {
    navigate(`/security-labs/${categoryId}/${lId}`);
  };

  return (
    <div className="min-h-screen pb-24">
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {!hasCategory && (
          <CategoryView onSelectCategory={handleSelectCategory} />
        )}

        {hasCategory && category && !hasLab && (
          <LabListView
            category={category}
            onSelectLab={handleSelectLab}
            onBack={handleBackToCategories}
          />
        )}

        {hasCategory && category && hasLab && lab && (
          <LabDetailView
            category={category}
            lab={lab}
            onBackToCategory={() => navigate(`/security-labs/${categoryId}`)}
            onNavigateLab={handleSelectLab}
          />
        )}
      </section>
    </div>
  );
}
