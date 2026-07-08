import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server, Code, Shield, FileCode, Clock, ChevronLeft } from 'lucide-react';
import roadmapData from '../../data/roadmapData';

const iconMap = {
  server: Server,
  code: Code,
  shield: Shield,
  fileCode: FileCode,
};

const colorMap = {
  backend: '#2563EB',
  frontend: '#10B981',
  security: '#EF4444',
  python: '#F59E0B',
};

export default function PathCards() {
  const navigate = useNavigate();
  const paths = roadmapData.learningPaths;

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
            اختر <span className="text-gradient">مسارك</span>
          </h2>
          <p className="text-muted-text text-lg">ثلاثة مسارات متكاملة تناسب كل الاهتمامات</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path, i) => {
            const Icon = iconMap[path.icon] || Code;
            const color = colorMap[path.id] || '#00D9FF';

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/learning-paths/${path.id}`)}
              >
                <div
                  className="relative h-full rounded-2xl bg-dark-card border border-dark-border overflow-hidden card-hover"
                  style={{
                    borderLeft: `4px solid ${color}`,
                  }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: color + '18' }}
                    >
                      <Icon size={28} style={{ color }} />
                    </div>

                    <h3 className="text-xl font-bold text-light-text mb-3">{path.title}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={16} className="text-muted-text" />
                      <span className="text-muted-text text-sm">{path.hours}+ ساعة</span>
                      <span className="text-muted-text mx-1">·</span>
                      <span className="text-muted-text text-sm">{path.courses} دورات</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {path.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ backgroundColor: color + '12', color }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="text-muted-text text-xs mb-3">{path.difficulty}</div>
                      <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300"
                        style={{
                          backgroundColor: color + '15',
                          color,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = color + '25'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = color + '15'}
                      >
                        استكشف المسار
                        <ChevronLeft size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
