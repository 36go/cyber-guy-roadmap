import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Legend, ResponsiveContainer,
} from 'recharts';
import { FileDown, Printer, Calendar, Clock, Award, Code, ChevronLeft } from 'lucide-react';
import Timeline from '../components/visualization/Timeline';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import roadmapData from '../data/roadmapData';
import quickRefData from '../data/quickRefData';

const weekColors = ['#00D9FF', '#7C3AED', '#10B981', '#F59E0B'];

const weekNames = ['الأسبوع ١', 'الأسبوع ٢', 'الأسبوع ٣', 'الأسبوع ٤'];

const pathColorMap = {
  backend: '#2563EB',
  frontend: '#10B981',
  security: '#EF4444',
  python: '#F59E0B',
};

const difficultyMap = {
  'سهل': { variant: 'success', label: 'سهل' },
  'متوسط': { variant: 'warning', label: 'متوسط' },
  'صعب': { variant: 'danger', label: 'صعب' },
};

function QuickStatsBreadcrumb({ stats }) {
  const items = [
    { icon: Calendar, label: 'أيام', value: stats.totalDays },
    { icon: Clock, label: 'ساعة', value: stats.totalHours },
    { icon: Code, label: 'مشاريع', value: stats.projects },
    { icon: Award, label: 'شهادات', value: stats.certifications },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-card border border-dark-border"
          >
            <Icon size={18} className="text-accent shrink-0" />
            <span className="text-lg font-bold text-light-text font-mono">{item.value}</span>
            <span className="text-sm text-muted-text">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function SkillsRadar() {
  const { skillsProgression } = roadmapData;
  const radarData = skillsProgression.labels.map((label, i) => ({
    subject: label,
    A: skillsProgression.week1[i],
    B: skillsProgression.week2[i],
    C: skillsProgression.week3[i],
    D: skillsProgression.week4[i],
  }));

  const [activeWeek, setActiveWeek] = useState(null);

  return (
    <Card title="تطور المهارات" className="p-6">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {weekNames.map((name, i) => (
          <button
            key={name}
            onClick={() => setActiveWeek(activeWeek === i ? null : i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeWeek === i
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-dark-bg border border-dark-border text-muted-text hover:border-accent/30'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94A3B8', fontSize: 12, fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 10 }}
            stroke="#334155"
          />

          {activeWeek === null || activeWeek === 0 ? (
            <Radar
              name={weekNames[0]}
              dataKey="A"
              stroke={weekColors[0]}
              fill={weekColors[0]}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ fill: weekColors[0], r: 3 }}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {activeWeek === null || activeWeek === 1 ? (
            <Radar
              name={weekNames[1]}
              dataKey="B"
              stroke={weekColors[1]}
              fill={weekColors[1]}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ fill: weekColors[1], r: 3 }}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {activeWeek === null || activeWeek === 2 ? (
            <Radar
              name={weekNames[2]}
              dataKey="C"
              stroke={weekColors[2]}
              fill={weekColors[2]}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ fill: weekColors[2], r: 3 }}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {activeWeek === null || activeWeek === 3 ? (
            <Radar
              name={weekNames[3]}
              dataKey="D"
              stroke={weekColors[3]}
              fill={weekColors[3]}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ fill: weekColors[3], r: 3 }}
              activeDot={{ r: 5 }}
            />
          ) : null}

          {activeWeek === null && (
            <Legend
              wrapperStyle={{ paddingTop: 16, fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              formatter={(value) => <span style={{ color: '#94A3B8', fontSize: 13 }}>{value}</span>}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function LearningPathsTable({ paths }) {
  const pathIcons = {
    backend: '🔧',
    frontend: '🎨',
    security: '🛡️',
    python: '🐍',
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-dark-border">
      <table className="w-full text-right">
        <thead>
          <tr className="bg-dark-card border-b border-dark-border">
            <th className="p-4 text-light-text font-bold">المعيار</th>
            {paths.map((p) => (
              <th
                key={p.id}
                className="p-4 text-light-text font-bold"
                style={{ borderLeft: `3px solid ${pathColorMap[p.id] || '#00D9FF'}` }}
              >
                <div className="flex items-center gap-2">
                  <span>{pathIcons[p.id]}</span>
                  <span className="text-sm">{p.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          <tr className="hover:bg-dark-card/50 transition-colors">
            <td className="p-4 text-muted-text font-medium">المهارات</td>
            {paths.map((p) => (
              <td key={p.id} className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <Badge key={s} variant="info" size="sm">{s}</Badge>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr className="hover:bg-dark-card/50 transition-colors">
            <td className="p-4 text-muted-text font-medium">الساعات</td>
            {paths.map((p) => (
              <td key={p.id} className="p-4">
                <span className="text-light-text font-bold font-mono">{p.hours}+</span>
                <span className="text-muted-text text-sm mr-1">ساعة</span>
              </td>
            ))}
          </tr>
          <tr className="hover:bg-dark-card/50 transition-colors">
            <td className="p-4 text-muted-text font-medium">الدورات</td>
            {paths.map((p) => (
              <td key={p.id} className="p-4">
                <span className="text-light-text font-bold font-mono">{p.courses}</span>
                <span className="text-muted-text text-sm mr-1">دورة</span>
              </td>
            ))}
          </tr>
          <tr className="hover:bg-dark-card/50 transition-colors">
            <td className="p-4 text-muted-text font-medium">المستوى</td>
            {paths.map((p) => (
              <td key={p.id} className="p-4">
                <span className="text-sm text-accent">{p.difficulty}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Roadmap() {
  const { stats } = quickRefData;
  const { learningPaths } = roadmapData;

  const handlePrint = () => window.print();
  const handleDownloadPDF = () => {
    const content = document.getElementById('roadmap-content');
    if (content) {
      window.print();
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            خارطة <span className="text-gradient">الطريق</span>
          </h1>
          <p className="text-xl text-muted-text">٣٠ يوماً من التعلم المكثف</p>
        </motion.div>

        <QuickStatsBreadcrumb stats={stats} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Timeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              تطور <span className="text-gradient">المهارات</span>
            </h2>
            <p className="text-muted-text">شاهد كيف تتطور مهاراتك أسبوعاً بعد أسبوع</p>
          </div>
          <SkillsRadar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              مقارنة <span className="text-gradient">المسارات</span>
            </h2>
            <p className="text-muted-text">قارن بين المسارات الثلاثة واختر ما يناسبك</p>
          </div>
          <LearningPathsTable paths={learningPaths} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            خيارات <span className="text-gradient">التحميل</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={FileDown}
              onClick={handleDownloadPDF}
            >
              تحميل الخارطة (PDF)
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={Printer}
              onClick={handlePrint}
            >
              طباعة
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
