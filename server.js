const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const APP_DIR = path.join(__dirname, 'app');
const TOKEN = 'demo-token';

const apps = [
  { id: 'invoice-ai', name: 'Invoice AI', category: 'Finance', rating: 4.9, installs: '12k' },
  { id: 'support-ai', name: 'Customer Support AI', category: 'Support', rating: 4.8, installs: '8.4k' },
  { id: 'hr-ai', name: 'HR AI', category: 'HR', rating: 4.7, installs: '6.1k' },
  { id: 'risk-guard', name: 'Compliance Guard', category: 'Compliance', rating: 4.9, installs: '5.8k' },
  { id: 'market-scout', name: 'Market Scout', category: 'Analytics', rating: 4.6, installs: '4.2k' },
  { id: 'agent-kit', name: 'Agent Toolkit', category: 'Developers', rating: 4.5, installs: '3.7k' }
];

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise(resolve => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (err) { resolve({}); }
    });
  });
}

function isAuthorized(req) {
  return req.headers.authorization === `Bearer ${TOKEN}`;
}

function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safePath = path.normalize(urlPath).replace(/^\.\.(\/|\\|$)/, '');
  const filePath = path.join(APP_DIR, safePath);
  if (!filePath.startsWith(APP_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : ext === '.js' ? 'text/javascript' : 'text/plain';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/login') && req.method === 'POST') {
    const body = await parseBody(req);
    if (body.email === 'demo@aipass.test' && body.password === 'Pass123!') {
      return sendJson(res, 200, { token: TOKEN, user: { email: body.email } });
    }
    return sendJson(res, 401, { error: 'Invalid credentials' });
  }

  if (req.url.startsWith('/api/apps') && req.method === 'GET') {
    return sendJson(res, 200, apps);
  }

  if (req.url.startsWith('/api/dashboard') && req.method === 'GET') {
    if (!isAuthorized(req)) return sendJson(res, 401, { error: 'Missing or invalid token' });
    return sendJson(res, 200, { widgets: [
      { name: 'Models', value: '12+' },
      { name: 'Apps', value: '50+' },
      { name: 'Trust', value: 'SOC 2 Ready' }
    ]});
  }

  if (req.url.startsWith('/api/tasks') && req.method === 'POST') {
    if (!isAuthorized(req)) return sendJson(res, 401, { error: 'Missing or invalid token' });
    const body = await parseBody(req);
    if (!body.title || typeof body.title !== 'string') return sendJson(res, 400, { error: 'Title is required' });
    return sendJson(res, 201, { id: Date.now(), title: body.title, status: 'created' });
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`AI-Pass demo running at http://localhost:${PORT}`);
});
