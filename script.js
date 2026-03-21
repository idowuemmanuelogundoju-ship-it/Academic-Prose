const loginPanel = document.getElementById('login-panel');
const subjectsPanel = document.getElementById('subjects-panel');
const handoutPanel = document.getElementById('handout-panel');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const userStatus = document.getElementById('user-status');
const subjectsList = document.getElementById('subjects-list');
const handoutTitle = document.getElementById('handout-title');
const handoutContent = document.getElementById('handout-content');
const handoutSummary = document.getElementById('handout-summary');
const quizForm = document.getElementById('quiz-form');
const quizSubtitle = document.getElementById('quiz-subtitle');
const quizResult = document.getElementById('quiz-result');
const submitQuiz = document.getElementById('submit-quiz');
const backToSubjects = document.getElementById('back-to-subjects');
const logoutBtn = document.getElementById('logout-btn');
const teacherPanelBtn = document.getElementById('teacher-panel-btn');
const closeTeacherBtn = document.getElementById('close-teacher');
const teacherForm = document.getElementById('teacher-form');
const teacherMessage = document.getElementById('teacher-message');
const scoreHistory = document.getElementById('score-history');

const API_BASE = 'http://localhost:3000/api';
let loggedInUser = null;
let selectedSubject = null;
let selectedHandout = null;
let subjects = [];

function showPanel(panel){loginPanel.classList.add('hidden');subjectsPanel.classList.add('hidden');handoutPanel.classList.add('hidden');panel.classList.remove('hidden');}
function saveUserToStorage(){if(loggedInUser)localStorage.setItem('pharmQuizUser',JSON.stringify(loggedInUser));}
function loadUserFromStorage(){const stored=localStorage.getItem('pharmQuizUser');if(stored){try{loggedInUser=JSON.parse(stored);return true;}catch{}}return false;}
async function loadHistory(){if(!loggedInUser||!loggedInUser.id)return;try{const res=await fetch(`${API_BASE}/history/${loggedInUser.id}`);const history=await res.json();if(!scoreHistory)return;if(!history.length){scoreHistory.innerHTML='<div>No quiz attempts yet.</div>';return;}scoreHistory.innerHTML=history.map((item)=>`<div>${new Date(item.created_at).toLocaleDateString()} - <strong>${item.subject}</strong> / ${item.title}: ${item.score}/${item.total}</div>`).join('');}catch(err){console.error(err);}}
async function loadSubjects(){try{const res=await fetch(`${API_BASE}/subjects`);subjects=await res.json();renderSubjects();}catch(err){console.error(err);}}
function renderSubjects(){subjectsList.innerHTML='';subjects.forEach((subject)=>{const card=document.createElement('div');card.className='card';card.innerHTML=`<div><strong>${subject.name}</strong><br><small>${subject.handouts.length} handout(s)</small></div><button data-id="${subject.id}">Open</button>`;card.querySelector('button').addEventListener('click',()=>openSubject(subject.id));subjectsList.appendChild(card);});}
function openSubject(subjectId){selectedSubject=subjects.find((s)=>s.id===subjectId);if(!selectedSubject)return;handoutTitle.textContent=selectedSubject.name;handoutSummary.textContent='Select a handout.';handoutContent.innerHTML=selectedSubject.handouts.map((h)=>`<div class="card"><div><strong>${h.title}</strong><p style="margin:4px 0;">${h.summary}</p></div><button data-id="${h.id}">Read & Quiz</button></div>`).join('');handoutContent.querySelectorAll('button').forEach((btn)=>{btn.addEventListener('click',()=>{const handout=selectedSubject.handouts.find((h)=>h.id===btn.dataset.id);if(handout)openHandout(handout);});});showPanel(handoutPanel);}
async function openHandout(handout){try{const res=await fetch(`${API_BASE}/handout/${handout.id}`);selectedHandout=await res.json();handoutTitle.textContent=`${selectedSubject.name} - ${selectedHandout.title}`;handoutSummary.textContent=selectedHandout.summary;handoutContent.innerHTML=`<div>${selectedHandout.content}</div>`;quizSubtitle.textContent=selectedHandout.title;renderQuizForm();}catch(err){console.error(err);}}
function renderQuizForm(){quizForm.innerHTML='';selectedHandout.quiz.forEach((item,idx)=>{const div=document.createElement('div');div.className='quiz-item';const optionsHtml=item.options.map((opt,i)=>`<label><input type="radio" name="q${idx}" value="${i}" /> ${opt}</label>`).join('');div.innerHTML=`<label><strong>${idx+1}. ${item.q}</strong></label>${optionsHtml}`;quizForm.appendChild(div);});quizResult.textContent='';}
function calculateScore(){let correct=0;selectedHandout.quiz.forEach((item,idx)=>{const answer=quizForm.querySelector(`input[name='q${idx}']:checked`);if(answer&&Number(answer.value)===item.answer)correct++;});return{correct,total:selectedHandout.quiz.length};}
loginForm.addEventListener('submit',async(e)=>{e.preventDefault();const email=document.getElementById('email').value.trim();const password=document.getElementById('password').value.trim();if(!email||!password){loginMessage.textContent='Enter email and password.';return;}try{const res=await fetch(`${API_BASE}/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const user=await res.json();if(res.ok){loggedInUser=user;saveUserToStorage();userStatus.textContent=`${email} • ${user.level}`;loginMessage.textContent='';loginForm.reset();await loadSubjects();await loadHistory();showPanel(subjectsPanel);}else{loginMessage.textContent=user.error||'Login failed.';}}catch(err){loginMessage.textContent='Server error.';console.error(err);}});
logoutBtn.addEventListener('click',()=>{loggedInUser=null;selectedSubject=null;selectedHandout=null;localStorage.removeItem('pharmQuizUser');userStatus.textContent='';showPanel(loginPanel);});
backToSubjects.addEventListener('click',async()=>{await loadSubjects();await loadHistory();showPanel(subjectsPanel);});
submitQuiz.addEventListener('click',async(e)=>{e.preventDefault();if(!selectedHandout||!loggedInUser)return;const{correct,total}=calculateScore();quizResult.className='message success';quizResult.textContent=`Score: ${correct}/${total}. ${correct===total?'Perfect!':'Try again.'}`;try{await fetch(`${API_BASE}/submit-quiz`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:loggedInUser.id,handout_id:selectedHandout.id,score:correct,total})});await loadHistory();}catch(err){console.error(err);}});
teacherPanelBtn?.addEventListener('click',()=>{teacherMessage.textContent='';showPanel(document.getElementById('teacher-panel'));});
closeTeacherBtn?.addEventListener('click',async()=>{await loadSubjects();await loadHistory();showPanel(subjectsPanel);});
teacherForm?.addEventListener('submit',async(e)=>{e.preventDefault();const subjectId=document.getElementById('teacher-subjectId').value.trim();const subjectName=document.getElementById('teacher-subjectName').value.trim();const handoutTitle=document.getElementById('teacher-handoutTitle').value.trim();const handoutSummary=document.getElementById('teacher-handoutSummary').value.trim();const handoutContentValue=document.getElementById('teacher-handoutContent').value.trim();if(!subjectId||!subjectName||!handoutTitle||!handoutSummary||!handoutContentValue){teacherMessage.textContent='Fill all fields.';return;}try{const res=await fetch(`${API_BASE}/add-handout`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject_id:subjectId,subject_name:subjectName,title:handoutTitle,summary:handoutSummary,content:handoutContentValue,quiz:[{q:'What is a key point?',options:['A','B','C','D'],answer:0}]})});const result=await res.json();if(res.ok){teacherMessage.textContent='Handout added!';teacherForm.reset();await loadSubjects();}else{teacherMessage.textContent=result.error||'Failed.';}}catch(err){teacherMessage.textContent='Error.';console.error(err);}});
if(loadUserFromStorage()){userStatus.textContent=`${loggedInUser.email} • ${loggedInUser.level}`;loadSubjects();loadHistory();showPanel(subjectsPanel);}else{showPanel(loginPanel);}
    {
      id: 'pharm101',
      name: 'Pharmacology Fundamentals',
      handouts: [
        {
          id: 'h1',
          title: 'Drug Absorption and Distribution',
          summary: 'Read this handout to understand how drugs move in the body and why dosage matters.',
          content: 'Pharmacokinetics includes absorption, distribution, metabolism, and excretion. Absorption is movement from administration site to bloodstream. Distribution is the drug moving to tissues. Factors: bioavailability, protein binding, blood flow.',
          quiz: [
            { q: 'What is the term for how much drug reaches systemic circulation?', options: ['Bioavailability', 'Potency', 'Efficacy', 'Concentration'], answer: 0 },
            { q: 'Which organ primarily metabolizes drugs?', options: ['Kidney', 'Skin', 'Liver', 'Lungs'], answer: 2 },
            { q: 'True or False: Higher protein binding means less free drug available.', options: ['True', 'False'], answer: 0 }
          ]
        },
        {
          id: 'h2',
          title: 'Receptor Types and Drug Action',
          summary: 'Covers agonists, antagonists, and dose-response relationships.',
          content: 'Receptors are proteins where drugs bind. Agonists activate receptors. Antagonists block activation. Dose-response curves help identify potency and maximal effect.',
          quiz: [
            { q: 'An antagonist does what?', options: ['Activates receptor', 'Blocks receptor', 'Metabolizes drug', 'Increases absorption'], answer: 1 },
            { q: 'Potency is measured by what?', options: ['EC50', 'pH', 'Dose frequency', 'Half-life'], answer: 0 }
          ]
        }
      ]
    },
    {
      id: 'pharm102',
      name: 'Pharmacy Practice and Ethics',
      handouts: [
        {
          id: 'h3',
          title: 'Patient Counseling Basics',
          summary: 'How to communicate key medication information to patients and caregivers.',
          content: 'Counseling includes explaining dosage, route, adverse effects, adherence, and storage. Use simple language and verify understanding.',
          quiz: [
            { q: 'Which is essential in counseling?', options: ['Use technical terms', 'Explain side effects', 'Skip instructions', 'Rush patient'], answer: 1 },
            { q: 'True or False: Adherence improves with clear counseling.', options: ['True', 'False'], answer: 0 }
          ]
        }
      ]
    }
  ]
};

let loggedInUser = null;
let selectedSubject = null;
let selectedHandout = null;

function showPanel(panel) {
  loginPanel.classList.add('hidden');
  subjectsPanel.classList.add('hidden');
  handoutPanel.classList.add('hidden');
  panel.classList.remove('hidden');
}

function renderSubjects() {
  subjectsList.innerHTML = '';
  data.subjects.forEach((subject) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div><strong>${subject.name}</strong><br><small>${subject.handouts.length} handout(s)</small></div><button data-id="${subject.id}">Open</button>`;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => openSubject(subject.id));
    subjectsList.appendChild(card);
  });
}

function openSubject(subjectId) {
  selectedSubject = data.subjects.find((s) => s.id === subjectId);
  if (!selectedSubject) return;
  handoutTitle.textContent = selectedSubject.name;
  handoutSummary.textContent = 'Select a handout to read and attempt the quiz.';
  handoutContent.innerHTML = selectedSubject.handouts.map((h) => `<div class="card"><div><strong>${h.title}</strong><p style="margin:4px 0;">${h.summary}</p></div><button data-id="${h.id}">Read & Quiz</button></div>`).join('');
  queryHandoutButtons();
  showPanel(handoutPanel);
  quizResult.textContent = '';
}

function queryHandoutButtons() {
  const handoutButtons = handoutContent.querySelectorAll('button');
  handoutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const handout = selectedSubject.handouts.find((h) => h.id === id);
      if (handout) openHandout(handout);
    });
  });
}

function openHandout(handout) {
  selectedHandout = handout;
  handoutTitle.textContent = `${selectedSubject.name} - ${handout.title}`;
  handoutSummary.textContent = handout.summary;
  handoutContent.innerHTML = `<div>${handout.content}</div>`;
  quizSubtitle.textContent = handout.title;
  renderQuizForm();
}

function renderQuizForm() {
  quizForm.innerHTML = '';
  selectedHandout.quiz.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'quiz-item';
    const optionsHtml = item.options
      .map((opt, i) => `<label><input type="radio" name="q${idx}" value="${i}" /> ${opt}</label>`)
      .join('');
    div.innerHTML = `<label><strong>${idx + 1}. ${item.q}</strong></label>${optionsHtml}`;
    quizForm.appendChild(div);
  });
  quizResult.textContent = '';
}

function getSavedUser() {
  const raw = localStorage.getItem(userStorage);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function saveUser() {
  if (loggedInUser) localStorage.setItem(userStorage, JSON.stringify(loggedInUser));
}

function renderHistory() {
  const history = loggedInUser?.history || [];
  if (!scoreHistory) return;
  if (!history.length) {
    scoreHistory.innerHTML = '<div>No quiz attempts yet.</div>';
    return;
  }
  scoreHistory.innerHTML = history.slice(-5).reverse().map((item) => `<div>${new Date(item.date).toLocaleDateString()} - <strong>${item.subject}</strong> / ${item.handout}: ${item.score}/${item.total}</div>`).join('');
}

function calculateScore() {
  let correct = 0;
  selectedHandout.quiz.forEach((item, idx) => {
    const answer = quizForm.querySelector(`input[name='q${idx}']:checked`);
    if (answer && Number(answer.value) === item.answer) correct++;
  });
  return { correct, total: selectedHandout.quiz.length };
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) {
    loginMessage.textContent = 'Enter both email and password.';
    return;
  }
  const stored = getSavedUser();
  if (stored && stored.email === email) {
    loggedInUser = stored;
  } else {
    loggedInUser = { email, level: '200 level', role: 'Pharmacy student', history: [] };
  }
  userStatus.textContent = `Logged in as ${email} • ${loggedInUser.level}`;
  saveUser();
  renderSubjects();
  renderHistory();
  loginMessage.textContent = '';
  loginForm.reset();
  showPanel(subjectsPanel);
});

logoutBtn.addEventListener('click', () => {
  loggedInUser = null;
  selectedSubject = null;
  selectedHandout = null;
  loginMessage.textContent = '';
  userStatus.textContent = '';
  showPanel(loginPanel);
});

teacherPanelBtn?.addEventListener('click', () => {
  teacherMessage.textContent = '';
  showPanel(document.getElementById('teacher-panel'));
});

closeTeacherBtn?.addEventListener('click', () => {
  renderSubjects();
  showPanel(subjectsPanel);
});

teacherForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const subjectId = document.getElementById('teacher-subjectId').value.trim();
  const subjectName = document.getElementById('teacher-subjectName').value.trim();
  const handoutTitle = document.getElementById('teacher-handoutTitle').value.trim();
  const handoutSummary = document.getElementById('teacher-handoutSummary').value.trim();
  const handoutContentValue = document.getElementById('teacher-handoutContent').value.trim();
  if (!subjectId || !subjectName || !handoutTitle || !handoutSummary || !handoutContentValue) {
    teacherMessage.textContent = 'Complete all fields.';
    return;
  }
  let subject = data.subjects.find((s) => s.id === subjectId);
  if (!subject) {
    subject = { id: subjectId, name: subjectName, handouts: [] };
    data.subjects.push(subject);
  } else {
    subject.name = subjectName;
  }
  subject.handouts.push({
    id: `h${Date.now()}`,
    title: handoutTitle,
    summary: handoutSummary,
    content: handoutContentValue,
    quiz: [{ q: 'Sample question: what does this handout teach?', options: ['A', 'B', 'C', 'D'], answer: 0 }]
  });
  localStorage.setItem(storageName, JSON.stringify(data));
  teacherMessage.textContent = 'Handout added. You can open subject and use it now.';
  renderSubjects();
  teacherForm.reset();
});

submitQuiz.addEventListener('click', (e) => {
  e.preventDefault();
  if (!selectedHandout) return;
  const { correct, total } = calculateScore();
  quizResult.className = 'message success';
  quizResult.textContent = `You scored ${correct}/${total}. ${correct === total ? 'Excellent!' : 'Review the handout and try again.'}`;
  if (!loggedInUser.history) loggedInUser.history = [];
  loggedInUser.history.push({ date: Date.now(), subject: selectedSubject.name, handout: selectedHandout.title, score: correct, total });
  saveUser();
  renderHistory();
});

function loadDataFromStorage() {
  const raw = localStorage.getItem(storageName);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.subjects) {
      data.subjects = parsed.subjects;
    }
  } catch {}
}

loadDataFromStorage();
const initialUser = getSavedUser();
if (initialUser) {
  loggedInUser = initialUser;
  userStatus.textContent = `Logged in as ${loggedInUser.email} • ${loggedInUser.level}`;
  renderSubjects();
  renderHistory();
  showPanel(subjectsPanel);
} else {
  showPanel(loginPanel);
}

backToSubjects.addEventListener('click', () => {
  renderSubjects();
  showPanel(subjectsPanel);
});
