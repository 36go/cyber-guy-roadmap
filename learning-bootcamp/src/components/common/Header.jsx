import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, LayoutDashboard, Code2, Shield, ShieldAlert, GitBranch, FileCode, FlaskConical, GraduationCap, Search, BookOpen, ArrowRight, TestTube, Database } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/roadmap', label: 'خارطة الطريق' },
  { to: '/schedule', label: 'الجدول' },
  { to: '/projects', label: 'المشاريع' },
  { to: '/resources', label: 'الموارد' },
  { to: '/git-commands', label: 'أوامر Git', icon: GitBranch },
  { to: '/python-guide', label: 'دليل Python', icon: FileCode },
];

const learningLinks = [
  { to: '/labs', label: 'المختبرات التفاعلية', icon: FlaskConical },
  { to: '/database-lab', label: 'مختبر قواعد البيانات', icon: Database },
  { to: '/security-labs', label: 'مختبرات الأمن السيبراني', icon: ShieldAlert },
  { to: '/security-dashboard', label: 'لوحة المراقبة الأمنية', icon: Shield },
  { to: '/quizzes', label: 'الاختبارات', icon: GraduationCap },
  { to: '/dashboard', label: 'لوحة التقدم', icon: LayoutDashboard },
  { to: '/certifications', label: 'الشهادات', icon: Shield },
  { to: '/tips', label: 'النصائح', icon: BookOpen },
  { to: '/faq', label: 'الأسئلة الشائعة', icon: BookOpen },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, completionPercentage } = useApp();
  const location = useLocation();
  const percent = completionPercentage();
  const isLearningPath = learningLinks.some(l => location.pathname.startsWith(l.to));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLearningOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-white text-sm font-bold">
              م
            </div>
            <span className="text-gradient text-lg sm:text-xl font-bold">
              معسكر 30 يوم
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-muted-text hover:text-light-text hover:bg-dark-card/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="relative">
              <button
                onClick={() => setLearningOpen(!learningOpen)}
                className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isLearningPath
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-text hover:text-light-text hover:bg-dark-card/60'
                }`}
              >
                التعلم
                <ChevronDown size={14} className={`transition-transform ${learningOpen ? 'rotate-180' : ''}`} />
              </button>

              {learningOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLearningOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-64 glass rounded-xl border border-dark-border shadow-xl shadow-black/20 z-50 py-2">
                    {learningLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = location.pathname.startsWith(link.to);
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                            isActive
                              ? 'text-accent bg-accent/10'
                              : 'text-muted-text hover:text-light-text hover:bg-dark-card/60'
                          }`}
                        >
                          <Icon size={16} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <Link
              to="/search"
              className="p-2 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-card/60 transition-all duration-200"
              aria-label="بحث"
            >
              <Search size={18} />
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card border border-dark-border">
              <div className="w-16 h-2 rounded-full bg-dark-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-accent transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-accent">{percent}%</span>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-card/60 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-card/60 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[48rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="glass border-t border-dark-border px-4 py-3 flex flex-col gap-1">
          {[...navLinks, ...learningLinks].map((link) => {
            const to = link.to;
            const label = link.label;
            const Icon = link.icon || null;
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-text hover:text-light-text hover:bg-dark-card/60'
                }`}
              >
                {Icon && <Icon size={16} />}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
