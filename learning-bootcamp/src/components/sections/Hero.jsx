import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Award, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import quickRefData from '../../data/quickRefData';

const floatingDecorations = [
  '{ }', '</>', '() =>', 'await', 'async', 'import', 'const', 'let',
  '=>', '...', '===', '||', '&&', '?.', '??'
];

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TypingText({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-6 bg-accent mr-1 animate-pulse" />}
    </span>
  );
}

export default function Hero() {
  const { stats } = quickRefData;

  const statItems = [
    { value: stats.totalHours, suffix: '+', label: 'ساعة تعلم', icon: Clock },
    { value: stats.projects, suffix: '', label: 'مشاريع', icon: BookOpen },
    { value: stats.certifications, suffix: '+', label: 'شهادات', icon: Award },
    { value: 100, suffix: '%', label: 'مجاني', icon: Shield },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-primary/40" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 217, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {floatingDecorations.map((code, i) => (
        <motion.div
          key={i}
          className="absolute text-dark-border/30 font-mono text-sm md:text-base select-none pointer-events-none"
          style={{
            left: `${5 + (i * 7) % 90}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {code}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm mb-6"
          >
            <Shield size={16} />
            <span>معسكر برمجي مكثف 2025</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient">أتقن Backend, Frontend</span>
            <br />
            <span className="text-gradient">والأمن السيبراني في 30 يوماً</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-text mb-10 h-8 font-light"
          >
            <TypingText text="من الصفر التام إلى مطور جاهز للوظائف" speed={60} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {statItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.15, type: 'spring', stiffness: 200 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-dark-border/50"
                >
                  <Icon size={20} className="text-accent shrink-0" />
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-light-text">
                      <AnimatedCounter target={item.value} suffix={item.suffix} />
                    </span>
                    <span className="text-sm text-muted-text">{item.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-dark-bg font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105"
            >
              ابدأ رحلتك الآن
              <ArrowLeft size={22} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-dark-border flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
