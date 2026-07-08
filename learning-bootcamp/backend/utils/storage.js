import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function read(collection) {
  const fp = getFilePath(collection);
  if (!fs.existsSync(fp)) return [];
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf-8'));
  } catch {
    return [];
  }
}

function write(collection, data) {
  fs.writeFileSync(getFilePath(collection), JSON.stringify(data, null, 2));
}

export function getAll(collection) {
  return read(collection);
}

export function getById(collection, id) {
  return read(collection).find(item => item.id === id) || null;
}

export function create(collection, item) {
  const data = read(collection);
  data.push(item);
  write(collection, data);
  return item;
}

export function update(collection, id, updates) {
  const data = read(collection);
  const idx = data.findIndex(item => item.id === id);
  if (idx === -1) return null;
  data[idx] = { ...data[idx], ...updates, updatedAt: new Date().toISOString() };
  write(collection, data);
  return data[idx];
}

export function remove(collection, id) {
  const data = read(collection);
  const idx = data.findIndex(item => item.id === id);
  if (idx === -1) return false;
  data.splice(idx, 1);
  write(collection, data);
  return true;
}

export function query(collection, filterFn) {
  return read(collection).filter(filterFn);
}
