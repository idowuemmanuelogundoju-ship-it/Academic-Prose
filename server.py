from flask import Flask, request, jsonify
import sqlite3
import json
import os
from datetime import datetime

app = Flask(__name__)
DATABASE = 'pharmacy_quiz.db'

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            level TEXT DEFAULT "200 level",
            role TEXT DEFAULT "student"
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subjects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS handouts (
            id TEXT PRIMARY KEY,
            subject_id TEXT NOT NULL,
            title TEXT NOT NULL,
            summary TEXT,
            content TEXT,
            FOREIGN KEY(subject_id) REFERENCES subjects(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quiz_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            handout_id TEXT NOT NULL,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            answer INTEGER,
            FOREIGN KEY(handout_id) REFERENCES handouts(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quiz_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            handout_id TEXT NOT NULL,
            score INTEGER,
            total INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(handout_id) REFERENCES handouts(id)
        )
    ''')
    
    db.commit()
    
    # Seed data
    cursor.execute('SELECT COUNT(*) FROM subjects')
    if cursor.fetchone()[0] == 0:
        subjects = [
            ('pharm101', 'Pharmacology Fundamentals'),
            ('pharm102', 'Pharmacy Practice and Ethics')
        ]
        cursor.executemany('INSERT INTO subjects (id, name) VALUES (?, ?)', subjects)
        
        handouts = [
            ('h1', 'pharm101', 'Drug Absorption and Distribution', 'Read this handout to understand how drugs move in the body.', 'Pharmacokinetics includes absorption, distribution, metabolism, and excretion.'),
            ('h2', 'pharm101', 'Receptor Types and Drug Action', 'Covers agonists and antagonists.', 'Receptors are proteins where drugs bind.'),
            ('h3', 'pharm102', 'Patient Counseling Basics', 'How to communicate medication info.', 'Counseling includes explaining dosage and side effects.')
        ]
        cursor.executemany('''
            INSERT INTO handouts (id, subject_id, title, summary, content)
            VALUES (?, ?, ?, ?, ?)
        ''', handouts)
        
        questions = [
            ('h1', 'What is bioavailability?', json.dumps(['Term for drug in circulation', 'Potency', 'Efficacy', 'Concentration']), 0),
            ('h1', 'Which organ metabolizes drugs?', json.dumps(['Kidney', 'Skin', 'Liver', 'Lungs']), 2),
            ('h2', 'An antagonist does what?', json.dumps(['Activates receptor', 'Blocks receptor', 'Metabolizes', 'Increases absorption']), 1),
            ('h3', 'What is essential in counseling?', json.dumps(['Use technical terms', 'Explain side effects', 'Skip instructions', 'Rush']), 1)
        ]
        for handout_id, q, opts, ans in questions:
            cursor.execute('''
                INSERT INTO quiz_questions (handout_id, question, options, answer)
                VALUES (?, ?, ?, ?)
            ''', (handout_id, q, opts, ans))
        
        db.commit()
    
    db.close()

@app.before_request
def handle_cors():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        for key, value in CORS_HEADERS.items():
            response.headers[key] = value
        return response
    for key, value in CORS_HEADERS.items():
        app.after_request_funcs.setdefault(None, [])

@app.after_request
def add_cors_headers(response):
    for key, value in CORS_HEADERS.items():
        response.headers[key] = value
    return response

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required.'}), 400
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    
    if user:
        if user['password'] == password:
            db.close()
            return jsonify({
                'id': user['id'],
                'email': user['email'],
                'level': user['level'],
                'role': user['role']
            })
        else:
            db.close()
            return jsonify({'error': 'Invalid password.'}), 401
    else:
        cursor.execute(
            'INSERT INTO users (email, password, level, role) VALUES (?, ?, ?, ?)',
            (email, password, '200 level', 'student')
        )
        db.commit()
        user_id = cursor.lastrowid
        db.close()
        return jsonify({
            'id': user_id,
            'email': email,
            'level': '200 level',
            'role': 'student'
        })

@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT id, name FROM subjects')
    subjects = cursor.fetchall()
    
    result = []
    for subject in subjects:
        cursor.execute('SELECT id, title, summary FROM handouts WHERE subject_id = ?', (subject['id'],))
        handouts = cursor.fetchall()
        subj_dict = dict(subject)
        subj_dict['handouts'] = [dict(h) for h in handouts]
        result.append(subj_dict)
    
    db.close()
    return jsonify(result)

@app.route('/api/handout/<handout_id>', methods=['GET'])
def get_handout(handout_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM handouts WHERE id = ?', (handout_id,))
    handout = cursor.fetchone()
    
    if not handout:
        db.close()
        return jsonify({'error': 'Handout not found.'}), 404
    
    cursor.execute('SELECT question, options, answer FROM quiz_questions WHERE handout_id = ?', (handout_id,))
    questions = cursor.fetchall()
    
    quiz = []
    for q in questions:
        quiz.append({
            'q': q['question'],
            'options': json.loads(q['options']),
            'answer': q['answer']
        })
    
    db.close()
    handout_dict = dict(handout)
    handout_dict['quiz'] = quiz
    return jsonify(handout_dict)

@app.route('/api/submit-quiz', methods=['POST'])
def submit_quiz():
    data = request.json
    user_id = data.get('user_id')
    handout_id = data.get('handout_id')
    score = data.get('score')
    total = data.get('total')
    
    if not all([user_id, handout_id, score is not None, total]):
        return jsonify({'error': 'Missing fields.'}), 400
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO quiz_scores (user_id, handout_id, score, total) VALUES (?, ?, ?, ?)',
        (user_id, handout_id, score, total)
    )
    db.commit()
    db.close()
    return jsonify({'success': True})

@app.route('/api/history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        SELECT h.title, s.name as subject, qs.score, qs.total, qs.created_at
        FROM quiz_scores qs
        JOIN handouts h ON qs.handout_id = h.id
        JOIN subjects s ON h.subject_id = s.id
        WHERE qs.user_id = ?
        ORDER BY qs.created_at DESC
        LIMIT 10
    ''', (user_id,))
    scores = cursor.fetchall()
    db.close()
    return jsonify([dict(s) for s in scores])

@app.route('/api/add-handout', methods=['POST'])
def add_handout():
    data = request.json
    subject_id = data.get('subject_id')
    subject_name = data.get('subject_name')
    title = data.get('title')
    summary = data.get('summary')
    content = data.get('content')
    quiz = data.get('quiz', [])
    
    if not all([subject_id, subject_name, title, summary, content]):
        return jsonify({'error': 'Missing fields.'}), 400
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM subjects WHERE id = ?', (subject_id,))
    if not cursor.fetchone():
        cursor.execute('INSERT INTO subjects (id, name) VALUES (?, ?)', (subject_id, subject_name))
    
    handout_id = f'h{int(datetime.now().timestamp() * 1000)}'
    cursor.execute(
        'INSERT INTO handouts (id, subject_id, title, summary, content) VALUES (?, ?, ?, ?, ?)',
        (handout_id, subject_id, title, summary, content)
    )
    
    for q in quiz:
        cursor.execute(
            'INSERT INTO quiz_questions (handout_id, question, options, answer) VALUES (?, ?, ?, ?)',
            (handout_id, q.get('q'), json.dumps(q.get('options', [])), q.get('answer'))
        )
    
    db.commit()
    db.close()
    return jsonify({'success': True, 'handoutId': handout_id})

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        init_db()
    else:
        # Still init in case tables missing
        init_db()
    app.run(host='0.0.0.0', port=3000, debug=False)
