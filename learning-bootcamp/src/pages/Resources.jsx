import { useState, useMemo } from 'react';
import {
  Search, Filter, Bookmark, ExternalLink, Copy, Clock,
  BarChart3, X, ChevronLeft, ChevronRight, Video,
  BookOpen, Wrench, Users, Monitor, FileCode,
  Layers, BookMarked, BookmarkX
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { useToast } from '../components/common/Toast';
import { useApp } from '../context/AppContext';
import resourcesData from '../data/resourcesData';

const ITEMS_PER_PAGE = 12;

const typeIcons = {
  course: Video,
  docs: BookOpen,
  interactive: Monitor,
  tool: Wrench,
  community: Users,
  video: Video,
};

const typeColors = {
  course: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  docs: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  interactive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  tool: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  community: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  video: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
};

const typeLabels = {
  course: 'دورة',
  docs: 'توثيق',
  interactive: 'تفاعلي',
  tool: 'أداة',
  community: 'مجتمع',
  video: 'فيديو',
};

const pathFilterOptions = [
  { id: 'all', label: 'الكل' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'security', label: 'Security' },
  { id: 'python', label: 'Python' },
];

const typeFilterOptions = [
  { id: 'all', label: 'الكل' },
  { id: 'course', label: 'دورة' },
  { id: 'docs', label: 'توثيق' },
  { id: 'interactive', label: 'تفاعلي' },
  { id: 'tool', label: 'أداة' },
  { id: 'community', label: 'مجتمع' },
  { id: 'video', label: 'فيديو' },
];

const difficultyFilterOptions = [
  { id: 'all', label: 'الكل' },
  { id: 'مبتديء', label: 'مبتديء' },
  { id: 'متوسط', label: 'متوسط' },
  { id: 'متقدم', label: 'متقدم' },
];

export default function Resources() {
  const { progress, toggleBookmark } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [pathFilter, setPathFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const allResources = resourcesData.allResources;

  const platforms = useMemo(() => {
    const unique = [...new Set(allResources.map(r => r.platform))];
    return ['all', ...unique.sort()];
  }, [allResources]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (searchQuery) filters.push({ id: 'search', label: `بحث: ${searchQuery}`, onRemove: () => setSearchQuery('') });
    if (pathFilter !== 'all') {
      const opt = pathFilterOptions.find(o => o.id === pathFilter);
      filters.push({ id: 'path', label: `المسار: ${opt?.label}`, onRemove: () => setPathFilter('all') });
    }
    if (typeFilter !== 'all') {
      const opt = typeFilterOptions.find(o => o.id === typeFilter);
      filters.push({ id: 'type', label: `النوع: ${opt?.label}`, onRemove: () => setTypeFilter('all') });
    }
    if (difficultyFilter !== 'all') {
      filters.push({ id: 'difficulty', label: `المستوى: ${difficultyFilter}`, onRemove: () => setDifficultyFilter('all') });
    }
    if (platformFilter !== 'all') {
      filters.push({ id: 'platform', label: `المنصة: ${platformFilter}`, onRemove: () => setPlatformFilter('all') });
    }
    if (showBookmarksOnly) {
      filters.push({ id: 'bookmarks', label: 'المحفوظات فقط', onRemove: () => setShowBookmarksOnly(false) });
    }
    return filters;
  }, [searchQuery, pathFilter, typeFilter, difficultyFilter, platformFilter, showBookmarksOnly]);

  const filteredResources = useMemo(() => {
    let result = allResources;

    if (showBookmarksOnly) {
      result = result.filter(r => progress.bookmarkedResources.includes(r.id));
    }

    if (activeCategory !== 'all') {
      result = result.filter(r => r.categoryId === activeCategory);
    }

    if (pathFilter !== 'all') {
      result = result.filter(r => r.path === pathFilter || r.path === 'all');
    }

    if (typeFilter !== 'all') {
      result = result.filter(r => r.type === typeFilter);
    }

    if (difficultyFilter !== 'all') {
      result = result.filter(r => r.difficulty === difficultyFilter);
    }

    if (platformFilter !== 'all') {
      result = result.filter(r => r.platform === platformFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.platform.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allResources, activeCategory, pathFilter, typeFilter, difficultyFilter, platformFilter, searchQuery, showBookmarksOnly, progress.bookmarkedResources]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setPathFilter('all');
    setTypeFilter('all');
    setDifficultyFilter('all');
    setPlatformFilter('all');
    setShowBookmarksOnly(false);
    setCurrentPage(1);
  };

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast('تم نسخ الرابط', 'success');
  };

  const handleToggleBookmark = (resourceId) => {
    toggleBookmark(resourceId);
    showToast(
      progress.bookmarkedResources.includes(resourceId)
        ? 'تم إزالة المورد من المحفوظات'
        : 'تم إضافة المورد إلى المحفوظات',
      progress.bookmarkedResources.includes(resourceId) ? 'info' : 'success'
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TypeIcon = ({ type }) => {
    const Icon = typeIcons[type] || BookOpen;
    const color = typeColors[type] || typeColors.docs;
    return (
      <div className={`w-9 h-9 rounded-xl border ${color} flex items-center justify-center`}>
        <Icon size={16} />
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <BookOpen size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">{resourcesData.title}</h1>
              <p className="text-muted-text text-sm mt-1">{resourcesData.description}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="ابحث في الموارد بالاسم، الوصف، المنصة، أو الوسوم..."
            className="w-full px-12 py-3.5 rounded-xl bg-dark-card border border-dark-border/50 text-light-text placeholder-muted-text/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-border/30 transition-all"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>
      </section>

      {/* Filter Controls */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Path Filter */}
          <div className="flex items-center gap-1.5">
            <Layers size={14} className="text-muted-text" />
            <div className="flex gap-1">
              {pathFilterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setPathFilter(opt.id); setCurrentPage(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    pathFilter === opt.id
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-dark-border/50 hidden sm:inline">|</span>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-muted-text" />
            <div className="flex gap-1">
              {typeFilterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setTypeFilter(opt.id); setCurrentPage(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    typeFilter === opt.id
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-dark-border/50 hidden sm:inline">|</span>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <BarChart3 size={14} className="text-muted-text" />
            <div className="flex gap-1">
              {difficultyFilterOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setDifficultyFilter(opt.id); setCurrentPage(1); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === opt.id
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-dark-border/50 hidden sm:inline">|</span>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => { setPlatformFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-card border border-dark-border/30 text-muted-text focus:outline-none focus:border-accent/40 cursor-pointer"
          >
            <option value="all">المنصة: الكل</option>
            {platforms.filter(p => p !== 'all').map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => { setShowBookmarksOnly(!showBookmarksOnly); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showBookmarksOnly
                ? 'bg-secondary/10 text-secondary border-secondary/30'
                : 'text-muted-text border-dark-border/30 hover:border-accent/20 hover:text-light-text'
            }`}
          >
            {showBookmarksOnly ? <BookmarkX size={14} /> : <BookMarked size={14} />}
            المحفوظات
          </button>

          {/* Clear Filters */}
          {activeFilters.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-danger border border-danger/30 hover:bg-danger/10 transition-all"
            >
              <X size={14} />
              مسح جميع الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <Badge key={f.id} variant="info" size="md">
                <span className="flex items-center gap-1.5">
                  {f.label}
                  <button
                    onClick={f.onRemove}
                    className="p-0.5 rounded hover:bg-accent/20 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              activeCategory === 'all'
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text bg-dark-card/50'
            }`}
          >
            <Layers size={16} />
            الكل
          </button>
          {resourcesData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text bg-dark-card/50'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <p className="text-sm text-muted-text">
          عرض {paginatedResources.length} من {filteredResources.length} مورد
          {showBookmarksOnly && (
            <span className="text-secondary mr-1">(المحفوظات)</span>
          )}
        </p>
      </section>

      {/* Resource Cards Grid */}
      <section className="max-w-6xl mx-auto px-4">
        {paginatedResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedResources.map((resource, i) => {
              const isBookmarked = progress.bookmarkedResources.includes(resource.id);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: (i % ITEMS_PER_PAGE) * 0.03 }}
                >
                  <Card gradient={false} className="h-full group relative">
                    <div className="flex items-start gap-3 mb-3">
                      <TypeIcon type={resource.type} />
                      <div className="flex-1 min-w-0">
                        <Badge variant="default" size="sm">{resource.platform}</Badge>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleBookmark(resource.id)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isBookmarked
                              ? 'text-accent bg-accent/10'
                              : 'text-muted-text hover:text-accent hover:bg-dark-border/30'
                          }`}
                          title={isBookmarked ? 'إزالة من المحفوظات' : 'إضافة إلى المحفوظات'}
                        >
                          <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => handleCopyLink(resource.url)}
                          className="p-1.5 rounded-lg text-muted-text hover:text-accent hover:bg-dark-border/30 transition-all"
                          title="نسخ الرابط"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-light-text mb-1.5 leading-snug">{resource.name}</h3>
                    <p className="text-xs text-muted-text leading-relaxed mb-3 line-clamp-2">{resource.shortDescription}</p>

                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <Badge variant="info" size="sm">{typeLabels[resource.type] || resource.type}</Badge>
                      <Badge variant="default" size="sm">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {resource.duration}
                        </span>
                      </Badge>
                      <Badge
                        variant={resource.difficulty === 'مبتديء' ? 'success' : resource.difficulty === 'متوسط' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {resource.difficulty}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 3).map((tag, j) => (
                        <Badge key={j} variant="default" size="sm">{tag}</Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="default" size="sm">+{resource.tags.length - 3}</Badge>
                      )}
                    </div>

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      <ExternalLink size={12} />
                      فتح المورد
                    </a>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={48} className="text-muted-text mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-bold text-light-text mb-2">لا توجد نتائج</h3>
            <p className="text-muted-text text-sm mb-6">
              حاول تغيير معايير البحث أو مسح الفلاتر
            </p>
            {activeFilters.length > 0 && (
              <Button variant="outline" size="sm" icon={X} onClick={clearAllFilters}>
                مسح جميع الفلاتر
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="max-w-6xl mx-auto px-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-dark-border/30 text-muted-text hover:text-accent hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === currentPage;
              const isNear = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
              const isEllipsis = Math.abs(page - currentPage) === 2 && page !== 1 && page !== totalPages;

              if (!isNear && !isEllipsis) return null;

              if (isEllipsis) {
                return (
                  <span key={page} className="w-10 h-10 flex items-center justify-center text-muted-text text-sm">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'text-muted-text border border-dark-border/30 hover:border-accent/20 hover:text-light-text'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-dark-border/30 text-muted-text hover:text-accent hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
