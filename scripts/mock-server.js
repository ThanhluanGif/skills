/**
 * QA MOCK SERVER ENGINE FOR 3RD-PARTY APIS (VietQR, Telegram, Auth OAuth)
 */

const http = require('http');

const MOCK_PORT = process.env.MOCK_PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if (req.url.includes('/payment/vietqr')) {
    return res.end(JSON.stringify({ status: 'SUCCESS', qrCode: 'data:image/png;base64,mock...', bank: 'VietQR Mock' }));
  }
  
  if (req.url.includes('/telegram/webhook')) {
    return res.end(JSON.stringify({ status: 'OK', message: 'Mock notification sent' }));
  }

  res.end(JSON.stringify({ status: 'OK', mock: true }));
});

if (require.main === module) {
  server.listen(MOCK_PORT, () => {
    console.log(`[QA Mock Server] Running at http://localhost:${MOCK_PORT}`);
  });
}

module.exports = server;
