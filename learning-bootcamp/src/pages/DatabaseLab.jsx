import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Play, RotateCcw, Copy, Check, Table2, Code, BookOpen,
  ChevronDown, ChevronUp, Info, AlertTriangle, CheckCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useToast } from '../components/common/Toast';

const sampleData = {
  users: [
    { id: 1, name: 'أحمد علي', email: 'ahmed@email.com', age: 25, city: 'الرياض', created_at: '2024-01-15' },
    { id: 2, name: 'سارة محمد', email: 'sara@email.com', age: 30, city: 'جدة', created_at: '2024-02-20' },
    { id: 3, name: 'خالد أحمد', email: 'khalid@email.com', age: 22, city: 'الرياض', created_at: '2024-03-10' },
    { id: 4, name: 'نورة عبدالله', email: 'noura@email.com', age: 28, city: 'الدمام', created_at: '2024-01-05' },
    { id: 5, name: 'فيصل عمر', email: 'faisal@email.com', age: 35, city: 'جدة', created_at: '2024-04-12' },
    { id: 6, name: 'مريم حسن', email: 'maryam@email.com', age: 27, city: 'مكة', created_at: '2024-02-28' },
    { id: 7, name: 'عبدالله سعد', email: 'abdullah@email.com', age: 32, city: 'الرياض', created_at: '2024-05-01' },
    { id: 8, name: 'لينا إبراهيم', email: 'lina@email.com', age: 24, city: 'الخبر', created_at: '2024-03-22' },
    { id: 9, name: 'سلطان فهد', email: 'sultan@email.com', age: 29, city: 'جدة', created_at: '2024-06-15' },
    { id: 10, name: 'هند تركي', email: 'hind@email.com', age: 26, city: 'الرياض', created_at: '2024-04-30' },
    { id: 11, name: 'ماجد سليمان', email: 'majed@email.com', age: 31, city: 'تبوك', created_at: '2024-07-08' },
    { id: 12, name: 'رشا عثمان', email: 'rasha@email.com', age: 23, city: 'الدمام', created_at: '2024-05-19' },
  ],
  orders: [
    { id: 1, user_id: 1, product: 'لابتوب', amount: 4500, quantity: 1, status: 'مكتمل', order_date: '2024-06-01' },
    { id: 2, user_id: 2, product: 'هاتف ذكي', amount: 2500, quantity: 2, status: 'مكتمل', order_date: '2024-06-03' },
    { id: 3, user_id: 1, product: 'سماعات', amount: 350, quantity: 1, status: 'معلق', order_date: '2024-06-05' },
    { id: 4, user_id: 3, product: 'لابتوب', amount: 4500, quantity: 1, status: 'مكتمل', order_date: '2024-06-07' },
    { id: 5, user_id: 4, product: 'ساعة ذكية', amount: 1200, quantity: 1, status: 'ملغي', order_date: '2024-06-10' },
    { id: 6, user_id: 5, product: 'جهاز لوحي', amount: 3200, quantity: 1, status: 'مكتمل', order_date: '2024-06-12' },
    { id: 7, user_id: 2, product: 'لابتوب', amount: 4500, quantity: 1, status: 'قيد المعالجة', order_date: '2024-06-15' },
    { id: 8, user_id: 6, product: 'هاتف ذكي', amount: 2500, quantity: 1, status: 'مكتمل', order_date: '2024-06-18' },
    { id: 9, user_id: 7, product: 'سماعات', amount: 350, quantity: 3, status: 'مكتمل', order_date: '2024-06-20' },
    { id: 10, user_id: 8, product: 'شاحن', amount: 150, quantity: 2, status: 'معلق', order_date: '2024-06-22' },
    { id: 11, user_id: 3, product: 'ماوس', amount: 200, quantity: 1, status: 'مكتمل', order_date: '2024-06-25' },
    { id: 12, user_id: 9, product: 'هاتف ذكي', amount: 2500, quantity: 1, status: 'قيد المعالجة', order_date: '2024-06-28' },
    { id: 13, user_id: 10, product: 'جهاز لوحي', amount: 3200, quantity: 1, status: 'مكتمل', order_date: '2024-07-01' },
    { id: 14, user_id: 5, product: 'ساعة ذكية', amount: 1200, quantity: 1, status: 'مكتمل', order_date: '2024-07-03' },
    { id: 15, user_id: 11, product: 'لابتوب', amount: 4500, quantity: 1, status: 'معلق', order_date: '2024-07-05' },
  ],
  products: [
    { id: 1, name: 'لابتوب برو', category: 'إلكترونيات', price: 4500, stock: 15 },
    { id: 2, name: 'هاتف ذكي إكس', category: 'إلكترونيات', price: 2500, stock: 30 },
    { id: 3, name: 'سماعات لاسلكية', category: 'إكسسوارات', price: 350, stock: 50 },
    { id: 4, name: 'ساعة ذكية', category: 'إلكترونيات', price: 1200, stock: 20 },
    { id: 5, name: 'جهاز لوحي', category: 'إلكترونيات', price: 3200, stock: 12 },
    { id: 6, name: 'شاحن سريع', category: 'إكسسوارات', price: 150, stock: 100 },
    { id: 7, name: 'ماوس لاسلكي', category: 'إكسسوارات', price: 200, stock: 40 },
    { id: 8, name: 'حقيبة لابتوب', category: 'حقائب', price: 280, stock: 25 },
  ],
  reviews: [
    { id: 1, user_id: 1, product_id: 1, rating: 5, comment: 'رائع جداً', created_at: '2024-06-10' },
    { id: 2, user_id: 2, product_id: 2, rating: 4, comment: 'جيد لكن السعر مرتفع', created_at: '2024-06-12' },
    { id: 3, user_id: 3, product_id: 1, rating: 5, comment: 'أفضل لابتوب استخدمته', created_at: '2024-06-15' },
    { id: 4, user_id: 4, product_id: 4, rating: 3, comment: 'عادي جداً', created_at: '2024-06-18' },
    { id: 5, user_id: 5, product_id: 5, rating: 4, comment: 'ممتاز للاستخدام اليومي', created_at: '2024-06-20' },
    { id: 6, user_id: 6, product_id: 2, rating: 5, comment: 'كاميرا ممتازة', created_at: '2024-06-22' },
    { id: 7, user_id: 7, product_id: 3, rating: 4, comment: 'صوت نقي', created_at: '2024-06-25' },
    { id: 8, user_id: 8, product_id: 6, rating: 5, comment: 'شحن سريع فعلاً', created_at: '2024-06-28' },
    { id: 9, user_id: 9, product_id: 2, rating: 2, comment: 'البطارية ضعيفة', created_at: '2024-07-01' },
    { id: 10, user_id: 10, product_id: 7, rating: 4, comment: 'مريح وسهل الاستخدام', created_at: '2024-07-03' },
  ],
};

const tableSchemas = {
  users: { label: 'المستخدمين', columns: ['id', 'name', 'email', 'age', 'city', 'created_at'] },
  orders: { label: 'الطلبات', columns: ['id', 'user_id', 'product', 'amount', 'quantity', 'status', 'order_date'] },
  products: { label: 'المنتجات', columns: ['id', 'name', 'category', 'price', 'stock'] },
  reviews: { label: 'التقييمات', columns: ['id', 'user_id', 'product_id', 'rating', 'comment', 'created_at'] },
};

function parseLiteral(val) {
  if (!val || val.toUpperCase() === 'NULL') return null;
  const s = val.trim();
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) return s.slice(1, -1);
  if (!isNaN(s)) return Number(s);
  return s;
}

function getColVal(row, ref) {
  if (ref.includes('.')) return row[ref.split('.')[1]];
  return row[ref];
}

function splitTopLevel(str, keyword) {
  const parts = [];
  let depth = 0, cur = '';
  const tokens = str.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.includes('(')) depth += (t.match(/\(/g) || []).length;
    if (t.includes(')')) depth -= (t.match(/\)/g) || []).length;
    if (depth === 0 && t.toUpperCase() === keyword) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += (cur ? ' ' : '') + t;
    }
  }
  parts.push(cur.trim());
  return parts;
}

function compareVals(a, op, b) {
  if (a === null || a === undefined) return false;
  switch (op) {
    case '=': return a === b;
    case '!=': case '<>': return a !== b;
    case '>': return Number(a) > Number(b);
    case '<': return Number(a) < Number(b);
    case '>=': return Number(a) >= Number(b);
    case '<=': return Number(a) <= Number(b);
    default: return false;
  }
}

function evalAtomic(row, cond) {
  const c = cond.trim();
  if (!c) return true;

  if (c.startsWith('(') && c.endsWith(')')) return evaluateWhere(row, c.slice(1, -1));

  const likeM = c.match(/^(.+?)\s+LIKE\s+'(.+?)'$/i);
  if (likeM) {
    const col = String(getColVal(row, likeM[1].trim()) ?? '');
    const pat = likeM[2].replace(/%/g, '.*').replace(/_/g, '.');
    return new RegExp('^' + pat + '$', 'i').test(col);
  }

  const inM = c.match(/^(.+?)\s+(NOT\s+)?IN\s*\((.+?)\)$/i);
  if (inM) {
    const col = getColVal(row, inM[1].trim());
    const vals = inM[3].split(',').map(v => parseLiteral(v));
    const yes = vals.some(v => v === col);
    return inM[2] ? !yes : yes;
  }

  const nullM = c.match(/^(.+?)\s+IS\s+(NOT\s+)?NULL$/i);
  if (nullM) {
    const col = getColVal(row, nullM[1].trim());
    const isNull = col === null || col === undefined;
    return nullM[2] ? !isNull : isNull;
  }

  const opM = c.match(/^(.+?)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/i);
  if (opM) {
    const col = getColVal(row, opM[1].trim());
    const op = opM[2];
    const val = parseLiteral(opM[3]);
    return compareVals(col, op, val);
  }

  return false;
}

function evaluateWhere(row, cond) {
  if (!cond || !cond.trim()) return true;
  const orParts = splitTopLevel(cond, 'OR');
  return orParts.some(part => {
    const andParts = splitTopLevel(part, 'AND');
    return andParts.every(p => evalAtomic(row, p));
  });
}

function parseSelectClauses(sql) {
  const upper = sql.toUpperCase().replace(/\s+/g, ' ').trim();
  const sf = upper.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)/i);
  if (!sf) return null;

  const clauses = { selectRaw: sf[1], fromTable: sf[2], joins: [], where: null, groupBy: null, having: null, orderBy: null, limit: null };

  const joinRe = /(LEFT\s+(?:OUTER\s+)?)?JOIN\s+(\w+)\s+ON\s+(.+?)(?=\s+(LEFT\s+JOIN|JOIN|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|$))/gi;
  let jm;
  while ((jm = joinRe.exec(upper)) !== null) {
    clauses.joins.push({ type: jm[1] && jm[1].trim().startsWith('LEFT') ? 'LEFT' : 'INNER', table: jm[2], on: jm[3].trim() });
  }

  const wM = upper.match(/WHERE\s+(.+?)(?=\s+(GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|$))/i);
  if (wM) clauses.where = wM[1];
  const gM = upper.match(/GROUP\s+BY\s+(.+?)(?=\s+(HAVING|ORDER\s+BY|LIMIT|$))/i);
  if (gM) clauses.groupBy = gM[1];
  const hM = upper.match(/HAVING\s+(.+?)(?=\s+(ORDER\s+BY|LIMIT|$))/i);
  if (hM) clauses.having = hM[1];
  const oM = upper.match(/ORDER\s+BY\s+(.+?)(?=\s+(LIMIT|$))/i);
  if (oM) clauses.orderBy = oM[1];
  const lM = upper.match(/LIMIT\s+(\d+)/i);
  if (lM) clauses.limit = parseInt(lM[1]);

  return clauses;
}

function parseSelectCols(raw) {
  return raw.split(',').map(s => {
    const col = s.trim();
    const asM = col.match(/^(.+?)\s+AS\s+(.+)$/i);
    if (asM) return { expr: asM[1].trim(), alias: asM[2].trim() };
    const dotM = col.match(/(\w+)\.(\w+)/);
    if (dotM) return { expr: col, alias: dotM[2] };
    return { expr: col, alias: col };
  });
}

function isAggregate(expr) {
  return /^(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(expr);
}

function computeAggregate(expr, rows) {
  const m = expr.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\((.+?)\)$/i);
  if (!m) return null;
  const fn = m[1].toUpperCase();
  const arg = m[2].trim();
  const vals = arg === '*' ? rows.map((_, i) => i + 1) : rows.map(r => {
    const v = getColVal(r, arg);
    return v === null || v === undefined ? null : Number(v);
  }).filter(v => v !== null);
  if (vals.length === 0) return fn === 'COUNT' ? 0 : null;
  switch (fn) {
    case 'COUNT': return vals.length;
    case 'SUM': return vals.reduce((a, b) => a + b, 0);
    case 'AVG': return vals.reduce((a, b) => a + b, 0) / vals.length;
    case 'MIN': return Math.min(...vals);
    case 'MAX': return Math.max(...vals);
    default: return null;
  }
}

function executeSelect(sql, data) {
  const clauses = parseSelectClauses(sql);
  if (!clauses) return { error: 'خطأ في تحليل الاستعلام. تأكد من صيغة SELECT ... FROM ...' };

  let table = data[clauses.fromTable];
  if (!table) return { error: `الجدول "${clauses.fromTable}" غير موجود. الجداول المتاحة: ${Object.keys(data).join('، ')}` };

  let rows = [...table];

  for (const join of clauses.joins) {
    const rightTable = data[join.table];
    if (!rightTable) return { error: `الجدول "${join.table}" غير موجود في عملية JOIN` };
    const onParts = join.on.split('=').map(s => s.trim());
    if (onParts.length !== 2) return { error: 'شرط JOIN غير صالح. استخدم: table1.column = table2.column' };
    const [leftRef, rightRef] = onParts;
    const rightCol = rightRef.includes('.') ? rightRef.split('.')[1] : rightRef;
    const leftCol = leftRef.includes('.') ? leftRef.split('.')[1] : leftRef;
    const newRows = [];
    for (const lr of rows) {
      let matched = false;
      for (const rr of rightTable) {
        if (lr[leftCol] === rr[rightCol]) {
          newRows.push({ ...lr, ...rr });
          matched = true;
        }
      }
      if (!matched && join.type === 'LEFT') {
        const nullRight = {};
        for (const k of Object.keys(rightTable[0] || {})) nullRight[k] = null;
        newRows.push({ ...lr, ...nullRight });
      }
    }
    rows = newRows;
  }

  rows = rows.filter(r => evaluateWhere(r, clauses.where));

  const cols = parseSelectCols(clauses.selectRaw);
  const hasAgg = cols.some(c => isAggregate(c.expr));
  const hasGroupBy = !!clauses.groupBy;
  const groupCols = hasGroupBy ? clauses.groupBy.split(',').map(s => s.trim()) : [];

  if (hasAgg || hasGroupBy) {
    if (hasGroupBy) {
      const groups = {};
      for (const r of rows) {
        const key = groupCols.map(g => String(getColVal(r, g))).join('|||');
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      }
      const resultRows = [];
      for (const [, grp] of Object.entries(groups)) {
        const row = {};
        groupCols.forEach((g) => {
          row[g.includes('.') ? g.split('.')[1] : g] = grp[0][g.includes('.') ? g.split('.')[1] : g];
        });
        for (const col of cols) {
          if (isAggregate(col.expr)) {
            row[col.alias] = computeAggregate(col.expr, grp);
          }
        }
        resultRows.push(row);
      }
      rows = resultRows;
    } else {
      const row = {};
      for (const col of cols) {
        if (isAggregate(col.expr)) {
          row[col.alias] = computeAggregate(col.expr, rows);
        } else {
          row[col.alias] = rows.length > 0 ? getColVal(rows[0], col.expr) : null;
        }
      }
      rows = [row];
    }
  } else {
    rows = rows.map(r => {
      const nr = {};
      for (const col of cols) {
        if (col.expr === '*') {
          Object.assign(nr, r);
        } else {
          const val = getColVal(r, col.expr);
          nr[col.alias] = val !== undefined ? val : null;
        }
      }
      return nr;
    });
  }

  if (clauses.having) {
    rows = rows.filter(r => evaluateWhere(r, clauses.having));
  }

  if (clauses.orderBy) {
    const orderCols = clauses.orderBy.split(',').map(s => {
      const parts = s.trim().split(/\s+/);
      return { col: parts[0], dir: parts[1] && parts[1].toUpperCase() === 'DESC' ? 'DESC' : 'ASC' };
    });
    rows.sort((a, b) => {
      for (const oc of orderCols) {
        const av = a[oc.col], bv = b[oc.col];
        if (av === null && bv === null) continue;
        if (av === null) return 1;
        if (bv === null) return -1;
        if (av < bv) return oc.dir === 'DESC' ? 1 : -1;
        if (av > bv) return oc.dir === 'DESC' ? -1 : 1;
      }
      return 0;
    });
  }

  if (clauses.limit !== null) {
    rows = rows.slice(0, clauses.limit);
  }

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  return { rows, columns, affected: rows.length };
}

function executeInsert(sql, data) {
  const m = sql.match(/INSERT\s+INTO\s+(\w+)\s*(?:\(([^)]*)\))?\s*VALUES\s*\(([^)]+)\)/i);
  if (!m) return { error: 'خطأ في صيغة INSERT. استخدم: INSERT INTO table (col1, col2) VALUES (val1, val2)' };
  const table = m[1];
  const cols = m[2] ? m[2].split(',').map(s => s.trim()) : null;
  const vals = m[3].split(',').map(s => parseLiteral(s));
  if (!data[table]) return { error: `الجدول "${table}" غير موجود` };
  const schemaCols = tableSchemas[table]?.columns || Object.keys(data[table][0] || {});
  if (cols) {
    if (cols.length !== vals.length) return { error: 'عدد الأعمدة لا يساوي عدد القيم' };
    const newRow = { id: data[table].length + 1 };
    cols.forEach((c, i) => { newRow[c] = vals[i]; });
    schemaCols.forEach(c => { if (!(c in newRow)) newRow[c] = null; });
    return { type: 'insert', table, newRow, affected: 1, message: `تم إدراج صف جديد في جدول "${tableSchemas[table]?.label || table}"` };
  }
  const newRow = { id: data[table].length + 1 };
  schemaCols.forEach((c, i) => { newRow[c] = vals[i] !== undefined ? vals[i] : null; });
  return { type: 'insert', table, newRow, affected: 1, message: `تم إدراج صف جديد في جدول "${tableSchemas[table]?.label || table}"` };
}

function executeUpdate(sql, data) {
  const m = sql.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
  if (!m) return { error: 'خطأ في صيغة UPDATE. استخدم: UPDATE table SET col = val WHERE condition' };
  const table = m[1];
  const setClause = m[2];
  const whereClause = m[3] || null;
  if (!data[table]) return { error: `الجدول "${table}" غير موجود` };
  const setPairs = setClause.split(',').map(s => {
    const [k, ...v] = s.split('=');
    return { col: k.trim(), val: parseLiteral(v.join('=')) };
  });
  let count = 0;
  const newData = data[table].map(r => {
    if (!evaluateWhere(r, whereClause)) return r;
    count++;
    const updated = { ...r };
    setPairs.forEach(p => { updated[p.col] = p.val; });
    return updated;
  });
  return { type: 'update', table, newData, affected: count, message: `تم تحديث ${count} صف في جدول "${tableSchemas[table]?.label || table}"` };
}

function executeDelete(sql, data) {
  const m = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i);
  if (!m) return { error: 'خطأ في صيغة DELETE. استخدم: DELETE FROM table WHERE condition' };
  const table = m[1];
  const whereClause = m[2] || null;
  if (!data[table]) return { error: `الجدول "${table}" غير موجود` };
  const before = data[table].length;
  const newData = whereClause ? data[table].filter(r => !evaluateWhere(r, whereClause)) : [];
  const affected = before - newData.length;
  return { type: 'delete', table, newData, affected, message: `تم حذف ${affected} صف من جدول "${tableSchemas[table]?.label || table}"` };
}

const exercises = [
  {
    id: 1, title: 'تصميم نظام مدونة', difficulty: 'مبتدئ',
    description: 'قم بتصميم قاعدة بيانات لنظام مدونة يسمح للمستخدمين بإنشاء المقالات وإضافة التعليقات والوسوم.',
    tables: ['users', 'posts', 'comments', 'tags', 'post_tags'],
    relationships: 'كل مستخدم يمكنه كتابة عدة مقالات. كل مقالة يمكن أن تحتوي على عدة تعليقات. كل مقالة يمكن أن تحتوي على عدة وسوم والعكس.',
    hints: ['استخدم مفتاح خارجي user_id في جدول posts', 'أنشئ جدول وسوم منفصل لتجنب التكرار', 'استخدم جدول وسيط post_tags للعلاقة متعدد إلى متعدد'],
    solution: `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  title VARCHAR(200),
  content TEXT,
  status ENUM('draft', 'published'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE
);

CREATE TABLE post_tags (
  post_id INT,
  tag_id INT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);`
  },
  {
    id: 2, title: 'تصميم نظام متجر', difficulty: 'مبتدئ',
    description: 'صمم قاعدة بيانات لمتجر إلكتروني يدير المنتجات والمخزون وسلة المشتريات والطلبات.',
    tables: ['users', 'products', 'categories', 'cart_items', 'orders', 'order_items'],
    relationships: 'كل مستخدم لديه سلة مشتريات تحتوي على منتجات متعددة. كل طلب يحتوي على عدة منتجات. كل منتج ينتمي إلى تصنيف واحد.',
    hints: ['افصل بين سلة المشتريات والطلبات المكتملة', 'استخدم category_id في جدول المنتجات', 'سجل الكمية والسعر في order_items للتتبع التاريخي'],
    solution: `CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(200),
  description TEXT,
  price DECIMAL(10,2),
  stock INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total DECIMAL(10,2),
  status ENUM('pending', 'paid', 'shipped', 'delivered'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);`
  },
  {
    id: 3, title: 'تصميم نظام مكتبة', difficulty: 'مبتدئ',
    description: 'صمم قاعدة بيانات لمكتبة تدير الكتب والأعضاء واستعارات الكتب.',
    tables: ['books', 'authors', 'members', 'borrowings', 'categories'],
    relationships: 'كل كتاب له مؤلف واحد وعدة نسخ. كل عضو يمكنه استعارة عدة كتب. كل كتاب ينتمي لتصنيف واحد.',
    hints: ['سجل تاريخ الاستعارة والموعد النهائي للإرجاع', 'يمكن للكتاب أن يكون له عدة مؤلفين باستخدام جدول وسيط', 'تتبع حالة الكتاب (متاح، مستعار، قيد الصيانة)'],
    solution: `CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  bio TEXT
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200),
  category_id INT,
  published_year INT,
  isbn VARCHAR(20) UNIQUE,
  total_copies INT DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE book_authors (
  book_id INT,
  author_id INT,
  PRIMARY KEY (book_id, author_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  membership_date DATE
);

CREATE TABLE borrowings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT,
  member_id INT,
  borrow_date DATE,
  due_date DATE,
  return_date DATE,
  status ENUM('active', 'returned', 'overdue'),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);`
  },
  {
    id: 4, title: 'تصميم نظام مستشفى', difficulty: 'متوسط',
    description: 'صمم قاعدة بيانات لمستشفى تدير الأطباء والمرضى والمواعيد والتقارير الطبية.',
    tables: ['doctors', 'patients', 'appointments', 'medical_records', 'departments', 'prescriptions'],
    relationships: 'كل طبيب ينتمي لقسم واحد. كل مريض يمكنه حجز مواعيد متعددة. كل موعد يؤدي إلى تقرير طبي واحد.',
    hints: ['استخدم جدول departments لتصنيف الأطباء', 'اربط التقارير الطبية بالمرضى وليس بالمواعيد فقط', 'تتبع وصفات الأدوية بشكل منفصل'],
    solution: `CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  location VARCHAR(100)
);

CREATE TABLE doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_id INT,
  name VARCHAR(100),
  specialization VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100) UNIQUE,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  dob DATE,
  phone VARCHAR(20),
  email VARCHAR(100),
  blood_type VARCHAR(5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  doctor_id INT,
  patient_id INT,
  appointment_date DATETIME,
  status ENUM('scheduled', 'completed', 'cancelled'),
  notes TEXT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE medical_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  diagnosis TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE prescriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  record_id INT,
  medication VARCHAR(100),
  dosage VARCHAR(50),
  duration VARCHAR(50),
  FOREIGN KEY (record_id) REFERENCES medical_records(id)
);`
  },
  {
    id: 5, title: 'تصميم نظام طيران', difficulty: 'متوسط',
    description: 'صمم قاعدة بيانات لشركة طيران تدير الرحلات والحجوزات والمسافرين والطائرات.',
    tables: ['airlines', 'airports', 'flights', 'passengers', 'bookings', 'seats'],
    relationships: 'كل رحلة طيران لها مطار مغادرة ومطار وصول. كل مسافر يمكنه حجز عدة رحلات. كل طائرة لها مقاعد متعددة.',
    hints: ['استخدم رموز المطارات الدولية (IATA)', 'تتبع حالة الحجز (مؤكد، ملغي، بانتظار التأكيد)', 'اربط المقاعد بنوعها (درجة أعمال، سياحية)'],
    solution: `CREATE TABLE airports (
  code CHAR(3) PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(100)
);

CREATE TABLE airlines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  code VARCHAR(10) UNIQUE
);

CREATE TABLE flights (
  id INT PRIMARY KEY AUTO_INCREMENT,
  airline_id INT,
  flight_number VARCHAR(10) UNIQUE,
  origin_code CHAR(3),
  destination_code CHAR(3),
  departure_time DATETIME,
  arrival_time DATETIME,
  total_seats INT,
  FOREIGN KEY (origin_code) REFERENCES airports(code),
  FOREIGN KEY (destination_code) REFERENCES airports(code),
  FOREIGN KEY (airline_id) REFERENCES airlines(id)
);

CREATE TABLE passengers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  passport VARCHAR(20) UNIQUE,
  nationality VARCHAR(50),
  dob DATE
);

CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  flight_id INT,
  seat_number VARCHAR(5),
  class ENUM('economy', 'business', 'first'),
  is_available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (flight_id) REFERENCES flights(id)
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  flight_id INT,
  passenger_id INT,
  seat_id INT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed', 'cancelled', 'pending'),
  FOREIGN KEY (flight_id) REFERENCES flights(id),
  FOREIGN KEY (passenger_id) REFERENCES passengers(id),
  FOREIGN KEY (seat_id) REFERENCES seats(id)
);`
  },
  {
    id: 6, title: 'تصميم نظام تواصل اجتماعي', difficulty: 'متقدم',
    description: 'صمم قاعدة بيانات لمنصة تواصل اجتماعي تدعم المستخدمين والمنشورات والإعجابات والتعليقات والصداقات.',
    tables: ['users', 'posts', 'comments', 'likes', 'friendships', 'notifications', 'messages'],
    relationships: 'كل مستخدم يمكنه كتابة منشورات وإرسال طلبات صداقة. كل منشور يمكن أن يحصل على إعجابات وتعليقات. المستخدمون يمكنهم التراسل الخاص.',
    hints: ['استخدم حالة الصداقة (معلق، مقبول، مرفوض)', 'تتبع الإعجابات بجدول منفصل للعلاقة متعدد إلى متعدد', 'صمم جدول الإشعارات لإرسال التنبيهات'],
    solution: `CREATE TABLE users_profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  content TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE likes (
  post_id INT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users_profile(id)
);

CREATE TABLE friendships (
  user_id INT,
  friend_id INT,
  status ENUM('pending', 'accepted', 'blocked'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, friend_id),
  FOREIGN KEY (user_id) REFERENCES users_profile(id),
  FOREIGN KEY (friend_id) REFERENCES users_profile(id)
);

CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT,
  receiver_id INT,
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users_profile(id),
  FOREIGN KEY (receiver_id) REFERENCES users_profile(id)
);

CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  type ENUM('like', 'comment', 'friend_request', 'message'),
  reference_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users_profile(id)
);`
  },
];

const sqlExercises = [
  { level: 'مبتدئ', title: 'عرض جميع المستخدمين', query: 'SELECT * FROM users;' },
  { level: 'مبتدئ', title: 'عرض أسماء المدن المختلفة', query: 'SELECT DISTINCT city FROM users;' },
  { level: 'مبتدئ', title: 'تصفية المستخدمين حسب العمر', query: "SELECT * FROM users WHERE age > 25;" },
  { level: 'مبتدئ', title: 'ترتيب المستخدمين حسب العمر', query: 'SELECT * FROM users ORDER BY age DESC;' },
  { level: 'مبتدئ', title: 'تحديد عدد النتائج', query: 'SELECT * FROM users LIMIT 5;' },
  { level: 'مبتدئ', title: 'البحث باسم محدد', query: "SELECT * FROM users WHERE name LIKE '%أحمد%';" },
  { level: 'متوسط', title: 'ضم جدول المستخدمين مع الطلبات', query: 'SELECT users.name, orders.product, orders.amount FROM users JOIN orders ON users.id = orders.user_id;' },
  { level: 'متوسط', title: 'عدد المستخدمين في كل مدينة', query: 'SELECT city, COUNT(*) AS count FROM users GROUP BY city;' },
  { level: 'متوسط', title: 'متوسط الأعمار حسب المدينة', query: 'SELECT city, AVG(age) AS average_age FROM users GROUP BY city;' },
  { level: 'متوسط', title: 'إجمالي مبيعات كل منتج', query: 'SELECT product, SUM(amount) AS total FROM orders GROUP BY product;' },
  { level: 'متوسط', title: 'مدن بها أكثر من مستخدم', query: 'SELECT city, COUNT(*) AS count FROM users GROUP BY city HAVING count > 1;' },
  { level: 'متوسط', title: 'استعلام فرعي: مستخدمون لديهم طلبات', query: 'SELECT * FROM users WHERE id IN (SELECT DISTINCT user_id FROM orders);' },
  { level: 'متقدم', title: 'LEFT JOIN مع NULL', query: 'SELECT users.name, orders.product FROM users LEFT JOIN orders ON users.id = orders.user_id;' },
  { level: 'متقدم', title: 'ضم ثلاث جداول', query: 'SELECT users.name, products.name, reviews.rating FROM reviews JOIN users ON reviews.user_id = users.id JOIN products ON reviews.product_id = products.id;' },
  { level: 'متقدم', title: 'إحصائيات الطلبات المتقدمة', query: 'SELECT users.name, COUNT(orders.id) AS order_count, SUM(orders.amount) AS total_spent FROM users JOIN orders ON users.id = orders.user_id GROUP BY users.name ORDER BY total_spent DESC;' },
];

const difficultyColors = { مبتدئ: 'success', متوسط: 'warning', متقدم: 'danger' };

export default function DatabaseLab() {
  const [activeTab, setActiveTab] = useState('sql');
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const [sidebarSection, setSidebarSection] = useState('tables');
  const [expandedTables, setExpandedTables] = useState({});
  const [expandedExerciseHints, setExpandedExerciseHints] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [copied, setCopied] = useState(false);
  const [dbData, setDbData] = useState(sampleData);
  const { showToast } = useToast();
  const textareaRef = useRef(null);

  const runQuery = useCallback(() => {
    const sql = query.trim();
    if (!sql) { showToast('الرجاء كتابة استعلام أولاً', 'warning'); return; }
    setError(null);
    setResults(null);
    try {
      const upper = sql.toUpperCase();
      let result;
      if (upper.startsWith('SELECT')) {
        result = executeSelect(sql, dbData);
      } else if (upper.startsWith('INSERT')) {
        result = executeInsert(sql, dbData);
        if (result && result.type === 'insert') {
          setDbData(prev => ({ ...prev, [result.table]: [...prev[result.table], result.newRow] }));
          setQueryHistory(prev => [{ sql, type: 'insert', time: new Date().toLocaleTimeString('ar-SA') }, ...prev]);
          showToast(result.message, 'success');
          return;
        }
      } else if (upper.startsWith('UPDATE')) {
        result = executeUpdate(sql, dbData);
        if (result && result.type === 'update') {
          setDbData(prev => ({ ...prev, [result.table]: result.newData }));
          setQueryHistory(prev => [{ sql, type: 'update', time: new Date().toLocaleTimeString('ar-SA') }, ...prev]);
          showToast(result.message, 'success');
          return;
        }
      } else if (upper.startsWith('DELETE')) {
        result = executeDelete(sql, dbData);
        if (result && result.type === 'delete') {
          setDbData(prev => ({ ...prev, [result.table]: result.newData }));
          setQueryHistory(prev => [{ sql, type: 'delete', time: new Date().toLocaleTimeString('ar-SA') }, ...prev]);
          showToast(result.message, 'success');
          return;
        }
      } else {
        showToast('نوع الاستعلام غير مدعوم. استخدم SELECT, INSERT, UPDATE, DELETE', 'error');
        return;
      }
      if (result && result.error) {
        setError(result.error);
        showToast(result.error, 'error');
        return;
      }
      if (result && 'rows' in result) {
        setResults(result);
        setQueryHistory(prev => [{ sql, type: 'select', time: new Date().toLocaleTimeString('ar-SA'), rows: result.rows?.length || 0 }, ...prev]);
        if (result.rows?.length === 0) showToast('لم يتم العثور على نتائج', 'info');
        else showToast(`تم العثور على ${result.rows.length} نتيجة`, 'success');
      }
    } catch (e) {
      setError(e.message);
      showToast('حدث خطأ أثناء تنفيذ الاستعلام', 'error');
    }
  }, [query, dbData, showToast]);

  const loadExample = (q) => { setQuery(q); setResults(null); setError(null); };

  const copyResults = () => {
    if (!results?.rows?.length) return;
    const text = [results.columns.join('\t'), ...results.rows.map(r => results.columns.map(c => r[c]).join('\t'))].join('\n');
    navigator.clipboard.writeText(text).then(() => { setCopied(true); showToast('تم نسخ النتائج', 'success'); setTimeout(() => setCopied(false), 2000); });
  };

  const resetData = () => {
    setDbData(sampleData);
    setQueryHistory([]);
    setResults(null);
    setError(null);
    showToast('تم إعادة تعيين البيانات إلى الوضع الافتراضي', 'info');
  };

  const toggleTable = (name) => setExpandedTables(prev => ({ ...prev, [name]: !prev[name] }));

  const sidebarContent = sidebarSection === 'tables' ? (
    <div className="space-y-2">
      <p className="text-xs text-muted-text mb-2">اضغط على الجدول لعرض البيانات</p>
      {Object.entries(tableSchemas).map(([key, schema]) => {
        const isOpen = expandedTables[key];
        const data = dbData[key];
        return (
          <div key={key} className="rounded-lg border border-dark-border/30 overflow-hidden">
            <button onClick={() => toggleTable(key)} className="w-full flex items-center justify-between p-2.5 hover:bg-dark-bg/40 transition-colors">
              <div className="flex items-center gap-2">
                <Table2 size={14} className="text-accent/70" />
                <span className="text-xs font-medium text-light-text">{schema.label}</span>
                <span className="text-[10px] text-muted-text">({data?.length || 0})</span>
              </div>
              {isOpen ? <ChevronUp size={14} className="text-muted-text" /> : <ChevronDown size={14} className="text-muted-text" />}
            </button>
            {isOpen && (
              <div className="border-t border-dark-border/20 p-2 overflow-x-auto max-h-48 overflow-y-auto">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr>
                      {schema.columns.map(col => <th key={col} className="text-right px-1.5 py-1 text-accent/80 font-medium border-b border-dark-border/20 whitespace-nowrap">{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.slice(0, 5).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-dark-bg/20' : ''}>
                        {schema.columns.map(col => <td key={col} className="px-1.5 py-1 text-muted-text border-b border-dark-border/10 whitespace-nowrap">{row[col] ?? 'NULL'}</td>)}
                      </tr>
                    ))}
                    {data?.length > 5 && <tr><td colSpan={schema.columns.length} className="text-center text-[10px] text-muted-text py-1">... و {data.length - 5} صف إضافي</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="space-y-2">
      <p className="text-xs text-muted-text mb-2">اختر تمريناً لتجربة الاستعلام</p>
      {['مبتدئ', 'متوسط', 'متقدم'].map(level => {
        const exs = sqlExercises.filter(e => e.level === level);
        return (
          <div key={level} className="mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${level === 'مبتدئ' ? 'bg-success' : level === 'متوسط' ? 'bg-warning' : 'bg-danger'}`} />
              <span className="text-xs font-medium text-muted-text">{level}</span>
            </div>
            <div className="space-y-1">
              {exs.map((ex, i) => (
                <button key={i} onClick={() => loadExample(ex.query)} className="w-full text-right p-2 rounded-lg text-[11px] text-light-text/70 hover:text-light-text hover:bg-dark-bg/40 transition-all border border-transparent hover:border-dark-border/30">
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen pb-20" dir="rtl">
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Database size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light-text">مختبر قواعد البيانات</h1>
              <p className="text-muted-text text-sm mt-1">تعلّم SQL وتصميم قواعد البيانات بطريقة تفاعلية مع أمثلة عملية وتمارين تطبيقية</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex gap-1 bg-dark-card/50 rounded-xl p-1 border border-dark-border/30 w-fit mb-6">
          {[
            { id: 'sql', label: 'مختبر SQL التفاعلي', icon: Code },
            { id: 'design', label: 'تصميم قواعد البيانات', icon: Table2 },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-accent/10 text-accent border border-accent/30 shadow-sm shadow-accent/5' : 'text-muted-text hover:text-light-text hover:bg-dark-bg/40'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {activeTab === 'sql' && (
        <section className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <div className="flex-1 min-w-0">
              <div className="glass rounded-xl border border-dark-border/50 overflow-hidden mb-4">
                <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border/30">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-accent" />
                    <span className="text-sm font-medium text-light-text">محرر الاستعلامات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={RotateCcw} onClick={resetData}>إعادة تعيين</Button>
                    <Button variant="primary" size="sm" icon={Play} onClick={runQuery}>تشغيل</Button>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runQuery(); } }}
                  className="w-full min-h-[160px] p-4 bg-dark-bg/50 text-light-text font-mono text-sm leading-relaxed resize-y focus:outline-none border-0"
                  placeholder="اكتب استعلام SQL هنا..."
                  spellCheck={false}
                  dir="ltr"
                />
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 rounded-xl bg-danger/5 border border-danger/20 flex items-start gap-2">
                  <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
                  <p className="text-sm text-danger/90">{error}</p>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {results && (
                  <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass rounded-xl border border-dark-border/50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border/30">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-success" />
                        <span className="text-sm font-medium text-light-text">النتائج ({results.rows?.length || 0} صف)</span>
                      </div>
                      <Button variant="ghost" size="sm" icon={copied ? Check : Copy} onClick={copyResults}>
                        {copied ? 'تم النسخ' : 'نسخ'}
                      </Button>
                    </div>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-dark-bg/40">
                            {results.columns.map((col, i) => (
                              <th key={i} className="text-right px-4 py-3 text-accent font-medium text-xs border-b border-dark-border/30 whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.rows.map((row, ri) => (
                            <tr key={ri} className={`${ri % 2 === 0 ? 'bg-dark-bg/20' : ''} hover:bg-accent/5 transition-colors`}>
                              {results.columns.map((col, ci) => (
                                <td key={ci} className="px-4 py-2.5 text-sm text-light-text/80 border-b border-dark-border/10 whitespace-nowrap">
                                  {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-muted-text/50 italic">NULL</span>}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {results.rows.length === 0 && (
                        <div className="text-center py-12 text-muted-text text-sm">لا توجد نتائج لعرضها</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-accent" />
                  <span className="text-sm font-medium text-light-text">تمارين SQL مقترحة</span>
                  <span className="text-xs text-muted-text">اضغط على التمرين لتحميل الاستعلام</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {['مبتدئ', 'متوسط', 'متقدم'].map(level => (
                    <div key={level} className="flex-1 min-w-[200px]">
                      <div className="mb-2"><Badge variant={difficultyColors[level]} size="sm">{level}</Badge></div>
                      <div className="space-y-1">
                        {sqlExercises.filter(e => e.level === level).slice(0, 4).map((ex, i) => (
                          <button key={i} onClick={() => loadExample(ex.query)}
                            className="block w-full text-right px-3 py-2 rounded-lg text-xs text-muted-text hover:text-light-text hover:bg-dark-card/50 transition-all border border-transparent hover:border-dark-border/30"
                          >
                            {ex.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-72 shrink-0">
              <div className="glass rounded-xl border border-dark-border/50 overflow-hidden sticky top-24">
                <div className="flex border-b border-dark-border/30">
                  {[
                    { id: 'tables', label: 'الجداول', icon: Table2 },
                    { id: 'exercises', label: 'تمارين', icon: BookOpen },
                    { id: 'history', label: 'السجل', icon: RotateCcw },
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = sidebarSection === tab.id;
                    return (
                      <button key={tab.id} onClick={() => setSidebarSection(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-1 py-3 text-[11px] font-medium transition-all ${
                          isActive ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-muted-text hover:text-light-text'
                        }`}
                      >
                        <Icon size={14} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <div className="p-3 max-h-[70vh] overflow-y-auto">
                  {sidebarSection === 'history' && (
                    <div className="space-y-1.5">
                      {queryHistory.length === 0 && <p className="text-xs text-muted-text text-center py-4">لا يوجد سجل استعلامات بعد</p>}
                      {queryHistory.map((h, i) => (
                        <div key={i} className="p-2 rounded-lg bg-dark-bg/30 border border-dark-border/20 cursor-pointer hover:bg-dark-bg/50 transition-colors" onClick={() => setQuery(h.sql)}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              h.type === 'select' ? 'bg-accent/10 text-accent' : h.type === 'insert' ? 'bg-success/10 text-success' : h.type === 'update' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                            }`}>{h.type}</span>
                            <span className="text-[9px] text-muted-text">{h.time}</span>
                          </div>
                          <p className="text-[10px] text-light-text/70 font-mono truncate direction-ltr text-left unicode-bidi-plaintext">{h.sql}</p>
                          {h.rows !== undefined && <p className="text-[9px] text-muted-text mt-0.5">{h.rows} صف</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  {sidebarContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'design' && (
        <section className="max-w-6xl mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-text mb-6">
            صمم قاعدة بيانات متكاملة لكل نظام من الأنظمة التالية. حاول التفكير في الجداول والعلاقات قبل مشاهدة الحل.
          </motion.p>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {exercises.map((ex, idx) => {
              const showHints = expandedExerciseHints[ex.id];
              const showSolution = expandedSolutions[ex.id];
              return (
                <motion.div key={ex.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <Card className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-light-text">{ex.title}</h3>
                          <Badge variant={ex.difficulty === 'مبتدئ' ? 'success' : ex.difficulty === 'متوسط' ? 'warning' : 'danger'} size="sm">{ex.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-text leading-relaxed mb-3">{ex.description}</p>
                    <div className="mb-2">
                      <span className="text-xs text-accent/80 font-medium">الجداول المتوقعة: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ex.tables.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-dark-bg/40 border border-dark-border/20 text-[10px] text-light-text/70 font-mono">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-text leading-relaxed mb-3">
                      <span className="text-accent/80 font-medium">العلاقات: </span>
                      {ex.relationships}
                    </p>
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-dark-border/20">
                      <button onClick={() => setExpandedExerciseHints(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        className="flex items-center gap-1 text-xs text-muted-text hover:text-accent transition-colors"
                      >
                        <Info size={12} />
                        {showHints ? 'إخفاء التلميحات' : 'تلميحات'}
                      </button>
                      <button onClick={() => setExpandedSolutions(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        className="flex items-center gap-1 text-xs text-muted-text hover:text-accent transition-colors"
                      >
                        {showSolution ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {showSolution ? 'إخفاء الحل' : 'عرض الحل'}
                      </button>
                    </div>
                    {showHints && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-2 p-2.5 rounded-lg bg-accent/5 border border-accent/10">
                        <ul className="space-y-1">
                          {ex.hints.map((hint, i) => (
                            <li key={i} className="text-xs text-muted-text flex items-start gap-1.5">
                              <span className="text-accent mt-0.5">•</span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    {showSolution && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-2">
                        <div className="p-2.5 rounded-lg bg-dark-bg/50 border border-dark-border/30 overflow-x-auto max-h-64 overflow-y-auto">
                          <pre className="text-[10px] text-light-text/80 font-mono leading-relaxed direction-ltr text-left whitespace-pre">{ex.solution}</pre>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
