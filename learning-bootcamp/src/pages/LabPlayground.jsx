import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play, RotateCcw, Copy, Check, Download,
  ExternalLink, ArrowLeft, Code, FileCode,
  Database, Terminal, Monitor
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useToast } from '../components/common/Toast';

const LABS = {
  'html-css': {
    id: 'html-css',
    title: 'HTML/CSS Sandbox',
    description: 'جرب أكواد HTML و CSS مباشرة في المتصفح وشاهد النتيجة فوراً',
    icon: Monitor,
    badgeVariant: 'info',
    starterHTML: `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>صفحتي الأولى</title>
</head>
<body>
  <div class="container">
    <h1>مرحباً بالعالم!</h1>
    <p>هذه صفحتي الأولى التي أنشأتها بتعلم HTML و CSS.</p>
  </div>
</body>
</html>`,
    starterCSS: `body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
}

.container {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 40px 60px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

h1 {
  color: #00D9FF;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 30px rgba(0,217,255,0.3);
}

p {
  color: #94A3B8;
  font-size: 1.1rem;
  line-height: 1.6;
}`,
  },
  javascript: {
    id: 'javascript',
    title: 'JavaScript Playground',
    description: 'اختبر أكواد JavaScript وتعلم البرمجة خطوة بخطوة',
    icon: FileCode,
    badgeVariant: 'warning',
    starterCode: `// مرحباً بك في مختبر JavaScript
// اكتب كودك هنا وشاهد النتيجة في نافذة الإخراج

console.log("مرحباً بالعالم!");

// مثال: المتغيرات والدوال
const name = "أحمد";
let age = 25;

function greet(person, years) {
  return \`السلام عليكم! أنا \${person} وعمري \${years} سنة.\`;
}

console.log(greet(name, age));

// مثال: عملية حسابية
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log("مجموع الأعداد:", sum);

// جرب كتابة كودك الخاص هنا ↓`,
  },
  typescript: {
    id: 'typescript',
    title: 'TypeScript Playground',
    description: 'جرب TypeScript مع الأنواع والواجهات',
    icon: Code,
    badgeVariant: 'purple',
    starterCode: `// مرحباً بك في مختبر TypeScript
// TypeScript يضيف أنواعاً قوية للغة JavaScript

// تعريف واجهة
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// تعريف دالة مع أنواع
function createUser(name: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    isActive: true,
  };
}

// استخدام الدالة
const newUser = createUser("أحمد", "ahmed@example.com");
console.log("المستخدم الجديد:", newUser);

// مثال: دوال عامة (Generics)
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]);
const firstString = getFirstElement(["أ", "ب", "ج"]);
console.log("أول عنصر:", firstNumber, firstString);`,
  },
  python: {
    id: 'python',
    title: 'Python Playground',
    description: 'جرب أكواد Python وتعلم أساسيات البرمجة',
    icon: Terminal,
    badgeVariant: 'success',
    starterCode: `# مرحباً بك في مختصر Python
# اكتب كود Python هنا

print("مرحباً بالعالم!")

# المتغيرات والأنواع
name = "أحمد"
age = 25
is_student = True
print(f"الاسم: {name}, العمر: {age}, طالب: {is_student}")

# القوائم والحلقات التكرارية
fruits = ["تفاح", "موز", "برتقال", "عنب"]
for fruit in fruits:
    print(f"الفاكهة: {fruit}")

# الدوال
def calculate_sum(a, b):
    return a + b

result = calculate_sum(10, 20)
print(f"ناتج الجمع: {result}")`,
  },
  sql: {
    id: 'sql',
    title: 'SQL Playground',
    description: 'جرب استعلامات SQL وتعلم التعامل مع قواعد البيانات',
    icon: Database,
    badgeVariant: 'accent',
    starterQuery: `-- استعلام بسيط لجلب جميع المستخدمين
SELECT * FROM users;`,
    sampleData: {
      users: [
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'admin', created_at: '2024-01-15' },
        { id: 2, name: 'سارة علي', email: 'sara@example.com', role: 'user', created_at: '2024-02-20' },
        { id: 3, name: 'خالد عمر', email: 'khalid@example.com', role: 'user', created_at: '2024-03-10' },
        { id: 4, name: 'نورة حسن', email: 'noura@example.com', role: 'editor', created_at: '2024-03-25' },
        { id: 5, name: 'فيصل أحمد', email: 'faisal@example.com', role: 'user', created_at: '2024-04-05' },
      ],
      orders: [
        { id: 101, user_id: 1, product: 'لابتوب', amount: 4500, status: 'تم', date: '2024-03-01' },
        { id: 102, user_id: 2, product: 'ماوس', amount: 150, status: 'تم', date: '2024-03-15' },
        { id: 103, user_id: 1, product: 'شاشة', amount: 2000, status: 'قيد المعالجة', date: '2024-04-01' },
        { id: 104, user_id: 3, product: 'لوحة مفاتيح', amount: 300, status: 'تم', date: '2024-04-10' },
        { id: 105, user_id: 5, product: 'سماعات', amount: 500, status: 'ملغي', date: '2024-04-15' },
      ],
      products: [
        { id: 1, name: 'لابتوب', price: 4500, stock: 15, category: 'إلكترونيات' },
        { id: 2, name: 'ماوس', price: 150, stock: 50, category: 'إلكترونيات' },
        { id: 3, name: 'شاشة', price: 2000, stock: 10, category: 'إلكترونيات' },
        { id: 4, name: 'لوحة مفاتيح', price: 300, stock: 30, category: 'إلكترونيات' },
        { id: 5, name: 'سماعات', price: 500, stock: 25, category: 'إلكترونيات' },
      ],
    },
  },
  api: {
    id: 'api',
    title: 'Web API Tester',
    description: 'اختبر طلبات API وشاهد الاستجابة مباشرة',
    icon: ExternalLink,
    badgeVariant: 'danger',
  },
};

const SYNTHETIC_SQL_RESPONSES = {
  'SELECT * FROM users': { columns: ['id', 'name', 'email', 'role', 'created_at'], rows: LABS.sql.sampleData.users },
  'SELECT * FROM orders': { columns: ['id', 'user_id', 'product', 'amount', 'status', 'date'], rows: LABS.sql.sampleData.orders },
  'SELECT * FROM products': { columns: ['id', 'name', 'price', 'stock', 'category'], rows: LABS.sql.sampleData.products },
  'SELECT * FROM users;': { columns: ['id', 'name', 'email', 'role', 'created_at'], rows: LABS.sql.sampleData.users },
  'SELECT * FROM orders;': { columns: ['id', 'user_id', 'product', 'amount', 'status', 'date'], rows: LABS.sql.sampleData.orders },
  'SELECT * FROM products;': { columns: ['id', 'name', 'price', 'stock', 'category'], rows: LABS.sql.sampleData.products },
};

function simulateSQL(query) {
  const trimmed = query.trim().replace(/\s+/g, ' ');

  const exact = SYNTHETIC_SQL_RESPONSES[trimmed];
  if (exact) return exact;

  const upper = trimmed.toUpperCase();

  if (upper.startsWith('SELECT COUNT(*)') || upper.startsWith('SELECT COUNT(')) {
    const match = trimmed.match(/FROM\s+(\w+)/i);
    if (match) {
      const table = match[1].toLowerCase();
      const data = LABS.sql.sampleData[table];
      if (data) return { columns: ['count'], rows: [{ count: data.length }] };
    }
  }

  if (upper.startsWith('SELECT')) {
    const fromMatch = trimmed.match(/FROM\s+(\w+)/i);
    if (fromMatch) {
      const table = fromMatch[1].toLowerCase();
      const data = LABS.sql.sampleData[table];
      if (!data) return { columns: ['message'], rows: [{ message: `جدول '${fromMatch[1]}' غير موجود` }] };

      let filtered = [...data];

      const whereMatch = trimmed.match(/WHERE\s+(.+?)(?:ORDER BY|LIMIT|GROUP BY|$)/i);
      if (whereMatch) {
        const condition = whereMatch[1].trim();
        if (condition.includes('=')) {
          const parts = condition.split('=');
          const field = parts[0].trim().toLowerCase();
          const val = parts[1].trim().replace(/'/g, '');
          filtered = filtered.filter(row => String(row[field]).toLowerCase() === val.toLowerCase());
        }
      }

      const orderMatch = trimmed.match(/ORDER BY\s+(\w+)\s*(ASC|DESC)?/i);
      if (orderMatch) {
        const field = orderMatch[1].toLowerCase();
        const dir = (orderMatch[2] || 'ASC').toUpperCase();
        filtered.sort((a, b) => {
          if (dir === 'DESC') return String(b[field]).localeCompare(String(a[field]));
          return String(a[field]).localeCompare(String(b[field]));
        });
      }

      const limitMatch = trimmed.match(/LIMIT\s+(\d+)/i);
      if (limitMatch) {
        filtered = filtered.slice(0, parseInt(limitMatch[1]));
      }

      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      return { columns, rows: filtered };
    }
  }

  if (upper.startsWith('INSERT')) {
    return { columns: ['message'], rows: [{ message: 'تم إدراج السجل بنجاح (محاكاة)' }] };
  }
  if (upper.startsWith('UPDATE')) {
    return { columns: ['message'], rows: [{ message: 'تم تحديث السجلات بنجاح (محاكاة)' }] };
  }
  if (upper.startsWith('DELETE')) {
    return { columns: ['message'], rows: [{ message: 'تم حذف السجلات بنجاح (محاكاة)' }] };
  }
  if (upper.startsWith('CREATE')) {
    return { columns: ['message'], rows: [{ message: 'تم إنشاء الجدول بنجاح (محاكاة)' }] };
  }

  return { columns: ['message'], rows: [{ message: 'استعلام غير مدعوم في المحاكاة. جرب SELECT * FROM users;' }] };
}

function simulatePython(code) {
  const outputs = [];
  const lines = code.split('\n');

  const printMatches = code.match(/print\s*\(([^)]+)\)/g);
  if (printMatches) {
    printMatches.forEach(m => {
      const inner = m.slice(6, -1).trim();
      if (inner.startsWith('f"') || inner.startsWith("f'")) {
        const parts = inner.slice(2, -1).split(/\{|\}/);
        let result = '';
        parts.forEach((p, i) => {
          if (i % 2 === 0) result += p;
          else if (p.includes("'") || p.includes('"')) result += 'string';
          else if (/\d+/.test(p)) result += p;
          else result += 'defined';
        });
        outputs.push(result);
      } else if (inner.startsWith('"') || inner.startsWith("'")) {
        outputs.push(inner.slice(1, -1));
      } else {
        outputs.push(`[${inner}]`);
      }
    });
  }

  const varMatches = code.match(/(\w+)\s*=\s*["']([^"']+)["']/);
  if (varMatches) outputs.push(`> متغير '${varMatches[1]}' = "${varMatches[2]}"`);

  if (code.includes('def ')) {
    const funcMatch = code.match(/def\s+(\w+)/);
    if (funcMatch) outputs.push(`> تم تعريف الدالة '${funcMatch[1]}()'`);
  }

  if (code.includes('for ') && (code.includes('print') || code.includes('fruits'))) {
    const fruitMatches = code.match(/["']([^"']+)["']/g);
    if (fruitMatches) {
      fruitMatches.forEach(f => outputs.push(f.slice(1, -1)));
    }
  }

  if (code.includes('return')) {
    const returnMatch = code.match(/return\s+(.+)/);
    if (returnMatch) {
      const expr = returnMatch[1].trim();
      if (expr.includes('+')) {
        const parts = expr.split('+');
        const vals = parts.map(p => {
          const num = parseInt(p.trim());
          return isNaN(num) ? 20 : num;
        });
        outputs.push(`> النتيجة: ${vals.reduce((a, b) => a + b, 0)}`);
      }
    }
  }

  if (outputs.length === 0) {
    outputs.push('(تم تنفيذ الكود بنجاح - لا يوجد إخراج)');
  }

  return outputs;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const METHOD_COLORS = {
  GET: 'text-success',
  POST: 'text-warning',
  PUT: 'text-accent',
  DELETE: 'text-danger',
  PATCH: 'text-secondary',
};

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-accent/10 text-accent border border-accent/30'
          : 'text-muted-text hover:text-light-text border border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

function CodeEditor({ value, onChange, placeholder, language, readOnly }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      dir="ltr"
      className="w-full h-full min-h-[300px] p-4 bg-dark-bg border border-dark-border rounded-xl text-light-text font-mono text-sm resize-none focus:border-accent/50 focus:outline-none transition-colors"
      style={{ direction: 'ltr', textAlign: 'left' }}
      spellCheck={false}
    />
  );
}

function ConsoleOutput({ outputs }) {
  return (
    <div className="w-full min-h-[300px] p-4 bg-dark-bg border border-dark-border rounded-xl font-mono text-sm overflow-auto">
      {outputs.length === 0 ? (
        <span className="text-muted-text">نظرة عامة</span>
      ) : (
        outputs.map((line, i) => (
          <div key={i} className="py-0.5">
            {line.startsWith('>') ? (
              <span className="text-muted-text">{line}</span>
            ) : line.startsWith('[') ? (
              <span className="text-warning">{line}</span>
            ) : (
              <span className="text-light-text">{line}</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function SqlResultTable({ result }) {
  if (!result || !result.columns || !result.rows) return null;
  return (
    <div className="overflow-x-auto rounded-xl border border-dark-border bg-dark-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark-border bg-dark-bg/50">
            {result.columns.map((col, i) => (
              <th key={i} className="text-right px-4 py-3 text-xs text-muted-text font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row, i) => (
            <tr key={i} className="border-b border-dark-border/50 hover:bg-dark-border/20 transition-colors">
              {result.columns.map((col, j) => (
                <td key={j} className="px-4 py-3 text-light-text whitespace-nowrap">
                  {row[col] != null ? String(row[col]) : 'NULL'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DataTablePreview({ data, label }) {
  if (!data || data.length === 0) return null;
  const columns = Object.keys(data[0]);
  return (
    <div className="mb-4">
      <h4 className="text-sm font-bold text-light-text mb-2">{label}</h4>
      <div className="overflow-x-auto rounded-lg border border-dark-border bg-dark-card/50">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-dark-border bg-dark-bg/30">
              {columns.map((col, i) => (
                <th key={i} className="text-right px-3 py-2 text-muted-text font-medium">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, i) => (
              <tr key={i} className="border-b border-dark-border/20">
                {columns.map((col, j) => (
                  <td key={j} className="px-3 py-2 text-light-text">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResponseViewer({ response }) {
  if (!response) return null;
  return (
    <div className="space-y-4">
      {response.status && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-text">الحالة:</span>
          <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
            response.status < 300 ? 'bg-success/10 text-success' :
            response.status < 400 ? 'bg-warning/10 text-warning' :
            'bg-danger/10 text-danger'
          }`}>
            {response.status} {response.statusText}
          </span>
        </div>
      )}
      {response.headers && (
        <div>
          <h4 className="text-sm font-bold text-light-text mb-2">الـ Headers</h4>
          <pre className="w-full p-3 bg-dark-bg border border-dark-border rounded-lg text-xs text-muted-text font-mono overflow-x-auto max-h-40">
            {Object.entries(response.headers).map(([k, v]) => `${k}: ${v}`).join('\n')}
          </pre>
        </div>
      )}
      {response.body && (
        <div>
          <h4 className="text-sm font-bold text-light-text mb-2">الـ Body</h4>
          <pre className="w-full min-h-[200px] p-4 bg-dark-bg border border-dark-border rounded-lg text-sm text-light-text font-mono overflow-x-auto">
            {typeof response.body === 'string' ? response.body : JSON.stringify(response.body, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function LabPlayground() {
  const { labId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const iframeRef = useRef(null);

  const lab = LABS[labId];
  const [copied, setCopied] = useState(false);

  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [tsCode, setTsCode] = useState('');
  const [pyCode, setPyCode] = useState('');
  const [sqlCode, setSqlCode] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [sqlResult, setSqlResult] = useState(null);
  const [showTables, setShowTables] = useState(false);

  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiHeaders, setApiHeaders] = useState('Content-Type: application/json');
  const [apiBody, setApiBody] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [htmlTab, setHtmlTab] = useState('html');
  const [jsTab, setJsTab] = useState('code');
  const [sqlTab, setSqlTab] = useState('query');

  const resetCode = useCallback(() => {
    if (!lab) return;
    setHtmlCode(LABS['html-css'].starterHTML);
    setCssCode(LABS['html-css'].starterCSS);
    setJsCode(LABS.javascript.starterCode);
    setTsCode(LABS.typescript.starterCode);
    setPyCode(LABS.python.starterCode);
    setSqlCode(LABS.sql.starterQuery);
    setOutputs([]);
    setSqlResult(null);
    setApiResponse(null);
    setHtmlTab('html');
    setJsTab('code');
    setSqlTab('query');
  }, [lab]);

  useEffect(() => {
    if (!lab) {
      navigate('/labs', { replace: true });
      return;
    }
    resetCode();
  }, [labId, lab, navigate, resetCode]);

  useEffect(() => {
    if (labId === 'html-css' || labId === 'javascript') {
      if (labId === 'html-css' && htmlTab === 'preview' && iframeRef.current) {
        updatePreview();
      }
    }
  }, [htmlTab, htmlCode, cssCode, labId, updatePreview]);

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;
    const combined = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssCode}</style>
</head>
<body>${htmlCode.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*?<\/html>/i, '')}
</body>
</html>`;
    iframeRef.current.srcdoc = combined;
  }, [htmlCode, cssCode]);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    showToast('تم النسخ إلى الحافظة', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تحميل الملف', 'info');
  };

  const runJavaScript = () => {
    const captured = [];
    const mockLog = (...args) => {
      captured.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    try {
      const fn = new Function('console', jsCode);
      fn({ log: mockLog, warn: mockLog, error: (...args) => captured.push(`خطأ: ${args.map(String).join(' ')}`) });
      if (captured.length === 0) captured.push('(تم تنفيذ الكود بنجاح)');
      setOutputs(captured);
      setJsTab('output');
    } catch (err) {
      setOutputs([`خطأ: ${err.message}`]);
      setJsTab('output');
    }
  };

  const runTypeScript = () => {
    const captured = [];
    const mockLog = (...args) => {
      captured.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    try {
      const transpiled = tsCode
        .replace(/: (string|number|boolean|void|any|User\[\]|T\[\]|T|undefined\[\])\b/g, '')
        .replace(/: (string|number|boolean)\[/g, '[')
        .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '')
        .replace(/<\w+>/g, '')
        .replace(/as\s+\w+/g, '');
      const fn = new Function('console', transpiled);
      fn({ log: mockLog, warn: mockLog, error: (...args) => captured.push(`خطأ: ${args.map(String).join(' ')}`) });
      if (captured.length === 0) captured.push('(تم تنفيذ الكود بنجاح)');
      captured.unshift('> ملاحظة: تم إزالة أنواع TypeScript للتشغيل في المتصفح');
      setOutputs(captured);
    } catch (err) {
      setOutputs([`> ملاحظة: تم إزالة أنواع TypeScript للتشغيل في المتصفح`, `خطأ: ${err.message}`]);
    }
  };

  const runPython = () => {
    const result = simulatePython(pyCode);
    result.unshift('⚠️ ملاحظة: هذا محاكي Python. للتشغيل الحقيقي، استخدم Python على جهازك.');
    setOutputs(result);
  };

  const runSQL = () => {
    setSqlResult(null);
    setTimeout(() => {
      const result = simulateSQL(sqlCode);
      setSqlResult(result);
      setSqlTab('results');
    }, 200);
  };

  const sendApiRequest = async () => {
    setApiLoading(true);
    setApiResponse(null);
    try {
      const headers = {};
      if (apiHeaders.trim()) {
        apiHeaders.split('\n').forEach(line => {
          const idx = line.indexOf(':');
          if (idx > 0) {
            const k = line.slice(0, idx).trim();
            const v = line.slice(idx + 1).trim();
            if (k) headers[k] = v;
          }
        });
      }
      const options = { method: apiMethod, headers };
      if (apiMethod !== 'GET' && apiMethod !== 'HEAD' && apiBody.trim()) {
        try { options.body = JSON.stringify(JSON.parse(apiBody)); }
        catch { options.body = apiBody; }
      }
      const res = await fetch(apiUrl, options);
      const resHeaders = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });
      let body;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }
      setApiResponse({
        status: res.status,
        statusText: res.statusText,
        headers: resHeaders,
        body,
      });
      showToast(`الاستجابة: ${res.status} ${res.statusText}`, res.ok ? 'success' : 'warning');
    } catch (err) {
      setApiResponse({
        status: 0,
        statusText: 'Network Error',
        headers: {},
        body: { error: err.message, note: 'قد تحتاج إلى استخدام CORS proxy إذا كان الموقع لا يدعم CORS' },
      });
      showToast('فشل الاتصال - تحقق من CORS', 'error');
    }
    setApiLoading(false);
  };

  if (!lab) {
    return null;
  }

  const LabIcon = lab.icon;

  const getCurrentCode = () => {
    switch (labId) {
      case 'html-css': return `${htmlCode}\n\n/* CSS */\n${cssCode}`;
      case 'javascript': return jsCode;
      case 'typescript': return tsCode;
      case 'python': return pyCode;
      case 'sql': return sqlCode;
      default: return '';
    }
  };

  const getCurrentFilename = () => {
    switch (labId) {
      case 'html-css': return 'index.html';
      case 'javascript': return 'script.js';
      case 'typescript': return 'script.ts';
      case 'python': return 'main.py';
      case 'sql': return 'query.sql';
      default: return 'code.txt';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link
                to="/labs"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-text hover:text-light-text hover:bg-dark-card transition-all border border-transparent hover:border-dark-border"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">العودة للمختبرات</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={copied ? Check : Copy}
                onClick={() => handleCopy(getCurrentCode())}
              >
                {copied ? 'تم النسخ' : 'نسخ'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={resetCode}
              >
                إعادة تعيين
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Download}
                onClick={() => handleDownload(getCurrentCode(), getCurrentFilename())}
              >
                تحميل
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-2xl bg-${lab.badgeVariant === 'info' ? 'accent' : lab.badgeVariant}/10 border border-${lab.badgeVariant === 'info' ? 'accent' : lab.badgeVariant}/30 flex items-center justify-center`}>
              <LabIcon size={24} className={`text-${lab.badgeVariant === 'info' ? 'accent' : lab.badgeVariant}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-light-text">{lab.title}</h1>
                <Badge variant={lab.badgeVariant} size="sm">
                  {labId === 'html-css' ? 'HTML/CSS' : labId === 'javascript' ? 'JS' : labId === 'typescript' ? 'TS' : labId === 'python' ? 'Python' : labId === 'sql' ? 'SQL' : 'API'}
                </Badge>
              </div>
              <p className="text-muted-text text-sm mt-0.5">{lab.description}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {labId === 'html-css' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={htmlTab === 'html'} onClick={() => setHtmlTab('html')}>HTML</TabButton>
              <TabButton active={htmlTab === 'css'} onClick={() => setHtmlTab('css')}>CSS</TabButton>
              <TabButton active={htmlTab === 'preview'} onClick={() => { setHtmlTab('preview'); setTimeout(updatePreview, 50); }}>معاينة</TabButton>
            </div>

            {htmlTab === 'html' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">HTML</span>
                </div>
                <CodeEditor value={htmlCode} onChange={e => setHtmlCode(e.target.value)} language="html" />
              </div>
            )}

            {htmlTab === 'css' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">CSS</span>
                </div>
                <CodeEditor value={cssCode} onChange={e => setCssCode(e.target.value)} language="css" />
              </div>
            )}

            {htmlTab === 'preview' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Play}
                    onClick={() => { updatePreview(); showToast('تم تحديث المعاينة', 'info'); }}
                  >
                    تحديث المعاينة
                  </Button>
                  <span className="text-xs text-muted-text">أو اضغط على زر التشغيل لتحديث المعاينة</span>
                </div>
                <iframe
                  ref={iframeRef}
                  title="Preview"
                  className="w-full h-[500px] rounded-xl border border-dark-border bg-white"
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </motion.div>
        )}

        {labId === 'javascript' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={jsTab === 'code'} onClick={() => setJsTab('code')}>الكود</TabButton>
              <TabButton active={jsTab === 'output'} onClick={() => setJsTab('output')}>الإخراج</TabButton>
            </div>

            {jsTab === 'code' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">JavaScript</span>
                  <Button variant="primary" size="sm" icon={Play} onClick={runJavaScript}>
                    تشغيل
                  </Button>
                </div>
                <CodeEditor value={jsCode} onChange={e => setJsCode(e.target.value)} language="javascript" />
              </div>
            )}

            {jsTab === 'output' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">الإخراج</span>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" icon={Play} onClick={runJavaScript}>تشغيل</Button>
                    <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setOutputs([])}>مسح</Button>
                  </div>
                </div>
                <ConsoleOutput outputs={outputs} />
              </div>
            )}
          </motion.div>
        )}

        {labId === 'typescript' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={jsTab === 'code'} onClick={() => setJsTab('code')}>الكود</TabButton>
              <TabButton active={jsTab === 'output'} onClick={() => setJsTab('output')}>الإخراج</TabButton>
            </div>

            {jsTab === 'code' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">TypeScript</span>
                  <Button variant="primary" size="sm" icon={Play} onClick={runTypeScript}>
                    تشغيل
                  </Button>
                </div>
                <div className="mb-3 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
                  ⚠️ ملاحظة: يتم إزالة أنواع TypeScript للتشغيل في المتصفح. للتشغيل الحقيقي، استخدم tsc أو Vite.
                </div>
                <CodeEditor value={tsCode} onChange={e => setTsCode(e.target.value)} language="typescript" />
              </div>
            )}

            {jsTab === 'output' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">الإخراج</span>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" icon={Play} onClick={runTypeScript}>تشغيل</Button>
                    <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setOutputs([])}>مسح</Button>
                  </div>
                </div>
                <ConsoleOutput outputs={outputs} />
              </div>
            )}
          </motion.div>
        )}

        {labId === 'python' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={jsTab === 'code'} onClick={() => setJsTab('code')}>الكود</TabButton>
              <TabButton active={jsTab === 'output'} onClick={() => setJsTab('output')}>الإخراج</TabButton>
            </div>

            {jsTab === 'code' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">Python</span>
                  <Button variant="primary" size="sm" icon={Play} onClick={runPython}>
                    تشغيل
                  </Button>
                </div>
                <div className="mb-3 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
                  ⚠️ ملاحظة: هذا محاكي Python. للتشغيل الحقيقي، استخدم Python على جهازك.
                </div>
                <CodeEditor value={pyCode} onChange={e => setPyCode(e.target.value)} language="python" />
              </div>
            )}

            {jsTab === 'output' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">الإخراج</span>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" icon={Play} onClick={runPython}>تشغيل</Button>
                    <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setOutputs([])}>مسح</Button>
                  </div>
                </div>
                <ConsoleOutput outputs={outputs} />
              </div>
            )}
          </motion.div>
        )}

        {labId === 'sql' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={sqlTab === 'query'} onClick={() => setSqlTab('query')}>الاستعلام</TabButton>
              <TabButton active={sqlTab === 'results'} onClick={() => setSqlTab('results')}>النتائج</TabButton>
              <TabButton active={sqlTab === 'tables'} onClick={() => setSqlTab('tables')}>الجداول</TabButton>
            </div>

            {sqlTab === 'query' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">SQL</span>
                  <Button variant="primary" size="sm" icon={Play} onClick={runSQL}>
                    تنفيذ
                  </Button>
                </div>
                <div className="mb-3 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs">
                  💡 جداول متاحة: users, orders, products. جرب: SELECT * FROM users; أو SELECT * FROM orders;
                </div>
                <CodeEditor value={sqlCode} onChange={e => setSqlCode(e.target.value)} language="sql" />
              </div>
            )}

            {sqlTab === 'results' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-text font-medium">النتائج</span>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" icon={Play} onClick={runSQL}>تنفيذ</Button>
                    <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setSqlResult(null)}>مسح</Button>
                  </div>
                </div>
                <div className="mb-3 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
                  ⚠️ ملاحظة: هذا محاكي SQL. النتائج افتراضية وللتتعليم فقط.
                </div>
                {sqlResult && sqlResult.columns ? (
                  <SqlResultTable result={sqlResult} />
                ) : (
                  <div className="w-full min-h-[200px] p-4 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center">
                    <span className="text-muted-text">نفذ استعلاماً لرؤية النتائج</span>
                  </div>
                )}
              </div>
            )}

            {sqlTab === 'tables' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-text font-medium">بنية الجداول</span>
                </div>
                {lab.sampleData && (
                  <div className="space-y-6">
                    <DataTablePreview data={lab.sampleData.users} label="جدول users (المستخدمون)" />
                    <DataTablePreview data={lab.sampleData.orders} label="جدول orders (الطلبات)" />
                    <DataTablePreview data={lab.sampleData.products} label="جدول products (المنتجات)" />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {labId === 'api' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton active={sqlTab === 'query'} onClick={() => setSqlTab('query')}>الطلب</TabButton>
              <TabButton active={sqlTab === 'results'} onClick={() => setSqlTab('results')}>الاستجابة</TabButton>
            </div>

            {sqlTab === 'query' && (
              <div className="space-y-4">
                <div className="mb-3 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
                  ⚠️ ملاحظة: هذا واجهة اختبار. الطلبات ترسل فعلياً. استخدم CORS proxy إذا لزم الأمر.
                </div>

                <div className="flex gap-3">
                  <div className="w-32 shrink-0">
                    <label className="block text-xs text-muted-text font-medium mb-1.5">الطريقة</label>
                    <select
                      value={apiMethod}
                      onChange={e => setApiMethod(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none"
                    >
                      {HTTP_METHODS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-muted-text font-medium mb-1.5">URL</label>
                    <input
                      type="url"
                      value={apiUrl}
                      onChange={e => setApiUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm focus:border-accent/50 focus:outline-none transition-colors font-mono"
                      placeholder="https://api.example.com/endpoint"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="primary"
                      size="md"
                      icon={Play}
                      loading={apiLoading}
                      onClick={sendApiRequest}
                    >
                      إرسال
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-text font-medium mb-1.5">
                    Headers (سطر لكل Header: Key: Value)
                  </label>
                  <textarea
                    value={apiHeaders}
                    onChange={e => setApiHeaders(e.target.value)}
                    className="w-full h-20 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm font-mono focus:border-accent/50 focus:outline-none transition-colors resize-none"
                    placeholder="Content-Type: application/json"
                    dir="ltr"
                  />
                </div>

                {(apiMethod === 'POST' || apiMethod === 'PUT' || apiMethod === 'PATCH') && (
                  <div>
                    <label className="block text-xs text-muted-text font-medium mb-1.5">Body (JSON)</label>
                    <textarea
                      value={apiBody}
                      onChange={e => setApiBody(e.target.value)}
                      className="w-full h-32 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-light-text text-sm font-mono focus:border-accent/50 focus:outline-none transition-colors resize-none"
                      placeholder='{"key": "value"}'
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
            )}

            {sqlTab === 'results' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-text font-medium">الاستجابة</span>
                  <Button variant="primary" size="sm" icon={Play} onClick={() => setSqlTab('query')}>
                    طلب جديد
                  </Button>
                </div>
                {apiResponse ? (
                  <ResponseViewer response={apiResponse} />
                ) : (
                  <div className="w-full min-h-[200px] p-4 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center">
                    <span className="text-muted-text">أرسل طلباً لرؤية الاستجابة</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}
