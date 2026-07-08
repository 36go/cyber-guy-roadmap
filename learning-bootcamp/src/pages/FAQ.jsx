import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, ChevronUp, MessageCircle,
  Mail, BookOpen, HelpCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import faqs from '../data/faqs';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqs[0]?.category || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (q) => {
    setOpenQuestions(prev => ({ ...prev, [q]: !prev[q] }));
  };

  const selectedCategory = faqs.find(c => c.category === activeCategory);

  const filteredQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    if (!searchQuery.trim()) return selectedCategory.questions;
    const q = searchQuery.toLowerCase();
    return selectedCategory.questions.filter(
      item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div {...fadeInUp} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          الأسئلة الشائعة
        </h1>
        <p className="text-muted-text text-lg mb-8">
          كل ما تريد معرفته عن معسكر 30 يوم للبرمجة
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            placeholder="ابحث في الأسئلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-card border border-dark-border rounded-xl py-3.5 pr-12 pl-4 text-light-text text-sm
                       placeholder:text-muted-text focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
                       transition-all"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div {...fadeInUp} className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => { setActiveCategory(cat.category); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.category
                  ? 'bg-gradient-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-dark-card border border-dark-border text-muted-text hover:text-light-text hover:border-accent/30'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.section {...fadeInUp} className="mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle size={48} className="text-muted-text mx-auto mb-4" />
                <p className="text-muted-text">لا توجد نتائج للبحث. حاول بكلمة أخرى.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuestions.map((item, idx) => {
                  const isOpen = openQuestions[item.q] || false;
                  return (
                    <motion.div
                      key={item.q}
                      layout
                      className="rounded-xl border border-dark-border bg-dark-card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.q)}
                        className="w-full p-5 flex items-center justify-between text-right gap-4"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-accent text-xs font-bold">{idx + 1}</span>
                          </span>
                          <h3 className="text-light-text font-bold text-sm leading-relaxed">{item.q}</h3>
                        </div>
                        {isOpen
                          ? <ChevronUp size={18} className="text-accent shrink-0" />
                          : <ChevronDown size={18} className="text-muted-text shrink-0" />
                        }
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pr-14">
                              <div className="bg-dark-border/20 rounded-lg p-4">
                                <p className="text-muted-text text-sm leading-relaxed">{item.a}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Help Resources */}
      <motion.section {...fadeInUp}>
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-light-text mb-3">لم تجد إجابتك؟</h2>
          <p className="text-muted-text mb-6">نحن هنا لمساعدتك. تواصل معنا عبر إحدى القنوات التالية:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="md" icon={MessageCircle}>
              سيرفر Discord
            </Button>
            <Button variant="outline" size="md" icon={Mail}>
              راسلنا عبر البريد
            </Button>
            <Button variant="outline" size="md" icon={BookOpen}>
              التوثيق الكامل
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
