/**
 * UNIVERSAL COMMUNITY AI SKILL SERVER & CARD MANAGER API
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const CardManager = require('../scripts/card-manager');
const cardManager = new CardManager();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '../public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
  };

  // API Health & Skills
  if (pathname === '/health' || pathname === '/api/health') {
    return sendJSON(200, {
      status: 'UP',
      app: 'Universal Community Auto-Idea Skill Engine',
      timestamp: new Date().toISOString()
    });
  }

  // API Cards Persistence (Lưu trữ Thẻ Task Idea)
  if (pathname === '/api/cards' && method === 'GET') {
    return sendJSON(200, {
      status: 'SUCCESS',
      totalCards: cardManager.getCards().length,
      cards: cardManager.getCards()
    });
  }

  if (pathname === '/api/cards' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.prompt) {
          return sendJSON(400, { error: 'Prompt is required' });
        }
        const card = cardManager.createCardFromPrompt(payload.prompt, payload.category || 'User Idea');
        return sendJSON(201, { status: 'SUCCESS', card });
      } catch (e) {
        return sendJSON(400, { error: 'Invalid JSON payload' });
      }
    });
    return;
  }

  // Static File Serving
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    return sendJSON(403, { error: 'Forbidden' });
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return sendJSON(404, { error: 'Resource Not Found', path: pathname });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[Universal Community Skill Server] Running at http://localhost:${PORT}`);
  console.log(`- Web App UI  : http://localhost:${PORT}`);
  console.log(`- Cards API   : http://localhost:${PORT}/api/cards`);
});
