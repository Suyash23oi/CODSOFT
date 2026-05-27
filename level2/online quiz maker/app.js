const state = {
  currentUser: null,
  mode: 'login',
  quizzes: [],
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
};

const storage = {
  load(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

function init() {
  state.quizzes = storage.load('quizzes', []);
  state.currentUser = storage.load('sessionUser', null);
  renderAuthStatus();
  bindEvents();
}

function bindEvents() {
  document.getElementById('btn-login').addEventListener('click', () => showAuth('login'));
  document.getElementById('btn-register').addEventListener('click', () => showAuth('register'));
  document.getElementById('btn-list-quizzes').addEventListener('click', showQuizList);
  document.getElementById('btn-create-quiz').addEventListener('click', showQuizCreate);
  document.getElementById('btn-back-to-home').addEventListener('click', showHome);
  document.getElementById('btn-cancel-create').addEventListener('click', showHome);
  document.getElementById('btn-cancel-quiz').addEventListener('click', showQuizList);
  document.getElementById('btn-result-home').addEventListener('click', showHome);
  document.getElementById('btn-auth-cancel').addEventListener('click', showHome);
  document.getElementById('btn-add-question').addEventListener('click', createQuestionCard);
  document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
  document.getElementById('quiz-form').addEventListener('submit', handleQuizSubmit);
  document.getElementById('switch-to-register').addEventListener('click', () => showAuth('register'));
  document.getElementById('btn-prev-question').addEventListener('click', prevQuestion);
  document.getElementById('btn-next-question').addEventListener('click', nextQuestion);
  document.getElementById('btn-submit-quiz').addEventListener('click', submitQuiz);
  document.getElementById('btn-login').addEventListener('keydown', handleKeyAgainstDefault);
}

function handleKeyAgainstDefault(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

function renderAuthStatus() {
  const authStatus = document.getElementById('auth-status');
  if (state.currentUser) {
    authStatus.innerHTML = `
      <span>Signed in as <strong>${state.currentUser.username}</strong></span>
      <button id="btn-logout" class="secondary-btn">Logout</button>
    `;
    document.getElementById('btn-logout').addEventListener('click', logout);
  } else {
    authStatus.innerHTML = '<span>Not signed in yet</span>';
  }
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

function showHome() {
  renderAuthStatus();
  showView('home-view');
}

function showAuth(mode) {
  state.mode = mode;
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Login' : 'Register';
  document.getElementById('switch-to-register').textContent = mode === 'login' ? 'Register' : 'Login';
  document.getElementById('auth-switch-text').innerHTML = mode === 'login'
    ? `Don't have an account? <button id="switch-to-register" class="link-btn">Register</button>`
    : `Already have an account? <button id="switch-to-register" class="link-btn">Login</button>`;
  document.getElementById('auth-form').reset();
  showView('auth-view');
  document.getElementById('switch-to-register').addEventListener('click', () => showAuth(mode === 'login' ? 'register' : 'login'));
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  if (!username || !password) return;

  const users = storage.load('users', []);
  const existing = users.find((user) => user.username === username);

  if (state.mode === 'register') {
    if (existing) {
      alert('A user with that username already exists. Choose another name.');
      return;
    }
    users.push({ username, password });
    storage.save('users', users);
    state.currentUser = { username };
    storage.save('sessionUser', state.currentUser);
    alert('Registration successful! You are now logged in.');
    showHome();
  } else {
    if (!existing || existing.password !== password) {
      alert('Invalid username or password.');
      return;
    }
    state.currentUser = { username };
    storage.save('sessionUser', state.currentUser);
    alert('Login successful!');
    showHome();
  }
  renderAuthStatus();
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem('sessionUser');
  renderAuthStatus();
  showHome();
}

function showQuizList() {
  if (!state.currentUser) {
    alert('Please log in to browse quizzes.');
    showAuth('login');
    return;
  }

  renderQuizList();
  showView('quiz-list-view');
}

function renderQuizList() {
  const list = document.getElementById('quiz-list');
  const empty = document.getElementById('empty-list');
  list.innerHTML = '';
  if (state.quizzes.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  state.quizzes.forEach((quiz) => {
    const item = document.createElement('div');
    item.className = 'quiz-item';
    item.innerHTML = `
      <h3>${escapeHtml(quiz.title)}</h3>
      <p>${escapeHtml(quiz.description || 'No description provided.')}</p>
      <p class="small-text">Created by ${escapeHtml(quiz.author)} • ${quiz.questions.length} question(s)</p>
      <div class="button-row">
        <button class="primary-btn" data-id="${quiz.id}">Take Quiz</button>
      </div>
    `;
    item.querySelector('button').addEventListener('click', () => startQuiz(quiz.id));
    list.appendChild(item);
  });
}

function showQuizCreate() {
  if (!state.currentUser) {
    alert('Please log in to create a quiz.');
    showAuth('login');
    return;
  }

  document.getElementById('quiz-form').reset();
  document.getElementById('question-list').innerHTML = '';
  createQuestionCard();
  showView('quiz-create-view');
}

function createQuestionCard() {
  const questionList = document.getElementById('question-list');
  const index = questionList.children.length + 1;
  const questionCard = document.createElement('div');
  questionCard.className = 'question-card';
  questionCard.innerHTML = `
    <h3>Question ${index}</h3>
    <label>
      Question text
      <input type="text" class="question-text-input" placeholder="Enter question statement" required />
    </label>
    <div class="option-fields">
      ${Array.from({ length: 4 }, (_, optionIndex) => `
        <label class="option-field">
          <span>Option ${optionIndex + 1}</span>
          <input type="text" class="choice-input" placeholder="Enter answer option" required />
        </label>
      `).join('')}
    </div>
    <label>
      Correct answer
      <select class="correct-answer-select">
        ${Array.from({ length: 4 }, (_, optionIndex) => `<option value="${optionIndex}">Option ${optionIndex + 1}</option>`) }
      </select>
    </label>
    <button type="button" class="remove-question secondary-btn">Remove Question</button>
  `;

  questionCard.querySelector('.remove-question').addEventListener('click', () => {
    questionCard.remove();
    refreshQuestionNumbers();
  });
  questionList.appendChild(questionCard);
}

function refreshQuestionNumbers() {
  document.querySelectorAll('.question-card').forEach((card, index) => {
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = `Question ${index + 1}`;
  });
}

function handleQuizSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('quiz-title').value.trim();
  const description = document.getElementById('quiz-description').value.trim();
  const questionCards = Array.from(document.querySelectorAll('.question-card'));

  if (!title) {
    alert('Please enter a quiz title.');
    return;
  }
  if (questionCards.length === 0) {
    alert('Add at least one question.');
    return;
  }

  const questions = questionCards.map((card) => {
    const text = card.querySelector('.question-text-input').value.trim();
    const options = Array.from(card.querySelectorAll('.choice-input')).map((input) => input.value.trim());
    const answerIndex = Number(card.querySelector('.correct-answer-select').value);
    return { text, options, answerIndex };
  });

  if (questions.some((question) => !question.text || question.options.some((opt) => !opt))) {
    alert('All questions and options must be filled.');
    return;
  }

  const newQuiz = {
    id: `quiz-${Date.now()}`,
    title,
    description,
    author: state.currentUser.username,
    questions,
    createdAt: new Date().toISOString(),
  };

  state.quizzes.push(newQuiz);
  storage.save('quizzes', state.quizzes);
  alert('Quiz saved successfully.');
  showQuizList();
}

function startQuiz(quizId) {
  const quiz = state.quizzes.find((item) => item.id === quizId);
  if (!quiz) return;
  state.currentQuiz = quiz;
  state.currentQuestionIndex = 0;
  state.answers = Array(quiz.questions.length).fill(null);
  renderQuizQuestion();
  showView('quiz-take-view');
}

function renderQuizQuestion() {
  const container = document.getElementById('question-container');
  const quiz = state.currentQuiz;
  const index = state.currentQuestionIndex;
  const question = quiz.questions[index];
  container.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'question-card';
  card.innerHTML = `
    <h3 class="question-text">Question ${index + 1} of ${quiz.questions.length}</h3>
    <p>${escapeHtml(question.text)}</p>
    <div class="option-fields"></div>
  `;

  const optionsContainer = card.querySelector('.option-fields');
  question.options.forEach((option, optionIndex) => {
    const optionLabel = document.createElement('label');
    optionLabel.className = 'option-field';
    optionLabel.innerHTML = `
      <input type="radio" name="quiz-option" value="${optionIndex}" ${state.answers[index] === optionIndex ? 'checked' : ''} />
      <span>${escapeHtml(option)}</span>
    `;
    optionsContainer.appendChild(optionLabel);
  });

  container.appendChild(card);
  document.getElementById('take-title').textContent = quiz.title;
  document.getElementById('take-meta').textContent = `Created by ${quiz.author} • ${quiz.questions.length} questions`;
  updateTakeButtons();
  optionsContainer.querySelectorAll('input[name="quiz-option"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.answers[index] = Number(input.value);
    });
  });
}

function updateTakeButtons() {
  const prev = document.getElementById('btn-prev-question');
  const next = document.getElementById('btn-next-question');
  const submit = document.getElementById('btn-submit-quiz');
  prev.disabled = state.currentQuestionIndex === 0;
  next.disabled = state.currentQuestionIndex === state.currentQuiz.questions.length - 1;
  submit.disabled = state.answers.some((answer) => answer === null);
}

function prevQuestion() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex -= 1;
    renderQuizQuestion();
  }
}

function nextQuestion() {
  if (state.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuizQuestion();
  }
}

function submitQuiz() {
  if (state.answers.some((answer) => answer === null)) {
    alert('Please answer every question before submitting.');
    return;
  }

  const results = state.currentQuiz.questions.map((question, index) => {
    const selected = state.answers[index];
    const correct = question.answerIndex;
    return {
      text: question.text,
      options: question.options,
      selected,
      correct,
    };
  });

  const correctCount = results.filter((item) => item.selected === item.correct).length;
  const scoreMessage = `You scored ${correctCount} out of ${results.length}.`;

  renderResults(scoreMessage, results);
  showView('quiz-result-view');
}

function renderResults(summary, results) {
  const summaryEl = document.getElementById('result-summary');
  const reviewContainer = document.getElementById('answer-review');
  summaryEl.innerHTML = `<p>${escapeHtml(summary)}</p>`;
  reviewContainer.innerHTML = '';

  results.forEach((item, index) => {
    const review = document.createElement('div');
    review.className = 'review-item';
    review.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p>${escapeHtml(item.text)}</p>
      <ul>
        ${item.options
          .map((option, optionIndex) => {
            const correctLabel = optionIndex === item.correct ? ' (Correct)' : '';
            const selectedLabel = optionIndex === item.selected ? ' (Your answer)' : '';
            return `<li>${escapeHtml(option)}${correctLabel}${selectedLabel}</li>`;
          })
          .join('')}
      </ul>
      <span class="badge ${item.selected === item.correct ? 'correct' : 'wrong'}">
        ${item.selected === item.correct ? 'Correct' : 'Incorrect'}
      </span>
    `;
    reviewContainer.appendChild(review);
  });
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

init();
