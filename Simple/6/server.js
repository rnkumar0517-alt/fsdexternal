const http = require('http');
const os = require('os');
const path = require('path');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();
emitter.on('userVisit', () => console.log('A new user visited the site!'));

http.createServer((req, res) => {
  // emitter.emit('userVisit');

  const filePath = __filename;
  const html = `
    <h1>Welcome to Custom Node.js Server</h1>
    <h2>System Info:</h2>
    <p>Hostname: ${os.hostname()}</p>
    <p>Platform: ${os.platform()}</p>
    <p>Free Memory: ${os.freemem()} bytes</p>
    <h2>Path Info:</h2>
    <p>File: ${path.basename(filePath)}</p>
    <p>Directory: ${path.dirname(filePath)}</p>K)
    <p>Extension: ${path.extname(filePath)}</p>
    <h3>Request handled successfully!</h3>
  `;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
