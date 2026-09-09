import { watch } from 'node:fs';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';
import { parsePort, serve } from './serve.mjs';

const SOURCE_ROOT = fileURLToPath(new URL('../site/', import.meta.url));
const DEBOUNCE_MS = 150;

/** Build once, serve locally, then rebuild on source changes without a websocket. */
export async function dev({ port = parsePort() } = {}) {
  await build();

  let outputQueue = Promise.resolve();
  let outputReady = true;
  let dirty = false;
  let rebuilding = false;
  let stopped = false;
  let timer;
  let watcher;
  let closing;

  // Sharing this queue with server disk reads prevents requests from observing
  // a half-copied dist/. Failed builds leave a 503, not partial public output.
  function withOutputLock(operation) {
    const result = outputQueue.then(operation);
    outputQueue = result.catch(() => {});
    return result;
  }

  const server = await serve({
    port,
    withOutputLock: (operation) => withOutputLock(() => {
      if (!outputReady) {
        throw Object.assign(new Error('Preview output unavailable.'), { code: 'ERR_PREVIEW_UNAVAILABLE' });
      }
      return operation();
    }),
  });

  async function rebuildPending() {
    if (rebuilding || stopped) return;
    rebuilding = true;
    try {
      while (dirty && !stopped) {
        dirty = false;
        await withOutputLock(async () => {
          outputReady = false;
          try {
            await build();
            outputReady = true;
            console.log('[dev] Rebuilt. Reload the browser manually.');
          } catch {
            console.error('[dev] Build failed. Check source files and installed font assets, then save again. Preview returns 503 until a build succeeds.');
          }
        });
      }
    } finally {
      rebuilding = false;
    }
  }

  function close() {
    if (closing) return closing;
    stopped = true;
    clearTimeout(timer);
    watcher?.close();
    closing = (async () => {
      await new Promise((fulfill, reject) => {
        server.close((error) => {
          if (error && error.code !== 'ERR_SERVER_NOT_RUNNING') reject(error);
          else fulfill();
        });
        server.closeAllConnections();
      });
      await outputQueue;
    })();
    return closing;
  }

  try {
    watcher = watch(SOURCE_ROOT, { recursive: true }, () => {
      if (stopped) return;
      dirty = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        void rebuildPending().catch(() => {
          outputReady = false;
          console.error('[dev] Rebuild interrupted. Save a source file to retry.');
        });
      }, DEBOUNCE_MS);
    });
  } catch (error) {
    await close();
    throw error;
  }
  watcher.on('error', () => {
    console.error('[dev] Source watching stopped. Restart the development server.');
    process.exitCode = 1;
    void close().catch(() => { process.exitCode = 1; });
  });
  console.log('[dev] Watching site/ recursively. Reload the browser manually after changes; no live-reload connection.');
  return { server, close };
}

if (process.argv[1] && relative(fileURLToPath(import.meta.url), resolve(process.argv[1])) === '') {
  dev().then(({ close }) => {
    const stop = () => {
      void close().catch(() => { process.exitCode = 1; });
    };
    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
  }).catch((error) => {
    console.error(`[dev] ${error.message}`);
    process.exitCode = 1;
  });
}