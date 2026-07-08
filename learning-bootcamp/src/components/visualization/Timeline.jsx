import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Award, Target } from 'lucide-react';
import roadmapData from '../../data/roadmapData';

const weekColors = {
  blue: {
    bg: 'from-[#1E3A8A]/30 to-[#2563EB]/10',
    border: '#2563EB',
    text: '#60A5FA',
    icon: '#2563EB',
  },
  purple: {
    bg: 'from-[#5B21B6]/30 to-[#7C3AED]/10',
    border: '#7C3AED',
    text: '#A78BFA',
    icon: '#7C3AED',
  },
  green: {
    bg: 'from-[#065F46]/30 to-[#10B981]/10',
    border: '#10B981',
    text: '#34D399',
    icon: '#10B981',
  },
  gold: {
    bg: 'from-[#92400E]/30 to-[#F59E0B]/10',
    border: '#F59E0B',
    text: '#FBBF24',
    icon: '#F59E0B',
  },
};

const pathLabels = [
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'security', label: 'Security' },
  { id: 'python', label: 'Python' },
];

const weekMilestoneIcons = [Target, Target, Target, Award];

export default function Timeline() {
  const { weeks } = roadmapData;
  const [expandedWeek, setExpandedWeek] = useState(null);

  const toggleWeek = (id) => {
    setExpandedWeek(prev => prev === id ? null : id);
  };

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
            خارطة الطريق <span className="text-gradient">التفاعلية</span>
          </h2>
          <p className="text-muted-text text-lg">اضغط على أي أسبوع لترى تفاصيل المسارات</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-dark-border" />

          <div className="space-y-6">
            {weeks.map((week, i) => {
              const colors = weekColors[week.color] || weekColors.blue;
              const isExpanded = expandedWeek === week.id;
              const MilestoneIcon = weekMilestoneIcons[i] || Target;

              return (
                <motion.div
                  key={week.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        isExpanded ? 'bg-accent border-accent text-dark-bg' : 'bg-dark-card border-dark-border text-muted-text'
                      }`}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <div className={`lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'lg:ml-auto lg:mr-8' : 'lg:mr-auto lg:ml-8'}`}>
                    <button
                      onClick={() => toggleWeek(week.id)}
                      className="w-full text-right group"
                    >
                      <div
                        className={`rounded-2xl bg-dark-card border border-dark-border overflow-hidden transition-all duration-300 card-hover ${
                          isExpanded ? 'shadow-lg' : ''
                        }`}
                        style={{
                          boxShadow: isExpanded ? `0 8px 32px ${colors.border}15` : 'none',
                        }}
                      >
                        <div className={`bg-gradient-to-l ${colors.bg} p-5`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: colors.icon + '20' }}
                              >
                                <MilestoneIcon size={20} style={{ color: colors.icon }} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-light-text">{week.title}</h3>
                                <span className="text-sm" style={{ color: colors.text }}>{week.subtitle}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="hidden sm:flex items-center gap-1 text-muted-text text-sm">
                                <Clock size={14} />
                                {week.totalHours}h
                              </div>
                              <div className="hidden sm:flex items-center gap-1 text-muted-text text-sm mr-2">
                                <span className="font-mono text-xs">{week.days}</span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp size={20} className="text-muted-text group-hover:text-accent transition-colors" />
                              ) : (
                                <ChevronDown size={20} className="text-muted-text group-hover:text-accent transition-colors" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="px-5 py-3 flex flex-wrap gap-2">
                          {week.milestones.map((milestone, mi) => (
                            <span
                              key={mi}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-dark-bg border border-dark-border text-muted-text"
                            >
                              {milestone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-0 pb-1">
                            <div className="rounded-xl border border-dark-border/50 overflow-hidden divide-y divide-dark-border/30">
                              {pathLabels.map((path) => {
                                const pathData = week.paths[path.id];
                                if (!pathData) return null;

                                return (
                                  <div key={path.id} className="p-4 bg-dark-bg/50">
                                    <h4
                                      className="text-sm font-bold mb-3"
                                      style={{ color: colors.text }}
                                    >
                                      {pathData.title}
                                    </h4>
                                    <div className="space-y-2">
                                      {pathData.sessions.map((session, si) => (
                                        <div
                                          key={si}
                                          className="flex items-start gap-3 p-2.5 rounded-lg bg-dark-card/50"
                                        >
                                          <div className="w-6 h-6 rounded-md bg-dark-border/50 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-mono text-muted-text">{session.day}</span>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-light-text">{session.title}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                              <span className="text-xs text-muted-text">{session.resource}</span>
                                              <span className="text-xs text-muted-text">·</span>
                                              <span className="text-xs text-muted-text">{session.hours}h</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
