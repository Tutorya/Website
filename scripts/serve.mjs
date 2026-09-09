import { lstat, open, realpath } from 'node:fs/promises';
import { createServer, STATUS_CODES } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = fileURLToPath(new URL('../dist/', import.meta.url));
const HOST = '127.0.0.1';
export const MAX_URI_LENGTH = 8_192;

const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "font-src 'self'",
    "img-src 'self' data:",
    "connect-src 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; '),
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
};

const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.woff2', 'font/woff2'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.png', 'image/png'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
]);

const NOT_PUBLIC_ERRORS = new Set([
  'ENOENT', 'ENOTDIR', 'EACCES', 'EPERM', 'ELOOP', 'EINVAL', 'ENAMETOOLONG',
]);

function safeSegments(segments) {
  return segments.every((segment) => (
    segment.length > 0
    && !segment.startsWith('.')
    && !/[. ]$/u.test(segment)
    && !/[%<>:"|?*\\\u0000-\u001f\u007f-\u009f]/u.test(segment)
    // Windows device names and alternate data streams must not resolve as files.
    && !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu.test(segment)
  ));
}

function publicRoute(target) {
  if (
    typeof target !== 'string'
    || Buffer.byteLength(target) > MAX_URI_LENGTH
    || !target.startsWith('/')
    || target.startsWith('//')
    || /[\\#\u0000-\u0020\u007f]/u.test(target)
  ) {
    return { status: 400 };
  }

  let pathname;
  try {
    const decodedTarget = decodeURIComponent(target);
    if (/[\\\u0000-\u001f\u007f-\u009f]/u.test(decodedTarget)) return { status: 400 };
    const rawPath = target.split('?', 1)[0];
    if (/%(?:2f|5c)/iu.test(rawPath)) return { status: 400 };
    pathname = decodeURIComponent(rawPath);
  } catch {
    return { status: 400 };
  }

  if (pathname === '/') return { filename: 'index.html' };

  // Inspect the original decoded segments before path/URL normalization can
  // erase traversal attempts. A second decoding pass is deliberately forbidden.
  const segments = pathname.slice(1).split('/');
  if (!safeSegments(segments) || !MIME_TYPES.has(extname(pathname).toLowerCase())) {
    return { status: 404 };
  }
  return { filename: segments.join(sep) };
}

function insideRoot(root, filename) {
  const location = relative(root, filename);
  return location !== '' && location !== '..' && !location.startsWith(`..${sep}`) && !isAbsolute(location);
}

async function readPublicFile(root, filename, headOnly) {
  try {
    // The root itself cannot be a symlink/junction pointing at repository files.
    if (!(await lstat(root)).isDirectory()) return null;
    const candidate = resolve(root, filename);
    if (!insideRoot(root, candidate)) return null;

    const canonicalRoot = await realpath(root);
    const canonicalFile = await realpath(candidate);
    if (!insideRoot(canonicalRoot, canonicalFile)) return null;
    const canonicalSegments = relative(canonicalRoot, canonicalFile).split(sep);
    if (!safeSegments(canonicalSegments) || !MIME_TYPES.has(extname(canonicalFile).toLowerCase())) return null;

    const handle = await open(canonicalFile, 'r');
    try {
      const information = await handle.stat();
      if (!information.isFile()) return null;
      // Snapshot bytes while the dev output lock is held. The network response
      // never depends on files that a subsequent rebuild might remove.
      const body = headOnly ? null : await handle.readFile();
      return {
        body,
        size: body?.length ?? information.size,
        type: MIME_TYPES.get(extname(filename).toLowerCase()),
      };
    } finally {
      await handle.close();
    }
  } catch (error) {
    if (NOT_PUBLIC_ERRORS.has(error.code)) return null;
    throw error;
  }
}

function plainHeaders(status, body) {
  return {
    ...SECURITY_HEADERS,
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...(status === 405 ? { Allow: 'GET, HEAD' } : {}),
  };
}

function sendPlain(request, response, status) {
  const body = `${STATUS_CODES[status]}\n`;
  response.writeHead(status, plainHeaders(status, body));
  response.end(request.method === 'HEAD' ? undefined : body);
}

function sendFile(request, response, status, file) {
  response.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': file.type,
    'Content-Length': file.size,
  });
  response.end(request.method === 'HEAD' ? undefined : file.body);
}

function rejectSocket(socket, status, headOnly = false) {
  if (socket.destroyed || !socket.writable) return;
  const body = `${STATUS_CODES[status]}\n`;
  const headers = { ...plainHeaders(status, body), Connection: 'close' };
  socket.end(
    `HTTP/1.1 ${status} ${STATUS_CODES[status]}\r\n`
    + Object.entries(headers).map(([name, value]) => `${name}: ${value}\r\n`).join('')
    + `\r\n${headOnly ? '' : body}`,
  );
}

/** Return an unstarted server; imports do not bind ports or invoke tests. */
export function createStaticServer(root = DEFAULT_ROOT, { withOutputLock = (operation) => operation() } = {}) {
  const publicRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  const server = createServer({
    maxHeaderSize: 16_384,
    headersTimeout: 10_000,
    requestTimeout: 15_000,
    keepAliveTimeout: 5_000,
  }, async (request, response) => {
    try {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.setHeader('Connection', 'close');
        sendPlain(request, response, 405);
        return;
      }

      const route = publicRoute(request.url);
      if (route.status === 400) {
        response.setHeader('Connection', 'close');
        sendPlain(request, response, 400);
        return;
      }

      // Dev supplies a shared queue for both disk reads and builds. No request
      // URLs, headers, or bodies are passed to that queue or written to logs.
      await withOutputLock(async () => {
        if (response.destroyed) return;
        const headOnly = request.method === 'HEAD';
        const file = route.filename ? await readPublicFile(publicRoot, route.filename, headOnly) : null;
        if (file) {
          sendFile(request, response, 200, file);
          return;
        }
        const notFound = await readPublicFile(publicRoot, '404.html', headOnly);
        if (notFound) sendFile(request, response, 404, notFound);
        else sendPlain(request, response, 404);
      });
    } catch (error) {
      if (response.destroyed) return;
      if (response.headersSent) response.destroy();
      else sendPlain(request, response, error.code === 'ERR_PREVIEW_UNAVAILABLE' ? 503 : 500);
    }
  });

  // CONNECT bypasses the usual HTTP request event; it must not become a tunnel.
  server.on('connect', (_request, socket) => rejectSocket(socket, 405));
  server.on('upgrade', (request, socket) => rejectSocket(
    socket,
    request.method === 'GET' || request.method === 'HEAD' ? 400 : 405,
    request.method === 'HEAD',
  ));
  server.on('clientError', (_error, socket) => rejectSocket(socket, 400));
  return server;
}

/** CLI flags override PORT; neither changes the loopback-only bind address. */
export function parsePort(args = process.argv.slice(2), environment = process.env) {
  let value = environment.PORT || '4173';
  let hasFlag = false;
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (hasFlag || (argument !== '--port' && !argument.startsWith('--port='))) {
      throw new Error('Supported option: --port <1-65535>.');
    }
    hasFlag = true;
    value = argument === '--port' ? args[++index] : argument.slice('--port='.length);
  }
  if (!/^\d+$/u.test(String(value)) || Number(value) < 1 || Number(value) > 65_535) {
    throw new Error('PORT or --port must be an integer between 1 and 65535.');
  }
  return Number(value);
}

/** Start the preview and return its HTTP server. Explicit port: 0 is useful in tests. */
export async function serve({ root = DEFAULT_ROOT, port = parsePort(), withOutputLock } = {}) {
  if (!Number.isInteger(port) || port < 0 || port > 65_535) throw new Error('Invalid preview port.');
  const publicRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  try {
    if (!(await lstat(publicRoot)).isDirectory()) throw new Error('Invalid output directory.');
  } catch {
    throw new Error('Preview output is missing or invalid. Run npm run build first.');
  }
  const server = createStaticServer(publicRoot, { withOutputLock });
  await new Promise((fulfill, reject) => {
    const onError = (error) => {
      server.off('listening', onListening);
      reject(error);
    };
    const onListening = () => {
      server.off('error', onError);
      fulfill();
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, HOST);
  });
  console.log(`[preview] http://${HOST}:${server.address().port} (local only; noindex, nofollow).`);
  return server;
}

if (process.argv[1] && relative(fileURLToPath(import.meta.url), resolve(process.argv[1])) === '') {
  serve().catch((error) => {
    console.error(`[preview] ${error.message}`);
    process.exitCode = 1;
  });
}