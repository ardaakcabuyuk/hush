import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import chokidar from 'chokidar';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(join(__dirname, 'public')));

const PATTERN_FILE = join(__dirname, 'pattern.mjs');

async function broadcastPattern() {
  try {
    const code = await readFile(PATTERN_FILE, 'utf-8');
    const msg = JSON.stringify({ type: 'code', code });
    for (const client of wss.clients) {
      if (client.readyState === 1) client.send(msg);
    }
    console.log('→ Sent pattern update to', wss.clients.size, 'client(s)');
  } catch (err) {
    console.error('Error reading pattern:', err.message);
  }
}

chokidar.watch(PATTERN_FILE, { ignoreInitial: true }).on('change', broadcastPattern);

wss.on('connection', async (ws) => {
  console.log('Client connected');
  // Send current pattern on connect
  try {
    const code = await readFile(PATTERN_FILE, 'utf-8');
    ws.send(JSON.stringify({ type: 'code', code }));
  } catch {}
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Hush running at http://localhost:${PORT}`);
});
