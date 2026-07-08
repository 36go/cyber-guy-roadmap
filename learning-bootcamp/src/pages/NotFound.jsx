import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const floatingElements = [
  { emoji: '💻', x: '10%', y: '15%', delay: 0, size: 'text-4xl' },
  { emoji: '⚛️', x: '85%', y: '20%', delay: 0.5, size: 'text-3xl' },
  { emoji: '🚀', x: '15%', y: '75%', delay: 1, size: 'text-4xl' },
  { emoji: '🌟', x: '80%', y: '70%', delay: 1.5, size: 'text-3xl' },
  { emoji: '📚', x: '50%', y: '10%', delay: 0.8, size: 'text-2xl' },
  { emoji: '🔥', x: '90%', y: '50%', delay: 1.2, size: 'text-3xl' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-bg">
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${el.size} opacity-20`}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <div className="text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', damping: 15 }}
        >
          <h1 className="text-8xl md:text-9xl font-black text-gradient mb-4">
            404
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-text mb-8"
        >
          عذراً، الصفحة غير موجودة
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="primary" size="lg" icon={Home} href="/">
            العودة إلى الرئيسية
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
