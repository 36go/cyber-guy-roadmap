import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
const MAX_CTF_CHALLENGES = 500;
const MAX_CTF_PAYLOAD_BYTES = 32 * 1024;

app.disable('x-powered-by');
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json({ limit: '100kb' }));

// In-memory learning data store
const db = {
  progress: [],
  quizResults: [],
  labSubmissions: [],
  notes: [],
  ctfChallenges: [],
};

function isObjectBody(body) {
  return body && typeof body === 'object' && !Array.isArray(body);
}

function validateCtfPayload(req, res, next) {
  if (!isObjectBody(req.body)) return res.status(400).json({ error: 'Request body must be an object' });
  if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > MAX_CTF_PAYLOAD_BYTES) {
    return res.status(413).json({ error: 'CTF payload is too large' });
  }
  next();
}

function createEntry(body) {
  return { ...body, id: randomUUID(), timestamp: new Date().toISOString() };
}

function normalizeChallenge(input) {
  const statuses = new Set(['not_started', 'in_progress', 'solved']);
  const categories = new Set(['web', 'crypto', 'forensics', 'binary', 'misc']);
  const text = (value, maxLength) => typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
  const number = (value, min, max) => Math.min(max, Math.max(min, Number.isFinite(Number(value)) ? Number(value) : 0));

  return {
    name: text(input.name, 120),
    platform: text(input.platform, 80),
    category: categories.has(input.category) ? input.category : 'misc',
    difficulty: number(input.difficulty, 1, 5),
    points: number(input.points, 0, 1000000),
    status: statuses.has(input.status) ? input.status : 'not_started',
    description: text(input.description, 2000),
    tags: Array.isArray(input.tags) ? input.tags.map(tag => text(tag, 40)).filter(Boolean).slice(0, 20) : [],
    timeSpent: number(input.timeSpent, 0, 100000),
    writeup: text(input.writeup, 20000),
    solvedDate: text(input.solvedDate, 10),
    deleted: input.deleted === true,
  };
}

// ================ LEARNING PROGRESS ================
app.get('/api/progress', (req, res) => {
  res.json({ progress: db.progress });
});

app.post('/api/progress', (req, res) => {
  if (!isObjectBody(req.body)) return res.status(400).json({ error: 'Request body must be an object' });
  const entry = createEntry(req.body);
  db.progress.push(entry);
  res.status(201).json(entry);
});

// ================ QUIZ RESULTS ================
app.get('/api/quiz-results', (req, res) => {
  res.json({ results: db.quizResults });
});

app.post('/api/quiz-results', (req, res) => {
  if (!isObjectBody(req.body)) return res.status(400).json({ error: 'Request body must be an object' });
  const result = createEntry(req.body);
  db.quizResults.push(result);
  res.status(201).json(result);
});

// ================ LAB SUBMISSIONS ================
app.get('/api/lab-submissions', (req, res) => {
  res.json({ submissions: db.labSubmissions });
});

app.post('/api/lab-submissions', (req, res) => {
  if (!isObjectBody(req.body)) return res.status(400).json({ error: 'Request body must be an object' });
  const submission = createEntry(req.body);
  db.labSubmissions.push(submission);
  res.status(201).json(submission);
});

// ================ CTF TRACKER ================
app.get('/api/ctf', (req, res) => {
  res.json(db.ctfChallenges.filter(challenge => !challenge.deleted).slice(0, MAX_CTF_CHALLENGES));
});

app.post('/api/ctf', validateCtfPayload, (req, res) => {
  db.ctfChallenges = db.ctfChallenges.filter(challenge => !challenge.deleted);
  if (db.ctfChallenges.length >= MAX_CTF_CHALLENGES) {
    return res.status(409).json({ error: `CTF challenge limit of ${MAX_CTF_CHALLENGES} reached` });
  }

  const challenge = normalizeChallenge(req.body);
  if (!challenge.name) return res.status(400).json({ error: 'Challenge name is required' });

  const entry = { ...challenge, id: randomUUID(), createdAt: new Date().toISOString() };
  db.ctfChallenges.push(entry);
  res.status(201).json(entry);
});

app.put('/api/ctf/:id', validateCtfPayload, (req, res) => {
  const index = db.ctfChallenges.findIndex(challenge => challenge.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Challenge not found' });

  const challenge = normalizeChallenge({ ...db.ctfChallenges[index], ...req.body });
  if (!challenge.name) return res.status(400).json({ error: 'Challenge name is required' });

  db.ctfChallenges[index] = {
    ...challenge,
    id: db.ctfChallenges[index].id,
    createdAt: db.ctfChallenges[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  res.json(db.ctfChallenges[index]);
});

app.get('/api/ctf/leaderboard', (req, res) => {
  const solved = db.ctfChallenges.filter(challenge => challenge.status === 'solved' && !challenge.deleted);
  if (solved.length === 0) return res.json([]);

  res.json([{
    id: 'local-user',
    name: 'أنت',
    points: solved.reduce((total, challenge) => total + challenge.points, 0),
    solvedChallenges: solved.length,
  }]);
});

// ================ LEARNING STATS ================
app.get('/api/learning-stats', (req, res) => {
  const totalQuizzes = db.quizResults.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(db.quizResults.reduce((sum, result) => {
      const score = Number(result.score);
      return sum + (Number.isFinite(score) ? score : 0);
    }, 0) / totalQuizzes)
    : 0;
  const totalLabs = db.labSubmissions.length;
  const totalDays = db.progress.filter(p => p.type === 'day_complete').length;

  res.json({
    stats: {
      totalQuizzes,
      avgScore,
      totalLabs,
      totalDays,
      streak: 0,
      completedTopics: [...new Set(db.progress.map(p => p.topic).filter(Boolean))].length,
    }
  });
});

// ================ HEALTH CHECK ================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '2.0.0', mode: 'learning-platform' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  next(err);
});

app.listen(PORT, HOST, () => {
  console.log(`Learning Platform API running on http://${HOST}:${PORT}`);
});
