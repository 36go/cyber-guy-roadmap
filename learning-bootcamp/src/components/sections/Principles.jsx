import { motion } from 'framer-motion';
import { Code, CheckCircle, Globe, TrendingUp, Briefcase } from 'lucide-react';
import tipsData from '../../data/tipsData';

const iconMap = {
  'code': Code,
  'check-circle': CheckCircle,
  'globe': Globe,
  'trending-up': TrendingUp,
  'briefcase': Briefcase,
};

const borderColors = ['#00D9FF', '#10B981', '#7C3AED', '#F59E0B', '#EF4444'];

export default function Principles() {
  const { principles } = tipsData;

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
            مبادئ <span className="text-gradient">النجاح</span>
          </h2>
          <p className="text-muted-text text-lg">{tipsData.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {principles.map((principle, i) => {
            const Icon = iconMap[principle.icon] || Code;
            const borderColor = borderColors[i % borderColors.length];

            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div
                  className="relative h-full rounded-2xl bg-dark-card border border-dark-border p-6 card-hover overflow-hidden"
                  style={{
                    borderTop: `3px solid ${borderColor}`,
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(600px circle at 50% 0%, ${borderColor}08, transparent)`,
                    }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{ backgroundColor: borderColor + '15' }}
                  >
                    <Icon size={24} style={{ color: borderColor }} />
                  </div>

                  <h3 className="text-lg font-bold text-light-text mb-3 relative z-10">
                    {principle.title}
                  </h3>

                  <p className="text-muted-text text-sm leading-relaxed relative z-10">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
