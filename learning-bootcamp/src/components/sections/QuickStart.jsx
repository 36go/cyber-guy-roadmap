import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, ExternalLink, Copy, Check, Code2, BookOpen, Database } from 'lucide-react';
import quickRefData from '../../data/quickRefData';

const linkIcons = {
  'GitHub': Code2,
  'Coursera': BookOpen,
  'MongoDB': Database,
};

const importantLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'GitHub' },
  { name: 'Coursera', url: 'https://coursera.org', icon: 'Coursera' },
  { name: 'MongoDB Atlas', url: 'https://mongodb.com/atlas', icon: 'MongoDB' },
  { name: 'Discord', url: 'https://discord.com', icon: 'GitHub' },
  { name: 'VS Code', url: 'https://code.visualstudio.com', icon: 'GitHub' },
  { name: 'Node.js', url: 'https://nodejs.org', icon: 'GitHub' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'GitHub' },
];

export default function QuickStart() {
  const [checklist, setChecklist] = useState(
    quickRefData.firstDayChecklist.map(item => ({ ...item }))
  );
  const [copiedIndex, setCopiedIndex] = useState(null);

  const toggleItem = (index) => {
    setChecklist(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const doneCount = checklist.filter(item => item.done).length;
  const progress = Math.round((doneCount / checklist.length) * 100);

  return (
    <section className="py-16 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            استعد لليوم <span className="text-gradient">الأول</span>
          </h2>
          <p className="text-muted-text text-lg">جهز بيئتك البرمجية في ٦ خطوات بسيطة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-dark-card border border-accent/30 p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-accent to-secondary" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-light-text">قائمة التجهيزات</h3>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-dark-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-text">{doneCount}/{checklist.length}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {checklist.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => toggleItem(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-right transition-all duration-300 ${
                    item.done
                      ? 'bg-success/10 border border-success/30'
                      : 'bg-dark-bg/50 border border-dark-border hover:border-accent/30'
                  }`}
                >
                  {item.done ? (
                    <CheckSquare size={22} className="text-success shrink-0" />
                  ) : (
                    <Square size={22} className="text-muted-text shrink-0" />
                  )}
                  <span className={`flex-1 text-sm md:text-base ${
                    item.done ? 'text-success line-through' : 'text-light-text'
                  }`}>
                    {item.task}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          <div>
            <h4 className="text-sm font-bold text-muted-text mb-3">روابط سريعة للنسخ</h4>
            <div className="flex flex-wrap gap-2">
              {importantLinks.map((link, i) => {
                const LinkIcon = linkIcons[link.name] || ExternalLink;
                const isCopied = copiedIndex === i;

                return (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(link.url, i)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-bg border border-dark-border text-muted-text hover:text-accent hover:border-accent/30 transition-all duration-200"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                    <LinkIcon size={14} />
                    {link.name}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
