import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, CheckCircle, Globe, TrendingUp, Briefcase,
  ChevronDown, ChevronUp, Check, X, Quote, Clock,
  AlertTriangle, Heart, Star, Users, MessageCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import tipsData from '../data/tipsData';

const iconMap = {
  code: Code,
  'check-circle': CheckCircle,
  globe: Globe,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
};

const strategyBorders = [
  'border-r-accent',
  'border-r-secondary',
  'border-r-success',
  'border-r-warning',
  'border-r-danger',
];

const severityColors = {
  مرتفع: 'danger',
  متوسط: 'warning',
  منخفض: 'info',
};

const quotesColors = [
  'from-primary to-secondary',
  'from-accent to-secondary',
  'from-success to-primary',
  'from-warning to-danger',
  'from-secondary to-accent',
  'from-danger to-warning',
  'from-primary to-accent',
  'from-success to-secondary',
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export default function Tips() {
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [expandedStrategy, setExpandedStrategy] = useState(null);
  const [expandedBurnout, setExpandedBurnout] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const idx = Math.floor(Math.random() * tipsData.motivationalQuotes.length);
    setCurrentQuote(idx);
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % tipsData.motivationalQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => setCurrentQuote(prev => (prev + 1) % tipsData.motivationalQuotes.length);
  const prevQuote = () => setCurrentQuote(prev => (prev - 1 + tipsData.motivationalQuotes.length) % tipsData.motivationalQuotes.length);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          {tipsData.title}
        </h1>
        <p className="text-muted-text text-lg">{tipsData.subtitle}</p>
      </motion.div>

      {/* Core Principles */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Star className="text-accent" size={28} />
          المبادئ الأساسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {tipsData.principles.map((principle) => {
            const Icon = iconMap[principle.icon] || Code;
            const isExpanded = expandedPrinciple === principle.id;
            return (
              <motion.div
                key={principle.id}
                layout
                className="rounded-xl border border-dark-border bg-dark-card overflow-hidden card-hover cursor-pointer"
                onClick={() => setExpandedPrinciple(isExpanded ? null : principle.id)}
              >
                <div className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-light-text font-bold text-lg mb-2">{principle.title}</h3>
                  <p className="text-muted-text text-sm leading-relaxed">{principle.description}</p>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-dark-border"
                    >
                      <div className="p-5 space-y-3">
                        <div>
                          <h4 className="text-accent text-sm font-bold mb-1">لماذا يعمل؟</h4>
                          <p className="text-muted-text text-sm">{principle.whyWorks}</p>
                        </div>
                        <div>
                          <h4 className="text-success text-sm font-bold mb-1">كيف تطبقه؟</h4>
                          <p className="text-muted-text text-sm">{principle.howToImplement}</p>
                        </div>
                        {principle.example && (
                          <div className="bg-dark-border/20 rounded-lg p-3">
                            <p className="text-warning text-xs font-bold mb-1">مثال:</p>
                            <p className="text-muted-text text-sm">{principle.example}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="px-5 pb-4">
                  <button className="text-accent text-xs flex items-center gap-1 hover:gap-2 transition-all">
                    {isExpanded ? 'عرض أقل' : 'عرض المزيد'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Learning Strategies */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <MessageCircle className="text-secondary" size={28} />
          استراتيجيات التعلم
        </h2>
        <div className="space-y-4">
          {tipsData.strategies.map((strategy, idx) => {
            const isExpanded = expandedStrategy === strategy.id;
            const borderColor = strategyBorders[idx % strategyBorders.length];
            return (
              <motion.div
                key={strategy.id}
                layout
                className={`rounded-xl border border-dark-border bg-dark-card overflow-hidden ${borderColor} border-r-4`}
              >
                <button
                  className="w-full p-5 flex items-center justify-between text-right"
                  onClick={() => setExpandedStrategy(isExpanded ? null : strategy.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-light-text font-bold text-lg">{strategy.title}</h3>
                    <p className="text-muted-text text-sm mt-1">{strategy.description}</p>
                  </div>
                  {isExpanded ? <ChevronUp className="text-accent shrink-0" size={20} /> : <ChevronDown className="text-muted-text shrink-0" size={20} />}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 space-y-2">
                        {strategy.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check size={16} className="text-success mt-1 shrink-0" />
                            <span className="text-muted-text text-sm">{tip}</span>
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

      {/* Daily Routines - Timeline */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Clock className="text-success" size={28} />
          الروتين اليومي
        </h2>
        <div className="relative">
          <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-dark-border" />
          <div className="space-y-6">
            {tipsData.dailyRoutines.map((routine, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pr-12"
              >
                <div className="absolute right-2 top-2 w-5 h-5 rounded-full bg-accent border-4 border-dark-bg z-10" />
                <div className="glass rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <Badge variant="accent" size="md">{routine.time}</Badge>
                    <h3 className="text-light-text font-bold">{routine.title}</h3>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {routine.activities.map((activity, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-text">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 text-sm text-warning bg-warning/5 rounded-lg p-3">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                    <span>{routine.tip}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Burnout Prevention */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Heart className="text-danger" size={28} />
          الوقاية من الإرهاق
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tipsData.burnoutPrevention.map((item) => {
            const isExpanded = expandedBurnout === item.id;
            const sevColor = severityColors[item.severity] || 'default';
            return (
              <motion.div
                key={item.id}
                layout
                className="rounded-xl border border-dark-border bg-dark-card overflow-hidden"
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedBurnout(isExpanded ? null : item.id)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-light-text font-bold text-base flex-1">{item.title}</h3>
                    <Badge variant={sevColor}>{item.severity}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-text">
                    <AlertTriangle size={14} className="text-danger" />
                    <span>{item.signs.length} علامات تحذيرية</span>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-dark-border"
                    >
                      <div className="p-5 space-y-4">
                        <div>
                          <h4 className="text-danger text-sm font-bold mb-2 flex items-center gap-2">
                            <X size={14} /> العلامات التحذيرية
                          </h4>
                          <ul className="space-y-1.5">
                            {item.signs.map((sign, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-danger/50" />
                                {sign}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-success text-sm font-bold mb-2 flex items-center gap-2">
                            <Check size={14} /> الحلول
                          </h4>
                          <ol className="space-y-1.5">
                            {item.solutions.map((solution, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-text">
                                <Check size={14} className="text-success mt-0.5 shrink-0" />
                                <span>{solution}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="px-5 pb-4">
                  <button
                    className="text-accent text-xs flex items-center gap-1 hover:gap-2 transition-all"
                    onClick={() => setExpandedBurnout(isExpanded ? null : item.id)}
                  >
                    {isExpanded ? 'عرض أقل' : 'عرض التفاصيل'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Common Mistakes */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <X className="text-warning" size={28} />
          الأخطاء الشائعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tipsData.commonMistakes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-xl border border-dark-border bg-dark-card p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center shrink-0">
                  <X size={16} className="text-danger" />
                </div>
                <p className="text-muted-text text-sm">{item.mistake}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Check size={16} className="text-success" />
                </div>
                <p className="text-light-text text-sm font-medium">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Motivational Quotes */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Quote className="text-warning" size={28} />
          اقتباسات تحفيزية
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl p-8 md:p-12 bg-gradient-to-br ${quotesColors[currentQuote % quotesColors.length]} text-center relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 opacity-20">
                <Quote size={80} className="text-white" />
              </div>
              <div className="relative z-10">
                <p className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-6">
                  "{tipsData.motivationalQuotes[currentQuote].quote}"
                </p>
                <p className="text-white/70 text-lg">— {tipsData.motivationalQuotes[currentQuote].author}</p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 relative z-10">
                <button
                  onClick={prevQuote}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
                <div className="flex gap-2">
                  {tipsData.motivationalQuotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuote(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentQuote ? 'bg-white w-6' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextQuote}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Success Stories */}
      <motion.section {...fadeInUp} className="mb-16">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Users className="text-success" size={28} />
          قصص نجاح
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tipsData.successStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-xl border border-dark-border bg-dark-card p-6 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{story.image}</span>
                <div>
                  <h3 className="text-light-text font-bold text-lg">{story.name}</h3>
                  <p className="text-accent text-sm">
                    من {story.before} إلى {story.after}
                  </p>
                </div>
              </div>
              <p className="text-muted-text text-sm leading-relaxed">{story.story}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
