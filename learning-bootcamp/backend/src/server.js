import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

// In-memory learning data store
const db = {
  progress: [],
  quizResults: [],
  labSubmissions: [],
  notes: [],
};

// ================ LEARNING PROGRESS ================
app.get('/api/progress', (req, res) => {
  res.json({ progress: db.progress });
});

app.post('/api/progress', (req, res) => {
  const entry = { id: Date.now().toString(), ...req.body, timestamp: new Date().toISOString() };
  db.progress.push(entry);
  res.json(entry);
});

// ================ QUIZ RESULTS ================
app.get('/api/quiz-results', (req, res) => {
  res.json({ results: db.quizResults });
});

app.post('/api/quiz-results', (req, res) => {
  const result = { id: Date.now().toString(), ...req.body, timestamp: new Date().toISOString() };
  db.quizResults.push(result);
  res.json(result);
});

// ================ LAB SUBMISSIONS ================
app.get('/api/lab-submissions', (req, res) => {
  res.json({ submissions: db.labSubmissions });
});

app.post('/api/lab-submissions', (req, res) => {
  const submission = { id: Date.now().toString(), ...req.body, timestamp: new Date().toISOString() };
  db.labSubmissions.push(submission);
  res.json(submission);
});

// ================ LEARNING STATS ================
app.get('/api/learning-stats', (req, res) => {
  const totalQuizzes = db.quizResults.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(db.quizResults.reduce((s, r) => s + (r.score || 0), 0) / totalQuizzes)
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

app.listen(PORT, () => {
  console.log(` Learning Platform API running on http://localhost:${PORT}`);
});
