// Local preview of dist/ that behaves like GitHub Pages (dir/index.html, /x → /x.html, 404.html fallback).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT) || 4000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

async function file(p) { try { return (await stat(p)).isFile() ? p : null; } catch { return null; } }

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.includes('..')) { res.writeHead(400); return res.end(); }
  const base = join(DIST, path);
  let hit = (await file(base)) || (await file(join(base, 'index.html'))) || (await file(base + '.html'));
  if (!hit && !path.endsWith('/') && (await file(join(base, 'index.html')))) { res.writeHead(301, { Location: path + '/' }); return res.end(); }
  const status = hit ? 200 : 404;
  hit ||= join(DIST, '404.html');
  res.writeHead(status, { 'Content-Type': TYPES[extname(hit)] || 'application/octet-stream' });
  res.end(await readFile(hit));
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
