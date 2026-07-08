import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, Award, Clock } from 'lucide-react';
import quickRefData from '../../data/quickRefData';

function CountUp({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString('ar-SA')}</span>;
}

const cards = [
  { key: 'totalDays', value: 30, label: 'يوماً', icon: Calendar, color: '#00D9FF' },
  { key: 'totalHours', value: 170, label: 'ساعة', icon: Clock, color: '#7C3AED' },
  { key: 'projects', value: 5, label: 'مشروع', icon: Code, color: '#10B981' },
  { key: 'certifications', value: 3, label: 'شهادة', icon: Award, color: '#F59E0B' },
];

export default function OverviewStats() {
  return (
    <section className="py-16 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            أرقام <span className="text-gradient">المعسكر</span>
          </h2>
          <p className="text-muted-text text-lg">30 يوماً من التحدي والنمو</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: card.color + '20' }}
                />
                <div className="relative rounded-2xl bg-dark-card border border-dark-border p-6 text-center card-hover">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: card.color + '15' }}
                  >
                    <Icon size={28} style={{ color: card.color }} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-light-text mb-2 font-mono">
                    <CountUp target={card.value} />
                  </div>
                  <div className="text-muted-text font-medium">{card.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
