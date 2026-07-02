const DEMO_USER = 'demo@aipass.test';
const DEMO_PASS = 'Pass123!';
const TOKEN = 'demo-token';

const apps = [
  { id: 'invoice-ai', name: 'Invoice AI', category: 'Finance', rating: 4.9, installs: '12k', description: 'Extracts invoice data, validates fields and flags anomalies.' },
  { id: 'support-ai', name: 'Customer Support AI', category: 'Support', rating: 4.8, installs: '8.4k', description: 'Responds to customer questions using a curated knowledge base.' },
  { id: 'hr-ai', name: 'HR AI', category: 'HR', rating: 4.7, installs: '6.1k', description: 'Screens candidates and summarizes internal HR requests.' },
  { id: 'risk-guard', name: 'Compliance Guard', category: 'Compliance', rating: 4.9, installs: '5.8k', description: 'Checks workflows against regulatory and internal policy rules.' },
  { id: 'market-scout', name: 'Market Scout', category: 'Analytics', rating: 4.6, installs: '4.2k', description: 'Summarizes market signals and competitors.' },
  { id: 'agent-kit', name: 'Agent Toolkit', category: 'Developers', rating: 4.5, installs: '3.7k', description: 'Build, monitor and test autonomous AI agents.' },
];

const authScreen = document.querySelector('#login-screen');
const appShell = document.querySelector('#app-shell');
const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');
const content = document.querySelector('#content');
const pageTitle = document.querySelector('#page-title');
const pageSubtitle = document.querySelector('#page-subtitle');
const navButtons = document.querySelectorAll('.nav');

function setLoggedIn(isLoggedIn) {
  authScreen.classList.toggle('hidden', isLoggedIn);
  appShell.classList.toggle('hidden', !isLoggedIn);
  document.querySelector('.sidebar').style.display = isLoggedIn ? 'flex' : 'none';
  if (isLoggedIn) localStorage.setItem('token', TOKEN);
  else localStorage.removeItem('token');
}

function setRoute(route) {
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
  if (route === 'dashboard') renderDashboard();
  if (route === 'marketplace') renderMarketplace();
  if (route === 'ai-apps') renderAIApps();
  if (route === 'tasks') renderTasks();
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  loginError.textContent = '';

  if (!email || !password) {
    loginError.textContent = 'Please enter email and password.';
    return;
  }

  if (email !== DEMO_USER || password !== DEMO_PASS) {
    loginError.textContent = 'Invalid credentials.';
    return;
  }

  setLoggedIn(true);
  setRoute('dashboard');
});

document.querySelector('#logout').addEventListener('click', () => setLoggedIn(false));
navButtons.forEach(btn => btn.addEventListener('click', () => setRoute(btn.dataset.route)));

function renderDashboard() {
  pageTitle.textContent = 'Dashboard';
  pageSubtitle.textContent = 'Workspace overview and quick actions';
  content.innerHTML = `
    <div class="grid" data-testid="dashboard-widgets">
      <div class="card" data-testid="dashboard-widget"><span class="badge">Models</span><h3>12+</h3><p>Frontier models available.</p></div>
      <div class="card" data-testid="dashboard-widget"><span class="badge">Apps</span><h3>50+</h3><p>Enterprise AI apps ready to deploy.</p></div>
      <div class="card" data-testid="dashboard-widget"><span class="badge">Trust</span><h3>SOC 2 Ready</h3><p>Governance controls and monitoring.</p></div>
    </div>`;
}

function renderMarketplace(list = apps) {
  pageTitle.textContent = 'Marketplace';
  pageSubtitle.textContent = 'Certified AI tools from the AI Store';
  content.innerHTML = `
    <div class="toolbar">
      <input data-testid="marketplace-search" placeholder="Search apps..." />
      <select data-testid="marketplace-filter">
        <option value="all">All categories</option>
        <option value="Finance">Finance</option>
        <option value="Support">Support</option>
        <option value="HR">HR</option>
        <option value="Compliance">Compliance</option>
        <option value="Analytics">Analytics</option>
        <option value="Developers">Developers</option>
      </select>
      <span data-testid="marketplace-count">${apps.length} apps</span>
    </div>
    <div class="app-list" data-testid="marketplace-list">
      ${list.map(app => appCard(app)).join('')}
    </div>
    <div id="marketplace-details" class="details hidden" data-testid="marketplace-details"></div>`;

  document.querySelector('[data-testid="marketplace-search"]').addEventListener('input', applyMarketplaceFilters);
  document.querySelector('[data-testid="marketplace-filter"]').addEventListener('change', applyMarketplaceFilters);
  document.querySelectorAll('.app-card').forEach(card => card.addEventListener('click', () => showAppDetails(card.dataset.id)));
}

function appCard(app) {
  return `<div class="app-card" data-testid="marketplace-card" data-id="${app.id}">
    <h3>${app.name}</h3><p>${app.description}</p><span class="badge">${app.category}</span>
    <p>★ ${app.rating} · ${app.installs} installs</p>
  </div>`;
}

function applyMarketplaceFilters() {
  const term = document.querySelector('[data-testid="marketplace-search"]').value.toLowerCase();
  const category = document.querySelector('[data-testid="marketplace-filter"]').value;
  const filtered = apps.filter(app =>
    (category === 'all' || app.category === category) &&
    (app.name.toLowerCase().includes(term) || app.description.toLowerCase().includes(term))
  );
  document.querySelector('[data-testid="marketplace-list"]').innerHTML = filtered.map(app => appCard(app)).join('');
  // Known defect for bug report: the count intentionally remains static and is not updated after filtering.
  document.querySelectorAll('.app-card').forEach(card => card.addEventListener('click', () => showAppDetails(card.dataset.id)));
}

function showAppDetails(id) {
  const app = apps.find(item => item.id === id);
  const details = document.querySelector('#marketplace-details');
  details.classList.remove('hidden');
  details.innerHTML = `<h3>${app.name}</h3><p>${app.description}</p><p>Category: ${app.category}</p><button data-testid="install-button">Install</button>`;
}

function renderAIApps() {
  pageTitle.textContent = 'AI Apps';
  pageSubtitle.textContent = 'Vertical AI apps ready to deploy';
  content.innerHTML = `
    <div class="app-list" data-testid="ai-apps-list">
      ${apps.slice(0, 4).map(app => `<div class="app-card" data-testid="ai-app-card" data-name="${app.name}"><h3>${app.name}</h3><p>${app.description}</p><button data-testid="open-ai-app">Open app</button></div>`).join('')}
    </div>
    <div id="ai-app-detail" class="details hidden" data-testid="ai-app-detail"></div>`;
  document.querySelectorAll('[data-testid="open-ai-app"]').forEach((button, index) => {
    button.addEventListener('click', () => {
      const app = apps[index];
      const detail = document.querySelector('#ai-app-detail');
      detail.classList.remove('hidden');
      detail.innerHTML = `<h3>${app.name}</h3><p>Data rendered for ${app.category} workflow.</p><button data-testid="return-to-apps">Back</button>`;
      document.querySelector('[data-testid="return-to-apps"]').addEventListener('click', renderAIApps);
    });
  });
}

function renderTasks() {
  pageTitle.textContent = 'Simple Task';
  pageSubtitle.textContent = 'Create a small AI work item';
  content.innerHTML = `
    <div class="card">
      <form id="task-form" data-testid="task-form">
        <label>Task title<input data-testid="task-title" placeholder="Summarize invoice queue" /></label>
        <label>Description<textarea data-testid="task-description" placeholder="Describe what the AI agent should do"></textarea></label>
        <button data-testid="task-submit" type="submit">Create task</button>
      </form>
      <p id="task-message" data-testid="task-message"></p>
    </div>`;
  document.querySelector('#task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.querySelector('[data-testid="task-title"]').value;
    const description = document.querySelector('[data-testid="task-description"]').value;
    const msg = document.querySelector('#task-message');
    if (!title) {
      msg.textContent = 'Task title is required.';
      msg.className = 'error';
      return;
    }
    msg.textContent = `Task created: ${title}`;
    msg.className = 'success';
  });
}

// Initial state
setLoggedIn(Boolean(localStorage.getItem('token')));
if (localStorage.getItem('token')) setRoute('dashboard');
