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
  { code: 'pct', name: 'PCT 202', title: 'Pharmaceutics', icon: '📦' },
  { code: 'excl', name: 'EXCL 301', title: 'Principles of Common Law', icon: '⚖️' },
  { code: 'pfa', name: 'PFA 301', title: 'Public Financial Administration', icon: '💰' }
];

// QUIZ DATA - EXCEL TUTORS COMMON LAW & PUBLIC FINANCIAL ADMINISTRATION
const QUIZ_DATA = {
  pfa: [
    { q: 'Public financial administration operates mainly through:', options: ['Taxation', 'Budget', 'Banking', 'Trade'], answer: 1 },
    { q: 'The budgetary cycle includes all except:', options: ['Formulation', 'Enactment', 'Execution', 'Privatization'], answer: 3 },
    { q: 'Who described public financial administration as a critical facet of public administration?', options: ['L.D. White', 'Felix A. Nigro', 'Karl Marx', 'Adam Smith'], answer: 1 },
    { q: 'The term "budget" was first used in its present sense in:', options: ['1673', '1773', '1873', '1973'], answer: 1 },
    { q: 'The word "budget" is derived from:', options: ['Latin word', 'Greek word', 'Old English word', 'French word'], answer: 3 },
    { q: 'Budget originally referred to:', options: ['A document', 'A law', 'A leather bag', 'A tax system'], answer: 2 },
    { q: 'A budget is prepared for:', options: ['Calendar year', 'Fiscal year', 'Academic year', 'Political year'], answer: 1 },
    { q: 'Which is NOT a function of budgeting?', options: ['Accountability', 'Coordination', 'Tax evasion', 'Policy implementation'], answer: 2 },
    { q: 'Budget ensures accountability of executive to:', options: ['Judiciary', 'Legislature', 'Media', 'Citizens'], answer: 1 },
    { q: 'Budget acts as an instrument of:', options: ['Social and economic policy', 'Religion', 'Culture', 'Politics only'], answer: 0 },
    { q: 'Budget should be prepared on:', options: ['Weekly basis', 'Monthly basis', 'Annual basis', 'Daily basis'], answer: 2 },
    { q: 'A balanced budget means:', options: ['Revenue > Expenditure', 'Expenditure > Revenue', 'Revenue = Expenditure', 'No revenue'], answer: 2 },
    { q: 'Budget estimates should be:', options: ['Rough', 'Close and accurate', 'Random', 'Inflated'], answer: 1 },
    { q: 'Budget should be prepared on:', options: ['Credit basis', 'Cash basis', 'Loan basis', 'Profit basis'], answer: 1 },
    { q: '"One budget" principle implies:', options: ['Separate budgets', 'Unified budget', 'No budget', 'Departmental budgets only'], answer: 1 },
    { q: 'Rule of lapse means:', options: ['Funds are saved', 'Funds expire at end of year', 'Funds increase', 'Funds are borrowed'], answer: 1 },
    { q: 'Line-item budgeting is also called:', options: ['Modern budgeting', 'Traditional budgeting', 'Zero budgeting', 'Performance budgeting'], answer: 1 },
    { q: 'Line-item budgeting focuses on:', options: ['Objectives', 'Outcomes', 'Items of expenditure', 'Planning'], answer: 2 },
    { q: 'Performance budgeting originated in:', options: ['UK', 'India', 'USA', 'China'], answer: 2 },
    { q: 'Performance budgeting was introduced by:', options: ['Roosevelt', 'Truman', 'Nixon', 'Carter'], answer: 1 },
    { q: 'Zero-based budgeting (ZBB) was developed in:', options: ['1950', '1969', '1978', '1985'], answer: 1 },
    { q: 'ZBB requires:', options: ['Incremental budgeting', 'Starting from zero', 'Ignoring past budgets', 'Borrowing funds'], answer: 1 },
    { q: 'Sunset legislation focuses on:', options: ['Budget increase', 'Programme termination', 'Taxation', 'Borrowing'], answer: 1 },
    { q: 'Top-down budgeting was introduced during:', options: ['Nixon era', 'Reagan era', 'Carter era', 'Obama era'], answer: 1 },
    { q: 'First stage of budgetary cycle is:', options: ['Execution', 'Accounting', 'Formulation', 'Audit'], answer: 2 },
    { q: 'Formulation of budget means:', options: ['Approval', 'Implementation', 'Preparation of estimates', 'Audit'], answer: 2 },
    { q: 'The main agency responsible for budget formulation is:', options: ['Judiciary', 'Finance Ministry', 'Parliament', 'Media'], answer: 1 },
    { q: 'Administrative ministries provide:', options: ['Legal advice', 'Financial control', 'Detailed estimates', 'Audit'], answer: 2 },
    { q: 'Planning commission helps in:', options: ['Execution', 'Planning priorities', 'Audit', 'Taxation'], answer: 1 },
    { q: 'Final approval of budget is done by:', options: ['Judiciary', 'Cabinet', 'Media', 'Citizens'], answer: 1 },
    { q: 'Enactment of budget means:', options: ['Preparation', 'Approval', 'Execution', 'Audit'], answer: 1 },
    { q: 'Budget is presented to:', options: ['Judiciary', 'Parliament', 'Media', 'Public'], answer: 1 },
    { q: 'General discussion of budget lasts for:', options: ['1 day', '2 days', '3–4 days', '1 week'], answer: 2 },
    { q: 'Voting on demands results in:', options: ['Law', 'Grant', 'Tax', 'Policy'], answer: 1 },
    { q: 'Appropriation bill deals with:', options: ['Revenue', 'Expenditure', 'Audit', 'Loans'], answer: 1 },
    { q: 'Finance bill deals with:', options: ['Expenditure', 'Income/revenue', 'Audit', 'Loans'], answer: 1 },
    { q: 'Execution of budget means:', options: ['Planning', 'Implementation', 'Approval', 'Audit'], answer: 1 },
    { q: 'Execution is controlled mainly by:', options: ['Judiciary', 'Finance Ministry', 'Legislature', 'Media'], answer: 1 },
    { q: 'Collection of revenue includes:', options: ['Estimation', 'Assessment', 'Planning', 'Discussion'], answer: 1 },
    { q: 'Consolidated fund includes:', options: ['Only taxes', 'All revenues and loans', 'Only loans', 'Donations'], answer: 1 },
    { q: 'Public account includes:', options: ['Taxes only', 'Deposits and remittances', 'Loans only', 'Profits'], answer: 1 },
    { q: 'Contingency fund is used for:', options: ['Planned expenditure', 'Unforeseen expenditure', 'Salaries', 'Taxes'], answer: 1 },
    { q: 'Deficit financing means:', options: ['Revenue > Expenditure', 'Expenditure > Revenue', 'Equal budget', 'No spending'], answer: 1 },
    { q: 'Public debt refers to:', options: ['Taxation', 'Borrowing by government', 'Savings', 'Grants'], answer: 1 },
    { q: 'Redemption of public debt means:', options: ['Borrowing', 'Repayment', 'Investment', 'Taxation'], answer: 1 },
    { q: 'Accounting involves:', options: ['Planning', 'Recording transactions', 'Policy making', 'Taxation'], answer: 1 },
    { q: 'Audit ensures:', options: ['Profit', 'Accountability', 'Loss', 'Borrowing'], answer: 1 },
    { q: 'Audit conducted after expenditure is:', options: ['Pre-audit', 'Post-audit', 'Internal audit', 'External audit'], answer: 1 },
    { q: 'Regulatory audit focuses on:', options: ['Performance', 'Legal compliance', 'Efficiency', 'Policy'], answer: 1 },
    { q: 'Performance audit measures:', options: ['Laws', 'Efficiency and results', 'Taxes', 'Loans'], answer: 1 }
  ],
  excl: [
    { q: 'The abbreviation, F.O.B in law of contract is....?', options: ['Free of Billing', 'Freight of Bill', 'Free on Board', 'Free on Burden'], answer: 2 },
    { q: 'A situation in which goods are lost before they are placed on board, either of vessel or cargo plane, which party bears the risk?', options: ['The seller', 'The buyer', 'The Vessel or Airline Operators', 'The Insurance company'], answer: 0 },
    { q: 'A contractual term in which the seller of the goods must be responsible for, and pay the cost and freight necessary to bring the goods to the named destination is known as....?', options: ['F.O.B Contract', 'C.I.F Contract', 'Credit Sale Agreement', 'Credit on Delivery Contract'], answer: 1 },
    { q: 'Adeboye Matthew went to Slot Systems to buy a phone and decided to forge a contractual agreement with a finance company. Which type of contractual agreement is this?', options: ['Conditioner Credit Sale Agreement', 'Lien', 'Easy Buy Contract', 'Credit Sale Agreement'], answer: 3 },
    { q: 'A fundamental concept of contract law which requires that only the parties to a contract can enforce its terms is aptly known as....?', options: ['Privity of Contract', 'Prima Facie', 'Voidable Contract', 'C.I.F Contract'], answer: 0 },
    { q: 'Which type of Misrepresentation made with no reasonable grounds for believing it to be true as where an honest mistake is made?', options: ['Negligent Misrepresentation', 'False or Fraudulent Misrepresentation', 'Mistake or Innocence', 'None of the Above'], answer: 0 },
    { q: 'What is the full meaning of the abbreviation C.I.F in Law of Contract?', options: ['Cost Invoice File', 'Court, Insurance, Freight', 'Court and Insurance Front Desk', 'Cost, Insurance, Freight'], answer: 3 },
    { q: 'Under the Law of Contract, the right to hold the property of another person as collateral or security for the performance of an obligation is known as...?', options: ['Lien', 'Ratification', 'Quasi Contract', 'Credit Sale Agreement'], answer: 0 },
    { q: 'A sales agreement wherein Toyota Motors Limited allows Fadipe Funmilayo to take delivery of a Truck on credit while ownership belongs to the seller until full price is paid is best described as...?', options: ['Conditioner Credit Sale Agreement', 'Credit Sale Agreement', 'Higher Purchase Sale Agreement', 'Mutual Sale Agreement'], answer: 0 },
    { q: 'Which type of Lien has to do with right to retain possession of goods or property until a debt is paid?', options: ['Common Law Lien', 'Maritime Lien', 'Vendor\'s Lien', 'Possessory Lien'], answer: 3 },
    { q: 'General Lien can be defined as...?', options: ['A right to retain possession of specific good or property until a debt is paid, usually arising from a contract', 'A right to retain possession of a client\'s document or property until the agreed fees are paid', 'A right to secure a debt or claim related to a ship or vessel', 'None of the Above'], answer: 1 },
    { q: 'The Common Law Principle which emphasize the employer being liable for the negligent action committed by an employee in the course of duty is known as...?', options: ['Per Incuriam', 'Ratio Decidendi', 'Vicarious Liability', 'Orbiter Dicta'], answer: 2 },
    { q: 'Another name for General Lien is...?', options: ['Solicitor\'s Lien', 'Arbitration Lien', 'Prosecutor\'s Lien', 'Counsel\'s Lien'], answer: 0 },
    { q: 'Which party bears the risk of loss of goods already placed on board or shipment, and which the buyer has already been notified about the shipment?', options: ['The buyer', 'The seller', 'The Vessel or Airline Operators', 'A and C'], answer: 0 },
    { q: 'A legal principle that is referred to as, "mere remarks or observations made by a judge that are not essential to the final decision of a case" is best known as...?', options: ['Orbiter Dicta', 'Ratio Decidendi', 'Per Incuriam', 'Volenti non fit Injuria'], answer: 0 },
    { q: 'Which of the following principles of law refers to the underlying reason a court relies on to decide a case that is a binding decision which lower courts must follow?', options: ['Volenti non fit Injuria', 'Ratio Decidendi', 'Per Incuriam', 'Orbiter Dicta'], answer: 1 },
    { q: '......... is a person who takes a negotiable instrument for value, in good faith, and without notice of any defects?', options: ['Negotiator', 'Arbitrator', 'Holder in Due Course', 'Holder of Negotiable Instrument'], answer: 2 },
    { q: 'In the Ogun State Civil Service, the officer who helps government Agencies to defend their cases in the Court of Law is known as...?', options: ['Lawyer', 'State Counsel', 'Prosecutor', 'Arbitrator'], answer: 1 },
    { q: 'Under the Law of Contract, which of the following is a requirement for a valid contract?', options: ['Offer', 'Acceptance', 'Consideration', 'All of the Above'], answer: 3 },
    { q: 'Which of the following is an example of Negotiable Instrument?', options: ['Cheque', 'Vessel', 'Cargo', 'None of the Above'], answer: 0 },
    { q: 'The legal principle which emphasize that a person who voluntarily consents to a particular action cannot later claim damages resulting from that action is known as.....?', options: ['Orbiter Dictum', 'Ceteri paribus', 'Volenti non fit Injuria', 'Per Incuriam'], answer: 2 },
    { q: 'Which of the following best represents the legal doctrine used to interpret ambiguity in Court decisions?', options: ['Ratio decidendi', 'Noscitur a sociis', 'Stare decisis', 'Volenti non fit Injuria'], answer: 1 },
    { q: 'A preliminary communication that calls on others to make an offer to form a contract is referred to as.......?', options: ['Request for Contract', 'Call for Offer', 'Invitation to Contract', 'Invitation to Treat'], answer: 3 },
    { q: 'Which of the following is an example of Vitiating Elements?', options: ['Advertisement', 'Price Lists', 'Misrepresentation', 'Tenders'], answer: 2 },
    { q: 'The doctrine that renders the discharge of a contract void or impossible of performance due to unforeseen event is known as........?', options: ['Misrepresentation', 'Frustration', 'Mistake', 'Bill of Exchange'], answer: 1 },
    { q: 'Which of the following best describes the concept of Remedies for Breach of Contract?', options: ['Has to do with the means by which violation of right is prevented, redressed or compensated', 'Has to do with how contracting parties are brought together to negotiate', 'Has to do with how a party opts out of the contract', 'Has to do with psychological check up for breaching party'], answer: 0 },
    { q: 'Which of the following principles has to do with a flawed Court decision that lacks awareness of relevant laws or precedent?', options: ['Per Incuriam', 'Orbiter Dictum', 'Vicarious Liability', 'Res ipsa Loquitur'], answer: 0 },
    { q: 'The legal principle that emphasizes: "Let the decision Stand"; which obligates Courts to follow previous rulings is known as........?', options: ['Ratio decidendi', 'Ultra vires', 'Stare decisis', 'Per Incuriam'], answer: 2 },
    { q: 'The concept which emphasize that only the parties directly involved in a contract can enforce its terms is otherwise known as.......?', options: ['Invitation to Treat', 'Privity of Contract', 'Probity of Contract', 'Probability of Contract'], answer: 1 },
    { q: 'Which of the following is a Principle of the Nigerian legal system?', options: ['Separation of powers', 'Rule of Law', 'Independence of the Judiciary', 'All of the above'], answer: 3 },
    { q: 'What is the purpose of the term "Consideration" in contract?', options: ['To provide detriment to the contracting parties', 'To make the contract legally binding', 'To allow the contracting parties to sue when necessary', 'To provide benefits to the contracting parties'], answer: 1 },
    { q: 'What is the purpose of the Holder in Due Course doctrine?', options: ['To protect the rights of the holder of a negotiable instrument', 'To protect the maker of a negotiable instrument', 'To protect the rights of the payee of a negotiable instrument', 'To protect the rights of the drawer of a negotiable instrument'], answer: 0 },
    { q: 'The process of formally confirming or approving an agreement thereby making it legally binding is.........?', options: ['Contract', 'Negotiable Instrument', 'Privity of Contract', 'Ratification'], answer: 3 },
    { q: 'What do you understand by the term Ultra vires?', options: ['It means actions that is beyond one\'s authority or power', 'It means actions within the confines of one\'s authority', 'It means period of recess during legal proceedings', 'None of the Above'], answer: 0 },
    { q: 'What do you understand by the concept of Res ipsa Loquitur?', options: ['It is a doctrine that assert that Courts decisions must always be binding', 'It is a doctrine that allows a Court to infer negligence from a mere occurrence of accident', 'It is a doctrine used to assume that all other factors remain constant', 'It is a doctrine allows contracting parties to seek alternative dispute resolution'], answer: 1 },
    { q: 'Which of the following best explains Negotiable Instruments?', options: ['It is a document that can be transferred and is payable to the bearer or a specified person', 'It is a document that contains the terms and conditions of a negotiated contract', 'It is a document that binds contracting parties to a contract', 'It is a legally signed document that allows a party to breach contract whenever foul play is suspected'], answer: 0 },
    { q: 'Which of the following are the key elements of Ratification?', options: ['Offer and capacity', 'Promises and services', 'Intent and voluntary acceptance', 'Invitation and mistake'], answer: 2 },
    { q: 'A scenario where a seller claims a product has a certain feature, genuinely believing it to be true but it is actually false is an example of.......?', options: ['Mistaken Presentation', 'False Pretenses', 'Negligent Misrepresentation', 'Innocent Misrepresentation'], answer: 3 },
    { q: 'What is the function of the Attorney-General of the Federation in Nigeria?', options: ['To advise the President on legal matters', 'To prosecute criminal cases', 'To defend the Federal Government in Court', 'All of the Above'], answer: 3 },
    { q: 'What is Libel?', options: ['It is a written or published false statement that damages someone\'s reputation', 'It is a spoken false statement that damages someone\'s reputation', 'It is a statement that incites people to rebel against constituted authority', 'It means to sworn to an oath falsely in court'], answer: 0 },
    { q: 'Which of the following is an element of the crime of burglary?', options: ['Intent to commit a crime', 'Breaking and entering', 'Theft', 'All of the Above'], answer: 3 },
    { q: 'What is the difference between a Contract and a Tort?', options: ['A Contract is a civil wrong while a Tort is a legally binding agreement', 'A contract is a legally binding agreement while a Tort is a civil wrong', 'A contract is civil wrong between contracting parties while a Tort is crime', 'None of the Above'], answer: 1 },
    { q: 'A spoken false statement that damages someone\'s reputation is best known as........?', options: ['Slander', 'Libel', 'Sedition', 'Perjury'], answer: 0 },
    { q: 'What is the purpose of the Parol Evidence Rule?', options: ['To determine the validity of contract', 'To allow introduction of external evidence to Contract disputes', 'To prevent introduction of external evidence to Contract disputes', 'To determine the enforceability of a contract'], answer: 2 },
    { q: 'In terms of criminal liability, what is the meaning of "Actus Reus"?', options: ['Lack of intent to commit a crime', 'Guilty act', 'Intention to commit a crime', 'Guilty mind'], answer: 1 },
    { q: 'In terms of criminal liability, what is the meaning of "Mens Rea"?', options: ['Innocent Mind', 'Guilty Act', 'Guilty mind', 'Lack of Intent to commit a crime'], answer: 2 },
    { q: 'Which of the following is a defense to a breach of contract?', options: ['Duress', 'Undue influence', 'Misrepresentation', 'All of the Above'], answer: 3 },
    { q: 'A body of rules and regulations guiding the conduct of people in a society is known as.....?', options: ['Law', 'Justice', 'Decree', 'Judicial Precedent'], answer: 0 },
    { q: 'The arm of government saddled with the responsibility of making Laws is best known as.......?', options: ['Judiciary', 'Executive', 'Court', 'Legislature'], answer: 3 },
    { q: 'What is the principle which ensures that rules are fairly and equitably administered in a society?', options: ['Privity of Law', 'Habea Corpus', 'Justice', 'Rule of Law'], answer: 2 }
  ]
};

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
  
  // ALSO save to admin central results repository
  const adminResults = JSON.parse(localStorage.getItem('pharmalearn_results') || '[]');
  const percentage = Math.round((score / total) * 100);
  adminResults.unshift({
    studentName: loggedInUser.name,
    matric: loggedInUser.matric,
    subject: subject.name,
    score: percentage,
    correct: score,
    total: total,
    submittedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  });
  localStorage.setItem('pharmalearn_results', JSON.stringify(adminResults));
  
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
    sPending.textContent = Math.max(0, 8-completedSubjects);
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
  
  // Check if we have actual quiz data for this subject
  let sampleHandouts = [];
  
  if(subjectCode === 'excl'){
    // EXCEL TUTORS - Principles of Common Law: Single 50-question handout
    sampleHandouts = [{
      id: 'excl_h1',
      title: 'EXCEL TUTORS - Principles of Common Law Mock Exams',
      summary: 'Complete mock exam with 50 objective questions and answers',
      content: 'Mock Exam - This is not a real Exam; these questions are a product of intellectual effort to prepare Excel Tutors candidates for the Exams challenges. You will EXCEL in Jesus name!',
      questions: 50,
      quizData: QUIZ_DATA.excl
    }];
  }else if(subjectCode === 'pfa'){
    // Public Financial Administration: Single 50-question handout
    sampleHandouts = [{
      id: 'pfa_h1',
      title: 'Public Financial Administration - Mock Exams',
      summary: 'Complete mock exam with 50 objective questions covering budgeting, audit, and public funds',
      content: 'Mock Exam - Practice questions on Public Financial Administration fundamentals and advanced concepts.',
      questions: 50,
      quizData: QUIZ_DATA.pfa
    }];
  }else{
    // Default sample handouts for other subjects
    sampleHandouts = [
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
  }
  
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

// Global variable to store current quiz questions
let currentQuizQuestions = [];

function renderQuizQuestion(){
  if(!currentHandout) return;
  
  // If no questions loaded, load them
  if(currentQuizQuestions.length === 0){
    if(currentSubject.code === 'excl' && QUIZ_DATA.excl){
      currentQuizQuestions = QUIZ_DATA.excl;
    }else if(currentSubject.code === 'pfa' && QUIZ_DATA.pfa){
      currentQuizQuestions = QUIZ_DATA.pfa;
    }else{
      // Generate sample questions
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
      currentQuizQuestions = sampleQuestions;
    }
  }
  
  const question = currentQuizQuestions[currentQuizIndex];
  if(!question) return;
  
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
  
  // Calculate actual score based on answers and quiz questions
  let correct = 0;
  for(let i=0;i<currentHandout.questions;i++){
    if(currentQuizQuestions[i] && currentQuizAnswers[i] !== undefined){
      if(currentQuizAnswers[i] === currentQuizQuestions[i].answer){
        correct++;
      }
    }
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
