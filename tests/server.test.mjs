import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { createConnection } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createStaticServer, MAX_URI_LENGTH, parsePort, serve } from '../scripts/serve.mjs';

const INDEX = '<!doctype html><html lang="en"><title>Fixture</title><!-- Design contract: fixture only. --><body>Public preview — fixture</body></html>';
const NOT_FOUND = '<!doctype html><html lang="en"><title>Not found</title><body>Fixture not found</body></html>';
const OUTSIDE = 'OUTSIDE_ROOT_FIXTURE';
const HIDDEN = 'HIDDEN_FILE_FIXTURE';
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'";

function assertSecurity(headers) {
  assert.equal(headers['content-security-policy'], CSP);
  assert.equal(headers['referrer-policy'], 'no-referrer');
  assert.equal(headers['x-content-type-options'], 'nosniff');
  assert.equal(headers['x-robots-tag'], 'noindex, nofollow');
  assert.equal(headers['cache-control'], 'no-store');
}

async function fixture(t, { serverOptions = {}, startWithServe = false } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'tutelia-server-'));
  const root = join(directory, 'dist');
  let server;
  t.after(async () => {
    try {
      if (server) {
        await new Promise((fulfill, reject) => {
          server.close((error) => {
            if (error && error.code !== 'ERR_SERVER_NOT_RUNNING') reject(error);
            else fulfill();
          });
          server.closeAllConnections();
        });
      }
    } finally {
      await rm(directory, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
    }
  });

  const files = new Map([
    ['index.html', INDEX],
    ['404.html', NOT_FOUND],
    ['pages/help.html', '<!doctype html><title>Help fixture</title>'],
    ['assets/site.css', 'body { color: #123; }\n'],
    ['assets/main.js', 'export const fixture = true;\n'],
    ['assets/icon.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>'],
    ['assets/font.woff2', Buffer.from('wOF2-fixture')],
    ['assets/picture.webp', Buffer.from('RIFF-fixture-WEBP')],
    ['assets/picture.png', Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])],
    ['assets/photo.jpg', Buffer.from([255, 216, 255, 217])],
    ['favicon.ico', Buffer.from([0, 0, 1, 0])],
    ['robots.txt', 'User-agent: *\nDisallow: /\n'],
    ['assets/fonts/OFL-barlow.txt', 'Fixture license.\n'],
    ['.htaccess', HIDDEN],
    ['.private.txt', HIDDEN],
    ['.secret/exposed.txt', HIDDEN],
    ['assets/.private/child.txt', HIDDEN],
    ['blocked.json', '{"fixture":true}'],
    ['README.md', 'Repository document fixture'],
    ['download.pdf', 'Unsupported file fixture'],
    ['photo.jpeg', 'Unsupported extension fixture'],
  ]);
  for (const [filename, body] of files) {
    const parts = filename.split('/');
    await mkdir(join(root, ...parts.slice(0, -1)), { recursive: true });
    await writeFile(join(root, ...parts), body);
  }
  await mkdir(join(directory, 'docs'), { recursive: true });
  await mkdir(join(directory, 'site'), { recursive: true });
  await mkdir(join(directory, 'dist-sibling'), { recursive: true });
  await writeFile(join(directory, 'docs', 'notes.txt'), OUTSIDE);
  await writeFile(join(directory, 'site', 'index.html'), OUTSIDE);
  await writeFile(join(directory, 'dist-sibling', 'public.txt'), OUTSIDE);
  await writeFile(join(directory, 'package.json'), '{"fixture":true}');

  if (startWithServe) {
    server = await serve({ root, port: 0, ...serverOptions });
  } else {
    server = createStaticServer(root, serverOptions);
    assert.equal(server.listening, false);
    await new Promise((fulfill, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', () => {
        server.off('error', reject);
        fulfill();
      });
    });
  }
  const port = server.address().port;

  // Pass raw targets, not new URL(): URL normalization would erase dot-segment
  // attacks before the test request ever reached the server.
  function request(path, { method = 'GET', body } = {}) {
    return new Promise((fulfill, reject) => {
      const request = httpRequest({
        hostname: '127.0.0.1', port, path, method, agent: false, timeout: 5_000,
      }, (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.once('error', reject);
        response.once('end', () => {
          const payload = Buffer.concat(chunks);
          fulfill({ status: response.statusCode, headers: response.headers, body: payload, text: payload.toString('utf8') });
        });
      });
      request.once('error', reject);
      request.once('timeout', () => request.destroy(new Error('Fixture request timed out.')));
      request.end(body);
    });
  }
  return { directory, root, server, port, files, request };
}

function rawRequest(port, message) {
  return new Promise((fulfill, reject) => {
    const chunks = [];
    const socket = createConnection({ host: '127.0.0.1', port }, () => socket.write(message));
    socket.setTimeout(5_000, () => socket.destroy(new Error('Fixture socket timed out.')));
    socket.on('data', (chunk) => chunks.push(chunk));
    socket.once('error', reject);
    socket.once('end', () => fulfill(Buffer.concat(chunks).toString('utf8')));
  });
}

async function createTestSymlink(t, target, path, type) {
  try {
    await symlink(target, path, type);
    return true;
  } catch (error) {
    if (process.platform === 'win32' && ['EPERM', 'EACCES', 'ENOTSUP', 'UNKNOWN'].includes(error.code)) {
      t.skip('Windows did not permit creation of the isolated test symlink.');
      return false;
    }
    throw error;
  }
}

test('the factory is inert until explicitly listened on', () => {
  const server = createStaticServer();
  assert.equal(server.listening, false);
  assert.equal(server.address(), null);
});

test('serves exact public bytes, queries, and every permitted MIME type', async (t) => {
  const { request, files } = await fixture(t);
  const cases = [
    ['/', 'index.html', 'text/html; charset=utf-8'],
    ['/index.html?preview=fixture', 'index.html', 'text/html; charset=utf-8'],
    ['/pages/help.html', 'pages/help.html', 'text/html; charset=utf-8'],
    ['/assets/site.css', 'assets/site.css', 'text/css; charset=utf-8'],
    ['/assets/main.js', 'assets/main.js', 'text/javascript; charset=utf-8'],
    ['/assets/icon.svg', 'assets/icon.svg', 'image/svg+xml'],
    ['/assets/font.woff2', 'assets/font.woff2', 'font/woff2'],
    ['/assets/picture.webp', 'assets/picture.webp', 'image/webp'],
    ['/assets/picture.png', 'assets/picture.png', 'image/png'],
    ['/assets/photo.jpg', 'assets/photo.jpg', 'image/jpeg'],
    ['/favicon.ico', 'favicon.ico', 'image/x-icon'],
    ['/robots.txt', 'robots.txt', 'text/plain; charset=utf-8'],
    ['/assets/fonts/OFL-barlow.txt', 'assets/fonts/OFL-barlow.txt', 'text/plain; charset=utf-8'],
  ];
  for (const [route, filename, type] of cases) {
    const response = await request(route);
    const expected = Buffer.from(files.get(filename));
    assert.equal(response.status, 200, route);
    assert.equal(response.headers['content-type'], type, route);
    assert.equal(Number(response.headers['content-length']), expected.length, route);
    assert.deepEqual(response.body, expected, route);
    assertSecurity(response.headers);
  }
});

test('unknown routes and directories use 404.html with a real 404, never a listing or SPA fallback', async (t) => {
  const { request } = await fixture(t);
  for (const route of ['/missing', '/missing.html', '/assets/', '/pages', '/pages/', '/assets/nope.png']) {
    const response = await request(route);
    assert.equal(response.status, 404, route);
    assert.equal(response.text, NOT_FOUND, route);
    assert.equal(response.headers['content-type'], 'text/html; charset=utf-8');
    assertSecurity(response.headers);
  }
  assert.equal((await request('/404.html')).status, 200);
});

test('HEAD preserves GET status and representation headers without sending a body', async (t) => {
  const { request } = await fixture(t);
  for (const route of ['/', '/assets/font.woff2', '/missing.html', '/.htaccess', '/%FF']) {
    const get = await request(route);
    const head = await request(route, { method: 'HEAD' });
    assert.equal(head.status, get.status, route);
    assert.equal(head.headers['content-type'], get.headers['content-type'], route);
    assert.equal(head.headers['content-length'], get.headers['content-length'], route);
    assert.equal(head.body.length, 0, route);
    assertSecurity(head.headers);
  }
});

test('rejects non-GET/HEAD methods with 405 and Allow', async (t) => {
  const { request, port } = await fixture(t);
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE']) {
    const response = await request('/', { method, body: method === 'POST' ? 'fixture-only-body' : undefined });
    assert.equal(response.status, 405, method);
    assert.equal(response.headers.allow, 'GET, HEAD');
    assert.equal(response.text, 'Method Not Allowed\n');
    assertSecurity(response.headers);
  }
  const connect = await rawRequest(port, 'CONNECT fixture.invalid:443 HTTP/1.1\r\nHost: fixture.invalid\r\n\r\n');
  assert.match(connect, /^HTTP\/1\.1 405 Method Not Allowed\r\n/u);
  assert.match(connect, /\r\nAllow: GET, HEAD\r\n/u);
  assert.match(connect, /\r\nX-Robots-Tag: noindex, nofollow\r\n/u);
});

test('malformed, oversized, NUL, and separator-encoded request targets produce bounded 400 responses', async (t) => {
  const { request, port } = await fixture(t);
  const targets = [
    '/%', '/%GG', '/%E0%A4%A', '/%C0%AF', '/index.html?bad=%ZZ',
    '/%00', '/%0a', '/%7f', '/a%2fb.html', '/a%2Fb.html', '/a%5cb.html',
    '/assets\\site.css', '//index.html', 'http://fixture.invalid/index.html',
    `/${'a'.repeat(MAX_URI_LENGTH)}`,
  ];
  for (const target of targets) {
    const response = await request(target);
    assert.equal(response.status, 400, target.slice(0, 80));
    assert.equal(response.text, 'Bad Request\n');
    assert.ok(response.body.length < 100);
    assertSecurity(response.headers);
  }
  const malformed = await rawRequest(port, 'GET /index.html\u0000 HTTP/1.1\r\nHost: fixture.invalid\r\n\r\n');
  assert.match(malformed, /^HTTP\/1\.1 400 Bad Request\r\n/u);
  assert.equal((await request('/')).status, 200, 'Malformed input must not stop the server.');
});

test('blocks traversal, hidden files/directories, Windows aliases, and non-public extensions', async (t) => {
  const { request } = await fixture(t);
  const targets = [
    '/../docs/notes.txt', '/%2e%2e/docs/notes.txt', '/assets/../index.html',
    '/./index.html', '/%2e/index.html', '/%252e%252e/docs/notes.txt',
    '/.htaccess', '/.private.txt', '/%2eprivate.txt', '/.secret/exposed.txt',
    '/assets/.private/child.txt', '/assets/%2eprivate/child.txt',
    '/blocked.json', '/README.md', '/download.pdf', '/photo.jpeg',
    '/index.html:stream.txt', '/index.html%3astream.txt', '/index.html.',
    '/index.html%20', '/assets./site.css', '/NUL.txt',
  ];
  for (const target of targets) {
    const response = await request(target);
    assert.equal(response.status, 404, target);
    assert.equal(response.text, NOT_FOUND, target);
    assert.ok(!response.text.includes(OUTSIDE));
    assert.ok(!response.text.includes(HIDDEN));
    assertSecurity(response.headers);
  }
});

test('never serves sibling source files, package metadata, or repository documents', async (t) => {
  const { request } = await fixture(t);
  for (const route of ['/site/index.html', '/docs/notes.txt', '/package.json', '/PRODUCT.md', '/scripts/serve.mjs']) {
    const response = await request(route);
    assert.equal(response.status, 404, route);
    assert.equal(response.text, NOT_FOUND, route);
  }
});

test('missing 404.html uses a plain-text 404 including correct HEAD behavior', async (t) => {
  const { request, root } = await fixture(t);
  await rm(join(root, '404.html'));
  const response = await request('/missing.html');
  assert.equal(response.status, 404);
  assert.equal(response.text, 'Not Found\n');
  assert.equal(response.headers['content-type'], 'text/plain; charset=utf-8');
  assertSecurity(response.headers);
  const head = await request('/missing.html', { method: 'HEAD' });
  assert.equal(head.status, 404);
  assert.equal(head.body.length, 0);
  assert.equal(head.headers['content-length'], response.headers['content-length']);
});

test('outside-root file symlinks cannot expose files or a custom error page', async (t) => {
  const { request, root, directory } = await fixture(t);
  const target = join(directory, 'docs', 'notes.txt');
  if (!await createTestSymlink(t, target, join(root, 'outside.txt'), 'file')) return;
  assert.equal((await request('/outside.txt')).text, NOT_FOUND);
  assert.equal((await request('/outside.txt')).status, 404);
  await rm(join(root, '404.html'));
  if (!await createTestSymlink(t, target, join(root, '404.html'), 'file')) return;
  const missing = await request('/missing.html');
  assert.equal(missing.status, 404);
  assert.equal(missing.text, 'Not Found\n');
  assert.ok(!missing.text.includes(OUTSIDE));
});

test('outside directory links are blocked even when their target shares the root path prefix', async (t) => {
  const { request, root, directory } = await fixture(t);
  const type = process.platform === 'win32' ? 'junction' : 'dir';
  if (!await createTestSymlink(t, join(directory, 'dist-sibling'), join(root, 'linked'), type)) return;
  const response = await request('/linked/public.txt');
  assert.equal(response.status, 404);
  assert.equal(response.text, NOT_FOUND);
});

test('inside-root symlinks still enforce hidden-file and extension rules on their canonical target', async (t) => {
  const { request, root } = await fixture(t);
  if (!await createTestSymlink(t, join(root, '.private.txt'), join(root, 'alias.txt'), 'file')) return;
  if (!await createTestSymlink(t, join(root, 'README.md'), join(root, 'document.txt'), 'file')) return;
  if (!await createTestSymlink(t, join(root, 'robots.txt'), join(root, 'public.txt'), 'file')) return;
  assert.equal((await request('/alias.txt')).status, 404);
  assert.equal((await request('/document.txt')).status, 404);
  const publicFile = await request('/public.txt');
  assert.equal(publicFile.status, 200);
  assert.equal(publicFile.text, 'User-agent: *\nDisallow: /\n');
});

test('the output lock delays disk reads until a rebuild has finished', async (t) => {
  let release;
  let entered;
  const barrier = new Promise((fulfill) => { release = fulfill; });
  const entry = new Promise((fulfill) => { entered = fulfill; });
  t.after(() => release());
  const { request, root } = await fixture(t, {
    serverOptions: {
      withOutputLock: async (operation) => {
        entered();
        await barrier;
        return operation();
      },
    },
  });
  const pending = request('/');
  try {
    await entry;
    await writeFile(join(root, 'index.html'), 'Complete rebuilt fixture');
  } finally {
    release();
  }
  const response = await pending;
  assert.equal(response.status, 200);
  assert.equal(response.text, 'Complete rebuilt fixture');
});

test('failed rebuilds can suspend the preview with 503 without leaking error details', async (t) => {
  const { request } = await fixture(t, {
    serverOptions: {
      withOutputLock: () => {
        throw Object.assign(new Error('Internal fixture detail'), { code: 'ERR_PREVIEW_UNAVAILABLE' });
      },
    },
  });
  const response = await request('/');
  assert.equal(response.status, 503);
  assert.equal(response.text, 'Service Unavailable\n');
  assertSecurity(response.headers);
});

test('unexpected errors return a generic secured 500', async (t) => {
  const { request } = await fixture(t, {
    serverOptions: { withOutputLock: () => { throw new Error('Internal fixture detail'); } },
  });
  const response = await request('/');
  assert.equal(response.status, 500);
  assert.equal(response.text, 'Internal Server Error\n');
  assertSecurity(response.headers);
});

test('request URLs and bodies are not logged', async (t) => {
  const { request } = await fixture(t);
  const calls = [];
  for (const method of ['log', 'info', 'warn', 'error']) {
    t.mock.method(console, method, (...args) => calls.push(args));
  }
  await request('/missing.html?fixture=opaque-marker');
  await request('/', { method: 'POST', body: 'opaque-fixture-body' });
  assert.deepEqual(calls, []);
});

test('port configuration supports defaults, PORT, and flag precedence without partial parsing', () => {
  assert.equal(parsePort([], {}), 4173);
  assert.equal(parsePort([], { PORT: '' }), 4173);
  assert.equal(parsePort([], { PORT: '4175' }), 4175);
  assert.equal(parsePort(['--port', '4174'], {}), 4174);
  assert.equal(parsePort(['--port=4174'], { PORT: '4175' }), 4174);
  assert.equal(parsePort(['--port', '4174'], { PORT: 'invalid' }), 4174);
  for (const value of ['0', '-1', '65536', '4173x', '1.5', 'NaN', ' ']) {
    assert.throws(() => parsePort(['--port', value], {}));
    assert.throws(() => parsePort([], { PORT: value }));
  }
  for (const args of [['--port'], ['--port='], ['--host', '0.0.0.0'], ['--port', '4173', '--port', '4174']]) {
    assert.throws(() => parsePort(args, {}));
  }
});

test('serve binds only to loopback and returns the listening server', async (t) => {
  t.mock.method(console, 'log', () => {});
  const { server, request } = await fixture(t, { startWithServe: true });
  assert.equal(server.address().address, '127.0.0.1');
  assert.equal((await request('/')).status, 200);
});