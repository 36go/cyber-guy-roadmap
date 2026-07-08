const projectsData = {
  title: "المشاريع التطبيقية",
  description: "5 مشاريع عملية لبناء ملف أعمالك",
  projects: [
    {
      id: "todo-app",
      number: 1,
      title: "تطبيق إدارة المهام (Todo App)",
      difficulty: "سهل",
      difficultyStars: 1,
      timeEstimate: "4-6 ساعات",
      techStack: ["React", "JavaScript", "CSS"],
      path: "frontend",
      description: "تطبيق ويب لإدارة المهام اليومية مع إمكانية الإضافة والحذف والتعديل مع حفظ البيانات في المتصفح",
      features: [
        "إضافة مهمة جديدة",
        "حذف مهمة",
        "تحديد إتمام المهمة",
        "حفظ المهام في Local Storage",
        "تصفية المهام (الكل / المكتملة / النشطة)"
      ],
      learningOutcomes: [
        "React Hooks (useState, useEffect)",
        "إدارة الحالة",
        "Local Storage API",
        "CSS الحديث"
      ],
      codeSnippets: [
        {
          title: "App.js - المكون الرئيسي",
          language: "jsx",
          code: `import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>قائمة المهام</h1>
      <div className="input-group">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="أضف مهمة جديدة..." />
        <button onClick={addTodo}>إضافة</button>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;`
        },
        {
          title: "App.css - التنسيقات",
          language: "css",
          code: `.app {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
  direction: rtl;
}
h1 {
  text-align: center;
  color: #1E3A8A;
}
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.input-group input {
  flex: 1;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
}
.input-group button {
  padding: 10px 20px;
  background: #1E3A8A;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}
.todo-item.completed span {
  text-decoration: line-through;
  color: #94a3b8;
}`
        }
      ],
      steps: [
        { step: 1, title: "إعداد مشروع React", command: "npm create vite@latest todo-app -- --template react", description: "إنشاء مشروع React جديد باستخدام Vite" },
        { step: 2, title: "إنشاء هيكل المكونات", description: "إنشاء مكونات TodoList, TodoItem, AddTodo" },
        { step: 3, title: "تنفيذ منطق الحالة", description: "استخدام useState لإدارة المهام و useEffect للحفظ" },
        { step: 4, title: "إضافة التنسيقات", description: "تصميم واجهة مستخدم جميلة مع CSS" },
        { step: 5, title: "اختبار التطبيق", command: "npm run dev", description: "تشغيل التطبيق واختباره محلياً" }
      ],
      deploymentGuide: "يمكن النشر على Vercel أو Netlify مجاناً. قم بربط المستودع بخدمة النشر.",
      resources: [
        { name: "React Hooks Guide", url: "https://react.dev/reference/react" },
        { name: "localStorage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" }
      ]
    },
    {
      id: "auth-system",
      number: 2,
      title: "نظام المصادقة (Authentication System)",
      difficulty: "متوسط",
      difficultyStars: 3,
      timeEstimate: "12-16 ساعة",
      techStack: ["Node.js", "React", "MongoDB", "JWT"],
      path: "fullstack",
      description: "نظام مصادقة كامل مع تسجيل دخول، تسجيل حساب، وجلسات آمنة باستخدام JWT",
      features: [
        "تسجيل مستخدم جديد",
        "تسجيل الدخول",
        "حماية المسارات",
        "إدارة الجلسات",
        "تحديث الملف الشخصي"
      ],
      learningOutcomes: [
        "JWT Authentication",
        "Node.js + Express APIs",
        "MongoDB + Mongoose",
        "React Context API"
      ],
      codeSnippets: [
        {
          title: "server.js - الخادم الخلفي",
          language: "javascript",
          code: `const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth-app');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email, name } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'المستخدم غير موجود' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'كلمة مرور خاطئة' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

app.listen(5000, () => console.log('Server running on port 5000'));`
        },
        {
          title: "AuthContext.jsx - سياق المصادقة (الواجهة الأمامية)",
          language: "jsx",
          code: `import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
    }
    setLoading(false);
  }, []);

  const register = async (email, password, name) => {
    const res = await axios.post('http://localhost:5000/api/register', { email, password, name });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};`
        }
      ],
      steps: [
        { step: 1, title: "إعداد الخادم", command: "npm init -y && npm install express mongoose bcryptjs jsonwebtoken cors", description: "تثبيت الحزم المطلوبة" },
        { step: 2, title: "إنشاء نموذج المستخدم", description: "إنشاء Mongoose Schema للمستخدم" },
        { step: 3, title: "إنشاء مسارات API", description: "POST /api/register, POST /api/login" },
        { step: 4, title: "الواجهة الأمامية", description: "إنشاء AuthContext و LoginForm" },
        { step: 5, title: "الاختبار", description: "اختبار باستخدام Postman والمتصفح" }
      ],
      deploymentGuide: "انشر على Render/Railway للخادم و Vercel للواجهة. استخدم MongoDB Atlas لقاعدة البيانات.",
      resources: [
        { name: "JWT Guide", url: "https://jwt.io/introduction" },
        { name: "Mongoose Docs", url: "https://mongoosejs.com/docs/" }
      ]
    },
    {
      id: "sql-design",
      number: 3,
      title: "تصميم قاعدة بيانات SQL",
      difficulty: "متوسط",
      difficultyStars: 2,
      timeEstimate: "8-10 ساعات",
      techStack: ["SQL", "PostgreSQL/MySQL"],
      path: "backend",
      description: "تصميم وتنفيذ قاعدة بيانات متكاملة مع استعلامات متقدمة",
      features: [
        "تصميم ERD",
        "إنشاء الجداول",
        "إدخال البيانات",
        "استعلامات متقدمة",
        "تحسين الأداء"
      ],
      learningOutcomes: [
        "تصميم قواعد البيانات",
        "SQL متقدم",
        "JOINs و Aggregations",
        "تحسين الاستعلامات"
      ],
      codeSnippets: [
        {
          title: "هيكل قاعدة البيانات - CREATE TABLE",
          language: "sql",
          code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);`
        },
        {
          title: "استعلامات متقدمة",
          language: "sql",
          code: `-- عدد التعليقات لكل منشور
SELECT p.title, COUNT(c.id) as comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.title
ORDER BY comment_count DESC;

-- المستخدمون النشطون (أكثر من 5 منشورات)
SELECT u.username, COUNT(p.id) as post_count
FROM users u
JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.username
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC;

-- آخر تعليقات لكل مستخدم
SELECT u.username, p.title, c.body, c.created_at
FROM users u
JOIN comments c ON u.id = c.user_id
JOIN posts p ON p.id = c.post_id
WHERE c.created_at > NOW() - INTERVAL '7 days'
ORDER BY c.created_at DESC;`
        }
      ],
      steps: [
        { step: 1, title: "تصميم ERD", description: "استخدام Draw.io أو dbdiagram.io لتصميم العلاقات" },
        { step: 2, title: "إنشاء الجداول", command: "psql -d mydb -f schema.sql", description: "تنفيذ أوامر CREATE TABLE" },
        { step: 3, title: "إدخال البيانات", description: "إدخال 20+ مستخدم و 50+ منشور" },
        { step: 4, title: "كتابة الاستعلامات", description: "تنفيذ 10 استعلامات متقدمة" }
      ]
    },
    {
      id: "dvwa-hunt",
      number: 4,
      title: "صيد الثغرات (DVWA Vulnerability Hunt)",
      difficulty: "متوسط",
      difficultyStars: 2,
      timeEstimate: "10-12 ساعات",
      techStack: ["DVWA", "Burp Suite", "OWASP ZAP"],
      path: "security",
      description: "اختبار اختراق تطبيق DVWA لاكتشاف واستغلال الثغرات الأمنية",
      features: [
        "SQL Injection",
        "XSS (Reflected & Stored)",
        "CSRF",
        "File Upload",
        "Authentication Bypass"
      ],
      learningOutcomes: [
        "فهم الثغرات الأمنية",
        "استخدام Burp Suite",
        "تقنيات الاستغلال",
        "تصحيح الثغرات"
      ],
      codeSnippets: [
        {
          title: "تشغيل DVWA باستخدام Docker",
          language: "bash",
          code: `# تشغيل DVWA
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# أو باستخدام Docker Compose
docker compose up -d

# الوصول: http://localhost
# اسم المستخدم: admin
# كلمة المرور: password`
        },
        {
          title: "مثال SQL Injection",
          language: "sql",
          code: `-- استعلام ضعيف في الخلفية
SELECT * FROM users WHERE user_id = '$input';

-- حمولة الاختراق
' OR '1'='1

-- الاستعلام بعد الحقن
SELECT * FROM users WHERE user_id = '' OR '1'='1';

-- الحل: استخدام Prepared Statements
$stmt = $conn->prepare("SELECT * FROM users WHERE user_id = ?");
$stmt->bind_param("s", $input);
$stmt->execute();`
        }
      ],
      steps: [
        { step: 1, title: "تثبيت DVWA", command: "docker run --rm -it -p 80:80 vulnerables/web-dvwa", description: "تشغيل DVWA محلياً" },
        { step: 2, title: "إعداد Burp Suite", description: "تكوين الوكيل وتصفح التطبيق" },
        { step: 3, title: "اكتشاف الثغرات", description: "اختبار SQL Injection، XSS، CSRF" },
        { step: 4, title: "توثيق النتائج", description: "إنشاء تقرير بكل ثغرة مكتشفة" }
      ]
    },
    {
      id: "email-service",
      number: 5,
      title: "خدمة البريد الإلكتروني (Email Service API)",
      difficulty: "متوسط",
      difficultyStars: 3,
      timeEstimate: "10-12 ساعات",
      techStack: ["Node.js", "MongoDB", "Nodemailer", "Express"],
      path: "fullstack",
      description: "خدمة بريد إلكتروني متكاملة مع Nodemailer وإدارة القوائم البريدية",
      features: [
        "إرسال إيميلات",
        "قوائم بريدية",
        "قوالب HTML",
        "جدولة الإرسال",
        "تتبع الفتح"
      ],
      learningOutcomes: [
        "Nodemailer API",
        "قوالب HTML للإيميلات",
        "MongoDB معالجة البيانات",
        "تصميم APIs"
      ],
      codeSnippets: [
        {
          title: "server.js - خدمة البريد",
          language: "javascript",
          code: `const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const subscriber = await Subscriber.create(req.body);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: subscriber.email,
      subject: 'مرحباً بك في القائمة البريدية!',
      html: \`<h1>مرحباً \${subscriber.name}!</h1><p>شكراً لاشتراكك معنا.</p>\`
    });
    res.json({ success: true, subscriber });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/send-campaign', async (req, res) => {
  const { subject, html } = req.body;
  const subscribers = await Subscriber.find({ active: true });
  let sent = 0;
  for (const sub of subscribers) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject,
        html
      });
      sent++;
    } catch (err) {
      console.error(\`فشل إرسال إلى \${sub.email}\`);
    }
  }
  res.json({ success: true, sent, total: subscribers.length });
});

app.listen(3000, () => console.log('Email service running on port 3000'));`
        }
      ],
      steps: [
        { step: 1, title: "إعداد المشروع", command: "npm init -y && npm install express nodemailer mongoose cors dotenv", description: "تثبيت الحزم" },
        { step: 2, title: "إعداد البريد", description: "تكوين Nodemailer مع Gmail/SendGrid" },
        { step: 3, title: "إنشاء APIs", description: "POST /api/subscribe, POST /api/send-campaign" },
        { step: 4, title: "الاختبار", description: "اختبار الإرسال باستخدام Postman" }
      ],
      deploymentGuide: "انشر على Railway أو Render. استخدم MongoDB Atlas. خزن المتغيرات البيئية بأمان.",
      resources: [
        { name: "Nodemailer Docs", url: "https://nodemailer.com/about/" },
        { name: "SendGrid Free Tier", url: "https://sendgrid.com/free/" }
      ]
    },
    {
      id: "python-analysis",
      number: 6,
      title: "تحليل البيانات مع Python",
      difficulty: "متوسط",
      difficultyStars: 2,
      timeEstimate: "8-10 ساعات",
      techStack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
      path: "python",
      description: "مشروع تحليل بيانات شامل باستخدام Python ومكتبات Pandas و Matplotlib لاستخراج رؤى من بيانات حقيقية",
      features: [
        "تنظيف البيانات وإزالة القيم المكررة",
        "تحليل إحصائي واستكشافي للبيانات",
        "تصور البيانات برسوم بيانية",
        "تصدير التقارير بصيغة CSV و PDF",
        "أتمتة خط أنابيب التحليل"
      ],
      learningOutcomes: [
        "Python Pandas للمعالجة",
        "Matplotlib و Seaborn للتصور",
        "تنظيف وتحضير البيانات",
        "تحليل البيانات الاستكشافي (EDA)"
      ],
      codeSnippets: [
        {
          title: "تحليل البيانات باستخدام Pandas",
          language: "python",
          code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# قراءة البيانات
df = pd.read_csv('sales_data.csv')
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# تنظيف البيانات
df.drop_duplicates(inplace=True)
df['date'] = pd.to_datetime(df['date'])
df.fillna(df.mean(numeric_only=True), inplace=True)

# تحليل استكشافي
print(df.describe())
print(df['category'].value_counts())

# تصور البيانات
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.barplot(x='category', y='revenue', data=df)
plt.title('الإيرادات حسب الفئة')

plt.subplot(1, 2, 2)
sns.histplot(df['price'], bins=30, kde=True)
plt.title('توزيع الأسعار')
plt.tight_layout()
plt.savefig('analysis_report.png', dpi=150)
print("✓ تم حفظ التقرير بنجاح")`
        },
        {
          title: "تنظيف البيانات المتقدم",
          language: "python",
          code: `def clean_dataset(df):
    """دالة شاملة لتنظيف البيانات"""
    import pandas as pd
    
    # إزالة القيم المكررة
    before = len(df)
    df = df.drop_duplicates()
    print(f"تم إزالة {before - len(df)} قيمة مكررة")
    
    # معالجة القيم المفقودة
    for col in df.columns:
        if df[col].dtype in ['int64', 'float64']:
            df[col].fillna(df[col].median(), inplace=True)
        elif df[col].dtype == 'object':
            df[col].fillna(df[col].mode()[0], inplace=True)
    
    # توحيد النصوص
    for col in df.select_dtypes(include=['object']).columns:
        df[col] = df[col].str.strip().str.lower()
    
    # إزالة القيم المتطرفة (Z-score)
    from scipy import stats
    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
    z_scores = stats.zscore(df[numeric_cols])
    df = df[(abs(z_scores) < 3).all(axis=1)]
    
    return df`
        }
      ],
      steps: [
        { step: 1, title: "إعداد البيئة", command: "pip install pandas matplotlib seaborn jupyter scipy", description: "تثبيت المكتبات المطلوبة" },
        { step: 2, title: "جلب البيانات", description: "تحميل مجموعة بيانات حقيقية من Kaggle أو بيانات مخصصة" },
        { step: 3, title: "تنظيف البيانات", description: "تطبيق دوال التنظيف على مجموعة البيانات" },
        { step: 4, title: "التحليل والتصور", description: "إنشاء 5 رسوم بيانية على الأقل مع تحليل النتائج" },
        { step: 5, title: "تقديم التقرير", description: "تصدير التقرير النهائي وعرض النتائج" }
      ],
      deploymentGuide: "انشر التحليل على GitHub Pages أو Kaggle Notebooks. يمكنك استخدام Jupyter Notebook مع Voilà لإنشاء dashboard تفاعلي.",
      resources: [
        { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
        { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets" }
      ]
    }
  ,
    {
      id: "git-workflow",
      number: 7,
      title: "Git Collaboration Workflow - سير عمل الفريق",
      difficulty: "متوسط",
      difficultyStars: 2,
      timeEstimate: "6-8 ساعات",
      techStack: ["Git", "GitHub", "CLI"],
      path: "fullstack",
      description: "مشروع عملي لتعلم سير عمل الفريق باستخدام Git و GitHub، من إنشاء الفروع وإدارة Pull Requests إلى حل تعارضات الدمج",
      features: [
        "إنشاء مستودع وتهيئة Git",
        "إنشاء الفروع وإدارتها (main, develop, feature)",
        "إنشاء Pull Requests ومراجعتها",
        "حل تعارضات الدمج (Merge Conflicts)",
        "استخدام Git Flow و GitHub Flow",
        "Git Hooks لأتمتة المهام"
      ],
      learningOutcomes: [
        "Git Branching و Merging",
        "Pull Requests و Code Review",
        "حل تعارضات الدمج",
        "استراتيجيات العمل الجماعي",
        "Git Hooks و أتمتة"
      ],
      codeSnippets: [
        {
          title: "إعداد Git وتهيئة المشروع",
          language: "bash",
          code: `# إعداد Git لأول مرة
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main

# إنشاء مستودع جديد
mkdir my-collab-project
cd my-collab-project
git init

# أو استنساخ مستودع موجود
git clone https://github.com/user/repo.git
cd repo

# عرض حالة المستودع
git status
git log --oneline --graph --all`
        },
        {
          title: "Git Flow - سير العمل بالفروع",
          language: "bash",
          code: `# إنشاء فرع التطوير الرئيسي
git checkout -b develop main

# إنشاء فرع لميزة جديدة (feature branch)
git checkout -b feature/add-login develop

# العمل على الميزة
git add .
git commit -m "feat: add login form component"
git commit -m "feat: add authentication logic"

# دمج الميزة في develop
git checkout develop
git merge feature/add-login

# إنشاء فرع للإصدار (release branch)
git checkout -b release/1.0.0 develop
git commit -m "chore: bump version to 1.0.0"

# دمج في main مع وسم الإصدار
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "First release"

# فرع الإصلاح العاجل (hotfix)
git checkout -b hotfix/critical-bug main
git commit -m "fix: resolve critical security issue"
git checkout main
git merge hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix release"`
        },
        {
          title: "GitHub Flow - Pull Requests",
          language: "bash",
          code: `# GitHub Flow البسيط
# 1. إنشاء فرع من main
git checkout -b feature/new-feature main

# 2. العمل والتعديل
git add .
git commit -m "Add new feature implementation"

# 3. رفع الفرع إلى GitHub
git push origin feature/new-feature

# 4. إنشاء Pull Request على GitHub (واجهة رسومية)
# أو باستخدام GitHub CLI:
gh pr create --title "New Feature" --body "Description of changes"
gh pr create --title "New Feature" --body "Closes #123"

# 5. مراجعة الكود ومناقشة التغييرات
gh pr review --approve --comment "LGTM!"
gh pr review --request-changes --comment "Please fix this issue"

# 6. الدمج بعد الموافقة
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main

# أو دمج مباشر من الـ PR:
gh pr merge --squash --subject "feat: add new feature"`
        },
        {
          title: "حل تعارضات الدمج (Merge Conflicts)",
          language: "bash",
          code: `# محاولة الدمج - قد يحدث تعارض
git checkout main
git merge feature/conflicting-branch

# رسالة خطأ: CONFLICT (content): Merge conflict in file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# فتح الملف في المحرر - سترى علامات التعارض:
<<<<<<< HEAD
console.log("Main branch version");
=======
console.log("Feature branch version");
>>>>>>> feature/conflicting-branch

# قم بتعديل الملف لحل التعارض يدوياً:
console.log("Merged version");

# بعد الحل:
git add file.txt
git commit -m "Merge: resolved conflict in file.txt"

# أدوات مفيدة لحل التعارضات:
# VS Code: مدمج مع واجهة سهلة
# Git Mergetool: git mergetool --tool=vscode
# Meld: git mergetool --tool=meld`
        },
        {
          title: "Git Hooks - أتمتة سير العمل",
          language: "bash",
          code: `#!/bin/bash
# .git/hooks/pre-commit - فحص الكود قبل الالتزام
# تأكد من صلاحية التنفيذ: chmod +x .git/hooks/pre-commit

echo "Running pre-commit checks..."

# فحص أخطاء ESLint (لـ JavaScript)
if [ -f "node_modules/.bin/eslint" ]; then
  echo "Linting JavaScript files..."
  npx eslint src/
  if [ $? -ne 0 ]; then
    echo "ESLint errors found. Fix them before committing."
    exit 1
  fi
fi

# فحص أخطاء Python (لـ Python)
if command -v flake8 &> /dev/null; then
  echo "Linting Python files..."
  flake8 .
  if [ $? -ne 0 ]; then
    echo "Flake8 errors found. Fix them before committing."
    exit 1
  fi
fi

# تشغيل الاختبارات قبل الالتزام
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Fix them before committing."
  exit 1
fi

echo "✓ All checks passed!"`
        }
      ],
      steps: [
        { step: 1, title: "إعداد المشروع", command: "git init && git add . && git commit -m 'Initial commit' && git branch -M main && git remote add origin https://github.com/user/repo.git && git push -u origin main", description: "تهيئة مستودع Git ورفعه إلى GitHub" },
        { step: 2, title: "تطبيق GitHub Flow", command: "git checkout -b feature/new-feature", description: "إنشاء فرع للميزة وتنفيذ التغييرات" },
        { step: 3, title: "فتح Pull Request", command: "gh pr create --title 'New Feature' --body 'Description'", description: "رفع الفرع وفتح طلب دمج على GitHub" },
        { step: 4, title: "مراجعة الكود", description: "مراجعة PR مع فريقك، مناقشة التغييرات، وإجراء التعديلات" },
        { step: 5, title: "حل التعارضات", command: "git merge main # ثم حل التعارضات يدوياً", description: "حل تعارضات الدمج إذا وجدت" },
        { step: 6, title: "إعداد Git Hooks", description: "إضافة pre-commit hook لفحص الكود تلقائياً" }
      ],
      deploymentGuide: "انشر المشروع على GitHub للتعاون مع فريق. استخدم GitHub Projects لتتبع المهام و GitHub Actions لـ CI/CD.",
      resources: [
        { name: "Pro Git Book", url: "https://git-scm.com/book/en/v2" },
        { name: "GitHub Flow Guide", url: "https://docs.github.com/en/get-started/using-github/github-flow" },
        { name: "Learn Git Branching", url: "https://learngitbranching.js.org/" }
      ]
    },
    {
      id: "python-web-scraper",
      number: 8,
      title: "Web Scraper وتحليل البيانات مع Python",
      difficulty: "متوسط",
      difficultyStars: 3,
      timeEstimate: "10-14 ساعة",
      techStack: ["Python", "BeautifulSoup", "Pandas", "Matplotlib"],
      path: "python",
      description: "بناء نظام لجمع البيانات من الويب وتنظيفها وتحليلها باستخدام Python. مشروع شامل من الجلب إلى التصور",
      features: [
        "جلب صفحات ويب باستخدام Requests و aiohttp",
        "استخراج البيانات باستخدام Beautiful Soup",
        "التعامل مع المواقع الديناميكية (Selenium)",
        "تنظيف البيانات وتحويلها باستخدام Pandas",
        "تصور البيانات باستخدام Matplotlib و Seaborn",
        "تصدير النتائج إلى CSV/Excel/JSON"
      ],
      learningOutcomes: [
        "HTTP Requests في Python",
        "HTML Parsing مع BeautifulSoup",
        "تحليل البيانات مع Pandas",
        "تصور البيانات مع Matplotlib",
        "التعامل مع APIs"
      ],
      codeSnippets: [
        {
          title: "جلب واستخراج البيانات",
          language: "python",
          code: `import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def scrape_products(url):
    """جلب بيانات المنتجات من صفحة ويب"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # التحقق من نجاح الطلب
    
    soup = BeautifulSoup(response.text, 'html.parser')
    products = []
    
    # استخراج البيانات حسب هيكل الصفحة
    for item in soup.select('.product-card'):
        product = {
            'name': item.select_one('.product-title').text.strip(),
            'price': item.select_one('.price').text.strip(),
            'rating': item.select_one('.rating').text.strip() if item.select_one('.rating') else 'N/A',
            'reviews': item.select_one('.reviews-count').text.strip() if item.select_one('.reviews-count') else '0'
        }
        products.append(product)
    
    return pd.DataFrame(products)

# تنفيذ الجلب مع تأخير احتراماً للموقع
df = scrape_products('https://example.com/products')
print(f"تم جمع {len(df)} منتج")
print(df.head())
time.sleep(2)  # تجنب حظر IP`
        },
        {
          title: "تنظيف وتحليل البيانات",
          language: "python",
          code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# قراءة البيانات المجمعة
df = pd.read_csv('products_data.csv')
print(f"البيانات الأولية: {df.shape}")

# تنظيف البيانات
def clean_data(df):
    # إزالة القيم المكررة
    df = df.drop_duplicates()
    
    # تحويل السعر إلى رقم
    df['price'] = df['price'].str.replace('[$,]', '', regex=True).astype(float)
    
    # تحويل التقييم إلى رقم
    df['rating'] = pd.to_numeric(df['rating'], errors='coerce')
    
    # تعبئة القيم المفقودة
    df['rating'].fillna(df['rating'].median(), inplace=True)
    
    # إزالة القيم المتطرفة (Z-score)
    from scipy import stats
    z_scores = stats.zscore(df['price'])
    df = df[abs(z_scores) < 3]
    
    return df

df = clean_data(df)
print(f"بعد التنظيف: {df.shape}")

# تحليل البيانات
print("\\n=== إحصاءات الأسعار ===")
print("المتوسط: $" + str(round(df['price'].mean(), 2)))
print("الوسيط: $" + str(round(df['price'].median(), 2)))
print("الأعلى: $" + str(round(df['price'].max(), 2)))
print("الأدنى: $" + str(round(df['price'].min(), 2)))

print("\\n=== أفضل المنتجات تقييماً ===")
print(df.nlargest(5, 'rating')[['name', 'price', 'rating']])`
        },
        {
          title: "تصور البيانات وحفظ التقرير",
          language: "python",
          code: `# إعداد التصورات
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('تحليل بيانات المنتجات', fontsize=16, fontweight='bold')

# 1. توزيع الأسعار
axes[0, 0].hist(df['price'], bins=30, edgecolor='black', alpha=0.7)
axes[0, 0].set_title('توزيع الأسعار')
axes[0, 0].set_xlabel('السعر ($)')
axes[0, 0].set_ylabel('عدد المنتجات')

# 2. العلاقة بين السعر والتقييم
axes[0, 1].scatter(df['price'], df['rating'], alpha=0.5)
axes[0, 1].set_title('السعر مقابل التقييم')
axes[0, 1].set_xlabel('السعر ($)')
axes[0, 1].set_ylabel('التقييم')

# 3. أفضل 10 منتجات تقييماً
top_rated = df.nlargest(10, 'rating')
axes[1, 0].barh(range(len(top_rated)), top_rated['rating'], color='skyblue')
axes[1, 0].set_yticks(range(len(top_rated)))
axes[1, 0].set_yticklabels(top_rated['name'].str[:30])
axes[1, 0].set_title('أفضل 10 منتجات تقييماً')
axes[1, 0].set_xlabel('التقييم')

# 4. متوسط السعر حسب الفئة (إذا وجد)
if 'category' in df.columns:
    avg_price = df.groupby('category')['price'].mean().sort_values(ascending=True)
    axes[1, 1].barh(avg_price.index, avg_price.values, color='lightgreen')
    axes[1, 1].set_title('متوسط السعر حسب الفئة')
    axes[1, 1].set_xlabel('متوسط السعر ($)')
else:
    axes[1, 1].text(0.5, 0.5, 'بيانات الفئة غير متوفرة',
                    ha='center', va='center', fontsize=12)
    axes[1, 1].set_title('الفئات')

plt.tight_layout()
plt.savefig('analysis_report.png', dpi=150, bbox_inches='tight')
print("✓ تم حفظ تقرير التحليل بنجاح")

# تصدير البيانات النظيفة
df.to_csv('cleaned_products.csv', index=False)
df.to_excel('cleaned_products.xlsx', index=False)
print("✓ تم تصدير البيانات النظيفة إلى CSV و Excel")`
        },
        {
          title: "Web Scraper غير متزامن (Async)",
          language: "python",
          code: `import asyncio
import aiohttp
from bs4 import BeautifulSoup
import pandas as pd
from typing import List, Dict

class AsyncWebScraper:
    """جلب صفحات متعددة بشكل غير متزامن"""
    
    def __init__(self, base_url: str, concurrency: int = 10):
        self.base_url = base_url
        self.semaphore = asyncio.Semaphore(concurrency)
        self.results = []
    
    async def fetch_page(self, session: aiohttp.ClientSession, url: str) -> str:
        async with self.semaphore:
            try:
                async with session.get(url, timeout=30) as response:
                    return await response.text()
            except Exception as e:
                print(f"Error fetching {url}: {e}")
                return ""
    
    async def parse_page(self, session: aiohttp.ClientSession, url: str):
        html = await self.fetch_page(session, url)
        if not html:
            return
        
        soup = BeautifulSoup(html, 'html.parser')
        # استخراج البيانات حسب هيكل الصفحة
        for item in soup.select('.item'):
            self.results.append({
                'title': item.select_one('.title').text.strip(),
                'url': item.select_one('a')['href'],
                'source': url
            })
    
    async def scrape_all(self, urls: List[str]) -> pd.DataFrame:
        async with aiohttp.ClientSession() as session:
            tasks = [self.parse_page(session, url) for url in urls]
            await asyncio.gather(*tasks)
        return pd.DataFrame(self.results)
    
    def save_results(self, filename: str = 'scraped_data.csv'):
        df = pd.DataFrame(self.results)
        df.to_csv(filename, index=False)
        print(f"✓ Saved {len(df)} records to {filename}")

# الاستخدام
async def main():
    scraper = AsyncWebScraper(base_url="https://example.com")
    urls = [f"https://example.com/page/{i}" for i in range(1, 51)]
    df = await scraper.scrape_all(urls)
    print(f"Collected {len(df)} items")
    scraper.save_results()

# asyncio.run(main())`
        }
      ],
      steps: [
        { step: 1, title: "إعداد البيئة", command: "python -m venv scraper_env && source scraper_env/bin/activate && pip install requests beautifulsoup4 pandas matplotlib seaborn jupyter aiohttp selenium scipy openpyxl", description: "إنشاء بيئة افتراضية وتثبيت الحزم" },
        { step: 2, title: "اختيار موقع وجلب البيانات", description: "اختر موقعاً إخبارياً أو متجراً إلكترونياً وجلب بياناته" },
        { step: 3, title: "استخراج البيانات", description: "استخدام BeautifulSoup لاستخراج العناوين والأسعار والتصنيفات" },
        { step: 4, title: "تنظيف البيانات", description: "تنظيف البيانات باستخدام Pandas وإزالة القيم المتكررة والمفقودة" },
        { step: 5, title: "تحليل وتصور", description: "إنشاء 5+ رسوم بيانية مع تحليل النتائج" },
        { step: 6, title: "تصدير التقرير", description: "تصدير البيانات النظيفة والرسوم البيانية إلى تقرير شامل" }
      ],
      deploymentGuide: "انشر التحليل كتقرير تفاعلي باستخدام Streamlit (pip install streamlit) أو Voilà (pip install voila). يمكنك أيضاً نشر كود الجمع على GitHub Actions لتشغيله بشكل دوري.",
      resources: [
        { name: "Beautiful Soup Docs", url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/" },
        { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
        { name: "Web Scraping ethics", url: "https://realpython.com/python-web-scraping-practical-introduction/#ethical-web-scraping" }
      ]
    }
  ]
};

export default projectsData;
