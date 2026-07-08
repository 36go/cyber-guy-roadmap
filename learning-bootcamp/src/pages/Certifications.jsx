import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award, CheckCircle, Circle, ExternalLink, Lightbulb,
  Clock, BarChart3, BookOpen
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';
import certificationsData from '../data/certificationsData';

const difficultyVariant = {
  مبتديء: 'success',
  متوسط: 'warning',
  متقدم: 'danger',
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: 0.08 },
};

export default function Certifications() {
  const { progress, completeCertification } = useApp();
  const completed = progress.completedCertifications || [];
  const total = certificationsData.certifications.length;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          {certificationsData.title}
        </h1>
        <p className="text-muted-text text-lg">{certificationsData.description}</p>
      </motion.div>

      {/* Certification Cards */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Award className="text-accent" size={28} />
          الشهادات المتاحة
        </h2>
        <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.certifications.map((cert) => {
            const isCompleted = completed.includes(cert.id);
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-xl border ${isCompleted ? 'border-success/30' : 'border-dark-border'} bg-dark-card overflow-hidden card-hover`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cert.logo}</span>
                      <div>
                        <h3 className="text-light-text font-bold">{cert.name}</h3>
                        <p className="text-muted-text text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle size={22} className="text-success shrink-0" />
                    )}
                  </div>

                  <p className="text-muted-text text-sm mb-3">{cert.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="info" size="sm">
                      <Clock size={10} className="ml-1" />
                      {cert.duration}
                    </Badge>
                    <Badge variant={difficultyVariant[cert.difficulty] || 'default'} size="sm">
                      {cert.difficulty}
                    </Badge>
                    <Badge variant="success" size="sm">مجاني</Badge>
                    <Badge variant="purple" size="sm">الأسبوع {cert.week}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-dark-border/50 text-muted-text">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={BookOpen}
                      href={cert.url}
                    >
                      عرض الدورة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={ExternalLink}
                      href={cert.examUrl}
                    >
                      التقدم للاختبار
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dark-border">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => completeCertification(cert.id)}
                        className="w-4 h-4 rounded border-dark-border bg-dark-card accent-accent"
                      />
                      <span className={`text-sm ${isCompleted ? 'text-success' : 'text-muted-text'} group-hover:text-light-text transition-colors`}>
                        {isCompleted ? 'تم الإنجاز ✓' : 'تحديد كمكتمل'}
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Certification Timeline */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <BarChart3 className="text-secondary" size={28} />
          الجدول الزمني للشهادات
        </h2>
        <div className="glass rounded-xl p-6 md:p-8 overflow-x-auto">
          <div className="flex items-start gap-0 min-w-[600px]">
            {certificationsData.timeline.map((item, idx) => {
              const colors = [
                'bg-accent border-accent',
                'bg-secondary border-secondary',
                'bg-success border-success',
                'bg-warning border-warning',
              ];
              const nodeColor = colors[idx % colors.length];
              return (
                <div key={item.week} className="flex-1 relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-6 h-6 rounded-full ${nodeColor} border-4 border-dark-bg z-10 relative`} />
                  </div>
                  {idx < certificationsData.timeline.length - 1 && (
                    <div className="absolute top-3 right-[50%] left-0 h-0.5 bg-dark-border -z-0" />
                  )}
                  <div className="text-center">
                    <p className="text-muted-text text-sm mb-2">{item.title}</p>
                    <div className="space-y-1.5">
                      {item.certs.map((cert, i) => (
                        <div key={i} className="text-xs bg-dark-border/30 rounded-lg px-2 py-1 text-muted-text">
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Badge Collection */}
      <motion.section {...fadeInUp} className="mb-20">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Award className="text-warning" size={28} />
          مجموعة الشارات
        </h2>
        <div className="glass rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-light-text font-bold">تقدم الشهادات</p>
            <Badge variant="accent" size="lg">{completed.length} من {total} شهادات</Badge>
          </div>
          <div className="w-full bg-dark-border rounded-full h-3 mb-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(completed.length / total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-accent rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {certificationsData.certifications.map((cert) => {
              const isCompleted = completed.includes(cert.id);
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    isCompleted
                      ? 'border-success/40 bg-success/5'
                      : 'border-dark-border bg-dark-card opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{cert.logo}</div>
                  <p className={`text-xs font-bold mb-1 ${isCompleted ? 'text-light-text' : 'text-muted-text'}`}>
                    {cert.name}
                  </p>
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-success mx-auto" />
                  ) : (
                    <Circle size={16} className="text-dark-border mx-auto" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Resume Impact */}
      <motion.section {...fadeInUp} className="mb-16">
        <h2 className="text-2xl font-bold text-light-text mb-8 flex items-center gap-3">
          <Lightbulb className="text-warning" size={28} />
          كيف تدرج الشهادات في سيرتك الذاتية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationsData.resumeTips.map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-xl border border-dark-border bg-dark-card p-5 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                <Lightbulb size={18} className="text-warning" />
              </div>
              <p className="text-muted-text text-sm">{tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
