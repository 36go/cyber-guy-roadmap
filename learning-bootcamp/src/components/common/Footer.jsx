import { Link } from 'react-router-dom';
import { Heart, BookOpen, GraduationCap, FlaskConical, Database, Code } from 'lucide-react';

const footerColumns = [
  {
    title: 'التعلم',
    links: [
      { label: 'خارطة الطريق', to: '/roadmap' },
      { label: 'الجدول اليومي', to: '/schedule' },
      { label: 'المختبرات التفاعلية', to: '/labs' },
      { label: 'الاختبارات', to: '/quizzes' },
    ],
  },
  {
    title: 'الموارد',
    links: [
      { label: 'المشاريع التطبيقية', to: '/projects' },
      { label: 'الموارد التعليمية', to: '/resources' },
      { label: 'النصائح', to: '/tips' },
      { label: 'الشهادات', to: '/certifications' },
    ],
  },
  {
    title: 'المراجع الرسمية',
    links: [
      { label: 'توثيق React', to: 'https://react.dev', external: true },
      { label: 'MDN Web Docs', to: 'https://developer.mozilla.org', external: true },
      { label: 'JavaScript.info', to: 'https://javascript.info', external: true },
      { label: 'Node.js Docs', to: 'https://nodejs.org/docs', external: true },
    ],
  },
  {
    title: 'مختبرات',
    links: [
      { label: 'HTML/CSS', to: '/labs/html-css', external: false },
      { label: 'JavaScript', to: '/labs/javascript', external: false },
      { label: 'Python', to: '/labs/python', external: false },
      { label: 'SQL', to: '/database-lab', external: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-dark-border">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card/30 to-dark-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-light-text font-bold text-lg mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-text hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-muted-text hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-text text-xs flex items-center gap-1">
            © {new Date().getFullYear()} معسكر 30 يوم - منصة تعلم تفاعلية
          </p>
          <p className="text-muted-text text-xs flex items-center gap-1">
            صُنع بـ <Heart size={12} className="text-danger" /> للتعلم الذاتي
          </p>
        </div>
      </div>
    </footer>
  );
}
