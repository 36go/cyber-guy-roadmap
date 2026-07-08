import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Server, Code, Shield, FileCode, Clock, BookOpen, ExternalLink,
  CheckCircle, ArrowRight, ChevronLeft, Star, Calendar,
  GraduationCap, Layers
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import roadmapData from '../data/roadmapData';
import resourcesData from '../data/resourcesData';
import projectsData from '../data/projectsData';

const pathIcons = {
  backend: Server,
  frontend: Code,
  security: Shield,
  python: FileCode
};

const pathColors = {
  backend: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'blue' },
  frontend: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'emerald' },
  security: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'red' },
  python: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'warning' }
};

const weekColors = {
  blue: { bg: 'from-blue-600/20 to-transparent', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-500' },
  purple: { bg: 'from-purple-600/20 to-transparent', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-500' },
  green: { bg: 'from-emerald-600/20 to-transparent', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-500' },
  gold: { bg: 'from-amber-600/20 to-transparent', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-500' }
};

export default function LearningPaths() {
  const { pathId } = useParams();
  const isValidPath = ['backend', 'frontend', 'security', 'python'].includes(pathId);

  const pathData = useMemo(() => {
    if (!isValidPath) return null;
    return roadmapData.learningPaths.find(p => p.id === pathId);
  }, [pathId, isValidPath]);

  const pathWeeks = useMemo(() => {
    if (!isValidPath) return [];
    return roadmapData.weeks.map(week => ({
      ...week,
      pathData: week.paths[pathId]
    }));
  }, [pathId, isValidPath]);

  const relatedResources = useMemo(() => {
    if (!isValidPath) return [];
    const all = resourcesData.allResources;
    return all.filter(r => r.path === pathId || r.path === 'all').slice(0, 6);
  }, [pathId, isValidPath]);

  const relatedProjects = useMemo(() => {
    if (!isValidPath) return projectsData.projects;
    return projectsData.projects.filter(p => p.path === pathId || p.path === 'fullstack').slice(0, 3);
  }, [pathId, isValidPath]);

  if (!isValidPath) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center mb-6">
          <Shield size={40} className="text-danger" />
        </div>
        <h1 className="text-2xl font-bold text-light-text mb-3">المسار غير موجود</h1>
        <p className="text-muted-text mb-8">عذراً، المسار الذي تبحث عنه غير متوفر</p>
        <Button href="/" variant="primary" icon={ChevronLeft}>
          العودة للصفحة الرئيسية
        </Button>
      </div>
    );
  }

  const Icon = pathIcons[pathId];
  const colors = pathColors[pathId];

  return (
    <div className="min-h-screen pb-20">
      {/* Path Overview Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 ${colors.bg} opacity-30`} />
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-text hover:text-accent text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} />
            العودة للرئيسية
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                <Icon size={28} className={colors.text} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-light-text">{pathData.title}</h1>
                <p className="text-muted-text text-sm mt-1">{roadmapData.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Badge variant={colors.badge} size="lg" icon={Star}>
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={14} />
                  {pathData.difficulty}
                </span>
              </Badge>
              <Badge variant={colors.badge} size="lg">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {pathData.courses} دورة
                </span>
              </Badge>
              <Badge variant={colors.badge} size="lg">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {pathData.hours}+ ساعة
                </span>
              </Badge>
              <Badge variant={colors.badge} size="lg">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {roadmapData.stats.totalDays} يوماً
                </span>
              </Badge>
            </div>

            {/* Skills Quick View */}
            <div className="flex flex-wrap gap-2 mt-6">
              {pathData.skills.map((skill, i) => (
                <Badge key={i} variant="info" size="md">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={12} />
                    {skill}
                  </span>
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Week by Week Breakdown */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-light-text mb-2">الخطة الأسبوعية</h2>
          <p className="text-muted-text">تفاصيل الجلسات التدريبية لكل أسبوع في المسار</p>
        </motion.div>

        <div className="space-y-6">
          {pathWeeks.map((week, weekIdx) => {
            const wc = weekColors[week.color] || weekColors.blue;
            return (
              <motion.div
                key={week.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: weekIdx * 0.1 }}
              >
                <div className={`relative overflow-hidden rounded-2xl border ${wc.border} bg-dark-card`}>
                  <div className={`absolute inset-0 bg-gradient-to-l ${wc.bg} pointer-events-none`} />
                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${wc.text}`}>
                        <Layers size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-light-text">{week.title}</h3>
                        <p className="text-sm text-muted-text">{week.subtitle}</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg border ${wc.border} ${wc.text} text-sm font-medium`}>
                        الأيام {week.days}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {week.pathData?.sessions.map((session, sIdx) => (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: sIdx * 0.05 }}
                          className="flex items-start gap-4 p-4 rounded-xl bg-dark-bg/50 border border-dark-border/50 hover:border-accent/20 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg ${wc.dot} bg-opacity-20 flex items-center justify-center shrink-0 mt-0.5`}>
                            <div className={`w-2 h-2 rounded-full ${wc.dot}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="text-sm font-bold text-light-text">{session.title}</h4>
                              <span className="text-xs text-muted-text bg-dark-card px-2 py-0.5 rounded-md border border-dark-border/30">
                                اليوم {session.day}
                              </span>
                            </div>
                            <p className="text-xs text-muted-text mb-2">{session.description}</p>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-xs text-accent">
                                <BookOpen size={12} />
                                {session.resource}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-text">
                                <Clock size={12} />
                                {session.hours} ساعات
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {week.milestones && (
                      <div className="mt-4 pt-4 border-t border-dark-border/50">
                        <p className="text-xs text-muted-text mb-2">إنجازات الأسبوع:</p>
                        <div className="flex flex-wrap gap-2">
                          {week.milestones.map((ms, i) => (
                            <Badge key={i} variant="success" size="sm">
                              <span className="flex items-center gap-1">
                                <CheckCircle size={10} />
                                {ms}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Skills You'll Learn */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-light-text mb-2">المهارات التي ستتعلمها</h2>
          <p className="text-muted-text">مجموعة من المهارات التقنية التي ستكتسبها خلال الرحلة</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {pathData.skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-dark-card border border-dark-border/50 hover:border-accent/20 hover:bg-dark-card/80 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <CheckCircle size={16} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-light-text">{skill}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-light-text mb-2">الموارد المتعلقة</h2>
            <p className="text-muted-text">موارد تعليمية إضافية لدعم رحلة التعلم</p>
          </motion.div>
          <Button href="/resources" variant="outline" size="sm" icon={ExternalLink}>
            عرض الكل
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedResources.map((resource, i) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                title={resource.name}
                description={resource.shortDescription}
                gradient={false}
                className="h-full"
              >
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant="info" size="sm">{resource.platform}</Badge>
                  <Badge variant="default" size="sm">{resource.difficulty}</Badge>
                  <Badge variant="default" size="sm">{resource.duration}</Badge>
                </div>
                <div className="mt-3">
                  <Button
                    href={resource.url}
                    variant="ghost"
                    size="sm"
                    icon={ExternalLink}
                  >
                    فتح المورد
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Path-specific Projects */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-light-text mb-2">المشاريع المقترحة</h2>
            <p className="text-muted-text">مشاريع تطبيقية لتعزيز المهارات التي تتعلمها</p>
          </motion.div>
          <Button href="/projects" variant="outline" size="sm" icon={ArrowRight}>
            عرض المشاريع
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                title={project.title}
                description={project.description}
                gradient={false}
                className="h-full"
              >
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant="warning" size="sm">
                    <span className="flex items-center gap-1">
                      <Star size={10} />
                      {project.difficulty}
                    </span>
                  </Badge>
                  <Badge variant="default" size="sm">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {project.timeEstimate}
                    </span>
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.slice(0, 3).map((tech, j) => (
                    <Badge key={j} variant="info" size="sm">{tech}</Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <Button
                    href={`/projects?project=${project.id}`}
                    variant="ghost"
                    size="sm"
                    icon={ArrowRight}
                  >
                    عرض التفاصيل
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 to-secondary/5 p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-light-text mb-4">هل أنت مستعد للبدء؟</h2>
            <p className="text-muted-text mb-6 max-w-lg mx-auto">
              ابدأ رحلة التعلم الخاصة بك اليوم وتابع تقدمك خطوة بخطوة
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/schedule" variant="primary" size="lg" icon={ArrowRight}>
                ابدأ التعلم الآن
              </Button>
              <Button href="/" variant="outline" size="lg" icon={ChevronLeft}>
                استعراض المسارات
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
