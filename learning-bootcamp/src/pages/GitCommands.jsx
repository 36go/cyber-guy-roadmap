import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, GitBranch, Copy, CheckCircle, ChevronDown, ChevronUp,
  Layers
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { useToast } from '../components/common/Toast';

const gitCommands = [
  {
    category: 'الإعداد والتكوين',
    icon: '⚙️',
    commands: [
      { cmd: 'git config --global user.name "Your Name"', desc: 'تعيين اسم المستخدم لجميع المستودعات', level: 'مبتديء' },
      { cmd: 'git config --global user.email "email@example.com"', desc: 'تعيين البريد الإلكتروني لجميع المستودعات', level: 'مبتديء' },
      { cmd: 'git config --global init.defaultBranch main', desc: 'تعيين اسم الفرع الافتراضي إلى main', level: 'مبتديء' },
      { cmd: 'git config --global core.editor "code --wait"', desc: 'تعيين VS Code كمحرر افتراضي', level: 'مبتديء' },
      { cmd: 'git config --global color.ui auto', desc: 'تفعيل الألوان في مخرجات Git', level: 'مبتديء' },
      { cmd: 'git config --global alias.st status', desc: 'إنشاء اختصار st لأمر status', level: 'مبتديء' },
      { cmd: 'git config --global alias.lg "log --oneline --graph --all"', desc: 'إنشاء اختصار لعرض التاريخ بشكل مرئي', level: 'متوسط' },
      { cmd: 'git config --list', desc: 'عرض جميع إعدادات Git الحالية', level: 'مبتديء' },
    ]
  },
  {
    category: 'إنشاء واستنساخ المستودعات',
    icon: '📁',
    commands: [
      { cmd: 'git init', desc: 'إنشاء مستودع Git جديد في المجلد الحالي', level: 'مبتديء' },
      { cmd: 'git init project-name', desc: 'إنشاء مجلد جديد مع مستودع Git', level: 'مبتديء' },
      { cmd: 'git clone https://github.com/user/repo.git', desc: 'استنساخ (نسخ) مستودع عن بعد إلى جهازك', level: 'مبتديء' },
      { cmd: 'git clone --depth 1 https://github.com/user/repo.git', desc: 'استنساخ آخر commit فقط (أسرع للمشاريع الكبيرة)', level: 'متوسط' },
      { cmd: 'git clone --branch develop https://github.com/user/repo.git', desc: 'استنساخ فرع معين من المستودع', level: 'متوسط' },
    ]
  },
  {
    category: 'التعديلات الأساسية',
    icon: '📝',
    commands: [
      { cmd: 'git status', desc: 'عرض حالة الملفات (معدل، جديد، محذوف)', level: 'مبتديء' },
      { cmd: 'git add file.js', desc: 'إضافة ملف معين إلى منطقة التجهيز (Staging)', level: 'مبتديء' },
      { cmd: 'git add .', desc: 'إضافة جميع الملفات المعدلة والجديدة', level: 'مبتديء' },
      { cmd: 'git add -p', desc: 'إضافة أجزاء محددة من الملف تفاعلياً', level: 'متوسط' },
      { cmd: 'git rm file.js', desc: 'حذف ملف وإضافة التغيير إلى التجهيز', level: 'متوسط' },
      { cmd: 'git mv old.js new.js', desc: 'إعادة تسمية ملف ونقل مع التتبع', level: 'متوسط' },
      { cmd: 'git commit -m "Your message"', desc: 'حفظ التغييرات في المستودع مع رسالة', level: 'مبتديء' },
      { cmd: 'git commit -am "Message"', desc: 'إضافة كل التعديلات والالتزام في خطوة واحدة (للملفات المتعقبة)', level: 'متوسط' },
      { cmd: 'git commit --amend -m "New message"', desc: 'تعديل آخر commit (للتصحيح)', level: 'متوسط' },
    ]
  },
  {
    category: 'الفروع (Branches)',
    icon: '🌿',
    commands: [
      { cmd: 'git branch', desc: 'عرض جميع الفروع المحلية', level: 'مبتديء' },
      { cmd: 'git branch feature-name', desc: 'إنشاء فرع جديد من الفرع الحالي', level: 'مبتديء' },
      { cmd: 'git checkout feature-name', desc: 'التبديل إلى فرع آخر', level: 'مبتديء' },
      { cmd: 'git checkout -b feature-name', desc: 'إنشاء فرع جديد والتبديل إليه مباشرة', level: 'مبتديء' },
      { cmd: 'git switch feature-name', desc: 'التبديل إلى فرع (أمر أحدث من checkout)', level: 'متوسط' },
      { cmd: 'git switch -c feature-name', desc: 'إنشاء فرع والتبديل إليه (الأمر الأحدث)', level: 'متوسط' },
      { cmd: 'git branch -d feature-name', desc: 'حذف فرع محلي بعد دمجه', level: 'متوسط' },
      { cmd: 'git branch -D feature-name', desc: 'حذف فرع قسرياً (حتى لو لم يدمج)', level: 'متوسط' },
      { cmd: 'git branch -m old-name new-name', desc: 'إعادة تسمية الفرع الحالي', level: 'متوسط' },
      { cmd: 'git branch -a', desc: 'عرض جميع الفروع (محلية + بعيدة)', level: 'مبتديء' },
    ]
  },
  {
    category: 'الدمج و Rebase',
    icon: '🔀',
    commands: [
      { cmd: 'git merge feature-name', desc: 'دمج فرع معين إلى الفرع الحالي', level: 'متوسط' },
      { cmd: 'git merge --no-ff feature-name', desc: 'دمج مع强制 إنشاء commit دمج (للمحافظة على التاريخ)', level: 'متوسط' },
      { cmd: 'git merge --abort', desc: 'إلغاء الدمج إذا حدثت تعارضات', level: 'متوسط' },
      { cmd: 'git rebase main', desc: 'إعادة تطبيق commits الفرع الحالي فوق main', level: 'متقدم' },
      { cmd: 'git rebase -i HEAD~3', desc: 'إعادة تطبيق آخر 3 commits تفاعلياً (لتعديلها أو دمجها)', level: 'متقدم' },
      { cmd: 'git rebase --continue', desc: 'متابعة rebase بعد حل التعارضات', level: 'متقدم' },
      { cmd: 'git rebase --abort', desc: 'إلغاء عملية rebase بالكامل', level: 'متقدم' },
      { cmd: 'git cherry-pick commit-hash', desc: 'تطبيق commit معين من فرع آخر إلى الفرع الحالي', level: 'متقدم' },
    ]
  },
  {
    category: 'المشاركة والرفع',
    icon: '☁️',
    commands: [
      { cmd: 'git remote add origin https://github.com/user/repo.git', desc: 'ربط مستودع محلي بمستودع بعيد', level: 'مبتديء' },
      { cmd: 'git remote -v', desc: 'عرض المستودعات البعيدة المرتبطة', level: 'مبتديء' },
      { cmd: 'git push origin main', desc: 'رفع commits إلى المستودع البعيد', level: 'مبتديء' },
      { cmd: 'git push -u origin main', desc: 'رفع وربط الفرع المحلي بالبعيد', level: 'مبتديء' },
      { cmd: 'git push origin --delete feature-name', desc: 'حذف فرع من المستودع البعيد', level: 'متوسط' },
      { cmd: 'git push --tags', desc: 'رفع جميع الوسوم (tags) إلى البعيد', level: 'متوسط' },
      { cmd: 'git pull origin main', desc: 'جلب التغييرات من البعيد ودمجها', level: 'مبتديء' },
      { cmd: 'git fetch origin', desc: 'جلب التغييرات من البعيد بدون دمج', level: 'متوسط' },
      { cmd: 'git pull --rebase origin main', desc: 'جلب التغييرات وتطبيقها عبر rebase (تاريخ أنظف)', level: 'متقدم' },
    ]
  },
  {
    category: 'التراجع والتصحيح',
    icon: '⏪',
    commands: [
      { cmd: 'git reset file.js', desc: 'إزالة ملف من منطقة التجهيز (unstage)', level: 'مبتديء' },
      { cmd: 'git reset --soft HEAD~1', desc: 'التراجع عن آخر commit مع الاحتفاظ بالتغييرات في التجهيز', level: 'متوسط' },
      { cmd: 'git reset --mixed HEAD~1', desc: 'التراجع عن آخر commit مع إزالة التغييرات من التجهيز', level: 'متوسط' },
      { cmd: 'git reset --hard HEAD~1', desc: 'حذف آخر commit وجميع تغييراته (خطير!)', level: 'متوسط' },
      { cmd: 'git revert commit-hash', desc: 'إنشاء commit جديد يعكس التغييرات (آمن للمشاركة)', level: 'متوسط' },
      { cmd: 'git restore file.js', desc: 'استعادة ملف إلى حالته في آخر commit', level: 'مبتديء' },
      { cmd: 'git restore --staged file.js', desc: 'إزالة ملف من التجهيز فقط', level: 'مبتديء' },
      { cmd: 'git clean -fd', desc: 'حذف جميع الملفات غير المتعقبة', level: 'متوسط' },
      { cmd: 'git reflog', desc: 'عرض سجل جميع العمليات (لاستعادة commits المحذوفة)', level: 'متقدم' },
    ]
  },
  {
    category: 'التخزين المؤقت (Stash)',
    icon: '💾',
    commands: [
      { cmd: 'git stash', desc: 'حفظ التغييرات الحالية مؤقتاً', level: 'متوسط' },
      { cmd: 'git stash save "message"', desc: 'حفظ التغييرات مع رسالة', level: 'متوسط' },
      { cmd: 'git stash list', desc: 'عرض جميع stash المحفوظة', level: 'متوسط' },
      { cmd: 'git stash pop', desc: 'استعادة آخر stash وحذفها', level: 'متوسط' },
      { cmd: 'git stash apply', desc: 'استعادة آخر stash بدون حذفها', level: 'متوسط' },
      { cmd: 'git stash drop stash@{0}', desc: 'حذف stash معينة', level: 'متوسط' },
      { cmd: 'git stash clear', desc: 'حذف جميع stash المحفوظة', level: 'متوسط' },
    ]
  },
  {
    category: 'التاريخ والسجل',
    icon: '📜',
    commands: [
      { cmd: 'git log', desc: 'عرض سجل الـ commits', level: 'مبتديء' },
      { cmd: 'git log --oneline -10', desc: 'عرض آخر 10 commits في سطر واحد', level: 'مبتديء' },
      { cmd: 'git log --graph --oneline --all', desc: 'عرض تاريخ مرئي مع الفروع', level: 'مبتديء' },
      { cmd: 'git log --author="name"', desc: 'تصفية commits حسب المؤلف', level: 'متوسط' },
      { cmd: 'git log --since="2024-01-01"', desc: 'عرض commits من تاريخ معين', level: 'متوسط' },
      { cmd: 'git blame file.js', desc: 'عرض من قام بآخر تعديل على كل سطر', level: 'متوسط' },
      { cmd: 'git diff', desc: 'عرض التغييرات غير الملتزمة', level: 'مبتديء' },
      { cmd: 'git diff --staged', desc: 'عرض التغييرات في منطقة التجهيز', level: 'مبتديء' },
      { cmd: 'git shortlog -sn', desc: 'عرض عدد commits لكل مساهم', level: 'متوسط' },
    ]
  },
  {
    category: 'الوسوم (Tags)',
    icon: '🏷️',
    commands: [
      { cmd: 'git tag', desc: 'عرض جميع الوسوم', level: 'متوسط' },
      { cmd: 'git tag v1.0.0', desc: 'إنشاء وسم (tag) على آخر commit', level: 'متوسط' },
      { cmd: 'git tag -a v1.0.0 -m "Release 1.0.0"', desc: 'إنشاء وسم مع رسالة', level: 'متوسط' },
      { cmd: 'git tag -d v1.0.0', desc: 'حذف وسم محلي', level: 'متوسط' },
      { cmd: 'git push origin v1.0.0', desc: 'رفع وسم إلى البعيد', level: 'متوسط' },
    ]
  },
  {
    category: 'المشاريع الفرعية (Submodules)',
    icon: '🧩',
    commands: [
      { cmd: 'git submodule add https://github.com/user/lib.git', desc: 'إضافة مشروع فرعي', level: 'متقدم' },
      { cmd: 'git submodule init', desc: 'تهيئة المشاريع الفرعية', level: 'متقدم' },
      { cmd: 'git submodule update --remote', desc: 'تحديث المشاريع الفرعية', level: 'متقدم' },
      { cmd: 'git clone --recurse-submodules https://github.com/user/repo.git', desc: 'استنساخ مع جميع المشاريع الفرعية', level: 'متقدم' },
    ]
  },
  {
    category: 'البحث والتصحيح',
    icon: '🔍',
    commands: [
      { cmd: 'git grep "search-term"', desc: 'البحث عن نص في جميع الملفات', level: 'متوسط' },
      { cmd: 'git log -S "function name"', desc: 'البحث عن commits التي أضافت أو أزالت نصاً', level: 'متوسط' },
      { cmd: 'git bisect start', desc: 'بدء البحث الثنائي عن commit يسبب خطأ', level: 'متقدم' },
      { cmd: 'git bisect bad', desc: 'تحديد commit الحالي كسيء', level: 'متقدم' },
      { cmd: 'git bisect good commit-hash', desc: 'تحديد commit سليم', level: 'متقدم' },
      { cmd: 'git bisect reset', desc: 'إنهاء البحث الثنائي', level: 'متقدم' },
    ]
  },
];

const levelColors = {
  مبتديء: 'success',
  متوسط: 'warning',
  متقدم: 'danger',
};

export default function GitCommands() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [levelFilter, setLevelFilter] = useState('all');
  const [copied, setCopied] = useState(null);

  const filteredCategories = useMemo(() => {
    return gitCommands.map(cat => ({
      ...cat,
      commands: cat.commands.filter(cmd => {
        const matchesSearch = searchQuery.trim() === '' ||
          cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = levelFilter === 'all' || cmd.level === levelFilter;
        return matchesSearch && matchesLevel;
      })
    })).filter(cat => cat.commands.length > 0);
  }, [searchQuery, levelFilter]);

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
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
    showToast('تم نسخ الأمر', 'success');
  };

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <GitBranch size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">مرجع أوامر Git</h1>
              <p className="text-muted-text text-sm mt-1">دليل شامل لأكثر من 60 أمراً من أوامر Git مع الشرح والأمثلة</p>
            </div>
          </div>
        </motion.div>
      </section>

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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أمر Git..."
            className="w-full px-12 py-3.5 rounded-xl bg-dark-card border border-dark-border/50 text-light-text placeholder-muted-text/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
          />
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="info" size="sm" icon={Layers}>المستوى:</Badge>
          {['all', 'مبتديء', 'متوسط', 'متقدم'].map(level => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                levelFilter === level
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'text-muted-text border-dark-border/30 hover:border-accent/20 hover:text-light-text'
              }`}
            >
              {level === 'all' ? 'الكل' : level}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="space-y-4">
          {filteredCategories.map((category, catIdx) => {
            const isOpen = expandedCategory === catIdx;
            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.05 }}
              >
                <Card gradient={false} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isOpen ? null : catIdx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-dark-bg/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="text-right">
                        <h3 className="text-lg font-bold text-light-text">{category.category}</h3>
                        <p className="text-xs text-muted-text">{category.commands.length} أمر</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} className="text-muted-text" />}
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-dark-border/30"
                    >
                      <div className="divide-y divide-dark-border/20">
                        {category.commands.map((cmd, cmdIdx) => (
                          <div key={cmdIdx} className="p-4 hover:bg-dark-bg/20 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <code className="text-sm font-mono text-accent bg-accent/5 px-2.5 py-1 rounded-lg border border-accent/20 block w-full sm:w-auto text-left" dir="ltr">
                                    {cmd.cmd}
                                  </code>
                                  <Badge variant={levelColors[cmd.level]} size="sm">{cmd.level}</Badge>
                                </div>
                                <p className="text-sm text-muted-text mt-1">{cmd.desc}</p>
                              </div>
                              <button
                                onClick={() => handleCopy(cmd.cmd)}
                                className="p-2 rounded-lg border border-dark-border/30 text-muted-text hover:text-accent hover:border-accent/30 transition-all shrink-0"
                              >
                                {copied === cmd.cmd ? <CheckCircle size={16} className="text-success" /> : <Copy size={16} />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Search size={48} className="text-muted-text mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-bold text-light-text mb-2">لا توجد نتائج</h3>
            <p className="text-muted-text text-sm">حاول تغيير معايير البحث</p>
          </div>
        )}
      </section>
    </div>
  );
}
