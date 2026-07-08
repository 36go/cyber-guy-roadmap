import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, FileCode, ChevronDown, ChevronUp,
  ExternalLink, Layers
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import CodeViewer from '../components/visualization/CodeViewer';

const pythonSections = [
  {
    title: 'تثبيت Python وإعداد البيئة',
    icon: '⚙️',
    level: 'مبتديء',
    content: `# 1. تحميل Python
# Windows: https://www.python.org/downloads/
# اختر "Add Python to PATH" أثناء التثبيت
# macOS: brew install python3
# Linux: sudo apt install python3

# 2. التحقق من التثبيت
python --version
python3 --version

# 3. إنشاء بيئة افتراضية
python -m venv myenv

# 4. تفعيل البيئة
# Windows: myenv\\Scripts\\activate
# macOS/Linux: source myenv/bin/activate

# 5. تثبيت الحزم
pip install requests pandas numpy matplotlib

# 6. حفظ التبعيات
pip freeze > requirements.txt

# 7. تثبيت من ملف
pip install -r requirements.txt`,
    url: 'https://www.python.org/downloads/'
  },
  {
    title: 'أساسيات Python',
    icon: '🐍',
    level: 'مبتديء',
    content: `# المتغيرات والأنواع
name = "Ahmed"          # str
age = 25                # int
price = 99.99           # float
is_active = True        # bool
items = [1, 2, 3]      # list
person = {"name": "Ahmed"}  # dict

# الطباعة والإدخال
print(f"Hello {name}, age {age}")
user_input = input("Enter your name: ")

# الشروط
if age >= 18:
    print("Adult")
elif age > 12:
    print("Teen")
else:
    print("Child")

# الحلقات
for i in range(5):
    print(i)

while age > 0:
    age -= 1

# القوائم
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove("banana")
for fruit in fruits:
    print(fruit.upper())

# القواميس
user = {
    "name": "Ahmed",
    "skills": ["Python", "JS"],
    "active": True
}
print(user["name"])
user["email"] = "ahmed@email.com"`,
    url: 'https://docs.python.org/3/tutorial/'
  },
  {
    title: 'الدوال والوحدات',
    icon: '🔧',
    level: 'مبتديء',
    content: `# تعريف دالة
def greet(name, greeting="Hello"):
    """دالة ترحيب"""
    return f"{greeting}, {name}!"

print(greet("Ahmed"))
print(greet("Sara", "مرحباً"))

# دوال بمعاملات متعددة
def calculate_total(*args, **kwargs):
    total = sum(args)
    discount = kwargs.get('discount', 0)
    return total * (1 - discount)

print(calculate_total(100, 200, 50, discount=0.1))

# الاستيراد
import math
import requests as req
from datetime import datetime

print(math.pi)
print(datetime.now())

# دوال مجهولة (Lambda)
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

# Decorators
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Time: {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done"`,
    url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions'
  },
  {
    title: 'البرمجة الكائنية (OOP)',
    icon: '🏗️',
    level: 'متوسط',
    content: `# تعريف كلاس
class User:
    # Class variable
    count = 0
    
    # Constructor
    def __init__(self, name, email):
        # Instance variables
        self.name = name
        self.email = email
        User.count += 1
    
    # Instance method
    def display(self):
        return f"{self.name} ({self.email})"
    
    # Class method
    @classmethod
    def total_users(cls):
        return f"Total: {cls.count}"
    
    # Static method
    @staticmethod
    def validate_email(email):
        return "@" in email
    
    # Special methods
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

# Inheritance
class Admin(User):
    def __init__(self, name, email, role):
        super().__init__(name, email)
        self.role = role
    
    def display(self):
        return f"[Admin] {super().display()} - {self.role}"

# الاستخدام
user1 = User("Ahmed", "ahmed@email.com")
user2 = Admin("Sara", "sara@email.com", "superadmin")
print(user1.display())
print(user2.display())
print(User.total_users())
print(User.validate_email("test@test.com"))

# Property Decorators
class Product:
    def __init__(self, price):
        self._price = price
    
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value
    
    @price.deleter
    def price(self):
        self._price = 0`,
    url: 'https://docs.python.org/3/tutorial/classes.html'
  },
  {
    title: 'التعامل مع الملفات والبيانات',
    icon: '📂',
    level: 'متوسط',
    content: `import csv
import json
from pathlib import Path

# -------------------- قراءة وكتابة الملفات --------------------
# كتابة ملف نصي
with open('data.txt', 'w', encoding='utf-8') as f:
    f.write("Hello World\\n")
    f.write("Second line\\n")

# قراءة ملف نصي
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = f.readlines()

# -------------------- JSON --------------------
# كتابة JSON
data = {
    "users": [
        {"name": "Ahmed", "age": 25},
        {"name": "Sara", "age": 30}
    ]
}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# قراءة JSON
with open('data.json', 'r', encoding='utf-8') as f:
    loaded = json.load(f)

# -------------------- CSV --------------------
# كتابة CSV
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Ahmed', 25, 'Riyadh'])
    writer.writerow(['Sara', 30, 'Jeddah'])

# قراءة CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Name'], row['Age'])

# -------------------- Pathlib --------------------
path = Path('data')
path.mkdir(exist_ok=True)
file_path = path / 'test.txt'
file_path.write_text("Hello from pathlib!")
print(file_path.read_text())`,
    url: 'https://docs.python.org/3/tutorial/inputoutput.html'
  },
  {
    title: 'المكتبات الشهيرة',
    icon: '📚',
    level: 'متوسط',
    content: `# -------------------- Requests --------------------
import requests

response = requests.get('https://api.github.com')
print(response.status_code)
data = response.json()

# POST request
payload = {"title": "New Post", "body": "Content"}
response = requests.post('https://api.example.com/posts', json=payload)

# -------------------- Pandas --------------------
import pandas as pd

# قراءة البيانات
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx')
df = pd.read_json('data.json')

# الاستكشاف
print(df.head())
print(df.info())
print(df.describe())
print(df['column'].value_counts())

# التنظيف
df = df.drop_duplicates()
df = df.fillna(df.mean())
df['date'] = pd.to_datetime(df['date'])

# التحليل
grouped = df.groupby('category')['price'].mean()
filtered = df[df['price'] > 100]

# -------------------- NumPy --------------------
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
matrix = np.random.rand(3, 3)
zeros = np.zeros((2, 3))
ones = np.ones((3, 2))
print(arr.mean(), arr.std(), arr.sum())

# -------------------- Matplotlib --------------------
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 20, 15, 25, 30]

plt.figure(figsize=(10, 6))
plt.plot(x, y, marker='o', label='Sales')
plt.bar(x, y, alpha=0.5, label='Monthly')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.title('Monthly Sales Analysis')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('chart.png', dpi=150)
plt.show()`,
    url: 'https://pypi.org/'
  },
  {
    title: 'التعامل مع الأخطاء والاستثناءات',
    icon: '🛡️',
    level: 'متوسط',
    content: `# Try/Except/Final ly
try:
    num = int(input("Enter a number: "))
    result = 10 / num
    print(f"Result: {result}")
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")
else:
    print("No errors occurred!")
finally:
    print("This always runs")

# رفع استثناء
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Invalid age")
    return age

# إنشاء استثناء مخصص
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Insufficient funds: \${balance} < \${amount}")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

# Context Manager (معالج السياق)
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

# الاستخدام
with FileManager('test.txt', 'w') as f:
    f.write("Hello Context Manager!")`,
    url: 'https://docs.python.org/3/tutorial/errors.html'
  },
  {
    title: 'البرمجة غير المتزامنة (Async)',
    icon: '⚡',
    level: 'متقدم',
    content: `import asyncio
import aiohttp

# -------------------- Basic Async --------------------
async def fetch_data(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1)  # Simulate network
    return f"Data from {url}"

async def main():
    # تشغيل مهمتين بشكل متزامن
    results = await asyncio.gather(
        fetch_data("https://api.example.com/1"),
        fetch_data("https://api.example.com/2"),
        fetch_data("https://api.example.com/3")
    )
    for result in results:
        print(result)

# -------------------- Async HTTP Requests --------------------
async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all():
    urls = [
        "https://api.github.com",
        "https://api.github.com/repos/python/cpython",
        "https://api.github.com/users/python"
    ]
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# -------------------- Async Generator --------------------
async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def use_async_gen():
    async for num in async_range(5):
        print(f"Got: {num}")

# -------------------- Async Context Manager --------------------
class AsyncDatabase:
    async def connect(self):
        await asyncio.sleep(0.5)
        print("Connected to DB")
        return self
    
    async def query(self, sql):
        await asyncio.sleep(0.3)
        return [{"id": 1, "name": "Ahmed"}]
    
    async def close(self):
        await asyncio.sleep(0.2)
        print("Connection closed")

async def use_db():
    db = await AsyncDatabase().connect()
    results = await db.query("SELECT * FROM users")
    await db.close()

# تشغيل الكود غير المتزامن
# asyncio.run(main())`,
    url: 'https://docs.python.org/3/library/asyncio.html'
  },
  {
    title: 'اختبار الكود (Testing)',
    icon: '🧪',
    level: 'متوسط',
    content: `# -------------------- pytest --------------------
# تثبيت: pip install pytest pytest-cov

# test_calculator.py
import pytest

# دوال للاختبار
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# اختبارات بسيطة
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

def test_divide():
    assert divide(10, 2) == 5
    assert divide(7, 2) == 3.5
    with pytest.raises(ValueError):
        divide(1, 0)

# -------------------- Fixtures --------------------
@pytest.fixture
def sample_data():
    return {"name": "Ahmed", "items": [1, 2, 3]}

def test_sample_data(sample_data):
    assert sample_data["name"] == "Ahmed"
    assert len(sample_data["items"]) == 3

# -------------------- Parametrize --------------------
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (10, 20, 30),
    (100, 200, 300),
])
def test_add_param(a, b, expected):
    assert add(a, b) == expected

# -------------------- Mock --------------------
from unittest.mock import Mock, patch

def get_user_name(user_id):
    # نفترض أن هذه الدالة تتصل بقاعدة بيانات
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()["name"]

@patch("requests.get")
def test_get_user_name(mock_get):
    mock_response = Mock()
    mock_response.json.return_value = {"name": "Ahmed"}
    mock_get.return_value = mock_response
    
    result = get_user_name(1)
    assert result == "Ahmed"

# --------------------- تشغيل الاختبارات --------------------
# pytest test_calculator.py -v
# pytest --cov=. test_calculator.py
# pytest --cov-report=html`,
    url: 'https://docs.pytest.org/'
  },
  {
    title: 'Python مع قواعد البيانات',
    icon: '🗄️',
    level: 'متوسط',
    content: `# -------------------- SQLite --------------------
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# إنشاء جدول
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER
    )
''')

# إدخال بيانات
cursor.execute('INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
               ('Ahmed', 'ahmed@email.com', 25))
conn.commit()

# استعلام
cursor.execute('SELECT * FROM users WHERE age > ?', (18,))
users = cursor.fetchall()

# -------------------- SQLAlchemy ORM --------------------
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, Session

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    age = Column(Integer)

engine = create_engine('sqlite:///orm_database.db')
Base.metadata.create_all(engine)

# CRUD Operations
session = Session(engine)

# Create
user = User(name="Ahmed", email="ahmed@email.com", age=25)
session.add(user)
session.commit()

# Read
users = session.query(User).filter(User.age > 18).all()
user = session.query(User).filter_by(name="Ahmed").first()

# Update
user.age = 26
session.commit()

# Delete
session.delete(user)
session.commit()`,
    url: 'https://docs.python.org/3/library/sqlite3.html'
  },
];

const levelColors = {
  مبتديء: 'success',
  متوسط: 'warning',
  متقدم: 'danger',
};

export default function PythonGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedSection, setExpandedSection] = useState(null);

  const filteredSections = useMemo(() => {
    return pythonSections.filter(section => {
      const matchesSearch = searchQuery.trim() === '' ||
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === 'all' || section.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, levelFilter]);

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <FileCode size={24} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">دليل Python الشامل</h1>
              <p className="text-muted-text text-sm mt-1">مرجع تعليمي متكامل للغة Python من الأساسيات إلى الاحتراف مع أمثلة عملية</p>
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
            placeholder="ابحث في دليل Python..."
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
          {filteredSections.map((section, idx) => {
            const isOpen = expandedSection === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card gradient={false} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-dark-bg/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-light-text">{section.title}</h3>
                          <Badge variant={levelColors[section.level]} size="sm">{section.level}</Badge>
                        </div>
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
                      <div className="p-4">
                        <CodeViewer
                          code={section.content}
                          language="python"
                          title={section.title}
                        />
                        {section.url && (
                          <a
                            href={section.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            <ExternalLink size={14} />
                            المصدر الرسمي
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredSections.length === 0 && (
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
