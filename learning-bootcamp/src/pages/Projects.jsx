import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Clock, Star, ExternalLink, CheckCircle,
  GitBranch, ChevronDown, ChevronUp, Copy, ArrowRight,
  ArrowLeft, CheckSquare, Layers, ListOrdered, BookOpen,
  Monitor, Server, Shield, FileCode, Globe, BadgeCheck
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import CodeViewer from '../components/visualization/CodeViewer';
import { useToast } from '../components/common/Toast';
import { useApp } from '../context/AppContext';
import projectsData from '../data/projectsData';

const filters = [
  { id: 'all', label: 'الكل', icon: Layers },
  { id: 'frontend', label: 'Frontend', icon: Monitor },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'python', label: 'Python', icon: FileCode },
  { id: 'fullstack', label: 'Full Stack', icon: Globe },
];

const pathColors = {
  frontend: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  backend: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  security: 'text-red-400 bg-red-500/10 border-red-500/30',
  python: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  fullstack: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
};

const difficultyStars = (count) => {
  return Array.from({ length: count }, (_, i) => (
    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
  ));
};

function ProjectDetail({ project, onPrev, onNext, hasPrev, hasNext, onClose }) {
  const { completeProject, progress } = useApp();
  const { showToast } = useToast();
  const [expandedSteps, setExpandedSteps] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const isCompleted = progress.completedProjects.includes(project.id);

  const handleCopy = async (cmd) => {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = cmd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
    showToast('تم نسخ الأمر', 'success');
  };

  const handleComplete = () => {
    completeProject(project.id);
    showToast(
      isCompleted ? 'تم إلغاء إكمال المشروع' : 'تم إكمال المشروع بنجاح! 🎉',
      isCompleted ? 'info' : 'success'
    );
  };

  return (
    <Modal isOpen onClose={onClose} size="full" title={project.title}>
      <div className="space-y-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="warning" size="md">
            <span className="flex items-center gap-1">
              {difficultyStars(project.difficultyStars)}
              <span className="mr-1">{project.difficulty}</span>
            </span>
          </Badge>
          <Badge variant="default" size="md">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {project.timeEstimate}
            </span>
          </Badge>
          <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${pathColors[project.path] || pathColors.frontend}`}>
            #{project.number}
          </span>
          {isCompleted && (
            <Badge variant="success" size="md">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} />
                مكتمل
              </span>
            </Badge>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <Badge key={i} variant="info" size="sm">{tech}</Badge>
          ))}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-bold text-light-text mb-2">نبذة عن المشروع</h3>
          <p className="text-muted-text leading-relaxed">{project.description}</p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold text-light-text mb-3 flex items-center gap-2">
            <BadgeCheck size={18} className="text-accent" />
            المميزات
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-dark-bg/50 border border-dark-border/30">
                <CheckCircle size={14} className="text-success shrink-0" />
                <span className="text-sm text-light-text">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h3 className="text-lg font-bold text-light-text mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-secondary" />
            مخرجات التعلم
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.learningOutcomes.map((outcome, i) => (
              <Badge key={i} variant="purple" size="md">
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} />
                  {outcome}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Code Snippets */}
        {project.codeSnippets?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-light-text mb-4 flex items-center gap-2">
              <Code size={18} className="text-accent" />
              أمثلة الكود
            </h3>
            <div className="space-y-4">
              {project.codeSnippets.map((snippet, i) => (
                <CodeViewer
                  key={i}
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {project.steps?.length > 0 && (
          <div>
            <button
              onClick={() => setExpandedSteps(!expandedSteps)}
              className="flex items-center gap-2 text-lg font-bold text-light-text mb-3 hover:text-accent transition-colors w-full text-right"
            >
              <ListOrdered size={18} className="text-warning" />
              خطوات التنفيذ
              {expandedSteps ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {expandedSteps && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 mt-2">
                    {project.steps.map((step, i) => (
                      <div key={i} className="p-4 rounded-xl bg-dark-bg/50 border border-dark-border/50">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-accent">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-light-text">{step.title}</h4>
                            <p className="text-xs text-muted-text mt-1">{step.description}</p>
                            {step.command && (
                              <div className="mt-2 flex items-center gap-2">
                                <code className="flex-1 block p-2.5 rounded-lg bg-dark-bg border border-dark-border/30 text-sm text-accent font-mono text-left" dir="ltr">
                                  {step.command}
                                </code>
                                <button
                                  onClick={() => handleCopy(step.command)}
                                  className="p-2.5 rounded-lg border border-dark-border/30 text-muted-text hover:text-accent hover:border-accent/30 transition-all shrink-0"
                                >
                                  {copiedCmd === step.command ? (
                                    <CheckCircle size={16} className="text-success" />
                                  ) : (
                                    <Copy size={16} />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Deployment Guide */}
        {project.deploymentGuide && (
          <div>
            <h3 className="text-lg font-bold text-light-text mb-3 flex items-center gap-2">
              <Globe size={18} className="text-accent" />
              دليل النشر
            </h3>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm text-light-text leading-relaxed">{project.deploymentGuide}</p>
            </div>
          </div>
        )}

        {/* Resources */}
        {project.resources?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-light-text mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-accent" />
              الموارد
            </h3>
            <div className="space-y-2">
              {project.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-dark-bg/50 border border-dark-border/30 hover:border-accent/20 transition-all group"
                >
                  <ExternalLink size={14} className="text-accent shrink-0" />
                  <span className="text-sm text-light-text group-hover:text-accent transition-colors">{res.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dark-border/50">
          <div className="flex gap-2">
            {hasPrev && (
              <Button variant="outline" size="sm" icon={ArrowRight} onClick={onPrev}>
                المشروع السابق
              </Button>
            )}
            {hasNext && (
              <Button variant="outline" size="sm" icon={ArrowLeft} onClick={onNext}>
                المشروع التالي
              </Button>
            )}
          </div>
          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            size="md"
            icon={CheckSquare}
            onClick={handleComplete}
          >
            {isCompleted ? 'تم الإكمال ✓' : 'تم إكمال المشروع'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { progress, completeProject } = useApp();
  const { showToast } = useToast();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData.projects;
    return projectsData.projects.filter(p => p.path === activeFilter);
  }, [activeFilter]);

  const currentIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex(p => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  const handleNext = () => {
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedProject(filteredProjects[currentIndex - 1]);
    }
  };

  const handleCopyLink = (project) => {
    const url = `${window.location.origin}/projects?project=${project.id}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('تم نسخ الرابط', 'success');
    }).catch(() => {
      showToast('فشل نسخ الرابط', 'error');
    });
  };

  const handleToggleComplete = (projectId) => {
    completeProject(projectId);
    showToast(
      progress.completedProjects.includes(projectId)
        ? 'تم إلغاء إكمال المشروع'
        : 'تم إكمال المشروع! 🎉',
      progress.completedProjects.includes(projectId) ? 'info' : 'success'
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Code size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">المشاريع التطبيقية</h1>
              <p className="text-muted-text text-sm mt-1">{projectsData.description}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const FilterIcon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeFilter === filter.id
                    ? 'bg-accent/10 text-accent border border-accent/30 shadow-lg shadow-accent/10'
                    : 'text-muted-text border border-dark-border/50 hover:border-accent/20 hover:text-light-text bg-dark-card/50'
                  }
                `}
              >
                <FilterIcon size={16} />
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card gradient={false} className="h-full group relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${pathColors[project.path] || pathColors.frontend}`}>
                      #{project.number}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleCopyLink(project)}
                        className="p-1.5 rounded-lg text-muted-text hover:text-accent hover:bg-dark-border/30 transition-all"
                        title="نسخ الرابط"
                      >
                        <Copy size={14} />
                      </button>
                      <a
                        href={project.resources?.[0]?.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-muted-text hover:text-accent hover:bg-dark-border/30 transition-all"
                        title="فتح الرابط"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-light-text mb-2">{project.title}</h3>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {difficultyStars(project.difficultyStars)}
                    </div>
                    <span className="text-xs text-muted-text">{project.difficulty}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-text mb-3">
                    <Clock size={12} />
                    {project.timeEstimate}
                  </div>

                  <p className="text-sm text-muted-text leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, j) => (
                      <Badge key={j} variant="info" size="sm">{tech}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-dark-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={ArrowLeft}
                      onClick={() => setSelectedProject(project)}
                    >
                      عرض التفاصيل
                    </Button>

                    <button
                      onClick={() => handleToggleComplete(project.id)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${progress.completedProjects.includes(project.id)
                          ? 'bg-success/10 text-success border border-success/30'
                          : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-accent'
                        }
                      `}
                    >
                      <CheckSquare size={14} />
                      {progress.completedProjects.includes(project.id) ? 'مكتمل' : 'إكمال'}
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <Layers size={48} className="text-muted-text mx-auto mb-4 opacity-50" />
            <p className="text-muted-text">لا توجد مشاريع في هذا المسار</p>
          </div>
        )}
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredProjects.length - 1}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
