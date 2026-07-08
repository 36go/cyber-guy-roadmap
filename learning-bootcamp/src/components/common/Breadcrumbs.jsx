import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

const routeNames = {
  '/': 'الرئيسية',
  '/roadmap': 'خارطة الطريق',
  '/schedule': 'الجدول اليومي',
  '/projects': 'المشاريع',
  '/resources': 'الموارد',
  '/tips': 'النصائح',
  '/certifications': 'الشهادات',
  '/job-prep': 'الاستعداد الوظيفي',
  '/faq': 'الأسئلة الشائعة',
  '/dashboard': 'لوحة التقدم',
  '/git-commands': 'أوامر Git',
  '/python-guide': 'دليل Python',
  '/labs': 'المختبرات التفاعلية',
  '/database-lab': 'مختبر قواعد البيانات',
  '/quizzes': 'الاختبارات',
  '/search': 'بحث',
  '/security-labs': 'مختبرات الأمن السيبراني',
  '/security-dashboard': 'لوحة المراقبة الأمنية',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0 || location.pathname === '/') return null;

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = routeNames[path] || segment;
    const isLast = index === pathSegments.length - 1;
    return { name, path, isLast };
  });

  return (
    <nav className="max-w-6xl mx-auto px-4 pt-20 pb-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link to="/" className="text-muted-text hover:text-accent transition-colors flex items-center gap-1">
            <Home size={14} />
          </Link>
        </li>
        {breadcrumbs.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-1">
            <ChevronLeft size={14} className="text-dark-border" />
            {crumb.isLast ? (
              <span className="text-accent font-medium">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="text-muted-text hover:text-accent transition-colors">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
