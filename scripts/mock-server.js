/**
 * AGY Virtual Agency - Mock Server Engine
 * Standard Node.js implementation (zero external dependencies)
 * Simulates: Google OAuth, Zalo Webhook, Payment Gateway, Nodemailer (SMTP HTTP Mock)
 */

const http = require('http');
const url = require('url');

const PORT = process.env.MOCK_SERVER_PORT || 4000;

// In-memory mock databases
const mockEmails = [];
const mockWebhooks = [];
const mockPayments = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Helper for JSON responses
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    res.end(JSON.stringify(data));
  };

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    return res.end();
  }

  // Helper to parse JSON body
  const getBody = () => {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (e) {
          resolve({});
        }
      });
    });
  };

  // Router
  (async () => {
    // 1. Healthcheck Probe
    if (path === '/health' || path === '/api/health') {
      return sendJSON(200, {
        status: 'UP',
        service: 'AGY Mock Engine',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    }

    // 2. Google OAuth Mock
    if (path === '/api/mock/google/oauth' && method === 'POST') {
      const body = await getBody();
      return sendJSON(200, {
        access_token: 'mock_google_access_token_' + Date.now(),
        token_type: 'Bearer',
        expires_in: 3600,
        id_token: 'mock_google_id_token',
        user: {
          id: 'google_user_12345',
          email: body.email || 'user@example.com',
          name: 'AGY Test User',
          picture: 'https://via.placeholder.com/150'
        }
      });
    }

    if (path === '/api/mock/google/userinfo' && method === 'GET') {
      return sendJSON(200, {
        sub: 'google_user_12345',
        name: 'AGY Test User',
        given_name: 'AGY',
        family_name: 'Test',
        email: 'user@example.com',
        email_verified: true
      });
    }

    // 3. Zalo Webhook Mock
    if (path === '/api/mock/zalo/webhook' && (method === 'POST' || method === 'GET')) {
      const payload = method === 'POST' ? await getBody() : parsedUrl.query;
      const eventRecord = {
        id: 'zalo_evt_' + Date.now(),
        timestamp: new Date().toISOString(),
        payload
      };
      mockWebhooks.push(eventRecord);
      return sendJSON(200, {
        error: 0,
        message: 'Zalo Webhook Received Successfully',
        data: eventRecord
      });
    }

    // 4. Payment Gateway Mock (e.g. VNPay / Momo / Stripe mock)
    if (path === '/api/mock/payment/checkout' && method === 'POST') {
      const body = await getBody();
      const transactionId = 'TXN_' + Math.floor(100000 + Math.random() * 900000);
      const paymentRecord = {
        transactionId,
        amount: body.amount || 100000,
        currency: body.currency || 'VND',
        orderId: body.orderId || 'ORDER_' + Date.now(),
        status: 'SUCCESS',
        createdAt: new Date().toISOString()
      };
      mockPayments.push(paymentRecord);
      return sendJSON(200, {
        status: 'SUCCESS',
        code: '00',
        message: 'Payment processed successfully (Mock)',
        payment: paymentRecord
      });
    }

    if (path === '/api/mock/payment/verify' && method === 'GET') {
      const txnId = parsedUrl.query.txnId;
      const payment = mockPayments.find(p => p.transactionId === txnId);
      if (payment) {
        return sendJSON(200, { status: 'VERIFIED', payment });
      }
      return sendJSON(404, { status: 'FAILED', message: 'Transaction not found' });
    }

    // 5. Nodemailer / SMTP HTTP Mock
    if (path === '/api/mock/nodemailer/send' && method === 'POST') {
      const body = await getBody();
      const mailRecord = {
        messageId: 'mock_mail_' + Date.now() + '@agy.local',
        to: body.to || 'recipient@example.com',
        subject: body.subject || 'No Subject',
        body: body.text || body.html || '',
        sentAt: new Date().toISOString()
      };
      mockEmails.push(mailRecord);
      return sendJSON(200, {
        accepted: [mailRecord.to],
        rejected: [],
        messageId: mailRecord.messageId,
        status: 'QUEUED_AND_SENT_MOCK'
      });
    }

    // 6. Inspect logs / stored mock data
    if (path === '/api/mock/inspect' && method === 'GET') {
      return sendJSON(200, {
        emailsSentCount: mockEmails.length,
        emails: mockEmails,
        webhooksReceivedCount: mockWebhooks.length,
        webhooks: mockWebhooks,
        paymentsCount: mockPayments.length,
        payments: mockPayments
      });
    }

    // Not found
    return sendJSON(404, { error: 'Mock endpoint not found', path });
  })();
});

server.listen(PORT, () => {
  console.log(`[AGY Mock Server] Running on http://localhost:${PORT}`);
  console.log(`- Health Check: GET http://localhost:${PORT}/health`);
  console.log(`- Google OAuth: POST http://localhost:${PORT}/api/mock/google/oauth`);
  console.log(`- Zalo Webhook: POST http://localhost:${PORT}/api/mock/zalo/webhook`);
  console.log(`- Payment Gate: POST http://localhost:${PORT}/api/mock/payment/checkout`);
  console.log(`- Nodemailer  : POST http://localhost:${PORT}/api/mock/nodemailer/send`);
});
