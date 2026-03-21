// Hard-coded local students for instant login (no internet)
const LOCAL_STUDENTS = [
  { id: 1, matric: 'PHA/24/25/0001', password: 'password', name: 'Adaeze Obi', level: '200 Level' },
  { id: 2, matric: 'PHA/24/25/0002', password: 'password', name: 'Chisom Nnamdi', level: '200 Level' },
  { id: 3, matric: 'PHA/24/25/0003', password: 'password', name: 'Tunde Okafor', level: '200 Level' },
  { id: 5, matric: 'bada', password: 'password', name: 'Bada', level: '200 Level' },
  { id: 4, matric: 'admin', password: 'admin123', name: 'Admin User', level: 'Admin' }
];

const SUBJECTS = [
  { code: 'pio', name: 'PIO 202', title: 'Physiology', icon: '❤️' },
  { code: 'bch', name: 'BCH 202', title: 'Biochemistry', icon: '🧪' },
  { code: 'ana', name: 'ANA 202', title: 'Anatomy', icon: '🦴' },
  { code: 'pch', name: 'PCH 202', title: 'Pharm. Chemistry', icon: '🔬' },
  { code: 'pcg', name: 'PCG 202', title: 'Pharmacognosy', icon: '🌿' },
  { code: 'pct', name: 'PCT 202', title: 'Pharmaceutics', icon: '📦' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════════════════════════════════════════

let loggedInUser = null;
let currentQuizIndex = 0;
let currentQuizAnswers = {};
let currentSubject = null;
let currentHandout = null;

// ═══════════════════════════════════════════════════════════════════════════════
// DEBUG & ADMIN FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function debugShowAllStudentData(){
  console.log('=== DEBUG: ALL STUDENT DATA ===');
  SUBJECTS.forEach((subject) => {
    console.log(`\n${subject.code}:`);
  });
  
  // Show all localStorage keys
  console.log('\n=== LOCALSTORAGE KEYS ===');
  for(let i=0;i<localStorage.length;i++){
    const key = localStorage.key(i);
    console.log(`${key}:`, localStorage.getItem(key));
  }
}

function debugGetStudentQuizzes(matric){
  const key = `quizHistory_${matric}`;
  const data = localStorage.getItem(key);
  console.log(`Quiz history for ${matric}:`, data?JSON.parse(data):'No data found');
  return data?JSON.parse(data):[];
}

function debugClearStudentData(matric){
  const key = `quizHistory_${matric}`;
  localStorage.removeItem(key);
  console.log(`Cleared ${key}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORAGE & HISTORY MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

function saveUserToStorage(){
  if(loggedInUser){
    localStorage.setItem('pharmaUser', JSON.stringify(loggedInUser));
  }
}

function loadUserFromStorage(){
  const stored = localStorage.getItem('pharmaUser');
  if(stored){
    try{
      loggedInUser = JSON.parse(stored);
      return true;
    }catch(e){
      console.error('Failed to parse user storage', e);
    }
  }
  return false;
}

function getQuizHistory(){
  if(!loggedInUser||!loggedInUser.matric) return [];
  const historyKey = `quizHistory_${loggedInUser.matric}`;
  const history = localStorage.getItem(historyKey);
  return history?JSON.parse(history):[];
}

function saveQuizToHistory(subject, handout, score, total, questions){
  if(!loggedInUser) return;
  const history = getQuizHistory();
  history.push({
    date: new Date().toISOString(),
    subject: subject.name,
    subjectCode: subject.code,
    handout: handout.title,
    handoutId: handout.id,
    score,
    total,
    questionsCount: questions
  });
  const historyKey = `quizHistory_${loggedInUser.matric}`;
  localStorage.setItem(historyKey, JSON.stringify(history));
  console.log(`✅ [${loggedInUser.name}] Quiz saved - ${subject.name}/${handout.title} - Score: ${score}/${total} - Key: ${historyKey}`);
}

function getCompletedSubjects(){
  const history = getQuizHistory();
  const subjects = new Set();
  history.forEach((item) => {
    subjects.add(item.subjectCode);
  });
  return Array.from(subjects);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function checkLocalLogin(matric, password){
  const lowerMatric = matric.toLowerCase().trim();
  const lowerPassword = password.toLowerCase().trim();
  
  for(const student of LOCAL_STUDENTS){
    if(student.matric.toLowerCase()===lowerMatric && 
       student.password.toLowerCase()===lowerPassword){
      return {...student};
    }
  }
  return null;
}

async function doLogin(){
  const matric = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  const loginErr = document.getElementById('login-err');
  
  if(!matric||!password){
    loginErr.textContent = 'Please enter matric number and password.';
    loginErr.style.display = 'block';
    return;
  }
  
  loginErr.style.display = 'none';
  
  // Step 1: Check local storage first (instant)
  const localUser = checkLocalLogin(matric, password);
  if(localUser){
    loggedInUser = localUser;
    saveUserToStorage();
    show('student');
    updateDashboard();
    document.getElementById('login-id').value = '';
    document.getElementById('login-pass').value = '';
    return;
  }
  
  // Login failed
  loginErr.textContent = 'Invalid matric number or password. (Local)';
  loginErr.style.display = 'block';
}

function logout(){
  loggedInUser = null;
  currentSubject = null;
  currentHandout = null;
  localStorage.removeItem('pharmaUser');
  document.getElementById('login-id').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-err').style.display = 'none';
  show('login');
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function show(screenName){
  document.querySelectorAll('.screen').forEach((s) => {
    s.style.display = 'none';
  });
  const screen = document.getElementById('screen-' + screenName);
  if(screen) screen.style.display = 'block';
}

function switchLoginTab(type, el){
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.remove('active');
  });
  el.classList.add('active');
  // Could implement admin/student login switching here
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function updateDashboard(){
  if(!loggedInUser) return;
  
  const history = getQuizHistory();
  console.log(`📊 [${loggedInUser.name}] Dashboard update - Quizzes found:`, history.length, history);
  
  // Update stats
  const sTaken = document.getElementById('s-taken');
  if(sTaken) sTaken.textContent = history.length;
  
  const sAvg = document.getElementById('s-avg');
  if(sAvg){
    if(history.length===0){
      sAvg.textContent = '—';
    }else{
      let totalScore = 0;
      history.forEach((item) => {
        totalScore += (item.score/item.total)*100;
      });
      const avgScore = Math.round(totalScore/history.length);
      sAvg.textContent = avgScore+'%';
    }
  }
  
  const sPending = document.getElementById('s-pending');
  if(sPending){
    const completedSubjects = getCompletedSubjects().length;
    sPending.textContent = Math.max(0, 6-completedSubjects);
  }
  
  // Update name
  const sName = document.getElementById('s-name');
  if(sName) sName.textContent = loggedInUser.name||loggedInUser.matric;
  const sNameNav = document.getElementById('s-name-nav');
  if(sNameNav) sNameNav.textContent = loggedInUser.matric;
  
  // Update subject badges
  const completedSubjects = getCompletedSubjects();
  SUBJECTS.forEach((subject) => {
    const badgeEl = document.getElementById(`${subject.code}-badge`);
    if(badgeEl){
      if(completedSubjects.includes(subject.code)){
        badgeEl.className = 'badge badge-success';
        badgeEl.textContent = '✓ Done';
      }else{
        badgeEl.className = 'badge badge-warn';
        badgeEl.textContent = 'Pending';
      }
    }
  });
  
  // Render quiz history table
  renderQuizHistoryTable();
}

function renderQuizHistoryTable(){
  const history = getQuizHistory();
  const historyContainer = document.getElementById('quiz-history-table');
  
  if(!historyContainer) return;
  
  if(history.length===0){
    historyContainer.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted);">No quizzes taken yet.</div>';
    return;
  }
  
  let html = `<div style="overflow-x:auto;"><table class="admin-table" style="font-size:13px;"><thead><tr><th>Date</th><th>Subject</th><th>Handout</th><th>Score</th><th>Correct/Total</th></tr></thead><tbody>`;
  
  history.slice().reverse().forEach((item) => {
    const percentage = Math.round((item.score/item.total)*100);
    const badgeClass = percentage>=70?'badge-success':'badge-danger';
    html += `<tr><td style="font-size:12px;color:var(--muted);">${new Date(item.date).toLocaleDateString()}</td><td><strong>${item.subject}</strong></td><td>${item.handout}</td><td><span class="badge ${badgeClass}">${percentage}%</span></td><td>${item.score}/${item.total}</td></tr>`;
  });
  
  html += '</tbody></table></div>';
  historyContainer.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBJECT & HANDOUT FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function openSubject(subjectCode){
  currentSubject = SUBJECTS.find((s) => s.code===subjectCode);
  if(!currentSubject) return;
  
  const sampleHandouts = [
    {
      id: `${subjectCode}_h1`,
      title: `${currentSubject.title} - Handout 1`,
      summary: 'Introduction to '+currentSubject.title,
      content: 'This is sample content for '+currentSubject.title,
      questions: 10
    },
    {
      id: `${subjectCode}_h2`, 
      title: `${currentSubject.title} - Handout 2`,
      summary: 'Advanced '+currentSubject.title+' concepts',
      content: 'This is advanced content for '+currentSubject.title,
      questions: 15
    }
  ];
  
  const handoutsList = document.getElementById('handouts-list');
  if(handoutsList){
    handoutsList.innerHTML = sampleHandouts.map((h) => `
      <div class="card">
        <div>
          <strong>${h.title}</strong>
          <p style="margin:4px 0;font-size:13px;color:var(--muted);">${h.summary}</p>
          <p style="margin:8px 0;font-size:12px;color:var(--muted);">📋 ${h.questions} questions</p>
        </div>
        <button class="btn btn-primary" onclick="openHandoutViewer('${h.id}', '${h.title}', ${h.questions})">Read & Quiz</button>
      </div>
    `).join('');
  }
  
  show('handouts');
}

function openHandoutViewer(handoutId, title, questionCount){
  currentHandout = {
    id: handoutId,
    title: title,
    questions: questionCount,
    content: 'Sample handout content for '+title
  };
  
  const viewerTitle = document.getElementById('viewer-title');
  if(viewerTitle) viewerTitle.textContent = title;
  const viewerDesc = document.getElementById('viewer-desc');
  if(viewerDesc) viewerDesc.textContent = 'Read the handout content below, then take the quiz.';
  const viewerCode = document.getElementById('viewer-code');
  if(viewerCode) viewerCode.textContent = currentSubject.code.toUpperCase();
  const viewerQuestions = document.getElementById('viewer-questions');
  if(viewerQuestions) viewerQuestions.textContent = questionCount;
  
  show('viewer');
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function beginQuiz(){
  if(!currentHandout) return;
  
  currentQuizIndex = 0;
  currentQuizAnswers = {};
  
  renderQuizQuestion();
  show('quiz');
}

function renderQuizQuestion(){
  if(!currentHandout) return;
  
  const sampleQuestions = [
    {q:'What is the first concept in '+currentHandout.title+'?',options:['Concept A','Concept B','Concept C','Concept D'],answer:0},
    {q:'Which statement is true?',options:['Statement 1','Statement 2','Statement 3','Statement 4'],answer:2},
    {q:'What does '+currentHandout.title+' primarily focus on?',options:['Focus 1','Focus 2','Focus 3','Focus 4'],answer:1}
  ];
  
  while(sampleQuestions.length<currentHandout.questions){
    sampleQuestions.push({
      q:'Question '+(sampleQuestions.length+1),
      options:['Option A','Option B','Option C','Option D'],
      answer:Math.floor(Math.random()*4)
    });
  }
  
  const question = sampleQuestions[currentQuizIndex];
  const qCounter = document.getElementById('q-counter');
  if(qCounter) qCounter.textContent = `Q ${currentQuizIndex+1} / ${currentHandout.questions}`;
  
  const pct = Math.round(((currentQuizIndex+1)/currentHandout.questions)*100);
  const qPct = document.getElementById('q-pct');
  if(qPct) qPct.textContent = pct+'%';
  
  const qProg = document.getElementById('q-prog');
  if(qProg) qProg.style.width = pct+'%';
  
  const qText = document.getElementById('q-text');
  if(qText) qText.textContent = question.q;
  
  const qOpts = document.getElementById('q-opts');
  if(qOpts){
    qOpts.innerHTML = question.options.map((opt, i) => `
      <label style="display:flex;align-items:center;padding:12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;margin-bottom:8px;">
        <input type="radio" name="quiz-answer" value="${i}" style="margin-right:10px;"/>
        ${opt}
      </label>
    `).join('');
  }
  
  const qNext = document.getElementById('q-next');
  if(qNext) qNext.style.display = currentQuizIndex<currentHandout.questions-1?'block':'none';
  const qFinish = document.getElementById('q-finish');
  if(qFinish) qFinish.style.display = currentQuizIndex===currentHandout.questions-1?'block':'none';
}

function nextQuiz(){
  const selected = document.querySelector('input[name="quiz-answer"]:checked');
  if(selected){
    currentQuizAnswers[currentQuizIndex] = parseInt(selected.value);
  }
  
  currentQuizIndex++;
  if(currentQuizIndex<currentHandout.questions){
    renderQuizQuestion();
  }
}

// Wrapper for HTML onclick
function nextQ(){
  nextQuiz();
}

function finishQuiz(){
  const selected = document.querySelector('input[name="quiz-answer"]:checked');
  if(selected){
    currentQuizAnswers[currentQuizIndex] = parseInt(selected.value);
  }
  
  let correct = 0;
  for(let i=0;i<currentHandout.questions;i++){
    if(Math.random()>0.3) correct++;
  }
  
  showQuizResult(correct, currentHandout.questions);
}

function showQuizResult(correct, total){
  const percentage = Math.round((correct/total)*100);
  const isExcellent = percentage>=80;
  const isGood = percentage>=70;
  
  const rEmoji = document.getElementById('r-emoji');
  if(rEmoji) rEmoji.textContent = isExcellent?'🎉':isGood?'👍':'📚';
  
  const rScore = document.getElementById('r-score');
  if(rScore) rScore.textContent = percentage+'%';
  
  const rLabel = document.getElementById('r-label');
  if(rLabel){
    rLabel.textContent = isExcellent 
      ?'Excellent work! You clearly understand the material.' 
      :isGood 
        ?'Good job! Review any weak areas and keep practicing.' 
        :'Keep studying! Review the material and try again.';
  }
  
  const rCorrect = document.getElementById('r-correct');
  if(rCorrect) rCorrect.textContent = correct;
  
  const rWrong = document.getElementById('r-wrong');
  if(rWrong) rWrong.textContent = total-correct;
  
  // Dynamic total questions
  const resultsGrid = document.querySelector('[id="screen-result"] .stats-grid');
  if(resultsGrid){
    const totalCard = resultsGrid.querySelector('.stat-card:nth-child(3) .stat-num');
    if(totalCard) totalCard.textContent = total;
  }
  
  // Step 1: Save to localStorage immediately
  saveQuizToHistory(currentSubject, currentHandout, correct, total, currentHandout.questions);
  updateDashboard();
  
  // Step 2: Background push to Sheets (non-blocking)
  pushToGoogleSheets(correct, total, currentHandout.questions).catch((err) => {
    console.log('Background Sheets push skipped:', err);
  });
  
  show('result');
}

async function pushToGoogleSheets(score, total, questions){
  if(!loggedInUser) return;
  
  try{
    // This would push to your actual Google Sheets via Zapier or similar
    const payload = {
      matric: loggedInUser.matric,
      name: loggedInUser.name,
      subject: currentSubject.name,
      handout: currentHandout.title,
      score: score,
      total: total,
      questions: questions,
      percentage: Math.round((score/total)*100),
      date: new Date().toISOString()
    };
    console.log('Would push to Sheets:', payload);
  }catch(err){
    console.warn('Background Sheets push failed (non-blocking):', err);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════════════════

const loginBtn = document.getElementById('login-btn');
if(loginBtn){
  loginBtn.addEventListener('click', doLogin);
}

const loginIdInput = document.getElementById('login-id');
if(loginIdInput){
  loginIdInput.addEventListener('keypress', (e) => {
    if(e.key==='Enter') doLogin();
  });
}

const loginPassInput = document.getElementById('login-pass');
if(loginPassInput){
  loginPassInput.addEventListener('keypress', (e) => {
    if(e.key==='Enter') doLogin();
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

function initializeApp(){
  if(loadUserFromStorage()){
    show('student');
    updateDashboard();
  }else{
    show('login');
  }
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initializeApp);
}else{
  initializeApp();
}
