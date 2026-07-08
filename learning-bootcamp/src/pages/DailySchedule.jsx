import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, ChevronRight, ChevronLeft, CheckCircle, Circle,
  Clock, Target, BookOpen, FileText, Flame, TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressTracker from '../components/visualization/ProgressTracker';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import scheduleData from '../data/scheduleData';
import roadmapData from '../data/roadmapData';

const pathColors = {
  backend: '#2563EB',
  frontend: '#10B981',
  security: '#EF4444',
  python: '#F59E0B',
  projects: '#7C3AED',
  break: '#64748B',
  review: '#F59E0B',
};

const pathBgColors = {
  backend: 'bg-[#2563EB]/10',
  frontend: 'bg-[#10B981]/10',
  security: 'bg-[#EF4444]/10',
  python: 'bg-[#F59E0B]/10',
  projects: 'bg-[#7C3AED]/10',
  break: 'bg-[#64748B]/10',
  review: 'bg-[#F59E0B]/10',
};

const pathBadgeVariants = {
  backend: 'info',
  frontend: 'success',
  security: 'danger',
  python: 'warning',
  projects: 'purple',
  break: 'default',
  review: 'warning',
};

const difficultyBadgeMap = {
  'سهل': { variant: 'success', label: 'سهل' },
  'متوسط': { variant: 'warning', label: 'متوسط' },
  'صعب': { variant: 'danger', label: 'صعب' },
};

function getPrimaryPathForDay(day) {
  if (!day || !day.timeBlocks) return null;
  const nonBreak = day.timeBlocks.find(
    (tb) => tb.path !== 'break' && tb.path !== 'review'
  );
  return nonBreak ? nonBreak.path : null;
}

function CalendarGrid({ days, selectedDay, onSelectDay, completedDays }) {
  const today = new Date();
  const currentDay = today.getDate();

  return (
    <div className="grid grid-cols-5 gap-2">
      {days.map((day) => {
        const isSelected = selectedDay?.day === day.day;
        const isCompleted = completedDays.includes(day.day);
        const primaryPath = getPrimaryPathForDay(day);
        const dayColor = primaryPath ? pathColors[primaryPath] : '#334155';
        const isToday = day.day === currentDay;

        return (
          <motion.button
            key={day.day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day.day * 0.02 }}
            onClick={() => onSelectDay(day)}
            className={`
              relative flex flex-col items-center justify-center p-2 rounded-xl
              transition-all duration-200 min-h-[70px]
              ${isSelected
                ? 'border-2 shadow-lg'
                : 'border border-dark-border hover:border-accent/40'
              }
              ${isCompleted ? 'bg-success/5' : 'bg-dark-card'}
            `}
            style={{
              borderColor: isSelected ? dayColor : undefined,
              boxShadow: isSelected ? `0 0 20px ${dayColor}25` : undefined,
            }}
          >
            {isToday && (
              <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <span className="text-[8px] text-dark-bg font-bold">•</span>
              </div>
            )}
            <span className={`text-sm font-bold mb-1 ${isToday ? 'text-accent' : 'text-light-text'}`}>
              {day.day}
            </span>
            {primaryPath && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: dayColor }}
              />
            )}
            {isCompleted && (
              <CheckCircle size={12} className="text-success absolute top-1 right-1" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function DayDetailPanel({ day, onClose, progress, markDayComplete, markTaskComplete, addNote }) {
  const isCompleted = day ? progress.completedDays.includes(day.day) : false;
  const dayNotes = day ? progress.notes[day.day] || '' : '';
  const [noteText, setNoteText] = useState(dayNotes);
  const [showNoteSaved, setShowNoteSaved] = useState(false);

  if (!day) return null;

  const diffInfo = difficultyBadgeMap[day.difficulty] || { variant: 'default', label: day.difficulty };

  const handleToggleTask = (taskIndex) => {
    markTaskComplete(day.day, taskIndex);
  };

  const handleSaveNote = () => {
    addNote(day.day, noteText);
    setShowNoteSaved(true);
    setTimeout(() => setShowNoteSaved(false), 2000);
  };

  const handleCompleteDay = () => {
    markDayComplete(day.day);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-border/50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
            <div>
              <h3 className="text-xl font-bold text-light-text">{day.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-text">{day.date}</span>
                <span className="text-muted-text">·</span>
                <Badge variant={diffInfo.variant} size="sm">{diffInfo.label}</Badge>
                <span className="text-muted-text">·</span>
                <span className="text-sm text-accent">الأسبوع {day.week}</span>
              </div>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="success" size="md">
              <CheckCircle size={14} className="ml-1" />
              مكتمل
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-muted-text text-sm">
          <Clock size={16} />
          <span>{day.totalHours} ساعات</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-light-text mb-3 flex items-center gap-2">
            <Target size={16} className="text-accent" />
            الأهداف
          </h4>
          <ul className="space-y-2">
            {day.milestones.map((milestone, i) => {
              const taskKey = `${day.day}-${i}`;
              const isTaskDone = progress.completedTasks.includes(taskKey);
              return (
                <li key={i}>
                  <button
                    onClick={() => handleToggleTask(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-right transition-all duration-200 ${
                      isTaskDone
                        ? 'bg-success/5 border border-success/20'
                        : 'bg-dark-bg border border-dark-border hover:border-accent/30'
                    }`}
                  >
                    {isTaskDone ? (
                      <CheckCircle size={18} className="text-success shrink-0" />
                    ) : (
                      <Circle size={18} className="text-muted-text shrink-0" />
                    )}
                    <span className={`text-sm ${isTaskDone ? 'text-success line-through' : 'text-light-text'}`}>
                      {milestone}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-light-text mb-3 flex items-center gap-2">
            <Clock size={16} className="text-accent" />
            الجدول الزمني
          </h4>
          <div className="overflow-x-auto rounded-xl border border-dark-border">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-dark-bg border-b border-dark-border">
                  <th className="p-3 text-muted-text font-medium">الوقت</th>
                  <th className="p-3 text-muted-text font-medium">النشاط</th>
                  <th className="p-3 text-muted-text font-medium">المسار</th>
                  <th className="p-3 text-muted-text font-medium">المدة</th>
                  <th className="p-3 text-muted-text font-medium">المصدر</th>
                  <th className="p-3 text-muted-text font-medium">تم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {day.timeBlocks.map((block, bi) => {
                  const taskKey2 = `${day.day}-${bi}`;
                  const isDone = progress.completedTasks.includes(taskKey2);
                  const isBreak = block.path === 'break';
                  const isReview = block.path === 'review';

                  return (
                    <tr
                      key={bi}
                      className={`transition-colors hover:bg-dark-card/50 ${isDone ? 'opacity-60' : ''}`}
                    >
                      <td className="p-3 text-muted-text whitespace-nowrap">{block.time}</td>
                      <td className="p-3">
                        <span className={`font-medium ${isDone ? 'text-success line-through' : 'text-light-text'}`}>
                          {block.activity}
                        </span>
                      </td>
                      <td className="p-3">
                        {!isBreak && !isReview ? (
                          <Badge variant={pathBadgeVariants[block.path] || 'default'} size="sm">
                            {block.path === 'backend' ? 'خلفي' :
                             block.path === 'frontend' ? 'أمامي' :
                             block.path === 'security' ? 'أمني' :
                             block.path === 'python' ? 'بايثون' : 'مشروع'}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-text">
                            {isBreak ? 'استراحة' : 'مراجعة'}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-muted-text whitespace-nowrap">{block.duration}</td>
                      <td className="p-3">
                        {block.resource ? (
                          <a
                            href={block.resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 text-xs underline underline-offset-2 transition-colors"
                          >
                            {block.topic || 'رابط'}
                          </a>
                        ) : (
                          <span className="text-xs text-muted-text">—</span>
                        )}
                      </td>
                      <td className="p-3">
                        {!isBreak ? (
                          <button
                            onClick={() => handleToggleTask(bi)}
                            className="transition-all duration-200"
                          >
                            {isDone ? (
                              <CheckCircle size={18} className="text-success" />
                            ) : (
                              <Circle size={18} className="text-muted-text hover:text-accent" />
                            )}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-light-text mb-3 flex items-center gap-2">
            <FileText size={16} className="text-accent" />
            الملاحظات
          </h4>
          <div className="flex gap-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="اكتب ملاحظاتك لهذا اليوم..."
              className="flex-1 px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-light-text placeholder-muted-text text-sm outline-none transition-all duration-200 focus:border-accent/50 resize-none"
              rows={3}
              dir="rtl"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-200"
            >
              {showNoteSaved ? '✓ تم الحفظ' : 'حفظ الملاحظات'}
            </button>
          </div>
        </div>

        <Button
          variant={isCompleted ? 'outline' : 'primary'}
          size="lg"
          icon={isCompleted ? undefined : CheckCircle}
          onClick={handleCompleteDay}
          className="w-full"
        >
          {isCompleted ? 'تم إكمال هذا اليوم' : 'تمييز اليوم كمكتمل'}
        </Button>
      </div>
    </motion.div>
  );
}

function WeeklyPatterns() {
  const [activeWeek, setActiveWeek] = useState(0);
  const { weeklyPatterns } = scheduleData;

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {weeklyPatterns.map((wp, i) => (
          <button
            key={wp.week}
            onClick={() => setActiveWeek(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeWeek === i
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-dark-card border border-dark-border text-muted-text hover:border-accent/30'
            }`}
          >
            {wp.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weeklyPatterns[activeWeek].pattern.map((block, i) => {
              const color = pathColors[block.path] || '#64748B';
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-dark-card border border-dark-border"
                  style={{ borderRight: `3px solid ${color}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-text font-mono">{block.time}</span>
                    <Badge variant={pathBadgeVariants[block.path] || 'default'} size="sm">
                      {block.path === 'backend' ? 'خلفي' :
                       block.path === 'frontend' ? 'أمامي' :
                       block.path === 'security' ? 'أمني' :
                       block.path === 'python' ? 'بايثون' :
                       block.path === 'projects' ? 'مشروع' : block.path}
                    </Badge>
                  </div>
                  <h5 className="text-sm font-bold text-light-text">{block.activity}</h5>
                  <span className="text-xs text-muted-text mt-1 block">{block.duration}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Recommendations({ progress }) {
  const { streak, completedDays } = progress;
  const behind = completedDays.length < 5;

  return (
    <div className="space-y-3">
      {streak > 5 ? (
        <div className="p-4 rounded-xl bg-success/5 border border-success/20 flex items-start gap-3">
          <Flame size={22} className="text-warning shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-light-text mb-1">ممتاز! استمر على هذا المنوال</h5>
            <p className="text-xs text-muted-text">
              لديك {streak} أيام متتالية من الإنجاز. حافظ على هذا الزخم وستحقق أهدافك قبل الموعد المحدد!
            </p>
          </div>
        </div>
      ) : null}

      {behind && completedDays.length > 0 ? (
        <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 flex items-start gap-3">
          <AlertTriangle size={22} className="text-warning shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-light-text mb-1">لا تقلق، يمكنك اللحاق بالركب!</h5>
            <p className="text-xs text-muted-text">
              أكملت {completedDays.length} أيام حتى الآن. ركز على المهام الأساسية لكل يوم وستتمكن من تعويض ما فاتك.
            </p>
          </div>
        </div>
      ) : null}

      {completedDays.length === 0 ? (
        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-3">
          <TrendingUp size={22} className="text-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-light-text mb-1">حان وقت الانطلاق!</h5>
            <p className="text-xs text-muted-text">
              كل رحلة تبدأ بخطوة واحدة. ابدأ باليوم الأول وسترى كيف ستتقدم بسرعة.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function DailySchedule() {
  const { progress, markDayComplete, markTaskComplete, addNote, completionPercentage } = useApp();
  const [selectedDay, setSelectedDay] = useState(null);
  const [showProgress, setShowProgress] = useState(false);

  const { days } = scheduleData;
  const percent = completionPercentage();

  const completedDays = progress.completedDays;

  const weekLabels = ['الأسبوع ١', 'الأسبوع ٢', 'الأسبوع ٣', 'الأسبوع ٤'];

  const weeklyCompletion = useMemo(() => {
    const weeks = [1, 2, 3, 4];
    return weeks.map((w) => {
      const weekDays = days.filter((d) => d.week === w);
      const done = weekDays.filter((d) => completedDays.includes(d.day)).length;
      return { week: w, total: weekDays.length, done, percent: Math.round((done / weekDays.length) * 100) };
    });
  }, [days, completedDays]);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                الجدول <span className="text-gradient">اليومي</span>
              </h1>
              <p className="text-muted-text text-lg">خطة يومية مفصلة لمدة ٣٠ يوماً</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-card border border-dark-border">
                <Calendar size={18} className="text-accent" />
                <span className="text-sm text-muted-text">
                  {completedDays.length}/{days.length} أيام
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
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card title="التقويم التفاعلي" className="p-5">
                <CalendarGrid
                  days={days}
                  selectedDay={selectedDay}
                  onSelectDay={handleSelectDay}
                  completedDays={completedDays}
                />
              </Card>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedDay && (
                <motion.div
                  key={selectedDay.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DayDetailPanel
                    day={selectedDay}
                    onClose={() => setSelectedDay(null)}
                    progress={progress}
                    markDayComplete={markDayComplete}
                    markTaskComplete={markTaskComplete}
                    addNote={addNote}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedDay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 rounded-2xl bg-dark-card border border-dark-border border-dashed text-center"
              >
                <Calendar size={48} className="text-muted-text/30 mx-auto mb-4" />
                <p className="text-muted-text">اختر يوماً من التقويم أعلاه لعرض التفاصيل</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card title="النمط الأسبوعي" className="p-5">
                <WeeklyPatterns />
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setShowProgress(!showProgress)}
                className="w-full"
              >
                <Card
                  title="تتبع التقدم"
                  className="p-5"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60" cy="60" r="50"
                          fill="none"
                          stroke="#1E293B"
                          strokeWidth="10"
                        />
                        <circle
                          cx="60" cy="60" r="50"
                          fill="none"
                          stroke="url(#dailyProgressGrad)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${(percent / 100) * 314.16} 314.16`}
                          className="transition-all duration-700"
                        />
                        <defs>
                          <linearGradient id="dailyProgressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00D9FF" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-light-text font-mono">{percent}%</span>
                        <span className="text-[10px] text-muted-text">مكتمل</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {weeklyCompletion.map((w) => (
                      <div key={w.week} className="flex items-center gap-2">
                        <span className="text-xs text-muted-text w-16">{weekLabels[w.week - 1]}</span>
                        <div className="flex-1 h-2 rounded-full bg-dark-border overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${w.percent}%` }}
                            transition={{ duration: 0.8, delay: w.week * 0.1 }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, #00D9FF, #7C3AED)`,
                              opacity: 0.4 + (w.percent / 100) * 0.6,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-text font-mono w-12 text-left">
                          {w.done}/{w.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card title="التوصيات" className="p-5">
                <Recommendations progress={progress} />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block"
            >
              <Card title="إنجازات سريعة" className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                    <span className="text-sm text-muted-text">الأيام المكتملة</span>
                    <span className="text-sm font-bold text-light-text font-mono">{completedDays.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                    <span className="text-sm text-muted-text">المهام المنجزة</span>
                    <span className="text-sm font-bold text-light-text font-mono">{progress.completedTasks.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                    <span className="text-sm text-muted-text">عدد الملاحظات</span>
                    <span className="text-sm font-bold text-light-text font-mono">
                      {Object.keys(progress.notes).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                    <span className="text-sm text-muted-text">المشاريع المكتملة</span>
                    <span className="text-sm font-bold text-light-text font-mono">{progress.completedProjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                    <span className="text-sm text-muted-text">الشهادات</span>
                    <span className="text-sm font-bold text-light-text font-mono">{progress.completedCertifications.length}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
