const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('.'));

const db = new sqlite3.Database('./pharmacy_quiz.db', (err) => {
  if (err) console.error(err);
  else console.log('Connected to SQLite database.');
});

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    level TEXT DEFAULT '200 level',
    role TEXT DEFAULT 'student'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS handouts (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(subject_id) REFERENCES subjects(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handout_id TEXT NOT NULL,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    answer INTEGER,
    FOREIGN KEY(handout_id) REFERENCES handouts(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS quiz_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    handout_id TEXT NOT NULL,
    score INTEGER,
    total INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(handout_id) REFERENCES handouts(id)
  )`);

  // Seed default data if empty
  db.get('SELECT COUNT(*) as count FROM subjects', (err, row) => {
    if (row && row.count === 0) {
      seedData();
    }
  });
});

function seedData() {
  const subjectsData = [
    { id: 'pharm101', name: 'Pharmacology Fundamentals' },
    { id: 'pharm102', name: 'Pharmacy Practice and Ethics' }
  ];

  const handoutsData = [
    {
      id: 'h1',
      subject_id: 'pharm101',
      title: 'Drug Absorption and Distribution',
      summary: 'Read this handout to understand how drugs move in the body and why dosage matters.',
      content: 'Pharmacokinetics includes absorption, distribution, metabolism, and excretion. Absorption is movement from administration site to bloodstream. Distribution is the drug moving to tissues. Factors: bioavailability, protein binding, blood flow.'
    },
    {
      id: 'h2',
      subject_id: 'pharm101',
      title: 'Receptor Types and Drug Action',
      summary: 'Covers agonists, antagonists, and dose-response relationships.',
      content: 'Receptors are proteins where drugs bind. Agonists activate receptors. Antagonists block activation. Dose-response curves help identify potency and maximal effect.'
    },
    {
      id: 'h3',
      subject_id: 'pharm102',
      title: 'Patient Counseling Basics',
      summary: 'How to communicate key medication information to patients and caregivers.',
      content: 'Counseling includes explaining dosage, route, adverse effects, adherence, and storage. Use simple language and verify understanding.'
    }
  ];

  const questionsData = [
    { handout_id: 'h1', question: 'What is the term for how much drug reaches systemic circulation?', options: JSON.stringify(['Bioavailability', 'Potency', 'Efficacy', 'Concentration']), answer: 0 },
    { handout_id: 'h1', question: 'Which organ primarily metabolizes drugs?', options: JSON.stringify(['Kidney', 'Skin', 'Liver', 'Lungs']), answer: 2 },
    { handout_id: 'h1', question: 'True or False: Higher protein binding means less free drug available.', options: JSON.stringify(['True', 'False']), answer: 0 },
    { handout_id: 'h2', question: 'An antagonist does what?', options: JSON.stringify(['Activates receptor', 'Blocks receptor', 'Metabolizes drug', 'Increases absorption']), answer: 1 },
    { handout_id: 'h2', question: 'Potency is measured by what?', options: JSON.stringify(['EC50', 'pH', 'Dose frequency', 'Half-life']), answer: 0 },
    { handout_id: 'h3', question: 'Which is essential in counseling?', options: JSON.stringify(['Use technical terms', 'Explain side effects', 'Skip instructions', 'Rush patient']), answer: 1 },
    { handout_id: 'h3', question: 'True or False: Adherence improves with clear counseling.', options: JSON.stringify(['True', 'False']), answer: 0 }
  ];

  subjectsData.forEach((subject) => {
    db.run('INSERT INTO subjects (id, name) VALUES (?, ?)', [subject.id, subject.name]);
  });

  handoutsData.forEach((handout) => {
    db.run(
      'INSERT INTO handouts (id, subject_id, title, summary, content) VALUES (?, ?, ?, ?, ?)',
      [handout.id, handout.subject_id, handout.title, handout.summary, handout.content]
    );
  });

  questionsData.forEach((q) => {
    db.run(
      'INSERT INTO quiz_questions (handout_id, question, options, answer) VALUES (?, ?, ?, ?)',
      [q.handout_id, q.question, q.options, q.answer]
    );
  });

  console.log('Database seeded with default data.');
}

// API Endpoints

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (user && user.password === password) {
      return res.json({ id: user.id, email: user.email, level: user.level, role: user.role });
    }

    if (!user) {
      const stmt = db.prepare('INSERT INTO users (email, password, level, role) VALUES (?, ?, ?, ?)');
      stmt.run([email, password, '200 level', 'student'], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, email, level: '200 level', role: 'student' });
      });
    } else {
      res.status(401).json({ error: 'Invalid password.' });
    }
  });
});

// Get subjects
app.get('/api/subjects', (req, res) => {
  db.all('SELECT id, name FROM subjects', (err, subjects) => {
    if (err) return res.status(500).json({ error: err.message });

    const subjectsWithHandouts = [];
    let processed = 0;

    subjects.forEach((subject) => {
      db.all('SELECT id, title, summary FROM handouts WHERE subject_id = ?', [subject.id], (err, handouts) => {
        subjectsWithHandouts.push({ ...subject, handouts: handouts || [] });
        processed++;
        if (processed === subjects.length) {
          res.json(subjectsWithHandouts);
        }
      });
    });
  });
});

// Get handout with quiz
app.get('/api/handout/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM handouts WHERE id = ?', [id], (err, handout) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!handout) return res.status(404).json({ error: 'Handout not found.' });

    db.all('SELECT question, options, answer FROM quiz_questions WHERE handout_id = ?', [id], (err, questions) => {
      if (err) return res.status(500).json({ error: err.message });

      const quiz = questions.map((q) => ({
        q: q.question,
        options: JSON.parse(q.options),
        answer: q.answer
      }));

      res.json({ ...handout, quiz });
    });
  });
});

// Submit quiz score
app.post('/api/submit-quiz', (req, res) => {
  const { user_id, handout_id, score, total } = req.body;

  if (!user_id || !handout_id || score === undefined || !total) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  db.run(
    'INSERT INTO quiz_scores (user_id, handout_id, score, total) VALUES (?, ?, ?, ?)',
    [user_id, handout_id, score, total],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Get student quiz history
app.get('/api/history/:user_id', (req, res) => {
  const { user_id } = req.params;

  db.all(
    `SELECT h.title, s.name as subject, qs.score, qs.total, qs.created_at
     FROM quiz_scores qs
     JOIN handouts h ON qs.handout_id = h.id
     JOIN subjects s ON h.subject_id = s.id
     WHERE qs.user_id = ?
     ORDER BY qs.created_at DESC
     LIMIT 10`,
    [user_id],
    (err, scores) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(scores || []);
    }
  );
});

// Add new handout (teacher)
app.post('/api/add-handout', (req, res) => {
  const { subject_id, subject_name, title, summary, content, quiz } = req.body;

  if (!subject_id || !subject_name || !title || !summary || !content) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const handoutId = `h${Date.now()}`;

  db.get('SELECT * FROM subjects WHERE id = ?', [subject_id], (err, subject) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!subject) {
      db.run('INSERT INTO subjects (id, name) VALUES (?, ?)', [subject_id, subject_name], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        insertHandout();
      });
    } else {
      insertHandout();
    }

    function insertHandout() {
      db.run(
        'INSERT INTO handouts (id, subject_id, title, summary, content) VALUES (?, ?, ?, ?, ?)',
        [handoutId, subject_id, title, summary, content],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          if (quiz && quiz.length > 0) {
            let inserted = 0;
            quiz.forEach((q) => {
              db.run(
                'INSERT INTO quiz_questions (handout_id, question, options, answer) VALUES (?, ?, ?, ?)',
                [handoutId, q.q, JSON.stringify(q.options), q.answer],
                (err) => {
                  if (err) console.error(err);
                  inserted++;
                  if (inserted === quiz.length) {
                    res.json({ success: true, handoutId });
                  }
                }
              );
            });
          } else {
            res.json({ success: true, handoutId });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`Pharmacy Quiz Server running on http://localhost:${PORT}`);
});
