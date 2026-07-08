import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Lock, UserX, Bot, Server, Database,
  Globe, Activity, TrendingUp, TrendingDown, Monitor, Wifi,
  Terminal, FileText, Download, RefreshCw, Search, Filter,
  Clock, Split, PieChart, BarChart3, AlertCircle, CheckCircle,
  XCircle, MinusCircle, ArrowUp, Hash, Target, Zap,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const eventTypes = [
  { type: 'attempted_login', label: 'محاولة دخون', severity: 'medium', icon: 'Lock' },
  { type: 'sql_injection', label: 'حقن SQL', severity: 'high', icon: 'AlertTriangle' },
  { type: 'brute_force', label: 'هجوم تخمين', severity: 'high', icon: 'UserX' },
  { type: 'suspicious_request', label: 'طلب مشبوه', severity: 'medium', icon: 'Shield' },
  { type: 'bot_detected', label: 'بوت تم اكتشافه', severity: 'low', icon: 'Bot' },
  { type: 'api_abuse', label: 'إساءة استخدام API', severity: 'high', icon: 'Server' },
  { type: 'unauthorized_access', label: 'وصول غير مصرح', severity: 'critical', icon: 'Lock' },
  { type: 'data_anomaly', label: 'شذوذ في البيانات', severity: 'medium', icon: 'Database' },
  { type: 'scan_detected', label: 'فحص تم اكتشافه', severity: 'low', icon: 'Globe' },
  { type: 'rate_limit_exceeded', label: 'تجاوز حد الطلبات', severity: 'medium', icon: 'AlertTriangle' },
];

const severityConfig = {
  critical: { label: 'خطير', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', badge: 'danger', pulse: true },
  high: { label: 'عالٍ', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', badge: 'warning', pulse: false },
  medium: { label: 'متوسط', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', badge: 'warning', pulse: false },
  low: { label: 'منخفض', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30', badge: 'info', pulse: false },
};

const iconMap = {
  Shield, AlertTriangle, Lock, UserX, Bot, Server, Database, Globe,
};

const systems = [
  { name: 'خادم الويب', id: 'web-server', icon: Server },
  { name: 'قاعدة البيانات', id: 'database', icon: Database },
  { name: 'بوابة API', id: 'api-gateway', icon: Globe },
  { name: 'خدمة المصادقة', id: 'auth-service', icon: Lock },
  { name: 'خادم البريد', id: 'email-server', icon: Terminal },
  { name: 'DNS', id: 'dns', icon: Wifi },
  { name: 'جدار الحماية', id: 'firewall', icon: Shield },
  { name: 'IDS/IPS', id: 'ids-ips', icon: Activity },
];

const iocTypes = [
  { type: 'ip', label: 'IP' },
  { type: 'domain', label: 'نطاق' },
  { type: 'hash', label: 'تجزئة' },
  { type: 'url', label: 'URL' },
];

const sampleIPs = [
  '45.33.32.156', '103.235.46.89', '185.220.101.42', '91.121.87.34',
  '198.51.100.23', '203.0.113.72', '192.0.2.156', '10.0.0.45',
  '172.16.0.89', '192.168.1.200',
];

const sampleDomains = [
  'malicious-site.com', 'phishing-attempt.net', 'botnet-c2.org',
  'data-exfil.io', 'evil-hosting.ru', 'suspicious-download.co',
];

const sampleHashes = [
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a',
  'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
];

const sampleURLs = [
  'https://evil.com/exploit', 'https://phishing.net/login',
  'https://malware.download/payload', 'https://data-exfil.io/upload',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function generateEvent(id) {
  const et = randomItem(eventTypes);
  const now = new Date();
  now.setSeconds(now.getSeconds() - randomInt(0, 60));
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return {
    id,
    timestamp: time,
    type: et.type,
    label: et.label,
    severity: et.severity,
    icon: et.icon,
    sourceIP: randomItem(sampleIPs),
    description: `${et.label} من ${randomItem(sampleIPs)}`,
    status: randomItem(['new', 'investigating', 'resolved']),
  };
}

function generateIOC(id) {
  const it = randomItem(iocTypes);
  let value;
  switch (it.type) {
    case 'ip': value = randomItem(sampleIPs); break;
    case 'domain': value = randomItem(sampleDomains); break;
    case 'hash': value = randomItem(sampleHashes); break;
    case 'url': value = randomItem(sampleURLs); break;
    default: value = 'unknown';
  }
  const firstSeen = new Date(Date.now() - randomInt(0, 7) * 86400000);
  const lastSeen = new Date(firstSeen.getTime() + randomInt(0, 3) * 86400000);
  return {
    id,
    type: it.type,
    label: it.label,
    value,
    confidence: randomInt(40, 99),
    firstSeen: firstSeen.toLocaleDateString('ar-SA'),
    lastSeen: lastSeen.toLocaleDateString('ar-SA'),
  };
}

function generateSystemStatus() {
  const r = Math.random();
  if (r < 0.7) return { status: 'up', uptime: randomInt(90, 999), events: randomInt(10, 500) };
  if (r < 0.9) return { status: 'warning', uptime: randomInt(30, 89), events: randomInt(100, 800) };
  return { status: 'down', uptime: randomInt(0, 29), events: randomInt(500, 1500) };
}

const statusColors = {
  up: { label: 'نشط', dot: 'bg-success', bg: 'bg-success/10', border: 'border-success/30', text: 'text-success' },
  warning: { label: 'تحذير', dot: 'bg-warning', bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning' },
  down: { label: 'معطل', dot: 'bg-danger', bg: 'bg-danger/10', border: 'border-danger/30', text: 'text-danger' },
};

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const severityColors = { critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#00D9FF' };
const severityKeys = ['critical', 'high', 'medium', 'low'];
const severityLabels = { critical: 'خطير', high: 'عالٍ', medium: 'متوسط', low: 'منخفض' };

function StatCard({ icon: Icon, label, value, trend, trendUp, color }) {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;
  const trendColor = trendUp ? 'text-success' : 'text-danger';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-dark-border bg-dark-card p-5 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon size={14} />
            {trend}%
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold tabular-nums text-light-text font-mono">{value}</p>
      <p className="text-muted-text text-xs mt-1">{label}</p>
    </motion.div>
  );
}

function EventsOverTimeChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.03 }}
            className="w-full rounded-t-sm"
            style={{
              background: d.count > max * 0.8
                ? 'linear-gradient(180deg, #EF4444, #F97316)'
                : d.count > max * 0.5
                  ? 'linear-gradient(180deg, #F59E0B, #00D9FF)'
                  : 'linear-gradient(180deg, #00D9FF, #7C3AED)',
              minHeight: 4,
            }}
          />
          {i % 4 === 0 && (
            <span className="text-[8px] text-muted-text">{d.hour}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function TopAttackTypesChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.type}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-text">{d.label}</span>
            <span className="text-xs font-mono text-light-text">{d.count}</span>
          </div>
          <div className="h-2 rounded-full bg-dark-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.count / max) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full rounded-full"
              style={{
                background: i === 0
                  ? 'linear-gradient(90deg, #EF4444, #F97316)'
                  : i === 1
                    ? 'linear-gradient(90deg, #F59E0B, #00D9FF)'
                    : 'linear-gradient(90deg, #00D9FF, #7C3AED)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SecurityScoreGauge({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#F97316';
    return '#EF4444';
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#334155" strokeWidth="10" />
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-3xl font-bold font-mono"
          style={{ color: getColor() }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-muted-text">/ 100</span>
      </div>
    </div>
  );
}

function AlertPieChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  let cumulative = 0;
  const slices = data.map(d => {
    const start = cumulative;
    cumulative += d.count;
    const end = cumulative;
    return { ...d, startAngle: (start / total) * 360, endAngle: (end / total) * 360 };
  });

  const toRad = (deg) => (deg - 90) * (Math.PI / 180);
  const cx = 80, cy = 80, r = 70;

  const paths = slices.map((d, i) => {
    const s = toRad(d.startAngle);
    const e = toRad(d.endAngle);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = d.endAngle - d.startAngle > 180 ? 1 : 0;
    return (
      <motion.path
        key={d.severity}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
        fill={severityColors[d.severity]}
        opacity={0.85}
        stroke="#0F172A"
        strokeWidth={2}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" className="mb-3">
        {paths}
      </svg>
      <div className="flex flex-wrap gap-3 justify-center">
        {data.map(d => (
          <div key={d.severity} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: severityColors[d.severity] }} />
            <span className="text-[10px] text-muted-text">{severityLabels[d.severity]} ({d.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventItem({ event, index }) {
  const sev = severityConfig[event.severity];
  const EventIcon = iconMap[event.icon] || Shield;
  const statusLabels = { new: 'جديد', investigating: 'قيد التحقيق', resolved: 'تم الحل' };
  const statusColorsEv = {
    new: 'text-accent bg-accent/10 border-accent/30',
    investigating: 'text-warning bg-warning/10 border-warning/30',
    resolved: 'text-success bg-success/10 border-success/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`flex items-start gap-3 p-3 rounded-xl border ${sev.border} ${sev.bg} ${
        event.status === 'new' ? 'animate-slide-in' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${sev.bg}`}>
        <EventIcon size={14} className={sev.color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-xs font-mono text-muted-text`}>{event.timestamp}</span>
          <span className={`text-xs font-bold ${sev.color}`}>{event.label}</span>
          {sev.pulse && (
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
          )}
        </div>
        <p className="text-xs text-muted-text font-mono truncate">{event.sourceIP}</p>
        <p className="text-xs text-muted-text mt-0.5">{event.description}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge variant={sev.badge} size="sm">{sev.label}</Badge>
        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${statusColorsEv[event.status] || statusColorsEv.new}`}>
          {statusLabels[event.status]}
        </span>
      </div>
    </motion.div>
  );
}

export default function SecurityDashboard() {
  const { progress } = useApp();
  const [events, setEvents] = useState([]);
  const [iocs, setIocs] = useState([]);
  const [systemStatuses, setSystemStatuses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [eventIdCounter, setEventIdCounter] = useState(0);
  const [iocIdCounter, setIocIdCounter] = useState(0);
  const [securityScore, setSecurityScore] = useState(85);
  const feedRef = useRef(null);

  const initializeData = useCallback(() => {
    const initialEvents = [];
    for (let i = 0; i < 20; i++) {
      initialEvents.push(generateEvent(i));
    }
    initialEvents.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    setEvents(initialEvents);
    setEventIdCounter(20);

    const initialIOCs = [];
    for (let i = 0; i < 8; i++) {
      initialIOCs.push(generateIOC(i));
    }
    setIocs(initialIOCs);
    setIocIdCounter(8);

    setSystemStatuses(systems.map(s => ({ ...s, ...generateSystemStatus() })));
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEventIdCounter(prev => {
        const newId = prev;
        const newEvent = generateEvent(newId);
        setEvents(current => {
          const updated = [newEvent, ...current].slice(0, 100);
          return updated.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
        });
        return prev + 1;
      });

      setIocIdCounter(prev => {
        const newId = prev;
        if (Math.random() > 0.6) {
          setIocs(current => [generateIOC(newId), ...current].slice(0, 12));
        }
        return prev + 1;
      });

      if (Math.random() > 0.8) {
        setSystemStatuses(prev => {
          const updated = [...prev];
          const idx = randomInt(0, updated.length - 1);
          updated[idx] = { ...updated[idx], ...generateSystemStatus() };
          return updated;
        });
      }

      setSecurityScore(prev => {
        const delta = randomInt(-3, 3);
        return Math.max(0, Math.min(100, prev + delta));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events;
    return events.filter(e => e.severity === filter);
  }, [events, filter]);

  const alertCounts = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    events.forEach(e => { counts[e.severity] = (counts[e.severity] || 0) + 1; });
    return severityKeys.map(k => ({ severity: k, count: counts[k], label: severityLabels[k], color: severityColors[k] }));
  }, [events]);

  const topEventTypes = useMemo(() => {
    const counts = {};
    events.forEach(e => {
      if (!counts[e.type]) counts[e.type] = { type: e.type, label: e.label, count: 0 };
      counts[e.type].count++;
    });
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [events]);

  const recentAlerts = useMemo(() => {
    return events.filter(e => e.severity === 'critical' || e.severity === 'high').slice(0, 5);
  }, [events]);

  const eventsOverTime = useMemo(() => {
    const hours = [];
    for (let i = 23; i >= 0; i--) {
      hours.push({ hour: `${i}:00`, count: randomInt(5, 50) });
    }
    return hours;
  }, []);

  const topAttacks = useMemo(() => {
    const counts = {};
    eventTypes.forEach(et => { counts[et.type] = { ...et, count: randomInt(3, 40) }; });
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 6);
  }, []);

  const alertResolutionRate = useMemo(() => {
    const total = events.length;
    const resolved = events.filter(e => e.status === 'resolved').length;
    return total > 0 ? Math.round((resolved / total) * 100) : 0;
  }, [events]);

  const totalEventsToday = useMemo(() => events.length, [events]);
  const activeAlerts = useMemo(() => events.filter(e => e.status !== 'resolved').length, [events]);
  const criticalAlerts = useMemo(() => events.filter(e => e.severity === 'critical' && e.status !== 'resolved').length, [events]);
  const systemsMonitored = systems.length;
  const incidentsInProgress = useMemo(() => events.filter(e => e.status === 'investigating').length, [events]);

  const filterButtons = [
    { key: 'all', label: 'الكل', icon: Filter },
    { key: 'critical', label: 'خطير', icon: AlertCircle, color: 'text-danger border-danger/30' },
    { key: 'high', label: 'عالٍ', icon: AlertTriangle, color: 'text-orange-400 border-orange-500/30' },
    { key: 'medium', label: 'متوسط', icon: MinusCircle, color: 'text-warning border-warning/30' },
    { key: 'low', label: 'منخفض', icon: CheckCircle, color: 'text-accent border-accent/30' },
  ];

  const quickActions = [
    { label: 'إنشاء تقرير', icon: FileText },
    { label: 'مراجعة الأحداث', icon: Search },
    { label: 'تصدير السجلات', icon: Download },
    { label: 'تحديث الحالة', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 65, 85, 0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <section className="max-w-7xl mx-auto px-4 pt-24 pb-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center">
                <Shield size={24} className="text-danger" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-1">لوحة أمن المعلومات</h1>
                <p className="text-muted-text text-sm flex items-center gap-2">
                  <Activity size={14} className="text-accent animate-pulse" />
                  Security Operations Center — نظام مراقبة تعليمي
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border">
                <Clock size={14} className="text-accent" />
                <span className="text-xs text-muted-text font-mono">
                  {new Date().toLocaleTimeString('ar-SA')}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-success/10 border border-success/30">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success">نشط</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Activity}
              label="إجمالي الأحداث اليوم"
              value={totalEventsToday}
              trend={12}
              trendUp
              color="bg-gradient-to-br from-accent to-blue-700"
            />
            <StatCard
              icon={AlertTriangle}
              label="التنبيهات النشطة"
              value={activeAlerts}
              trend={criticalAlerts}
              trendUp={false}
              color="bg-gradient-to-br from-danger to-orange-700"
            />
            <StatCard
              icon={Monitor}
              label="الأنظمة المراقبة"
              value={systemsMonitored}
              color="bg-gradient-to-br from-secondary to-purple-700"
            />
            <StatCard
              icon={AlertCircle}
              label="الحوادث قيد التحقيق"
              value={incidentsInProgress}
              trend={8}
              trendUp
              color="bg-gradient-to-br from-warning to-amber-700"
            />
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 relative">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card title="الأحداث المباشرة" icon={Activity} className="h-full">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {filterButtons.map(btn => {
                  const BtnIcon = btn.icon;
                  const isActive = filter === btn.key;
                  return (
                    <button
                      key={btn.key}
                      onClick={() => setFilter(btn.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        isActive
                          ? btn.color
                            ? `${btn.color} bg-dark-card`
                            : 'text-accent border-accent/30 bg-dark-card'
                          : 'text-muted-text border-dark-border/50 hover:border-accent/20 hover:text-light-text'
                      }`}
                    >
                      <BtnIcon size={12} />
                      {btn.label}
                    </button>
                  );
                })}
                <span className="text-xs text-muted-text mr-auto font-mono">{filteredEvents.length} حدث</span>
              </div>

              <div ref={feedRef} className="space-y-2 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                <AnimatePresence mode="popLayout">
                  {filteredEvents.slice(0, 30).map((event, i) => (
                    <EventItem key={event.id} event={event} index={i} />
                  ))}
                </AnimatePresence>
                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Activity size={36} className="text-muted-text mx-auto mb-3 opacity-50" />
                    <p className="text-muted-text text-sm">لا توجد أحداث</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card title="ملخص التنبيهات" icon={AlertTriangle}>
              <AlertPieChart data={alertCounts} />
            </Card>

            <Card title="أكثر الأحداث تكراراً" icon={BarChart3}>
              <div className="space-y-2.5">
                {topEventTypes.map((item, i) => {
                  const et = eventTypes.find(e => e.type === item.type);
                  const ETIcon = et ? iconMap[et.icon] : Shield;
                  const sev = et ? severityConfig[et.severity] : severityConfig.low;
                  return (
                    <div key={item.type} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${sev.bg}`}>
                        <ETIcon size={10} className={sev.color} />
                      </div>
                      <span className="text-xs text-muted-text flex-1">{item.label}</span>
                      <span className="text-xs font-mono text-light-text">{item.count}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title="آخر التنبيهات" icon={Bell}>
              {recentAlerts.length > 0 ? (
                <div className="space-y-2">
                  {recentAlerts.map(alert => {
                    const sev = severityConfig[alert.severity];
                    const AlertIcon = iconMap[alert.icon] || Shield;
                    return (
                      <div key={alert.id} className="flex items-start gap-2 p-2 rounded-lg bg-dark-bg border border-dark-border">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${sev.bg}`}>
                          <AlertIcon size={10} className={sev.color} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-light-text truncate">{alert.label}</p>
                          <p className="text-[10px] text-muted-text font-mono">{alert.timestamp} — {alert.sourceIP}</p>
                        </div>
                        <Badge variant={sev.badge} size="sm">{sev.label}</Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle size={28} className="text-success mx-auto mb-2" />
                  <p className="text-xs text-muted-text">لا توجد تنبيهات حرجة</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-light-text mb-4 flex items-center gap-2">
            <Monitor size={20} className="text-accent" />
            حالة الأنظمة
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {systemStatuses.map(sys => {
              const st = statusColors[sys.status] || statusColors.warning;
              const SysIcon = sys.icon;
              return (
                <motion.div
                  key={sys.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl border p-4 ${st.bg} ${st.border}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${st.dot} ${sys.status === 'up' ? '' : 'animate-pulse'}`} />
                    <SysIcon size={14} className={st.text} />
                  </div>
                  <p className="text-sm font-bold text-light-text">{sys.name}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-text">
                    <span>{st.label}</span>
                    <span>|</span>
                    <span>{sys.uptime}d</span>
                    <span>|</span>
                    <span>{sys.events} حدث</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card title="تهديدات ذكية (IOCs)" icon={Target}>
              <div className="max-h-[320px] overflow-y-auto space-y-2">
                {iocs.map(ioc => {
                  const typeColors = {
                    ip: 'text-accent bg-accent/10 border-accent/30',
                    domain: 'text-warning bg-warning/10 border-warning/30',
                    hash: 'text-secondary bg-secondary/10 border-secondary/30',
                    url: 'text-danger bg-danger/10 border-danger/30',
                  };
                  const tc = typeColors[ioc.type] || typeColors.ip;
                  return (
                    <div key={ioc.id} className="flex items-start gap-2 p-2.5 rounded-lg bg-dark-bg border border-dark-border">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${tc}`}>{ioc.label}</span>
                          <span className={`text-xs font-mono text-light-text truncate block`}>{ioc.value}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-text">
                          <span>الثقة: {ioc.confidence}%</span>
                          <span>أول ظهور: {ioc.firstSeen}</span>
                          <span>آخر ظهور: {ioc.lastSeen}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card title="درجة الأمان" icon={Shield}>
              <div className="flex flex-col items-center py-4">
                <div className="relative flex items-center justify-center mb-4">
                  <SecurityScoreGauge score={securityScore} />
                </div>
                <div className="w-full space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-text">التنبيهات التي تم حلها</span>
                      <span className="text-light-text font-mono">{alertResolutionRate}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-dark-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${alertResolutionRate}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-text">وقت تشغيل الأنظمة</span>
                      <span className="text-light-text font-mono">98%</span>
                    </div>
                    <div className="h-2 rounded-full bg-dark-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '98%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full rounded-full bg-success"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-text">متوسط وقت الاستجابة</span>
                      <span className="text-light-text font-mono">1.2s</span>
                    </div>
                    <div className="h-2 rounded-full bg-dark-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card title="الأحداث خلال 24 ساعة" icon={Activity}>
              <EventsOverTimeChart data={eventsOverTime} />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card title="أهم أنواع الهجمات" icon={BarChart3}>
              <TopAttackTypesChart data={topAttacks} />
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card title="إجراءات سريعة" icon={Zap}>
            <div className="flex flex-wrap gap-3 mt-2">
              {quickActions.map(action => {
                const ActionIcon = action.icon;
                return (
                  <Button key={action.label} variant="outline" size="md" icon={ActionIcon}>
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
