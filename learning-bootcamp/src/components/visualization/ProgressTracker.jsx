import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, Award, Flame, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import quickRefData from '../../data/quickRefData';

function RadialProgress({ percent, size = 160, strokeWidth = 10 }) {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const duration = 1500;
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedPercent(eased * percent);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1E293B"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-100"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-light-text font-mono">
          {Math.round(animatedPercent)}
          <span className="text-lg text-accent">%</span>
        </span>
        <span className="text-xs text-muted-text mt-1">مكتمل</span>
      </div>
    </div>
  );
}

export default function ProgressTracker() {
  const { progress, completionPercentage } = useApp();
  const { stats } = quickRefData;
  const overall = completionPercentage();

  const breakdownItems = [
    {
      label: 'الأيام المكتملة',
      value: progress.completedDays.length,
      total: stats.totalDays,
      icon: Calendar,
      color: '#00D9FF',
    },
    {
      label: 'المشاريع',
      value: progress.completedProjects.length,
      total: stats.projects,
      icon: Code,
      color: '#10B981',
    },
    {
      label: 'الشهادات',
      value: progress.completedCertifications.length,
      total: stats.certifications,
      icon: Award,
      color: '#F59E0B',
    },
  ];

  const totalCompleted = progress.completedDays.length + progress.completedProjects.length + progress.completedCertifications.length;
  const totalPossible = stats.totalDays + stats.projects + stats.certifications;

  return (
    <section className="py-16 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">تقدمك</span> في المعسكر
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <RadialProgress percent={overall} />

            <div className="mt-6 flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-card border border-dark-border">
              <Flame size={22} className="text-warning" />
              <div>
                <span className="text-lg font-bold text-light-text font-mono">{progress.streak}</span>
                <span className="text-muted-text text-sm mr-1">يوم متتالي</span>
              </div>
            </div>

            <div className="mt-3 text-muted-text text-sm">
              أكملت <span className="text-accent font-bold">{totalCompleted}</span> من{' '}
              <span className="text-light-text font-bold">{totalPossible}</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            {breakdownItems.map((item, i) => {
              const Icon = item.icon;
              const itemPercent = Math.round((item.value / item.total) * 100);

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl bg-dark-card border border-dark-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: item.color + '15' }}
                      >
                        <Icon size={20} style={{ color: item.color }} />
                      </div>
                      <span className="text-light-text font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-text">
                      {item.value}/{item.total}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-dark-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${itemPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full transition-all duration-500"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-xs text-muted-text mt-1 text-left">{itemPercent}%</div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center gap-3"
            >
              <Target size={22} className="text-accent" />
              <div>
                <div className="text-light-text font-medium">اليوم الحالي</div>
                <div className="text-muted-text text-sm">اليوم {progress.currentDay} من {stats.totalDays}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
